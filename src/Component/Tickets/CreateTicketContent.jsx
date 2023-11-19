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
  Textarea,
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
import { AgentAPI, TicketsAPI } from "../../api";
import AutomaiteBackend from "../Agents/components/automaiteBackend";



const CreateTicketContent = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({});
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const intialPayload = {
    userId: user?._id,
    email: "",
    subject: "",
    query: "",
    screenShot: "",
  };
  const [payload, setPayload] = useState(intialPayload);

  const onSubmit = data => {
    if (data !== '') {
      createTicket({...payload, ...data, userId: user?._id});
    } else {
      errors.showMessages();
    }
  };

  const generateImageUrl = async (img) => {
    console.log(img.size);
    if (img.size > 200000) {
      toast({
        description: "Image is larger than 200kb",
        status: "error",
        duration: 4500,
        position: "top",
        isClosable: "true",
      });
      return;
    }
    if (!img) return;
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = function (e) {
      setPayload((pre) => ({...pre, screenShot: reader.result || ""}))
    };
  };

  const createTicket = async (value) => {
    try {
      let data = JSON.stringify(value);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${TicketsAPI}`,
        headers: {
          Authorization:
            `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios.request(config);
      reset();
      setPayload(intialPayload)
      toast.success("Ticket Created successfully");
    } catch (error) {
      toast.error("Something went wrong");
      toast.error(`${error.response.data.error}`);
      console.log("error", error.response.data);
    }
  };

  return (
    <Fragment>
      <Container fluid={true} className="mt-2 d-flex justify-content-center">
        <Col sm='8'>
      <Card style={{height: '80vh', width: '100%', margin: '0 auto'}}>
      <CardHeader className='pb-0'>
          <H5>{'Create Ticket'}</H5>
        </CardHeader>
      <CardBody>
        <Row>
          <Form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup >
            <Label>{'Email address *'}</Label>
            <input className="form-control" name="email" type="email" placeholder="Email Address" {...register('email', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.email && '* Email Address is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Subject *'}</Label>
            <input className="form-control" name="subject" type="text" placeholder="Subject" {...register('subject', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.subject && '* Subject is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Query Details *'}</Label>
            <Textarea className="form-control" name="query" type="text" placeholder="Query" {...register('query', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.query && '* Query Details is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Attach Screenshot if any'}</Label>
            <input className="form-control" name="screenShot" placeholder="Screenshot" 
            type="file"
            accept="image/*"
            onChange={(e) => generateImageUrl(e.target.files[0])}/>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <Btn attrBtn={{ color: 'primary' }}>{'Create Ticket'}</Btn>
      </Form>
        </Row>
        </CardBody>
      </Card>
      </Col>
      </Container>
    </Fragment>
  );
};
export default CreateTicketContent;
