import React, { useState, useEffect} from 'react';
import { Container, Row, Col, TabContent, TabPane } from 'reactstrap';
import NavAuth from './Nav';
import LoginTab from './Tabs/LoginTab';
import AuthTab from './Tabs/AuthTab';
import { useNavigate } from 'react-router';

const Logins = () => {
  const [selected, setSelected] = useState('firebase');
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || null);
  const [token, settoken] = useState(localStorage.getItem('token') || null)
  const history = useNavigate()
  const callbackNav = ((select) => {
    setSelected(select);
  });
  useEffect(() => {
   if(currentUser && token){
    history(`${process.env.PUBLIC_URL}/dashboard/default`)
   }
  }, [currentUser, token])
  
  return (
    <Container  fluid={true} className="p-0">
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div className="login-main1 login-tab1">
                {/* <NavAuth callbackNav={callbackNav} selected={selected} /> */}
                <TabContent activeTab={selected} className="content-login">
                  <TabPane className="fade show" tabId={selected === 'firebase' ? 'firebase' : 'jwt'}>
                    <LoginTab selected={selected} />
                  </TabPane>
                  <TabPane className="fade show" tabId="auth0">
                    <AuthTab />
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

export default Logins;