import React, { useState } from "react";
import CommonModal from "../../../../_core/Ui-kits/Modals/common/modal";
import { Btn } from "../../../../AbstractElements";
import CustomSpinner from "../../../../CommonElements/CustomSpinner/CustomSpinner";
import { Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Media, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PaymentModesAPI } from "../../../../api";
import appStore from "../../../Live Chats/Client/AppStore";

const FormModal = ({setbtnLoading, btnLoading, modal, title, toggle, formData, eventMode, setFormData, getPaymentModes, resetFormValues, updatePaymentMode}) => {
  const { userData, setUserData, token } = appStore();
  

  const handleSubmit = () => {
      let payload =  {...formData, userId: userData?._id};
      if(eventMode === 'create_payment_mode'){
        payload = {...payload, paymentEnabled : formData?.paymentEnabled};
        createPaymentMode(payload);
      }else{
        updatePaymentMode(payload, '');
      }
  };

  const createPaymentMode = async(payload) => {
      setbtnLoading(true);
      try {
        const response = await fetch(`${PaymentModesAPI}`, {
          method: "POST",
          body: JSON.stringify([payload]),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        if (response.ok) {
          getPaymentModes();
          resetFormValues();
          toggle();
          toast.success('Successfully added payment mode');
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error(error);
      }
      setbtnLoading(false);
  }
 
  const handleSwitchChange = (e) => {
    setFormData((pre) => ({...pre, paymentEnabled: e?.target?.checked}));
  }

  const handleInputChanges = (e) => {
    const {name, value} = e?.target;
    
    let uploadObj = {};
    if(name === 'paymentType' && value === 'cash_on_delivery'){
      uploadObj = {...formData, [name]: value, paymentName: 'COD (Cash on Delivery)',
      paymentKeyId: '', paymentKeySecret: '', paymentBase64Key: '', paymentApiKey:''};
    }else if(name === 'paymentType' && value === 'Online' && formData?.paymentName !== ''){
      uploadObj = {...formData, [name]: value, paymentName: ''};
    }else{
      uploadObj = {...formData, [name] : value};
    }
    Object.values(uploadObj)?.length && setFormData({...uploadObj});
  }
  return (
    <CommonModal
      isOpen={modal}
      title={title}
      toggler={toggle}
      submitTxt={"Create Agent"}
    >
      <Form className="needs-validation mb-2" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <div className="mb-1">
        <FormGroup>
            <Label htmlFor="validationCustom01" className="mb-1">{"Payment Type"}</Label>
            <InputGroup>
              <InputGroupText>💰</InputGroupText>
              <select className="form-control"
                value={formData?.paymentType}
                name="paymentType"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder={`Payment Type`}
                required={true}>
                  <option value={''}>{"Select Payment Type"}</option>
                  {[{code: 'Online', txt: 'Online'}, {code: 'cash_on_delivery', txt: 'Cash On Delivery'}]?.map((ele, ind) => (
                    <option value={ele['code']}>{ele['txt']}</option>
                  ))}
              </select>
            </InputGroup>
            </FormGroup>
        </div>
        <div className="mb-1">
        <FormGroup>
            <Label htmlFor="validationCustom01" className="mb-1">{"Payment Name"}</Label>
            <InputGroup>
              <InputGroupText>💰</InputGroupText>
              <input
                className="form-control"
                value={formData.paymentName ? formData.paymentName : ''}
                name="paymentName"
                type="text"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder={`Payment Name`}
                required={true}
              />
            </InputGroup>
            </FormGroup>
        </div>
        <div className='mb-1'>
        <FormGroup>
            <Label htmlFor="validationCustom02" className="mb-1">{"Payment KeyId"}</Label>
            <InputGroup>
              <InputGroupText>&#x1F511;</InputGroupText>
              <input
                className="form-control"
                value={formData?.paymentKeyId}
                name="paymentKeyId"
                type="text"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder={`Payment KeyId`}
                required={true}
                disabled={formData?.paymentType === 'cash_on_delivery'}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </InputGroup>
            </FormGroup>
        </div>
        <div className='mb-1'>
        <FormGroup>
            <Label htmlFor="validationCustomUsername" className="mb-1">
              {"Payment Key Secret"}
            </Label>
            <InputGroup>
              <InputGroupText>&#x1F511;</InputGroupText>
              <input
                className="form-control"
                value={`${formData?.paymentKeySecret}`}
                name="paymentKeySecret"
                type="text"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder="Payment Key Secret"
                required={true}
                disabled={formData?.paymentType === 'cash_on_delivery'}
              />
              <span className="text-danger">
              </span>
            </InputGroup>
            </FormGroup>
            </div>
        <div className='mb-1'>
        <FormGroup>
            <Label htmlFor="validationCustom03" className="mb-1">{"Payment Base64Key"}</Label>
            <InputGroup>
              <InputGroupText>&#x1F511;</InputGroupText>
              <input
                className="form-control"
                value={formData?.paymentBase64Key}
                name="paymentBase64Key"
                type="text"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder={`Payment Base64Key`}
                required={true}
                disabled={formData?.paymentType === 'cash_on_delivery'}
              />
              <span className="text-danger">
              </span>
            </InputGroup>
            </FormGroup>
            </div>
            <div className='mb-1'>
            <FormGroup>
            <Label htmlFor="validationCustom04" className="mb-1">{"Payment ApiKey"}</Label>
            <InputGroup>
              <InputGroupText>&#x1F511;</InputGroupText>
              <input
                className="form-control"
                id="validationCustom04"
                value={`${formData?.paymentApiKey}`}
                name="paymentApiKey"
                type="text"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder="Payment ApiKey"
                required={true}
                disabled={formData?.paymentType === 'cash_on_delivery'}
              />
              <span className="text-danger">
              </span>
              </InputGroup>
            </FormGroup>
            </div>
            {eventMode === 'create_payment_mode' ? 
            <div className='mb-1'>
             <Media>
             <Label className="col-form-label m-r-10">{`status`}</Label>
             <Media body className="text-evenly icon-state">
               <Label className="switch">
                 <Input
                   defaultChecked={formData?.paymentEnabled}
                   name="paymentEnabled"
                   type="checkbox"
                   onChange={handleSwitchChange}
                 />
                 <span className="switch-state"></span>
               </Label>
             </Media>
           </Media>
           </div> 
           : 
           '' }
        <Btn attrBtn={{ color: "primary" }}>
          {btnLoading ? <CustomSpinner /> : "Save"}
        </Btn>
      </Form>
    </CommonModal>
  );
};

export default FormModal;
