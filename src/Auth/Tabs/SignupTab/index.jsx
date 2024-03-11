import React, { useState, Fragment, useRef, useEffect } from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  Row,
} from "reactstrap";
import { Btn, H5, P, UL } from "../../../AbstractElements";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
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
  const [showModal, setShowModal] = useState(false);
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
  const [termsChecked, setTermsChecked] = useState(true);
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
      body: JSON.stringify({ id: otpTokenId, otp, ...userData }),
    };
    try {
      const res = await fetch(
        // `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        `${process.env.REACT_APP_API_BASE_URL}/auth/verifyOtp`,
        requestOptions
      );
      const resBody = await res.json();
      if (res.status === 200 || res.status === 201) {
        const { token, user } = resBody;
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
        // console.log("resendOTP", resp);
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
      {showModal && (
        <section className="popup-background">
          <div
            className="terms-block"
            style={{
              backgroundColor: "#ffffff",
              maxWidth: "80%",
              maxHeight: "60vh",
              overflow: "scroll",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                padding: "20px 50px 0 0",
              }}
            >
              <i
                className="fa fa-times"
                style={{ fontSize: "25px", cursor: "pointer" }}
                onClick={() => setShowModal(false)}
              ></i>
            </div>
            <div className="card-body" style={{ padding: "2% 5%" }}>
              <h2 className="medium-heading career-description-heading">
                Terms of Service
              </h2>
              <div className="text-large">Updated 01 Feb, 2024</div>
              <div className="article w-richtext">
                <h3>
                  <strong>Introduction</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  These terms of service (Terms) govern your use of any
                  Platform, Software and the Services (as defined below), owned
                  and operated by Sashakti Ventures Private Limited, a private
                  limited company incorporated under the provision of the
                  Companies act 1956 having its register office at #309, Bharat
                  Nilaya,Kundalahalli, Bangalore Karnataka 560037 India. This
                  website, is one such example.
                </p>

                <p style={{ textAlign: "justify" }}>
                  The terms "user", "you", "your" hereinafter refer to customers
                  registering, accessing and using the Platform or the Software
                  and the terms "we", "us", "our" refer to Sashakti Ventures
                  Private Limited.
                </p>

                <p style={{ textAlign: "justify" }}>
                  Before registering on the Platform, using the Software or any
                  Services (as defined below), please read these Terms carefully
                  and select the "I Agree To The Terms and Conditions" option
                  provided in the login and/or sign up page. By selecting the "I
                  Agree To The Terms and Conditions" option, you signify your
                  acceptance of the Terms (as amended from time to time) and
                  agree to be bound by them for as long as you are using or
                  accessing the Platform or the Services (as defined below).
                </p>

                <p style={{ textAlign: "justify" }}>
                  We reserve the right to unilaterally amend these terms from
                  time to time. We will notify you of any changes that we make
                  to the Terms.
                </p>

                <p style={{ textAlign: "justify" }}>
                  <strong>
                    IF YOU DO NOT AGREE TO THESE TERMS, YOU WILL NOT BE ABLE TO
                    REGISTER ON, ACCESS OR USE THE PLATFORM OR THE SERVICES.
                  </strong>
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Services:</strong>
                </h3>

                <p style={{ textAlign: "justify" }}>
                  The Services may be provided through the Platform or through
                  the provision of the Software in the Customer's systems.
                </p>

                <p style={{ textAlign: "justify" }}>
                  When provided through the Platform, the Services comprise the
                  Platform and the APIs to integrate the Platform with your
                  systems. When provided through a software, the Services
                  comprise the Software and any Software Development Kit
                  provided with that Software. You may integrate the Software
                  with your business applications (Integrated Applications) only
                  upon obtaining our consent and in accordance with these terms.
                  The Services allow you to store, analyze and send automated
                  messages between your business systems and your customers on
                  third party messaging channels through a web-based
                  interface(Services). Using the Services, you can send and
                  receive messages between your business or a business client of
                  yours (together referred to as Business) and any individual
                  that communicates with the Business (Chat Participant) on a
                  third-party messaging platform that may be used by the Chat
                  Participant to transmit and receive messages with that
                  Business (Third-Party Messengers).Thesecommunications may be
                  manual or automated. The Services can integrate with your
                  Client Records Management (CRM) systems. You may also use the
                  Services to obtain analytics about the interaction of
                  Businesses and Chat Participants using the Services. Where
                  applicable, a "conversation" refers to one outgoing message
                  sent using any of the tools and software on ourplatform,
                  including custom built APKs and plugins. The fee applicable to
                  the Services (Fees) shall be fixed and paid in the manner
                  agreed between Sashakti Ventures Private Limited and the user.
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Access And Use:</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  Upon your request, we may create and provide multiple profiles
                  (Administrator's Profile) that may be used to access the
                  Services by individuals employed or contracted by you (each,
                  an Administrative User). You must not share credentials of the
                  Administrator's Profile with any person other than an
                  Administrative User and prohibit an Administrative User to
                  share the credentials for the Administrator's Profile with any
                  other person.
                </p>
                <p style={{ textAlign: "justify" }}>
                  Any Administrative User may use the Services only through the
                  Account and shall have access to the Account only for the
                  purposes provided under these Terms. You will be responsible
                  for the activities and communications of all Customer's
                  Clients, Administrative Users and Chat Participants (as
                  defined below) and shall ensure that they comply with these
                  Terms and any guidelines and policies that we publish from
                  time to time.
                </p>
                <p style={{ textAlign: "justify" }}>
                  Without limiting the generality of our right to regulate the
                  use of our Services, you will not and will not permit any
                  other person to:
                </p>
                <p style={{ textAlign: "justify" }}>
                  a. Use the Services to send, upload, collect, transmit, store,
                  use, disclose or process, any data or messages:
                </p>
                <p style={{ textAlign: "justify" }}>
                  i. That contains any computer viruses, worms, malicious code,
                  or any software intended to damage or alter a computer system
                  or data;
                </p>
                <p style={{ textAlign: "justify" }}>
                  ii. That is false, intentionally misleading, or impersonates
                  any other person;
                </p>
                <p style={{ textAlign: "justify" }}>
                  iii. That is bullying, harassing, abusive, threatening,
                  vulgar, obscene, or offensive, or that contains pornography,
                  nudity, or graphic or gratuitous violence, or that promotes
                  violence, racism, discrimination, bigotry, hatred, or physical
                  harm of any kind against any group or individual
                </p>
                <p style={{ textAlign: "justify" }}>
                  iv. That is harmful to minors in any way or targeted at
                  persons under the age of 18;
                </p>
                <p style={{ textAlign: "justify" }}>
                  v. That violates the obligations of the Customer or any other
                  person under any applicable laws, or infringes, violates or
                  otherwise misappropriates the rights of any person or entity;
                  or
                </p>
                <p style={{ textAlign: "justify" }}>
                  vi. that encourages any conduct that may violate, any
                  applicable laws or would give rise to civil or criminal
                  liability;
                </p>
                <p style={{ textAlign: "justify" }}>
                  b. disable, overly burden, impair, or otherwise interfere with
                  servers or networks connected to the Platform or the Software
                  (e.g., a denial of service attack);
                </p>
                <p style={{ textAlign: "justify" }}>
                  c. Attempt to gain unauthorized access to the Platform;
                </p>
                <p style={{ textAlign: "justify" }}>
                  d. use any data mining, robots, or similar data gathering or
                  extraction methods, or copy, modify, reverse engineer, reverse
                  assemble, disassemble, or decompile the Services or any part
                  thereof or otherwise attempt to discover any source code,
                  except as expressly provided for under these Terms;
                </p>
                <p style={{ textAlign: "justify" }}>
                  e. use the Services in a manner that cause harm, disruption,
                  interference to the Services or for the purpose of building a
                  similar or competitive product or service; or
                </p>
                <p style={{ textAlign: "justify" }}>
                  f. use the Services other than as permitted by these Terms.
                  <br />
                </p>
                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Unauthorized Use or Access</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  You will promptly notify us of any actual or suspected
                  unauthorized access or use of the Platform or Software. We
                  reserve the right to suspend, deactivate or replace any
                  Account or Administrator's Profiles that may have been used
                  for an unauthorized purpose. Sashakti Ventures Private Limited
                  reserves the right to investigate complaints or alleged
                  violation of these Terms or any unauthorized use of the
                  Services.
                </p>
                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Your Obligations</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>You must:</p>
                <p style={{ textAlign: "justify" }}>
                  a. comply with the terms and conditions applicable to the use
                  of any Third-Party Messengers, Integrated Applications and any
                  other applications used with the Platform or Software;
                </p>
                <p style={{ textAlign: "justify" }}>
                  b. take all steps necessary to enable interoperability between
                  the Platform or Software and any Third-Party Messengers or any
                  Integrated Applications;
                </p>
                <p style={{ textAlign: "justify" }}>
                  c. comply with all applicable privacy and data protection laws
                  to ensure that AIYO can process personal data provided or
                  generated in the course of the use of the Services in
                  accordance with these Terms;
                </p>
                <p style={{ textAlign: "justify" }}>
                  d. ensure that all users have the legal right to process any
                  data processed using the Services;
                </p>
                <p style={{ textAlign: "justify" }}>
                  e. ensure that you have the right to use and license any
                  Intellectual Property that you use along with the Software or
                  Platform and the Services;
                </p>
                <p style={{ textAlign: "justify" }}>
                  f. obtain the necessary permits, registrations, licenses
                  required under any applicable law for the use of the Services
                  by any user;
                </p>
                <p style={{ textAlign: "justify" }}>
                  g. provide us your trademarks and logos or the trademarks and
                  logos of your business clients so that we can market our
                  Services;
                </p>
                <p style={{ textAlign: "justify" }}>
                  h. pay the Fees when it becomes payable in a timely manner;
                  and.
                </p>
                <p style={{ textAlign: "justify" }}>
                  i. preserve the confidentiality of any information provided by
                  AIYO in the course of the Services with respect to which a
                  reasonable expectation of confidentiality may arise
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Modifications to the Service and Fees</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  Sashakti Ventures Private Limited reserves the right to
                  modify, suspend, or discontinue the Service at any time for
                  any reason with or without notice.
                </p>
                <p style={{ textAlign: "justify" }}>
                  Sashakti Ventures Private Limited reserves the right to change
                  our monthly/annually fees upon 30 days notice. Fee change will
                  be notified per email to all our subscribers and will be
                  reflected on the pricing page at automaite.in /pricing.
                </p>
                <p style={{ textAlign: "justify" }}>
                  Sashakti Ventures Private Limited reserves the right to update
                  and change the Terms of Service from time to time without
                  notice. Any new features that augment or enhance the current
                  Service, including the release of new tools and resources,
                  shall be subject to the Terms of Service. Should you continue
                  to use the Service after any such modifications have been
                  made, this shall constitute your agreement to such
                  modifications.
                  <br />
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Subscription &amp; Conversation Fees</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  You shall pay Sashakti Ventures Private Limited a required
                  subscription fee (the “Subscription Fee”) for the Service
                  provided and a conversation fee (the “Conversation Fee”) for
                  your usage. Any and all payments made by you to Sashakti
                  Ventures Private Limited for the Services are final and
                  non-refundable.
                </p>
                <p style={{ textAlign: "justify" }}>
                  Subscription and Conversation Fee shall be paid within 10
                  business days from the date of invoice. Sashakti Ventures
                  Private Limited may terminate this agreement with immediate
                  effect by delivering notice of termination to you if you fail
                  to pay the fee within 7 business days after written notice.
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Limited Liability</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO
                  EVENT WILL AIYO BE LIABLE TO CUSTOMER OR ANY USER FOR ANY: (I)
                  SPECIAL, EXEMPLARY, PUNITIVE, INDIRECT, INCIDENTAL OR
                  CONSEQUENTIAL DAMAGES, (II) LOST SAVINGS, PROFIT, DATA, USE,
                  OR GOODWILL; (III) BUSINESS INTERRUPTION; (IV) ANY COSTS FOR
                  THE PROCUREMENT OF SUBSTITUTE PRODUCTS OR SERVICES; (V)
                  PERSONAL INJURY OR DEATH; OR (VI) PERSONAL OR PROPERTY DAMAGE
                  ARISING OUT OF OR IN ANY WAY CONNECTED TO THESE TERMS,
                  REGARDLESS OF CAUSE OF ACTION OR THE THEORY OF LIABILITY,
                  WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE, GROSS
                  NEGLIGENCE, FUNDAMENTAL BREACH, BREACH OF A FUNDAMENTAL TERM)
                  OR OTHERWISE AND EVEN IF NOTIFIED IN ADVANCE OF THE
                  POSSIBILITIES OF SUCH DAMAGES.
                </p>
                <p style={{ textAlign: "justify" }}>
                  AIYO SHALL NOT BE LIABLE TO THE CUSTOMER FOR ANY CHANGES IN
                  INTEGRATED APPLICATIONS THIRD-PARTY MESSENGERS OR ANY OTHER
                  DOMAIN, SOFTWARE OR HARDWARE THAT IS USED FOR PROVIDING THE
                  SERVICES BUT IS NOT A PART OF THE PLATFORM OR SOFTWARE THAT
                  PREVENT THE SERVICES FROM WORKING WITH THOSE INTEGRATED
                  APPLICATIONS, THIRD-PARTY MESSENGER OR THIRD-PARTY SERVICES
                </p>
                <p style={{ textAlign: "justify" }}>
                  IN ANY CASE, WE WILL NEVER BECOME LIABLE TO PAY YOU ANY AMOUNT
                  GREATER THAN THE FEE THAT YOU PAY FOR ONE MONTH OF
                  SUBSCRIPTION.
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Disclaimer</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  Sashakti Ventures Private Limited PROVIDES THE SERVICES ON AN
                  "AS IS" BASIS AND GRANTS NO WARRANTIES OF ANY KIND WITH
                  RESPECT TO THEM. AIYO SPECIFICALLY DISCLAIMS ANY IMPLIED
                  WARRANTIES OF MERCANTIBILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, FREEDOM FROM COMPUTER VIRUS OR HARMFUL CODE, TITLE OR
                  NON-INFRINGEMENT. ACCESS AND USE OF THE SERVICES IS ENTIRELY
                  AT YOUR OWN RISK AND AIYO DOES NOT ACCEPT ANY LEGAL LIABILITY
                  FOR THE USE OF THE SERVICES BY THEMSELVES OR IN CONJUNCTION
                  WITH ANY OTHER SERVICES OR THE DEVELOPMENT AND USE OF ANY
                  INTEGRATED APPLICATIONS OR ANY OTHER INTELLECTUAL PROPERTY IN
                  COURSE OF THE USE OF SERVICES. AIYO WILL NOT BE LEGALLY
                  RESPONSIBLE FOR ANY VIOLATIONS OF THE OBLIGATIONS OF THE
                  CUSTOMER UNDER THESE TERMS.
                </p>
                <p style={{ textAlign: "justify" }}>
                  THE CUSTOMER UNDERSTANDS AND ACKNOWLEDGES THAT THE SERVICES
                  ARE CONTINGENT ON THE FUNCTIONING OF THIRD PARTY MESSENGERS,
                  INTEGRATED APPLICATIONS AND ANY OTHER DOMAIN, SOFTWARE OR
                  HARDWARE THAT DOES NOT FORM A PART OF THE PLATFORM OR
                  SOFTWARE. AIYO SHALL NOT BE LEGALLY RESPONSIBLE FOR ANY
                  CHANGES TO THESE THIRD-PARTY MESSENGERS, INTEGRATED
                  APPLICATIONAND OTHER SOFTWARE OR HARDWARE THAT DOES NOT FORM A
                  PART OF THE PLATFORM OR SOFTWARE THAT LEAD TO A DISRUPTION,
                  INTERFERENCE, SUSPENSION OR CANCELLATION OF THE SERVICES. YOUR
                  ACCESS AND USE OF THE SERVICES MAY BE DISRUPTED DUE TO
                  TECHNICAL OR OPERATIONAL DIFFICULTIES AND WITH NO PRIOR NOTICE
                  OF DOWNTIME. WE MAKE NO GUARANTEE AS TO THE CONTINUOUS UPTIME
                  AND AVAILABILITY OF THE SERVICES.
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Indemnity</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  You hereby agree to keep and hold Sashakti Ventures Private
                  Limited fully indemnified and harmless from and against all
                  claims, proceedings, penalties, damages, losses, actions,
                  costs and expenses arising out of or in relation to your
                  access and use of the Services, Integrated Applications and
                  Third-Party Messengers, the breach of these Terms and
                  violation of any applicable law, rules or regulations. You
                  will keep us fully indemnified and harmless against any claim
                  relating to the infringement of Intellectual Property with
                  respect to any Intellectual Property that you have licensed to
                  us or used with our Services under these Terms.
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Term and Termination</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  The Services will be offered on a subscription basis on such
                  terms as may be agreed between you and Sashakti Ventures
                  Private Limited. The Fees shall be charged on the subscription
                  basis the rates prevalent at the time the subscription is
                  obtained. No refund of Fees shall be granted in the case of
                  cancellation of the subscription. We may cancel your
                  subscription upon discovering any breach of these Terms.
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Force Majeure</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  Neither Party will be liable for delays caused by any event or
                  circumstances beyond Sashakti Ventures Private Limited’s
                  reasonable control, including acts of God, acts of government,
                  flood, fire, earthquakes, civil unrest, acts of terror,
                  strikes or other labor problems (other than those involving
                  Sashakti Ventures Private Limited employees), Internet service
                  provider failures or delays, or the unavailability or
                  modification by third parties of third party services
                  necessary for the provision of the Services
                </p>

                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                  <strong>Jurisdiction</strong>
                </h3>
                <p style={{ textAlign: "justify" }}>
                  These Terms shall be governed by the laws of India and any
                  disputes or proceedings arising hereunder shall be subject to
                  the jurisdiction of the courts in Bangalore.
                </p>
              </div>
            </div>
          </div>
        </section>
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
            <Col xl="12">
              <FormGroup>
                <label
                  htmlFor="t&c"
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{
                      width: "15px",
                      height: "15px",
                      accentColor: "var(--theme-default)",
                    }}
                    type="checkbox"
                    name=""
                    id="t&c"
                    checked={termsChecked}
                    onChange={() => setTermsChecked(!termsChecked)}
                  />
                  <p>
                    I have read the{" "}
                    <Link
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and consent to process.
                  </p>
                </label>
              </FormGroup>
            </Col>
          </Row>
        )}

        <div className="w-100 my-4 d-flex justify-content-center align-items-center">
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