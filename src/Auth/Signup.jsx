import React, { useState } from "react";
import { Container, Row, Col, TabContent, TabPane } from "reactstrap";
import SignupTab from "./Tabs/SignupTab";
import NavAuth from "./Nav";
import { P } from "../AbstractElements";

const Signup = () => {
  const [selected, setSelected] = useState("firebase");
  const [showModal, setShowModal] = useState(false);

  const callbackNav = (select) => {
    setSelected(select);
  };
  return (
    <Container
      fluid={true}
      className="p-0 m-0"
      style={{ position: "relative" }}
    >
      <Row>
        {showModal && (
          <section className="sign-up-modal-background">
            <div className="sign-up-modal-card">
              <i
                class="sign-up-modal-close icofont icofont-ui-close"
                onClick={() => setShowModal(false)}
              ></i>
              <div className="sign-up-modal-header">
                <h1>Terms & Conditions</h1>
              </div>
              <div class="article w-richtext">
                <h3>
                  <strong>Introduction</strong>
                </h3>
                <p>
                  These terms of service (Terms) govern your use of any
                  Platform, Software and the Services (as defined below), owned
                  and operated by Sashakti Ventures Private Limited, a private
                  limited company incorporated under the provision of the
                  Companies act 1956 having its register office at #309, Bharat
                  Nilaya,Kundalahalli, Bangalore Karnataka 560037 India. This
                  website, is one such example.
                </p>

                <p>
                  The terms "user", "you", "your" hereinafter refer to customers
                  registering, accessing and using the Platform or the Software
                  and the terms "we", "us", "our" refer to Sashakti Ventures
                  Private Limited.
                </p>

                <p>
                  Before registering on the Platform, using the Software or any
                  Services (as defined below), please read these Terms carefully
                  and select the "I Agree To The Terms and Conditions" option
                  provided in the login and/or sign up page. By selecting the "I
                  Agree To The Terms and Conditions" option, you signify your
                  acceptance of the Terms (as amended from time to time) and
                  agree to be bound by them for as long as you are using or
                  accessing the Platform or the Services (as defined below).
                </p>

                <p>
                  We reserve the right to unilaterally amend these terms from
                  time to time. We will notify you of any changes that we make
                  to the Terms.
                </p>

                <p>
                  <strong>
                    IF YOU DO NOT AGREE TO THESE TERMS, YOU WILL NOT BE ABLE TO
                    REGISTER ON, ACCESS OR USE THE PLATFORM OR THE SERVICES.
                  </strong>
                </p>

                <h3>
                  <strong>Services:</strong>
                </h3>

                <p>
                  The Services may be provided through the Platform or through
                  the provision of the Software in the Customer's systems.
                </p>

                <p>
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

                <h3>
                  <strong>Access And Use:</strong>
                </h3>
                <p>
                  Upon your request, we may create and provide multiple profiles
                  (Administrator's Profile) that may be used to access the
                  Services by individuals employed or contracted by you (each,
                  an Administrative User). You must not share credentials of the
                  Administrator's Profile with any person other than an
                  Administrative User and prohibit an Administrative User to
                  share the credentials for the Administrator's Profile with any
                  other person.
                </p>
                <p>
                  Any Administrative User may use the Services only through the
                  Account and shall have access to the Account only for the
                  purposes provided under these Terms. You will be responsible
                  for the activities and communications of all Customer's
                  Clients, Administrative Users and Chat Participants (as
                  defined below) and shall ensure that they comply with these
                  Terms and any guidelines and policies that we publish from
                  time to time.
                </p>
                <p>
                  Without limiting the generality of our right to regulate the
                  use of our Services, you will not and will not permit any
                  other person to:
                </p>
                <p>
                  a. Use the Services to send, upload, collect, transmit, store,
                  use, disclose or process, any data or messages:
                </p>
                <p>
                  i. That contains any computer viruses, worms, malicious code,
                  or any software intended to damage or alter a computer system
                  or data;
                </p>
                <p>
                  ii. That is false, intentionally misleading, or impersonates
                  any other person;
                </p>
                <p>
                  iii. That is bullying, harassing, abusive, threatening,
                  vulgar, obscene, or offensive, or that contains pornography,
                  nudity, or graphic or gratuitous violence, or that promotes
                  violence, racism, discrimination, bigotry, hatred, or physical
                  harm of any kind against any group or individual
                </p>
                <p>
                  iv. That is harmful to minors in any way or targeted at
                  persons under the age of 18;
                </p>
                <p>
                  v. That violates the obligations of the Customer or any other
                  person under any applicable laws, or infringes, violates or
                  otherwise misappropriates the rights of any person or entity;
                  or
                </p>
                <p>
                  vi. that encourages any conduct that may violate, any
                  applicable laws or would give rise to civil or criminal
                  liability;
                </p>
                <p>
                  b. disable, overly burden, impair, or otherwise interfere with
                  servers or networks connected to the Platform or the Software
                  (e.g., a denial of service attack);
                </p>
                <p>c. Attempt to gain unauthorized access to the Platform;</p>
                <p>
                  d. use any data mining, robots, or similar data gathering or
                  extraction methods, or copy, modify, reverse engineer, reverse
                  assemble, disassemble, or decompile the Services or any part
                  thereof or otherwise attempt to discover any source code,
                  except as expressly provided for under these Terms;
                </p>
                <p>
                  e. use the Services in a manner that cause harm, disruption,
                  interference to the Services or for the purpose of building a
                  similar or competitive product or service; or
                </p>
                <p>
                  f. use the Services other than as permitted by these Terms.
                  <br />
                </p>
                <h3>
                  <strong>Unauthorized Use or Access</strong>
                </h3>
                <p>
                  You will promptly notify us of any actual or suspected
                  unauthorized access or use of the Platform or Software. We
                  reserve the right to suspend, deactivate or replace any
                  Account or Administrator's Profiles that may have been used
                  for an unauthorized purpose. Sashakti Ventures Private Limited
                  reserves the right to investigate complaints or alleged
                  violation of these Terms or any unauthorized use of the
                  Services.
                </p>
                <h3>
                  <strong>Your Obligations</strong>
                </h3>
                <p>You must:</p>
                <p>
                  a. comply with the terms and conditions applicable to the use
                  of any Third-Party Messengers, Integrated Applications and any
                  other applications used with the Platform or Software;
                </p>
                <p>
                  b. take all steps necessary to enable interoperability between
                  the Platform or Software and any Third-Party Messengers or any
                  Integrated Applications;
                </p>
                <p>
                  c. comply with all applicable privacy and data protection laws
                  to ensure that AIYO can process personal data provided or
                  generated in the course of the use of the Services in
                  accordance with these Terms;
                </p>
                <p>
                  d. ensure that all users have the legal right to process any
                  data processed using the Services;
                </p>
                <p>
                  e. ensure that you have the right to use and license any
                  Intellectual Property that you use along with the Software or
                  Platform and the Services;
                </p>
                <p>
                  f. obtain the necessary permits, registrations, licenses
                  required under any applicable law for the use of the Services
                  by any user;
                </p>
                <p>
                  g. provide us your trademarks and logos or the trademarks and
                  logos of your business clients so that we can market our
                  Services;
                </p>
                <p>
                  h. pay the Fees when it becomes payable in a timely manner;
                  and.
                </p>
                <p>
                  i. preserve the confidentiality of any information provided by
                  AIYO in the course of the Services with respect to which a
                  reasonable expectation of confidentiality may arise
                </p>

                <h3>
                  <strong>Modifications to the Service and Fees</strong>
                </h3>
                <p>
                  Sashakti Ventures Private Limited reserves the right to
                  modify, suspend, or discontinue the Service at any time for
                  any reason with or without notice.
                </p>
                <p>
                  Sashakti Ventures Private Limited reserves the right to change
                  our monthly/annually fees upon 30 days notice. Fee change will
                  be notified per email to all our subscribers and will be
                  reflected on the pricing page at automaite.in /pricing.
                </p>
                <p>
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

                <h3>
                  <strong>Subscription &amp; Conversation Fees</strong>
                </h3>
                <p>
                  You shall pay Sashakti Ventures Private Limited a required
                  subscription fee (the “Subscription Fee”) for the Service
                  provided and a conversation fee (the “Conversation Fee”) for
                  your usage. Any and all payments made by you to Sashakti
                  Ventures Private Limited for the Services are final and
                  non-refundable.
                </p>
                <p>
                  Subscription and Conversation Fee shall be paid within 10
                  business days from the date of invoice. Sashakti Ventures
                  Private Limited may terminate this agreement with immediate
                  effect by delivering notice of termination to you if you fail
                  to pay the fee within 7 business days after written notice.
                </p>

                <h3>
                  <strong>Limited Liability</strong>
                </h3>
                <p>
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
                <p>
                  AIYO SHALL NOT BE LIABLE TO THE CUSTOMER FOR ANY CHANGES IN
                  INTEGRATED APPLICATIONS THIRD-PARTY MESSENGERS OR ANY OTHER
                  DOMAIN, SOFTWARE OR HARDWARE THAT IS USED FOR PROVIDING THE
                  SERVICES BUT IS NOT A PART OF THE PLATFORM OR SOFTWARE THAT
                  PREVENT THE SERVICES FROM WORKING WITH THOSE INTEGRATED
                  APPLICATIONS, THIRD-PARTY MESSENGER OR THIRD-PARTY SERVICES
                </p>
                <p>
                  IN ANY CASE, WE WILL NEVER BECOME LIABLE TO PAY YOU ANY AMOUNT
                  GREATER THAN THE FEE THAT YOU PAY FOR ONE MONTH OF
                  SUBSCRIPTION.
                </p>

                <h3>
                  <strong>Disclaimer</strong>
                </h3>
                <p>
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
                <p>
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

                <h3>
                  <strong>Indemnity</strong>
                </h3>
                <p>
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

                <h3>
                  <strong>Term and Termination</strong>
                </h3>
                <p>
                  The Services will be offered on a subscription basis on such
                  terms as may be agreed between you and Sashakti Ventures
                  Private Limited. The Fees shall be charged on the subscription
                  basis the rates prevalent at the time the subscription is
                  obtained. No refund of Fees shall be granted in the case of
                  cancellation of the subscription. We may cancel your
                  subscription upon discovering any breach of these Terms.
                </p>

                <h3>
                  <strong>Force Majeure</strong>
                </h3>
                <p>
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

                <h3>
                  <strong>Jurisdiction</strong>
                </h3>
                <p>
                  These Terms shall be governed by the laws of India and any
                  disputes or proceedings arising hereunder shall be subject to
                  the jurisdiction of the courts in Bangalore.
                </p>
              </div>
            </div>
            <p></p>
          </section>
        )}
        <Col xs="12">
          <div className="signup-card">
            <div>
              <div className="signup-main1 signup-tab1">
                {/* <NavAuth callbackNav={callbackNav} selected={selected} /> */}
                <TabContent activeTab={selected} className="content-login">
                  <TabPane
                    className="fade show"
                    tabId={selected === "firebase" ? "firebase" : "jwt"}
                  >
                    <SignupTab
                      selected={selected}
                      setShowModal={setShowModal}
                    />
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </Col>
        {/* <Copyright /> */}
      </Row>
    </Container>
  );
};

// const Copyright = () => {
//   return (
//     <P attrPara={{ className: "my-3 copyright-signup" }}>
//       Copyright 2023 © Ulai.in{" "}
//     </P>
//   );
// };

export default Signup;
