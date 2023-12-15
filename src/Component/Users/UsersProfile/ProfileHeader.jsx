import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { H4, H6, LI, UL, Image } from "../../../AbstractElements";
import Img from "../../../assets/images/user-profile/bg-profile.jpg";
import axios from "axios";
import { PlanDetails } from "../../../api";

const ProfileHeader = () => {
  const [planIds, setPlanIds] = useState([])
  const [plan, setPlan] = useState('');
  const userDetails = JSON.parse(sessionStorage.getItem("currentUser"));

  const getPlanIds = async() => {
    try {
        let result = await axios.get(PlanDetails);
        result?.data && setPlanIds([...result?.data]);
    } catch (error) {
        console.log('planIds fetch error', error);
    }
  }
  useEffect(() => {
    getPlanIds();
  }, [])

  useEffect(() => {
    if(planIds.length){
      let planFiltered = planIds.find((planItem) => (planItem?._id === userDetails.planId));
      setPlan(planFiltered?.name);
      // console.log('plan  ', plan);
    }
  }, [planIds])
  
  return (
    <Fragment>
      <Container fluid={true}>
      <Row>
      <Col>
        <Card
          className="profile-header bg-image"
          style={{
            backgroundImage: `url(${Img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "block",
          }}
        >
          <div className="profile-img-wrrap">
            <Image
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "block",
              }}
              attrImage={{
                className: "img-fluid bg-img-cover",
                src: `${require("../../../assets/images/user-profile/bg-profile.jpg")}`,
                alt: "",
              }}
            />
          </div>
          <div className="userpro-box">
            <div className="img-wrraper">
              <div className="avatar">
                <Image
                  attrImage={{
                    className: "img-fluid",
                    alt: "",
                    src: `${require("../../../assets/images/user/7.jpg")}`,
                  }}
                />
              </div>
              <Link
                className="icon-wrapper"
                to={`${process.env.PUBLIC_URL}/users/useredit`}
              >
                <i className="icofont icofont-pencil-alt-5"></i>
              </Link>
            </div>
            <div className="user-designation">
              <div className="title">
                <a target="_blank" href="#javascript">
                  <H4>{userDetails.companyName}</H4>
                  <H6>{userDetails.email}</H6>
                </a>
              </div>
              <div>
             
            </div>
            </div>
          </div>
        </Card>
        </Col>
        {/* <Col sm="6">
        <Card >
          <Fragment>
      <CardBody>
        <Form className="theme-form">
          <FormGroup className="row">
            <Label className="col-sm-3 col-form-label" htmlFor="inputEmail3">{'First Name'}</Label>
            <Col sm="9">
              <Input className="form-control" type="text" value={userDetails?.firstName} disabled/>
            </Col>
          </FormGroup>
          <FormGroup className="row">
            <Label className="col-sm-3 col-form-label" htmlFor="inputPassword3">{'Last Name'}</Label>
            <Col sm="9">
              <Input className="form-control" type="text" value={userDetails?.lastName} disabled/>
            </Col>
          </FormGroup>
          <FormGroup className="row">
            <Label className="col-sm-3 col-form-label" htmlFor="inputPassword3">{'Company name'}</Label>
            <Col sm="9">
              <Input className="form-control" type="text" value={userDetails?.companyName} disabled/>
            </Col>
          </FormGroup>
          <FormGroup className="row">
            <Label className="col-sm-3 col-form-label" htmlFor="inputPassword3">{'Email ID'}</Label>
            <Col sm="9">
              <Input className="form-control" type="text" value={userDetails?.email}  disabled/>
            </Col>
          </FormGroup>
          <FormGroup className="row">
            <Label className="col-sm-3 col-form-label" htmlFor="inputPassword3">{'Contact'}</Label>
            <Col sm="9">
              <Input className="form-control" type="text" value={userDetails?.contact}  disabled/>
            </Col>
          </FormGroup>
          <FormGroup className="row">
            <Label className="col-sm-3 col-form-label" htmlFor="inputPassword3">{'Plan'}</Label>
            <Col sm="9">
              <Input className="form-control" type="text" value={plan}  disabled/>
            </Col>
          </FormGroup>
          <FormGroup className="row">
            <Label className="col-sm-3 col-form-label">{'Domain'}</Label>
            <Col sm="9">
              <Input className="form-control" type="url" value={userDetails?.websiteLink} disabled/>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Fragment>
        </Card>
      </Col> */}
      </Row>
      </Container>
    </Fragment>
  );
};
export default ProfileHeader;
