import React, { useState } from "react";
import CommonModal from "../../../../_core/Ui-kits/Modals/common/modal";
import { Btn } from "../../../../AbstractElements";
import CustomSpinner from "../../../../CommonElements/CustomSpinner/CustomSpinner";
import { Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Media, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PaymentModesAPI } from "../../../../api";
import appStore from "../../../Live Chats/Client/AppStore";

const FormModal = ({ modal, title, toggle, formData, eventMode, setFormData, getPaymentModes, resetFormValues }) => {
  const [btnLoading, setbtnLoading] = useState(false);
  const { userData, setUserData, token } = appStore();


  const handleSubmit = (data) => {
    if (data !== "") {
      console.log("data ", data);
      let payload =  {userId: userData?._id, ...data, paymentType: 'Online'};
      if(eventMode === 'create_payment_mode'){
        payload = {...payload, paymentEnabled : formData?.paymentEnabled};
        console.log("data cretate", payload);
        createPaymentMode(payload);
      }else{
        updatePaymentMode(payload);
      }
    }
  };

  const createPaymentMode = async(payload) => {
      setbtnLoading(true);
      try {
        console.log('payload ', payload);
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

  const updatePaymentMode = async(payload) => {
    setbtnLoading(true);
    try {
      console.log('payload ', payload);
      const response = await fetch(`${PaymentModesAPI}/${formData?._id}/update`, {
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
        toggle();
        toast.success('Successfully updated payment mode');
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setbtnLoading(false);
}
 
  const handleSwitchChange = (e) => {
    console.log('e?.target?.checked **', e?.target?.checked);
    setFormData((pre) => ({...pre, paymentEnabled: e?.target?.checked}));
  }

  const handleInputChanges = (e) => {
    const {name, value} = e?.target;
    setFormData((pre) => ({...pre, [name]: value}));
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
        handleSubmit(formData);
      }}>
        <div className="mb-1">
        <FormGroup>
            <Label htmlFor="validationCustom01" className="mb-1">{"Payment Name"}</Label>
            <InputGroup>
              <InputGroupText>💰</InputGroupText>
              <input
                className="form-control"
                defaultValue={formData?.paymentName}
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
                defaultValue={formData?.paymentKeyId}
                name="paymentKeyId"
                type="text"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder={`Payment KeyId`}
                required={true}
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
                defaultValue={`${formData?.paymentKeySecret}`}
                name="paymentKeySecret"
                type="text"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder="Payment Key Secret"
                required={true}
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
                defaultValue={formData?.paymentBase64Key}
                name="paymentBase64Key"
                type="text"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder={`Payment Base64Key`}
                required={true}
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
                defaultValue={`${formData?.paymentApiKey}`}
                name="paymentApiKey"
                type="text"
                onChange={(e) => {handleInputChanges(e)}}
                placeholder="Payment ApiKey"
                required={true}
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
