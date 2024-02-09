import React, { Fragment, useState } from 'react'
import { Card, CardBody, Col, Container, Form, Input, Label, Row } from 'reactstrap';
import { Btn, H4, Image } from '../../AbstractElements';
import ScrollBar from "react-perfect-scrollbar";
import appStore from '../Live Chats/Client/AppStore';
import axios from 'axios';
import { TicketsAPI } from '../../api';
import { FaRegEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import {v4 as uuid4} from 'uuid';

const styles={
  colorPicker: {width: '75px', height: '35px', padding: '5px', cursor: 'pointer'},
}

const Customization = () => {
  const [formData, setformData] = useState({
    "chatButtonSetting": {
      "backgroundColor": "",
      "ctaText": "",
      "borderRadius": "",
      "marginLeft": "",
      "marginRight": "",
      "marginBottom": "",
      "ctaIconWATI": false
  },
  "brandSetting": {
      "brandName": "",
      "brandSubTitle": "",
      "brandImg": "",
      "welcomeText": "",
      "messageText": "",
      "backgroundColor": "",
      "ctaText": "",
      "autoShow": false
  }
  });
  const {userData, token} = appStore();
  const [loading, setLoading] = useState(false);
  const [chatIcon, setchatIcon] = useState('');

  const rawFormData = {
    "chatButtonSetting": {
        "backgroundColor": "",
        "ctaText": "",
        "borderRadius": "",
        "marginLeft": "",
        "marginRight": "",
        "marginBottom": "",
        "ctaIconWATI": false,
        "position": "right"
    },
    "brandSetting": {
        "brandName": "",
        "brandSubTitle": "",
        "brandImg": "",
        "welcomeText": "",
        "messageText": "",
        "backgroundColor": "",
        "ctaText": "",
        "autoShow": false
    }
}

  const getWidgetDetails = async() => {
    setLoading(true);
    try {
      const res = await axios.get(`${TicketsAPI}/${userData._id}/organization`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      // console.log('tickets ', data);
    } catch (error) {
      console.log('getWidgetDetails -> error ->', error);
    }
    setLoading(false);
  }

  const updateWidget = async() => {
    setLoading(true);
    try {
      const res = await axios.patch(`${TicketsAPI}/${userData._id}/organization`, {
        body: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      // console.log('tickets ', data);
    } catch (error) {
      console.log('getWidgetDetails -> error ->', error);
    }
    setLoading(false);
  }

  const handleChanges = (section, name, value) => {
    console.log('formdata -->', formData)
    setformData((pre) => ({...pre, [section]: {...pre[section], [name]: value}}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData', formData);
  }
  
  return (
    <Fragment>
    <Container className="h-100" fluid={true}>
      {/* <Row> */}
      <Col sm="12 h-100">
        <Card className="shadow-none h-100">
          {/* <CardHeader className="p-0 m-0 mt-2">
            <H5 attrH5={{ className: "my-0 mt-2" }}>{"Customize Bot"}</H5>
          </CardHeader> */}
          <CardBody>
            <Fragment> 
              <Form onSubmit={(e) => {handleSubmit(e)}}
                className="needs-validation "
                noValidate="" style={{height: '100%'}}>
                {/* <ScrollBar> */}
                <H4>Chat Button Settings</H4>
                <Row>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Text"}
                    </Label>
                    <input 
                      className="form-control"
                      name="ctaText"
                      type="text"
                      defaultValue={formData?.chatButtonSetting?.ctaText}
                      onChange={(e)=> {
                        const {name, value} = e.target;
                        handleChanges('chatButtonSetting', name, value)
                      }}
                      placeholder="Introduction text..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Position"}
                    </Label>
                    <select className="form-control"
                      name="position"
                      value={formData?.chatButtonSetting?.position}
                      placeholder="Position..."
                      onChange={(e)=> {
                        const {name, value} = e.target;
                        handleChanges('chatButtonSetting', name, value)
                      }}
                      required={true}>
                      <option key={uuid4()} value="">Select Position</option>
                        <option key={uuid4()} value={'left'}>{'Left'}</option>
                        <option key={uuid4()} value={'right'}>{'Right'}</option>
                    </select>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='2' sm='6'>
                    <Label htmlFor="validationCustom01">{"Background Color"}</Label>
                    <input 
                      className="form-control"
                      name="backgroundColor"
                      style={styles['colorPicker']}
                      type="color"
                      defaultValue={formData?.chatButtonSetting?.backgroundColor || "#e66465"}
                      onChange={(e)=> {
                        const {name, value} = e.target;
                        handleChanges('chatButtonSetting', name, value)
                      }}
                      placeholder="background color..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
                <H4>Brand Settings</H4>
                <Row>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom01">{"Name"}</Label>
                    <input
                      className="form-control"
                      name="brandName"
                      type="text"
                      defaultValue={formData?.brandSetting?.brandName}
                      onChange={(e)=> {
                        const {name, value} = e.target;
                        handleChanges('brandSetting', name, value)
                      }}
                      placeholder="Name..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Sub Title"}
                    </Label>
                    <input
                      className="form-control"
                      name="brandSubTitle"
                      onChange={(e)=> {
                        const {name, value} = e.target;
                        handleChanges('brandSetting', name, value)
                      }}
                      defaultValue={formData?.brandSetting?.brandSubTitle}
                      type="text"
                      placeholder="Sub title..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom01">{"Welcome Text"}</Label>
                    <input 
                      className="form-control"
                      name="welcomeText"
                      type="text"
                      onChange={(e)=> {
                        const {name, value} = e.target;
                        handleChanges('brandSetting', name, value)
                      }}
                      defaultValue={formData?.brandSetting?.welcomeText}
                      placeholder="Welcome text..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Message Text"}
                    </Label>
                    <input
                      className="form-control"
                      name="messageText"
                      type="text"
                      onChange={(e)=> {
                        const {name, value} = e.target;
                        handleChanges('brandSetting', name, value)
                      }}
                      defaultValue={formData?.brandSetting?.messageText}
                      placeholder="Message text..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom01">{"Text Info"}</Label>
                    <input 
                      className="form-control"
                      name="ctaText"
                      onChange={(e)=> {
                        const {name, value} = e.target;
                        handleChanges('brandSetting', name, value)
                      }}
                      type="text"
                      defaultValue={formData?.brandSetting?.ctaText}
                      placeholder="Text info..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Background Color"}
                    </Label>
                    <input 
                      className="form-control"
                      name="backgroundColor"
                      style={styles['colorPicker']}
                      type="color"
                      onChange={(e)=> {
                        const {name, value} = e.target;
                        handleChanges('brandSetting', name, value)
                      }}
                      defaultValue={formData?.brandSetting?.backgroundColor || "#f6b73c"}
                      placeholder="Background color..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='1' sm='6'>
                  </Col>
                </Row>
                <Row>
                <div className="d-flex w-100 h-100 align-items-end">
                  <div className="checkbox" style={{paddingLeft: '5px'}}>
                    <Input style={{border: '1px solid skyblue'}} 
                      name="autoShow"
                      id={"checkboxAutoShow"}
                      type="checkbox"
                      onChange={(e)=> {
                        const {name, checked} = e.target;
                        handleChanges('brandSetting', name, checked)
                      }}
                      defaultChecked={formData?.brandSetting?.autoShow}
                      required={true}
                    />
                    <Label style={{ fontWeight: "600", fontSize: '16px'}} for={"checkboxAutoShow"}>
                      {"Autoshow"}
                    </Label>
                  </div>
                    <div className="valid-feedback">{"Looks good!"}</div>
                    </div>
                </Row>
                <Btn attrBtn={{ color: "primary" }}>{"Submit"}</Btn>
                {/* </ScrollBar> */}
              </Form>
            </Fragment>
          </CardBody>
        </Card>
      </Col>
      {/* </Row> */}
    </Container>
  </Fragment>
  )
}

export default Customization