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
import { Card, CardBody, Col, Media, Container, Row, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
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
import OrgLogin from "./OrgLogin";
import AgentLogin from "./AgentLogin";

const LoginTab = ({ selected }) => {
  const [pillTab, setpillTab] = useState('1');

  return (
    <Fragment>
        <FormHeader selected={selected} />
         <div className='mb-4'>
         <Nav className="nav-pills">
            <div className="w-100  d-flex justify-content-center align-items-center">
            <div style={{background: 'whitesmoke'}} className="d-flex border border-lightgray p-1 rounded">
            <NavItem style={{cusror: 'pointer'}}>
              <span style={{cursor: 'pointer'}}>
              <NavLink  className={pillTab === '1' ? 'active cursor-pointer' : 'cursor-pointer'} onClick={() => setpillTab('1')}>{"Organization"}</NavLink>
              </span>
            </NavItem>
            <NavItem >
            <span style={{cursor: 'pointer'}}>
              <NavLink  className={pillTab === '2' ? 'active cursor-pointer' : 'cursor-pointer'} onClick={() => setpillTab('2')}>{'Agent'}</NavLink>
              </span>
            </NavItem>
            <NavItem>
            </NavItem>
            </div>
            </div>
          </Nav>
         </div>
          <TabContent activeTab={pillTab} className="position-relative">
              <TabPane className="fade show h-100" tabId="1">
              <OrgLogin/>
              <SignInWith />
              </TabPane>
              <TabPane tabId="2" className="vh-75">
              <AgentLogin/>
              <SignInWith />
               </TabPane>
               </TabContent>
    </Fragment>
  );
};

export default LoginTab;
