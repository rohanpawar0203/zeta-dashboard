import React, { Fragment } from 'react';
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import { Col, Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Row } from 'reactstrap';

const PaymentModesForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handlePaymentModeCreation = (data, event) => {
      event.preventDefault();
      console.log('data', data);
      if (data !== '') {
        console.log('data', data);
        // alert('You submitted the form and stuff!');
      } else {
        errors.showMessages();
      }
    };
    return (
      <Fragment>
        {/* <Form className="needs-validation mb-2" noValidate="" onSubmit={handleSubmit(handlePaymentModeCreation)}> */}
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
            {/* <Col md="3 mb-3">
              <Label htmlFor="validationCustom05">Zip</Label>
              <input className="form-control" id="validationCustom05" name="zip" type="text" placeholder="Zip" {...register('zip', { required: true })} />
              <span >{errors.zip && 'Please provide a valid zip.'}</span>
              <div className="invalid-feedback">{'Please provide a valid zip.'}</div>
            </Col> */}
          </Row>
          {/* <FormGroup>
            <div className="form-check">
              <div className="checkbox p-0">
                <Input className="form-check-input" id="invalidCheck" type="checkbox" />
                <Label className="form-check-label" htmlFor="invalidCheck">{'Agree to terms and conditions'}</Label>
              </div>
              <div className="invalid-feedback">{'You must agree before submitting.'}</div>
            </div>
          </FormGroup> */}
          
          {/* <input type="submit" className='btn btn-primary' value='Submit'/> */}
        {/* </Form> */}
      </Fragment>
    );
}

export default PaymentModesForm