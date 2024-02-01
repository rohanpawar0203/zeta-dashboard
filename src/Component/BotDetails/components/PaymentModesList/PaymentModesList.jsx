import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { paymentsData, paymentDataColumns } from './TableData'
import DataTable from 'react-data-table-component';
import { PaymentModesAPI } from '../../../../api';
import appStore from '../../../Live Chats/Client/AppStore';
import { toast } from 'react-toastify';
import { Btn, H6 } from '../../../../AbstractElements';
import { Col, Form, Input, InputGroup, InputGroupText, Label, Media, Row } from 'reactstrap';
import CustomSpinner from '../../../../CommonElements/CustomSpinner/CustomSpinner';

const style = {
  width: 40,
  height: 40
};
const style2 = {
  width: 60, fontSize: 13, padding: 3
};

const PaymentModesList = () => {
  const { userData, setUserData, token } = appStore();
  const [paymentModes, setPaymentModes] = useState([]);
  const [btnLoading, setbtnLoading] = useState(false);
  const [paymentsTableData, setpaymentsTableData] = useState([]);
  const { register, handleSubmit, reset , formState: { errors } } = useForm();
  const [rawPaymentData, setRawPaymentData] = useState({
    "paymentEnabled": false,
    "paymentType": "",
    "paymentName": "",
    "paymentKeyId": "",
    "paymentKeySecret": "",
    "paymentBase64Key": "",
    "paymentApiKey": "",
   })

   const handlePaymentModeCreation = (data) => {
    console.log('data', data);
    if (data !== '') {
      // createPaymentMode(payload);
    }else {
      errors.showMessages();
    }
  };

  const getPaymentModes = async() => {
    try {
      const response = await fetch(`${PaymentModesAPI}/${userData?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('responseData ', responseData);
        if(responseData) setPaymentModes([...setPaymentModes]);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const prepareTableData = () => {
    if(paymentModes.length){
     let data = paymentModes?.map((ele, ind) => (
      { 
        "userId": <H6>12345</H6>,
        "Payment Name": <H6>JusPay</H6>,
        "Payment Type": <H6>Online</H6>,
        "Payment Enabled": <H6>Yes</H6>,
        "action":
          <div className='d-flex  gap-1'>
            <span>
              <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
            </span>
            <span>
              <Btn attrBtn={{ style: style2, color: 'primary', className: 'btn btn-xs ms-2', type: 'button' }}>Edit </Btn>
            </span>
          </div >
      }
     ));

    }
  }

  useEffect(() => {
    getPaymentModes();
  }, []);


  
  return (
    <Fragment>
      <>  
      <Form className="needs-validation mb-2"
              onSubmit={handleSubmit(handlePaymentModeCreation)}
              // style={{ height: "60vh", overflowY: "scroll" }}
            >
          <Row>   
            <Col md="4 mb-3">
              <Label htmlFor="validationCustom01">{"Payment Name"}</Label>
              <InputGroup>
                <InputGroupText>💰</InputGroupText>
              <input className="form-control" name="paymentName" type="text" placeholder="Payment Name" {...register('paymentName', { required: true })} />
              <span>{errors.paymentName && 'Payment Name is required'}</span>
              </InputGroup>
            </Col>
            <Col md="4 mb-3">
              <Label htmlFor="validationCustom02">{"Payment KeyId"}</Label>
              <InputGroup>
                <InputGroupText>&#x1F511;</InputGroupText>
              <input className="form-control" name="paymentKeyId" type="text" placeholder="Payment KeyId" {...register('paymentKeyId', { required: true })} />
              <span>{errors.paymentKeyId && 'Payment KeyId is required'}</span>
              <div className="valid-feedback">{'Looks good!'}</div>
              </InputGroup>
            </Col>
            <Col md="4 mb-3">
              <Label htmlFor="validationCustomUsername">{"Payment Key Secret"}</Label>
              <InputGroup>
                <InputGroupText>&#x1F511;</InputGroupText>
                {/* <InputGroupAddon addonType="prepend"> */}
                {/* </InputGroupAddon> */}
                <input className="form-control" name="paymentKeySecret" type="text" placeholder="Payment Key Secret" {...register('paymentKeySecret', { required: true })} />
                <span>{errors.paymentKeySecret && 'Payment Key Secret is required'}</span>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6 mb-3">
              <Label htmlFor="validationCustom03">{"Payment Base64Key"}</Label>
              <InputGroup>
                <InputGroupText>&#x1F511;</InputGroupText>
              <input className="form-control" name="paymentBase64Key" type="text" placeholder="Payment Base64Key" {...register('paymentBase64Key', { required: true })} />
              <span>{errors.paymentBase64Key && 'Payment Base64Key is required'}</span>
              </InputGroup>
            </Col>
            <Col md="3 mb-3">
              <Label htmlFor="validationCustom04">{"Payment ApiKey"}</Label>
              <InputGroup>
                <InputGroupText>&#x1F511;</InputGroupText>
              <input className="form-control" id="validationCustom04" name="paymentApiKey" type="text" placeholder="Payment ApiKey" {...register('paymentApiKey', { required: true })} />
              <span>{errors.paymentApiKey && 'Payment ApiKey is required'}</span>
              </InputGroup>
            </Col>
            <Col md="3 mb-3">
              <Label htmlFor="validationCustom04">{"ON/OFF"}</Label>
              <DynamicSwitch rawPaymentData={rawPaymentData} setRawPaymentData={setRawPaymentData} />
            </Col>
          </Row>
          <Btn attrBtn={{ color:'primary'}}>
              {btnLoading ? <CustomSpinner/> :  'Save'}
           </Btn>
      </Form>
              </> 
      <div className="table-responsive product-table">
        <DataTable
          noHeader
          pagination
          paginationServer
          columns={paymentDataColumns}
          data={paymentsData}
        />
      </div>
    </Fragment>
  )
}

const DynamicSwitch = ({setRawPaymentData, rawPaymentData}) => {
  
  const handleSwitchChange = (e) => {
    console.log('e?.target?.checked **', e?.target?.checked);
    setRawPaymentData((pre) => ({...pre, paymentEnabled: e?.target?.checked}));
  }
  return (<Media>
        <Label className="col-form-label m-r-10">{`ON/OFF`}</Label>
        <Media body className="text-evenly icon-state">
          <Label className="switch">
            <Input name='paymentEnabled' type="checkbox" onChange={handleSwitchChange} />
            <span className="switch-state"></span>
          </Label>
        </Media>
      </Media>
  );
};

export default PaymentModesList