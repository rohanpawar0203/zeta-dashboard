import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row, CardHeader } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, H3, H1, Btn, Spinner } from "../../AbstractElements";
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
import TicketsList from "./TicketsList";
import ScrollBar from "react-perfect-scrollbar";
import DynPagination from "../../CommonElements/DynamicPagination/DynPagination";



const CreateTicketContent = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({});
  const [tickets, seTickets] = useState([])
  const [mode, setMode] = useState('');
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const token = sessionStorage.getItem("token");
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
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
    // console.log(img.size);
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
    setLoading(true);
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
      let response = await axios.request(config);
      // console.log('response ', response);
      if(response.status === 200 || response.status === '200'){
        setMode('');
        reset();
        setPayload(intialPayload)
        toast.success("Ticket Created successfully");
      } 
    } catch (error) {
      toast.error("Something went wrong");
      toast.error(`${error.response.data.error}`);
      console.log("error", error.response.data);
    }
    setLoading(false);
  };

  const fetchTicketsData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${TicketsAPI}/${user._id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      // console.log('res ', res);
      seTickets(data);
    } catch (error) {
      toast(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTicketsData();
  }, [])
  

  return (
    <Fragment>
      <Container fluid={true} className="mt-2 d-flex justify-content-center">
        { mode === 'create' ?
        <Col sm='8' md='6' lg='6'>
        <Card style={{width: '100%'}} className="mt-2">
        <CardHeader className='w-100 pb-0'>
            <H5>{'Create Ticket'}</H5>
          </CardHeader>
          {
            loading ? 
            <div className="loader-box">
            <Spinner attrSpinner={{ className: 'loader-3' }} /> 
            </div> :
              <ScrollBar>
            <CardBody style={{height: '60vh', padding: '15px 35px 20px'}}>
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
              <div className='d-flex gap-4 align-items-center justify-content-start'>
              <Btn attrBtn={{ color: 'primary', type: 'submit'}}>{'Create Ticket'}</Btn>
              <Btn attrBtn={{ color: 'danger', onClick: () => {setMode('')}}}>{'Cancel'}</Btn>
              </div>
          </Form>
            </Row>
            </CardBody>
            </ScrollBar>
          }
        
        </Card>
        </Col> :
        <>
        <TicketsList setMode={setMode}/>
        </>
        
      }
      </Container>
    </Fragment>
  );
};
export default CreateTicketContent;


