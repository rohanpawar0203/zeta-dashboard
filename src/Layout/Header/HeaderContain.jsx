import React, { Fragment, useEffect, useState } from 'react';
import { FileText, LogIn, Mail, Settings, User } from 'react-feather';
import { Media } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { H6, Image, LI, UL } from '../../AbstractElements';
import UserImg from '../../assets/images/avtar/man.png';
import ItemCart from './ItemCart';
import MaxMiniSize from './MaxMiniSize';
import MoonLight from './MoonLight';
import Notification from './Notification';
import { toast } from 'react-toastify';
import { GetMenuItemsProps } from '../../_helper/MenuItems/MenuItemsProvider';

import Language from './Langauge';
import { firebase_app } from '../../Config/Config';
import Bookmark from './Bookmark/index';
import { Account, Inbox, LogOut, Taskboard } from '../../Constant';
import appStore from '../../Component/Live Chats/Client/AppStore';

const HeaderContain = () => {// eslint-disable-next-line
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const { setUserData, setToken, userData, setConversation, setMessages} = appStore();
  useEffect(() => {
    setProfile(localStorage.getItem('profileURL') || UserImg);
    setName(localStorage.getItem('Name'));
  }, []);
  const authenticated = JSON.parse(localStorage.getItem('authenticated'));
  const auth0_profile = JSON.parse(localStorage.getItem('auth0_profile'));
  const history = useNavigate();
  const {handleForLogout} = GetMenuItemsProps()
  const Logout = () => {
    setConversation([]);
    setMessages([]);
    sessionStorage.clear();
    setUserData({});
    setToken(''); 
    setTimeout(() =>{history(`${process.env.PUBLIC_URL}/login`)},  1000); 
  };
  return (
    <Fragment>
      <div className="nav-right col-10 col-sm-6 pull-right right-header p-0 dash-76">
        <UL attrUL={{ className: `simple-list flex-row nav-menus` }}>
          {/* <LI attrLI={{ className: 'onhover-dropdown' }}><H6 attrH6={{ className: 'txt-dark mb-0 mt-1' }}>EN</H6>
            <Language />
          </LI> */}
          {/* <MoonLight />
          <ItemCart />
          <Bookmark />
          <Notification /> */}
          <MaxMiniSize />
          <LI attrLI={{ className: 'profile-nav onhover-dropdown pe-0 pt-0 me-0' }} >
            <Media className="profile-media">
              <Image attrImage={{
                className: 'rounded-circle', src: `${authenticated ? auth0_profile.picture : profile}`, alt: '',
              }}
              />
              <Media body>
                <span>{authenticated ? auth0_profile.name : name}</span>
              </Media>
            </Media>
            <UL attrUL={{ className: `simple-list profile-dropdown onhover-show-div` }}>
              {(!userData?.userId || userData?.userId === undefined) && <LI><Link to={`${process.env.PUBLIC_URL}/users/userprofile`}><i><User /></i><span>{Account} </span></Link></LI>}
              
              <LI attrLI={{ onClick: Logout }}>
                <Link to={`${process.env.PUBLIC_URL}/login`}>
                  <LogIn /><span>{LogOut}</span>
                </Link>
              </LI>
            </UL>
          </LI>
        </UL>
      </div >
    </Fragment >
  );
};
export default HeaderContain;
