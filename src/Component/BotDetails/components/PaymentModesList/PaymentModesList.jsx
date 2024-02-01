import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { paymentsData, paymentDataColumns } from "./TableData";
import DataTable from "react-data-table-component";
import { PaymentModesAPI } from "../../../../api";
import appStore from "../../../Live Chats/Client/AppStore";
import { toast } from "react-toastify";
import { Btn, H6 } from "../../../../AbstractElements";
import { v4 as uuid } from "uuid";
import {
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Media,
  Row,
} from "reactstrap";
import CustomSpinner from "../../../../CommonElements/CustomSpinner/CustomSpinner";
import FormModal from "./FormModal";
import { MdEdit, MdOutlineEdit } from "react-icons/md";

const style = {
  width: 40,
  height: 40,
};
const style2 = {
  width: 60,
  fontSize: 13,
  padding: 3,
};

const PaymentModesList = () => {
  const { userData, setUserData, token } = appStore();
  const [paymentModes, setPaymentModes] = useState([]);
  const [btnLoading, setbtnLoading] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [eventMode, seteventMode] = useState('');
  const toggleFormModal = () => setFormModal((pre) => !pre);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [rawPaymentData, setRawPaymentData] = useState({
    paymentEnabled: false,
    paymentType: "",
    paymentName: "",
    paymentKeyId: "",
    paymentKeySecret: "",
    paymentBase64Key: "",
    paymentApiKey: "",
  });
  
  const resetFormValues = () => {
    for (const key in rawPaymentData) {
        if(key in rawPaymentData && key !== 'paymentEnabled'){
            rawPaymentData[key] = '';
        }if(key in rawPaymentData && key === 'paymentEnabled'){
          rawPaymentData[key] = false;
        }
        console.log('formData ', rawPaymentData);
        setRawPaymentData({...rawPaymentData});
    }
  }

  const getPaymentModes = async () => {
    try {
      const response = await fetch(`${PaymentModesAPI}/${userData?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log("responseData ", responseData);
        if (responseData){
          setPaymentModes([...responseData]);
        }
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const prepareTableData = () => {
    if (paymentModes.length) {
      let data = paymentModes?.map((ele, ind) => ({
        userId: <H6>12345</H6>,
        "Payment Name": <H6>JusPay</H6>,
        "Payment Type": <H6>Online</H6>,
        "Payment Enabled": <H6>Yes</H6>,
        action: (
          <div className="d-flex  gap-1">
            <span>
              <Btn
                attrBtn={{
                  style: style2,
                  color: "danger",
                  className: "btn btn-xs",
                  type: "button",
                }}
              >
                Delete
              </Btn>
            </span>
            <span>
              <Btn
                attrBtn={{
                  style: style2,
                  color: "primary",
                  className: "btn btn-xs ms-2",
                  type: "button",
                }}
              >
                Edit{" "}
              </Btn>
            </span>
          </div>
        ),
      }));
    }
  };

  const updatePaymentMode = async(payload) => {
    try {
      console.log('payload ', payload);
      const response = await fetch(`${PaymentModesAPI}/${payload?._id}/update`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        getPaymentModes();
        resetFormValues();
        toast.success('Successfully updated payment mode');
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
}

  useEffect(() => {
    getPaymentModes();
    console.log((paymentModes?.length > 0));
  }, []);

  return (
    <Fragment>
      <Row>
        <div
          style={{ width: "100%" }}
          className="mt-2 d-flex justify-content-between mx-2"
        >
          <Label htmlFor="validationCustom01" className="fw-bold">
            {"Payment Modes"}
          </Label>
          <Btn attrBtn={{ color: "success" , onClick: () => {
            seteventMode('create_payment_mode');
            resetFormValues();
            toggleFormModal();
          }}}>{"Add Payment Mode"}</Btn>
          <FormModal resetFormValues={resetFormValues} getPaymentModes={getPaymentModes} title={eventMode === 'create_payment_mode' ? 'Create Payment Mode' : 'Edit Payment Mode'}
            modal={formModal} toggle={toggleFormModal} setFormData={setRawPaymentData}  formData={rawPaymentData} eventMode={eventMode}/>
        </div>
        <div className="w-100 flex-column gap-2">
          <div className="checkbox mb-2">
            <Input name="COD" id="checkbox1" type="checkbox" checked={true} />
            <Label style={{ fontWeight: "600" }} for="checkbox1">
              {"Cash On Delivery"}
            </Label>
          </div>
          {
            (paymentModes?.length > 0) ? 
            paymentModes?.map((ele, ind) => {
              let uniqCode = uuid();
              return ( ele?.paymentType !== 'COD' ? <div key={uniqCode} className="checkbox">
              <Input name="COD" id={uniqCode} type="checkbox"
              onChange={(e) => {
                console.log('yes');
                let payLoad = {...ele, paymentEnabled: e?.target?.checked};
                updatePaymentMode(payLoad);
              }}
              defaultChecked={ele?.paymentEnabled} />
              <Label style={{ fontWeight: "600" }} for={uniqCode}>
                {ele?.paymentName}
              </Label>
              <MdOutlineEdit style={{height: '18px', width: '18px', cursor: 'pointer', marginLeft: '8px'}} onClick={() => {
                seteventMode('update_payment_mode');
                setRawPaymentData({...ele});
                toggleFormModal();
              }}/>
            </div> : '')
            }) 
            : ''
          }
        </div>
      </Row>
    </Fragment>
  );
};

export default PaymentModesList;
