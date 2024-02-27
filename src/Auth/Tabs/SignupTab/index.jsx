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
import { Btn, H5, P, UL } from "../../../AbstractElements";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faAddressBook } from "@fortawesome/free-solid-svg-icons";

import {
  EmailAddress,
  LoginWithJWT,
  Password,
  SignUp,
} from "../../../Constant";
import FormHeader from "./FormHeader";
import SignupWith from "./SignupWith";
import appStore from "../../../Component/Live Chats/Client/AppStore";
import { PlanDetails } from "../../../api";
import CustomSpinner from "../../../CommonElements/CustomSpinner/CustomSpinner";
import isUrl from "is-url";
import OtpInput from "react-otp-input";
import { connectWithSocketIOServer } from "../../../Component/Live Chats/Client/wss";

const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/?].*)?$/;

const SignupTab = ({ selected }) => {
  // const [userData, setUserData] = useState({
  //   email: "",
  //   password: "",
  //   companyName: "",
  //   contact: "",
  //   websiteLink: "",
  //   planId: "",
  //   store: "",
  //   productList: "",
  // });
  const [userData, setUserData] = useState({
    email: "rohan.pawar@paraslabs.com",
    password: "12345",
    companyName: "Paras labs",
    contact: "8210880518",
    websiteLink: "https://developer.mozilla.org/",
    planId: "659e86c3a16b8e1e2307e950",
    store: "",
    productList: "",
    firstName: "asddasd",
    lastName: "dsadasd",
  });
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [clientIP, setClientIP] = useState("");
  const [planIds, setPlanIds] = useState([]);
  const [resendTrigger, setResendTrigger] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [orgID, setOrgID] = useState("");
  const isErrors = useRef(false);
  const history = useNavigate();
  const { setToken, setUserData: setUser, userData: userInfo, token: tokenInfo } = appStore.getState();

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setUserData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const userSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
      }),
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/sendOtp`,
        requestOptions
      );

      const resBody = await res.json();
      if (`${res.status}` === "200") {
        toast.success("OTP send successfully");
        setOrgID(resBody.id);
        setShowOTPModal(true);
        setLoading(false);
      } else {
        // toast.error(resBody?.error);
        console.log("err ", resBody?.error);
      }
    } catch (error) {
      // toast.error(error);
      console.log("err ", error);
    }
  };

  const formValidate = (e) => {
    e.preventDefault();
    // console.log("Website check -->", isUrl(userData?.websiteLink));

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
    } else if (!isUrl(userData?.websiteLink)) {
      errorsObj = { ...errorsObj, websiteLink: "Invalid website link!" };
    }
    if (Object.values(errorsObj).length > 0) {
      isErrors.current = Object.values(errorsObj).length > 0;
      setErrors(errorsObj);
    }
  };

  const getPlanIds = async () => {
    try {
      let result = await axios.get(PlanDetails);
      result?.data && setPlanIds([...result?.data]);
    } catch (error) {
      console.log("planIds fetch error", error);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...userData,
        otp: otp,
        id: orgID,
        ipAddress: clientIP,
      }),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/verifyOtp`,
        requestOptions
      );
      const resBody = await res.json();
      if (`${res.status}` === "201") {
        setLoading(false);
        setUserData((pre) => {
          for (let key in pre) {
            pre[key] = "";
          }
          return pre;
        });
        const { token, user } = resBody;
        if (token && user) {
          setToken(resBody.token);
          setUser(resBody.user);
          
          sessionStorage.setItem("token", resBody.token);
          sessionStorage.setItem("currentUser", JSON.stringify(resBody.user));


          history(`${process.env.PUBLIC_URL}/store`);
        }
        toast.success("User signedup successfully");
      } else if (res.status === 400) {
        setOtpError(resBody?.msg);
      } else {
        // toast.error(resBody?.error);
      }
    } catch (err) {
      console.log("err ", err);
      // toast.error(err);
    }
    setLoading(false);
  };

  const resendOTP = async () => {
    setResendTrigger(true);
    setOtp("");
    setOtpError(false);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: orgID,
      }),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/resendOtp`,
        requestOptions
      );

      const resBody = await res.json();
      if (`${res.status}` === "200") {
        setResendTrigger(false);
      }
    } catch (error) {
      console.log("err ", error);
    }
  };

  const connectSocketToServer = () => {
    connectWithSocketIOServer();
  }

  useEffect(() => {
    getPlanIds();
  }, []);

  useEffect(() => {
    const getIpAddress = async () => {
      await axios
        .get("https://api.ipify.org/?format=json")
        .then((resp) => {
          // console.log("GET IP ADDRESS:::", resp.data, resp.data.ip);
          setClientIP(resp.data.ip);
        })
        .catch((error) => console.log("GET IP ERROR", error));
    };

    getIpAddress();
    // console.log("clientIP", clientIP);
  }, [!clientIP]);

  return (
    <Fragment>
      {showOTPModal ? (
        <Col sm="10">
          <i
            class="icofont icofont-circled-left"
            style={{
              fontSize: "30px",
              cursor: "pointer",
              color: "var(--theme-default)",
            }}
            onClick={() => setShowOTPModal(false)}
          ></i>
        </Col>
      ) : (
        ""
      )}
      <Form
        className="theme-form login-form"
        onSubmit={(e) => {
          if (!showOTPModal) {
            formValidate(e);
            if (!isErrors.current) {
              userSignup(e);
            }
          } else {
            verifyOTP(e);
          }
        }}
      >
        <FormHeader
          selected={selected}
          text={
            showOTPModal
              ? "Please check your email for OTP"
              : "Welcome! crete a new account."
          }
          showOTPModal={showOTPModal}
        />
        {showOTPModal ? (
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col sm="12">
              <OtpInput
                value={otp}
                onChange={(e) => {
                  setOtp(e);
                  setOtpError(false);
                }}
                numInputs={4}
                renderSeparator={<span>-</span>}
                inputType="number"
                renderInput={(props) => (
                  <input id="otp" type="number" required {...props} />
                )}
                containerStyle={"otp-container"}
                inputStyle={"otp-input"}
              />
              {otpError ? (
                <p style={{ color: "red", fontSize: "12px" }}>{otpError}</p>
              ) : (
                ""
              )}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col sm="12" className="registration-form">
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
                  <Label className="fw-bolder mt-2 errTxt">
                    {errors?.email}
                  </Label>
                )}
              </FormGroup>
              <FormGroup className="m-0">
                <Label className="p-0 mb-1 mt-2">Contact</Label>
                <InputGroup>
                  <InputGroupText>
                    <FontAwesomeIcon
                      className="common-icons"
                      icon={faAddressBook}
                    />
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
              <FormGroup className="m-0 first-form-group">
                <Label className="p-0 mb-1 mt-2">Company Name</Label>
                <InputGroup>
                  <InputGroupText>
                    {/* <i class="icon-home"></i> */}
                    <FontAwesomeIcon
                      className="common-icons"
                      icon={faBuilding}
                    />
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
                    <i className="icon-link"></i>
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
              {/* </Col>
            <Col sm="6" md="6"> */}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        formValidate();
                        if (!isErrors.current) {
                          userSignup();
                        }
                      }
                    }}
                    placeholder="Plan ID"
                    required=""
                  >
                    <option value="">{"Select Plan ID"}</option>
                    {planIds.length > 0
                      ? planIds.map((plan, ind) => (
                          <option value={plan?._id}>{plan?.name}</option>
                        ))
                      : ""}
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
        )}

        <div class="w-60 my-4 d-flex justify-content-center align-items-center">
          <button
            className="w-100 btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CustomSpinner /> : showOTPModal ? "Confirm" : SignUp}
          </button>
        </div>
        {showOTPModal && !resendTrigger ? (
          <ResendCounter resendOTP={resendOTP} />
        ) : (
          ""
        )}

        {/* <FormPassword /> */}
        {/* <SignupWith /> */}
      </Form>
      <Copyright />
    </Fragment>
  );
};

const Copyright = () => {
  return (
    <P attrPara={{ className: "my-3 copyright-signup" }}>
      Copyright 2023 © Ulai.in{" "}
    </P>
  );
};

const ResendCounter = ({ resendOTP }) => {
  return (
    <p
      className="my-3 copyright-signup"
      style={{ cursor: "pointer", marginTop: "20px" }}
      onClick={() => resendOTP()}
    >
      Resend OTP
    </p>
  );
};

export default SignupTab;
