import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { Btn, H5, UL, Alerts, H4 } from "../../../AbstractElements";
import {
  EmailAddress,
  LoginWithJWT,
  Password,
  SignIn,
} from "../../../Constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { firebase_app, Jwt_token } from "../../../Config/Config";
import man from "../../../assets/images/dashboard/1.png";
import { handleResponse } from "../../../Services/Fack.Backend";
import FormHeader from "./FormHeader";
import FormPassword from "./FormPassword";
import SignInWith from "./SignInWith";
import { cls } from "react-image-crop";
import { connectWithSocketIOServer } from "../../../Component/Live Chats/Client/wss";
import appStore from "../../../Component/Live Chats/Client/AppStore";
import { getSessionId } from "../../../Component/Bots/sessionSetup";
import { v4 as uuidv4 } from "uuid";

const AgentLogin = ({ selected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isErrors = useRef(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const inputRef = useRef();
  const { setUserData, setToken, userData } = appStore();

  const userLogin = async (e) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, type: 'agent' }),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        requestOptions
      );
      const resBody = await res.json();
      if (res.status.toString() === "200") {
        setEmail("");
        setPassword("");
        const { agent: user, token } = resBody;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        setUserData(user);
        setToken(token);
        toast.success("User Logged In successfully");
        if (user.userId) {
          history(`${process.env.PUBLIC_URL}/live-chat`);
        }
        else if(!user.store && !user.userId){
          history(`${process.env.PUBLIC_URL}/store`);
        }
        else if(user.store && !user.userId){
          history(`${process.env.PUBLIC_URL}/dashboard`);
        }
        
      } else {
        toast.error(`${resBody.msg}`);
      }
    } catch (err) {
      toast.error(`${err.message}`);
    }
    setLoading(false);
  };
  const formValidate = () => {
    isErrors.current = false;
    setErrors({});
    let errorsObj = {};
    if (!email) {
      errorsObj = { email: "Email ID is required!" };
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      errorsObj = { email: "Invalid Email ID!" };
    }
    if (!password) {
      errorsObj = { ...errorsObj, password: "Password is required!" };
    }
    if (Object.values(errorsObj).length > 0) {
      isErrors.current = Object.values(errorsObj).length > 0;
      setErrors(errorsObj);
    }
  };

  return (
    <Fragment>
      <Form className="theme-form login-form">
        <FormGroup>
          <Label>
            {EmailAddress} <Label className="text-red fw-bolder">*</Label>
          </Label>
          <InputGroup>
            <InputGroupText>
              <i className="icon-email"></i>
            </InputGroupText>
            <Input
              ref={inputRef}
              className="form-control"
              type="email"
              required={true}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Agent Email ID"
            />
          </InputGroup>
          {errors.email && (
            <Label className="text-red fw-bolder mt-2 errTxt">
              {errors?.email}
            </Label>
          )}
        </FormGroup>
        <FormGroup className="mb-4">
          <Label>
            {Password} <Label className="text-danger fw-bolder">*</Label>
          </Label>
          <InputGroup>
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
            <input
              className="form-control"
              type={togglePassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyPress={(e) => {
                if(e.key === 'Enter'){
                  formValidate();
                  if (!isErrors.current) {
                    userLogin();
                  }
                }
              }}
              placeholder="Enter Password"
              required={true}
            />
            <div
              className="show-hide"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              <span className={togglePassword ? "Hide" : "show"}></span>
            </div>
          </InputGroup>
          {errors.password && (
            <Label className="text-red fw-bolder mt-2 errTxt">
              {errors?.password}
            </Label>
          )}
        </FormGroup>
        <FormGroup>
              <Btn
                attrBtn={{
                  color: "primary",
                  className: `btn-block mb-3 ${loading && "btn-disabled"}`,
                  disabled: loading,
                  onClick: (e) => {
                    formValidate();
                    if (!isErrors.current) {
                      userLogin();
                    } 
                  },
                }}
              >
                {loading ? "LOADING..." : SignIn}
              </Btn>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

export default AgentLogin;
