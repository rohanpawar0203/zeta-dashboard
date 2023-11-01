import React, { Fragment } from 'react'
import { Col, Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Container, Card, CardHeader, CardBody } from 'reactstrap';
import { H4, H6, LI, P, UL, Image, H5, Btn } from "../../../AbstractElements";
const ShopifyForm = ({errors, register}) => {
  return (
    <>
         <Row>
          <Col md="8 mb-3">
            {<H4>Enter Your Shop Name</H4>}
            <input className="form-control" name="shopName" type="text" placeholder="Shop Name" {...register('shopName', { required: true })}/>
            <span>{errors.shopName && '*Shop Name is Required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </Col>
        </Row>
        <Row>
        <Col md="8 mb-3">
            {<H4>Enter Your xAuthToken</H4>}
            <input className="form-control" name="lastName" type="text" placeholder=" xAuthToken" {...register('authToken', { required: true })} />
            <span>{errors.authToken && '*Auth Token is Required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </Col>
        </Row>
    </>
  )
}

export default ShopifyForm