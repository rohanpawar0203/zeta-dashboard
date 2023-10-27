import React, {useState} from 'react';
import {Container, Row, Col, TabContent, TabPane } from 'reactstrap';
import SignupTab from './Tabs/SignupTab';
import NavAuth from './Nav';

const Signup = () => {
    const [selected, setSelected] = useState('firebase');

    const callbackNav = ((select) => {
        setSelected(select);
      });
  return (
    <Container fluid={true} className='p-0 m-0'>
       <Row>
        <Col xs="12">
          <div className="signup-card">
           <div>
           <div className="signup-main1 signup-tab1">
                {/* <NavAuth callbackNav={callbackNav} selected={selected} /> */}
                <TabContent activeTab={selected} className="content-login">
                  <TabPane className="fade show" tabId={selected === 'firebase' ? 'firebase' : 'jwt'}>
                    <SignupTab selected={selected} />
                  </TabPane>
                </TabContent >
              </div>
           </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;