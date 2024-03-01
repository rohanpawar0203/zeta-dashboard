import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Media,
} from "reactstrap";
import { Btn, H4, Spinner } from "../../../AbstractElements";
import {
  EditProfile,
  Company,
  Username,
  UsersCountryMenu,
  AboutMe,
  UpdateProfile,
  FirstName,
  LastName,
  Address,
  EmailAddress,
  PostalCode,
  Country,
  City,
} from "../../../Constant";
import axios from "axios";
import { PlanDetails, User } from "../../../api";
import appStore from "../../Live Chats/Client/AppStore";
import { toast } from "react-toastify";

const EditMyProfile = () => {
  const userDetails = JSON.parse(sessionStorage.getItem("currentUser"));
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      companyName: userDetails.companyName,
      contact: userDetails.contact,
      planId: userDetails.planId,
      websiteLink: userDetails.websiteLink,
    },
  });


  const onEditSubmit = async (data) => {
    console.log('data', data);
    setLoading(true);
    try {
      const response = await fetch(`${User}/${userDetails._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          companyName: data.companyName,
          contact: data.contact,
          planId: data.planId ? data.planId : userDetails.planId,
          websiteLink: data.websiteLink,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        // console.log(response.ok);
        // console.log("onEditSubmitResponse", responseData);
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify(responseData.updateUser)
        );
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getPlans = async () => {
      try {
        const response = await fetch(PlanDetails, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        if (response.ok) {
          // console.log("resp", responseData);
          setPlans(responseData);
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadingPlans(false);
      }
      // toggle();
    };

    getPlans();
    console.log('plans =>', plans);
  }, []);

  // console.log("Plans", plans);

  return (
    <Fragment>
      <Form className="card" onSubmit={handleSubmit(onEditSubmit)}>
        <CardHeader className="pb-0">
          <H4 attrH4={{ className: "card-title mb-0" }}>{EditProfile}</H4>
          <div className="card-options">
            <a className="card-options-collapse" href="#javascript">
              <i className="fe fe-chevron-up"></i>
            </a>
            <a className="card-options-remove" href="#javascript">
              <i className="fe fe-x"></i>
            </a>
          </div>
        </CardHeader>
        <div style={{height: '50vh'}}>
        <CardBody>
        {
            loading ? 
            <div className="loader-box">
            <Spinner attrSpinner={{ className: 'loader-3' }} /> 
            </div> :
            <Row>
            <Col md="6">
              <FormGroup className="mb-3">
                <Label className="form-label" id="companyName">
                  Company Name
                </Label>
                <input
                  className="form-control"
                  name="companyName"
                  // defaultValue={userDetails.companyName}
                  type="text"
                  placeholder="Company"
                  disabled
                  // {...register("companyName", { required: false })}
                />
                <span style={{ color: "red" }}>
                  {errors.companyName && "Company is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                {" "}
                <Label className="form-label">{EmailAddress}</Label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  // defaultValue={userDetails.email}
                  placeholder="Email"
                  disabled
                  // {...register("email", { required: false })}
                />
                <span style={{ color: "red" }}>
                  {errors.email && "EmailAddress is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                <Label className="form-label">{FirstName}</Label>
                <input
                  className="form-control"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  // defaultValue={userDetails.firstName}
                  {...register("firstName", { required: true })}
                />
                <span style={{ color: "red" }}>
                  {errors.firstName && "FirstName is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                <Label className="form-label">{LastName}</Label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  // defaultValue={userDetails.lastName}
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                />
                <span style={{ color: "red" }}>
                  {errors.lastName && "LastName is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                <Label className="form-label">Phone Number</Label>
                <input
                  className="form-control"
                  type="text"
                  name="contact"
                  placeholder="Phone Number"
                  // value={userDetails.contact}
                  // defaultValue={userDetails.contact}
                  disabled
                  // {...register("contact", { 
                    // required: false ,
                    // pattern: {
                    //   value: /^(0|91)?[6-9][0-9]{9}$/,
                    //   message: 'Invalid email address',
                    // }
                  // }
                  // )}
                />
                <span style={{ color: "red" }}>
                  {errors.contact && "contact is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                <Label className="form-label">Domain</Label>
                <input
                  className="form-control"
                  name="websiteLink"
                  type="url"
                  placeholder="Website"
                  // defaultValue={userDetails.websiteLink}
                  disabled 
                />
                <span style={{ color: "red" }}>
                  {errors.websiteLink && "Domain is required"}{" "}
                </span>
              </FormGroup>
            </Col>
            {loadingPlans ? (
              <p>Loading plans...</p>
            ) : (
              <Col md="12">
                <FormGroup>
                  <Label className="form-label">Plan</Label>
                  <select
                    id="exampleSelect"
                    name="planId"
                    className="form-control"
                    defaultValue={plans.find((plan) => (plan?._id === userDetails['planId']))?.name}
                    {...register("planId", { required: true })}
                  >
                    {plans &&
                      plans.map((plan) => {
                        return <option key={plan._id} value={plan._id}>{plan.name}</option>;
                      })}
                  </select>
                  <span style={{ color: "red" }}>
                    {errors.planId && "Plan is required"}{" "}
                  </span>
                </FormGroup>
              </Col>
            )}
          </Row>
          }
          
        </CardBody>
        </div>
        {!loading && (
        <CardFooter className="text-end">
        <Btn attrBtn={{ color: "primary", type: "submit" }}>
          {UpdateProfile}
        </Btn>
      </CardFooter>
        )}
      </Form>
    </Fragment>
  );
};
export default EditMyProfile;
