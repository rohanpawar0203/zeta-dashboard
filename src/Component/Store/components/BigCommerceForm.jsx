import React, { Fragment } from 'react'
import { Col, Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Container, Card, CardHeader, CardBody } from 'reactstrap';
import { H4, H6, LI, P, UL, Image, H5, Btn } from "../../../AbstractElements";
const BigCommerceForm = ({errors, register}) => {
  return (
    <>
         <Row>
          <Col md="8 mb-3">
            {<H4>Enter Your Storehash</H4>}
            <input className="form-control" name="storeHash" type="text" placeholder="storehash" {...register('storeHash', { required: true })}/>
            <span>{errors.storeHash && '*storeHash is Required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </Col>
        </Row>
        <Row>
        <Col md="8 mb-3">
            {<H4>Enter Your xAuthToken</H4>}
            <input className="form-control" name="xAuthToken" type="text" placeholder="xAuthToken" {...register('xAuthToken', { required: true })} />
            <span>{errors.xAuthToken && '*Auth Token is Required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </Col>
        </Row>
    </>
  )
}

export default BigCommerceForm