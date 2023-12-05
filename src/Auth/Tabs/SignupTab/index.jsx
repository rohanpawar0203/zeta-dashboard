import React, { useState, Fragment, useRef, useEffect } from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { Btn, H5, UL } from "../../../AbstractElements";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  EmailAddress,
  LoginWithJWT,
  Password,
  SignUp,
} from "../../../Constant";
import { handleResponse } from "../../../Services/Fack.Backend";
import FormHeader from "./FormHeader";
import SignupWith from "./SignupWith";
import appStore from "../../../Component/Live Chats/Client/AppStore";
import axios from "axios";
import { PlanDetails } from "../../../api";

const SignupTab = ({ selected }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    companyName: "",
    contact: "",
    websiteLink: "",
    planId: "",
    store: "",
    productList: "",
  });
   const [planIds, setPlanIds] = useState([])
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const isErrors = useRef(false);
  const history = useNavigate();
  const { setToken, setUserData: setUser} = appStore();
  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setUserData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const userSignup = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData }),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        requestOptions
      );
      const resBody = await res.json();
      const { token, user } = resBody;
      if (`${res.status}` === "200") {
        setLoading(false);
        setUserData((pre) => {
          for (let key in pre) {
            pre[key] = "";
          }
          return pre;
        });
        if (token && user) {
          setToken(resBody.token);
          setUser(resBody.user);
          sessionStorage.setItem("token", resBody.token);
          sessionStorage.setItem("currentUser", JSON.stringify(resBody.user));
          history(`${process.env.PUBLIC_URL}/store`);
        }
        toast.success("User signedup successfully");
      } else {
        toast.error(resBody?.error);
      }
    } catch (err) {
      console.log('err ', err)
      toast.error(err);
    }
    setLoading(false);
  };
  const formValidate = () => {
    isErrors.current = false;
    setErrors({});
    let errorsObj = {};
    if (!userData?.email) {
      errorsObj = { email: "Email ID is required!" };
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData?.email)
    ) {
      errorsObj = { email: "Invalid Email ID!" };
    }
    if (!userData?.password) {
      errorsObj = { ...errorsObj, password: "Password is required!" };
    }
    if (!userData?.firstName) {
      errorsObj = { ...errorsObj, firstName: "User Name is required!" };
    }
    if (!userData?.lastName) {
      errorsObj = { ...errorsObj, lastName: "User Name is required!" };
    }
    if (!userData?.planId) {
      errorsObj = { ...errorsObj, planId: "Plan ID is required!" };
    }
    if (!userData?.companyName) {
      errorsObj = { ...errorsObj, companyName: "Company Name is required!" };
    }
    if (!userData?.contact) {
      errorsObj = { ...errorsObj, contact: "Contact Number is required!" };
    } else if (!/^(0|91)?[6-9][0-9]{9}$/.test(userData?.contact)) {
      errorsObj = { ...errorsObj, contact: "Invalid Contact Number!" };
    }
    if (!userData?.websiteLink) {
      errorsObj = { ...errorsObj, websiteLink: "Company Website is required!" };
    } else if (
      !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
        userData?.websiteLink
      )
    ) {
      errorsObj = { ...errorsObj, websiteLink: "Invalid website link!" };
    }
    if (Object.values(errorsObj).length > 0) {
      isErrors.current = Object.values(errorsObj).length > 0;
      setErrors(errorsObj);
    }
  };

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
  
  return (
    <Fragment>
      <Form className="theme-form login-form">
        <FormHeader selected={selected} />
            <Row>
            <Col sm="6" md="6">
            <FormGroup className="m-0 first-form-group">
              <Label className="p-0 mb-1 mt-2">First Name</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
                <Input
                  name="firstName"
                  className="form-control"
                  type="text"
                  onChange={(e) => handleFormChange(e)}
                  placeholder="First Name"
                  required=""
                />
              </InputGroup>
              {errors.firstName && (
                <Label className="fw-bolder mt-2 errTxt">
                  {errors?.firstName}
                </Label>
              )}
            </FormGroup>
            <FormGroup className="m-0 first-form-group">
              <Label className="p-0 mb-1 mt-2">Company Name</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="icon-email"></i>
                </InputGroupText>
                <Input
                  name="companyName"
                  className="form-control"
                  type="text"
                  onChange={(e) => handleFormChange(e)}
                  placeholder="Company Name"
                  required=""
                />
              </InputGroup>
              {errors.companyName && (
                <Label className="fw-bolder mt-2 errTxt">
                  {errors?.companyName}
                </Label>
              )}
            </FormGroup>
            <FormGroup className="m-0">
              <Label className="p-0 mb-1 mt-2">{Password}</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
                <Input
                  className="form-control"
                  name="password"
                  type={togglePassword ? "text" : "password"}
                  onChange={(e) => handleFormChange(e)}
                  placeholder="Password"
                  required=""
                />
                <div
                  className="show-hide"
                  onClick={() => setTogglePassword(!togglePassword)}
                >
                  <span className={togglePassword ? "Hide" : "show"}></span>
                </div>
              </InputGroup>
              {errors.password && (
                <Label className="fw-bolder mt-2 errTxt">
                  {errors?.password}
                </Label>
              )}
            </FormGroup>
            <FormGroup className="m-0">
              <Label className="p-0 mb-1 mt-2">Website Link</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="icon-email"></i>
                </InputGroupText>
                <Input
                  name="websiteLink"
                  className="form-control"
                  type="url"
                  onChange={(e) => handleFormChange(e)}
                  placeholder="Website URL"
                  required=""
                />
              </InputGroup>
              {errors.websiteLink && (
                <Label className="fw-bolder mt-2 errTxt">
                  {errors?.websiteLink}
                </Label>
              )}
            </FormGroup>
            </Col>
            <Col sm="6" md="6">
            <FormGroup className="m-0 first-form-group">
              <Label className="p-0 mb-1 mt-2">Last Name</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
                <Input
                  name="lastName"
                  className="form-control"
                  type="text"
                  onChange={(e) => handleFormChange(e)}
                  placeholder="Last Name"
                  required=""
                />
              </InputGroup>
              {errors.lastName && (
                <Label className="fw-bolder mt-2 errTxt">
                  {errors?.lastName}
                </Label>
              )}
            </FormGroup>
            <FormGroup className="m-0">
              <Label className="p-0 mb-1 mt-2">{EmailAddress}</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="icon-email"></i>
                </InputGroupText>
                <Input
                  className="form-control"
                  type="email"
                  name="email"
                  required=""
                  onChange={(e) => handleFormChange(e)}
                  placeholder="Email Address"
                />
              </InputGroup>
              {errors.email && (
                <Label className="fw-bolder mt-2 errTxt">{errors?.email}</Label>
              )}
            </FormGroup>
            <FormGroup className="m-0">
              <Label className="p-0 mb-1 mt-2">Contact</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="icon-email"></i>
                </InputGroupText>
                <Input
                  name="contact"
                  className="form-control"
                  type="text"
                  onChange={(e) => handleFormChange(e)}
                  placeholder="Contact Number"
                  required=""
                />
              </InputGroup>
              {errors.contact && (
                <Label className="fw-bolder mt-2 errTxt">
                  {errors?.contact}
                </Label>
              )}
            </FormGroup>
            <FormGroup className="m-0">
              <Label className="p-0 mb-1 mt-2">Plan ID</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="icon-key"></i>
                </InputGroupText>
                <Input
                  name="planId"
                  className="form-control"
                  type="select"
                  onChange={(e) => handleFormChange(e)}
                  placeholder="Plan ID"
                  required=""
                >
                  <option value="">{"Select Plan ID"}</option>
                  {(planIds.length > 0) ? 
                   planIds.map((plan, ind) => (
                    <option value={plan?._id}>{plan?.name}</option>
                   )) : ''
                  }
                </Input>
              </InputGroup>
              {errors.planId && (
                <Label className="fw-bolder mt-2 errTxt">
                  {errors?.planId}
                </Label>
              )}
            </FormGroup>
            </Col>
            </Row>
           
           
        <div class="w-100 mt-4 d-flex justify-content-center align-items-center">
          <button
            onClick={(e) => {
              formValidate();
              if (!isErrors.current) {
                userSignup();
              }
            }}
            className="w-100 btn btn-primary"
            type="button"
          >
            {loading ? "LOADING..." : SignUp}
          </button>
        </div>

        {/* <FormPassword /> */}
        <SignupWith />
      </Form>
    </Fragment>
  );
};

export default SignupTab;
