import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row, CardHeader } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, H3, H1, Btn } from "../../AbstractElements";
import errorImg from "../../assets/images/search-not-found.png";
import TurnoverChart from "../Widgets/ChartsWidgets/TurnoverChart";
import {
  AddNew,
  AllFiles,
  Files,
  Folders,
  RecentlyOpenedFiles,
} from "../../Constant";
import {
  BoxSvg,
  BoxSvg1,
  CancelledSvg,
  CancelledSvg1,
  DollerSvg,
  MessageSvg,
  NewUsersSvg,
  PendingSvg,
  PendingSvg1,
  ProductSvg,
  TruckSvg,
  TruckSvg1,
} from "../Widgets/SvgIcons";
import {BsCheckCircle} from 'react-icons/bs'
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
import { AgentAPI } from "../../api";
import AutomaiteBackend from "../Agents/components/automaiteBackend";



const BotContent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({});
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const token = sessionStorage.getItem("token");
  const history = useNavigate();

  const onSubmit = data => {
    if (data !== '') {
      createAgent({...data, userId: user?._id,});
    } else {
      errors.showMessages();
    }
  };

  const createAgent = async (value) => {
    try {
      let data = JSON.stringify(value);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${AgentAPI}/add`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios
        .request(config)
        .then(async (response) => {
          toast.success("Registered successfully");
          // const resp = await AutomaiteBackend.get(`/agent/${user._id}`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // });
          history(`${process.env.PUBLIC_URL}/agents`);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      toast.error("Something went wrong");
      toast.error(`${error.response.data.error}`);
    }
  };

  return (
    <Fragment>
      <Container fluid={true} className="mt-2 d-flex justify-content-center">
        <Col sm='8'>
      <Card style={{height: '80vh', width: '100%', margin: '0 auto'}}>
      <CardHeader className='pb-0'>
          <H5>{'Create New Agent'}</H5>
        </CardHeader>
      <CardBody>
        <Row>
          <Form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup >
            <Label>{'Agent Name *'}</Label>
            <input className="form-control" name="name" type="text" placeholder="Agent Name" {...register('name', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.name && '* Agent Name is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Email address *'}</Label>
            <input className="form-control" name="email" type="text" placeholder="Email Address" {...register('email', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.email && '* Email Address is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Password *'}</Label>
            <input className="form-control" name="password" type="password" placeholder="Password" {...register('password', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.password && '* Password is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <Btn attrBtn={{ color: 'primary' }}>{'Create Agent'}</Btn>
      </Form>
        </Row>
        </CardBody>
      </Card>
      </Col>
      </Container>
    </Fragment>
  );
};
export default BotContent;
