import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { Btn, H5, UL, Alerts } from "../../../AbstractElements";
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


const LoginTab = ({ selected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isErrors = useRef(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const inputRef = useRef();
  const [value, setValue] = useState(localStorage.getItem("profileURL") || man);
  const [name, setName] = useState(localStorage.getItem("Name"));

  // const loginAuth = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     setValue(man);
  //     setName('Emay Walter');
  //     setEmail('test@gmail.com');
  //     setPassword('test123');
  //     try {
  //         await firebase_app.auth().signInWithEmailAndPassword(email, password).then(function () {
  //             setValue(man);
  //             setName('Emay Walter');
  //             setTimeout(() => {
  //                 history(`${process.env.PUBLIC_URL}/dashboard/default`);
  //             }, 200);
  //         });
  //     } catch (error) {
  //         setTimeout(() => {
  //             toast.error('Oppss.. The password is invalid or the user does not have a password.');
  //         }, 200);
  //     }
  // };
  const userLogin = async (e) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        requestOptions
      );
      const resBody = await res.json();
      if (res.status.toString() === "200") {
        setEmail('');
        setPassword('');
      const { user, token } = resBody;
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      connectWithSocketIOServer();
      toast.success("User Logged In successfully");
      history(`${process.env.PUBLIC_URL}/dashboard/default`);
      }else{
          toast.error(`${resBody.msg}`);
      }
    } catch (err) {
      toast.error(`${err.message}`);
    }
    setLoading(false);
  };
  const formValidate = () => {
    isErrors.current = false;
    setErrors({})
    let errorsObj = {};
    if (!email) {
      errorsObj = { email: "Email ID is required!" };
    }
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errorsObj = {email: "Invalid Email ID!" };
    }
    if (!password) {
      errorsObj = { ...errorsObj, password: "Password is required!" };
    }
    if(Object.values(errorsObj).length > 0){
        isErrors.current = Object.values(errorsObj).length > 0;
        setErrors(errorsObj);
    }
  };
  return (
    <Fragment>
      <Form className="theme-form login-form">
        <FormHeader selected={selected} />
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
              placeholder="Email Address"
            />
          </InputGroup>
          {errors.email && <Label className="text-red fw-bolder mt-2 errTxt">{errors?.email}</Label>}
        </FormGroup>
        <FormGroup className="mb-4">
          <Label>
            {Password} <Label className="text-danger fw-bolder">*</Label>
          </Label>
          <InputGroup>
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
            <Input
              className="form-control"
              type={togglePassword ? "text" : "password"}
              onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                required={true}
                />
            <div
              className="show-hide"
              onClick={() => setTogglePassword(!togglePassword)}
              >
              <span className={togglePassword ? "" : "show"}></span>
            </div>
          </InputGroup>
                {errors.password && <Label className="text-red fw-bolder mt-2 errTxt">{errors?.password}</Label>}
        </FormGroup>
        <FormGroup>
          {selected === "firebase" ? (
            <>
              {/* {btnDisable ? <Label className={`text-danger fw-bolder hidenTxt ${btnDisable && 'appearedTxt'}`}>Please enter all mandatory credentials in the form</Label> :  */}
              <Btn
                attrBtn={{
                  color: "primary",
                  className: `btn-block mb-3 ${
                    (loading ) && "btn-disabled"
                  }`,
                  disabled: loading,
                  onClick: (e) => {
                    formValidate();
                    if(!isErrors.current){
                        userLogin()
                    }
                  },
                }}
              >
                {loading ? "LOADING..." : SignIn}
              </Btn>
            </>
          ) : (
            <Btn
              attrBtn={{
                color: "primary",
                className: "btn-block mb-3",
                disabled: loading ? loading : loading,
              }}
            >
              {loading ? "LOADING..." : LoginWithJWT}
            </Btn>
          )}
        </FormGroup>
        <SignInWith />
      </Form>
    </Fragment>
  );
};

export default LoginTab;
