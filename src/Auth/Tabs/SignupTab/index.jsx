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
import {
  faBuilding,
  faAddressBook,
  faL,
} from "@fortawesome/free-solid-svg-icons";

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

const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/?].*)?$/;

const SignupTab = ({ selected }) => {
  const [otp, setOtp] = useState("");
  const [otpTokenId, setOtpTokenId] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    companyName: "",
    contact: "",
    websiteLink: "",
    planId: "",
    store: "",
    productList: "",
    ipAddress: "",
  });
  const [planIds, setPlanIds] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const isErrors = useRef(false);
  const history = useNavigate();
  const { setToken, setUserData: setUser } = appStore();
  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setUserData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios(`${process.env.REACT_APP_API_BASE_URL}/auth/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ email: userData.email }),
      })
        .then((resp) => {
          setLoading(false);
          setShowOtp(true);
          setOtpTokenId(resp.data.id);
        })
        .catch((error) => {
          console.log("verifyEmail", error);
          toast.error(error);
        });
    } catch (error) {
      console.log("verifyEmail", error);
      toast.error(error);
    }
  };
  const userSignup = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: otpTokenId, otpTokenId, ...userData }),
    };
    try {
      const res = await fetch(
        // `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        `${process.env.REACT_APP_API_BASE_URL}/auth/verifyOtp`,
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
        toast.success("User registerd");
      } else {
        toast.error(resBody?.error);
      }
    } catch (err) {
      console.log("err ", err);
      setOtpError(err);
      // toast.error(err);
    }
    setLoading(false);
  };

  const resendOTP = async () => {
    try {
      const payload = JSON.stringify({
        id: otpTokenId,
      });
      await axios(`${process.env.REACT_APP_API_BASE_URL}/auth/resendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: payload,
      }).then((resp) => {
        console.log("resendOTP", resp);
      });
    } catch (error) {
      console.log("resendOTP", error);
    }
  };

  const formValidate = () => {
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
  useEffect(() => {
    getPlanIds();
    axios.get("https://geolocation-db.com/json/").then((res) => {
      // console.log(res);
      setUserData((prevValues) => ({
        ...prevValues,
        ipAddress: res.data.IPv4,
      }));
    });
  }, []);

  return (
    <Fragment>
      {showOtp && (
        <i
          className="fa fa-chevron-circle-left"
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={() => setShowOtp(false)}
        ></i>
      )}

      <Form className="theme-form login-form">
        <FormHeader
          selected={selected}
          content={
            showOtp
              ? `Please enter the otp send on ${userData.email}`
              : "Welcome! crete a new account."
          }
        />
        {showOtp ? (
          <div className="otp-section">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              shouldAutoFocus={true}
              // renderSeparator={<span>&nbsp&nbsp</span>}
              renderInput={(props) => (
                <input name="otp" required={true} {...props} />
              )}
              containerStyle="otp-input-container"
              inputStyle="otp-input"
            />
            {otpError !== "" && (
              <Label className="fw-bolder mt-2 errTxt">{otpError}</Label>
            )}
          </div>
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

        <div class="w-100 my-4 d-flex justify-content-center align-items-center">
          <button
            onClick={(e) => {
              if (!showOtp) {
                formValidate();
                if (!isErrors.current) {
                  verifyEmail();
                }
              } else {
                userSignup();
              }
            }}
            className="w-100 btn btn-primary"
            type="button"
            disabled={showOtp ? (otp.length != 4 ? true : false) : false}
          >
            {loading ? <CustomSpinner /> : showOtp ? "Confirm" : "Register"}
          </button>
        </div>
        <SignupWith />
        {showOtp && (
          <p>
            Didn't received otp? <a onClick={() => resendOTP()}>Resend OTP</a>
          </p>
        )}
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

export default SignupTab;
