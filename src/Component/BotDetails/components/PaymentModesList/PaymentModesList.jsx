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
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Media,
  Row,
  Spinner,
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
  const [isLoading, setisLoading] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [eventMode, seteventMode] = useState("");
  const toggleFormModal = () => setFormModal((pre) => !pre);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const rawData = {
    paymentEnabled: false,
    paymentType: "",
    paymentName: "",
    paymentKeyId: "",
    paymentKeySecret: "",
    paymentBase64Key: "",
    paymentApiKey: "",
  }
  const [rawPaymentData, setRawPaymentData] = useState({...rawData});

  const resetFormValues = () => {
    setRawPaymentData({ ...rawData });
  };

  const getPaymentModes = async () => {
    setisLoading(true);
    try {
      const response = await fetch(`${PaymentModesAPI}/${userData?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        if (responseData) {
          setPaymentModes([...responseData]);
        }
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setisLoading(false);
  };

  const updatePaymentMode = async (payload, checkChange) => {
    setbtnLoading(true);
    try {
      const response = await fetch(
        `${PaymentModesAPI}/${payload?._id}/update`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        getPaymentModes();
        resetFormValues();
        !checkChange && toggleFormModal();
        toast.success("Successfully updated payment mode");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setbtnLoading(false);
  };

  useEffect(() => {
    getPaymentModes();
  }, []);

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
        <div className="mt-2 d-flex justify-content-between mx-2">
          <Label htmlFor="validationCustom01" className="fw-bold">
            {"Payment Modes"}
          </Label>
          <Btn
            attrBtn={{
              color: "success",
              onClick: () => {
                seteventMode("create_payment_mode");
                resetFormValues();
                toggleFormModal();
              },
            }}
          >
            {"Add Payment Mode"}
          </Btn>
          <FormModal btnLoading={btnLoading} setbtnLoading={setbtnLoading}
            resetFormValues={resetFormValues}
            getPaymentModes={getPaymentModes}
            updatePaymentMode={updatePaymentMode}
            paymentModes={paymentModes}
            title={
              eventMode === "create_payment_mode"
                ? "Create Payment Mode"
                : "Edit Payment Mode"
            }
            modal={formModal}
            toggle={toggleFormModal}
            setFormData={setRawPaymentData}
            formData={rawPaymentData}
            eventMode={eventMode}
          />
        </div>
        { isLoading ? 
          <div className="loader-box">
            <Spinner attrSpinner={{ className: "loader-3" }} />
          </div>  :
          <div className="w-100 mt-2 d-flex flex-column gap-2  mx-2">
          {paymentModes?.length > 0
            ? paymentModes?.map((ele, ind) => {
                let uniqCode = uuid();
                return ele?.paymentType !== "COD" ? (
                  <div key={uniqCode} className="checkbox  mb-2">
                    <Input
                      name="COD"
                      id={uniqCode}
                      type="checkbox"
                      onChange={(e) => {
                        let payLoad = {
                          ...ele,
                          paymentEnabled: e?.target?.checked,
                        };
                        updatePaymentMode(payLoad, 'checked');
                      }}
                      defaultChecked={ele?.paymentEnabled}
                    />
                    <Label style={{ fontWeight: "600" }} for={uniqCode}>
                      {ele?.paymentName}
                    </Label>
                    <MdOutlineEdit
                      style={{
                        height: "18px",
                        width: "18px",
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                      onClick={() => {
                        seteventMode("update_payment_mode");
                        setRawPaymentData({ ...ele });
                        toggleFormModal();
                      }}
                    />
                  </div>
                ) : (
                  ""
                );
              })
            : ""}
        </div>
        }
      </Col>
      </Row>
      </Container>
    </Fragment>
  );
};

export default PaymentModesList;
