import React, { useState, useEffect} from 'react';
import { Container, Row, Col, TabContent, TabPane } from 'reactstrap';
import NavAuth from './Nav';
import LoginTab from './Tabs/LoginTab';
import AuthTab from './Tabs/AuthTab';
import { useNavigate } from 'react-router';

const Logins = () => {
  const [selected, setSelected] = useState('firebase');
  const [currentUser, setCurrentUser] = useState((sessionStorage.getItem('currentUser')) || null);
  const [token, settoken] = useState((sessionStorage.getItem('token')) || null)
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
          <div className="login-card">
              <div className="login-main1 login-tab1">
                {/* <NavAuth callbackNav={callbackNav} selected={selected} /> */}
                    <LoginTab selected={selected} />
            </div>
          </div>
      </Row>
    </Container>
  );
};

export default Logins;