import React, { Fragment, useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ToastContainer } from 'react-toastify';
import Footer from './Footer/index';
import Loader from './Loader';
import TapTop from './TapTop/index';
import Header from './Header';
import SideBarLayout from './SideBar-Layout';
import Themecustomizer from './ThemeCustomizer';
import CheckContext from '../_helper/customizer';
import ProductContext from '../_helper/ecommerce/product';
import ConfigDB from '../Config/Theme-Config';
import AnimationThemeContext from '../_helper/AnimationTheme';
import { ToggleIconss } from '../Data/svgIcons';
import { GetMenuItemsProps } from '../_helper/MenuItems/MenuItemsProvider';

const togglerStyle = {
backgroundColor: '#f4f6fd'
}

const toggleStyle = {
  margin: '5px',
  backgroundColor: 'white',
  border: '1px solid none',
  borderRadius:'4px',
  padding: '2px',
  cursor: 'pointer'
}

const Layout = ({ children, classNames, ...rest }) => {
  const { sidebar_types, settings, toggleIcon, setToggleIcon, defaultClass, setDefaultClass
  } = useContext(CheckContext);
  const { toggleSidebar } = useContext(CheckContext);
  const { setIsVertical } = useContext(ProductContext);
  const { sideBartoggle, setSideBarToggle } = GetMenuItemsProps();
  const settings1 = localStorage.getItem('sidebar_Settings') || settings;
  const sidebar_types1 = localStorage.getItem('sidebar_types') || sidebar_types;
  const location = useLocation();
  const { animation } = useContext(AnimationThemeContext);
  const animationTheme = localStorage.getItem('animation') || animation || ConfigDB.data.router_animation;

  const openCloseSidebar = () => {
    setSideBarToggle(!sideBartoggle);
    toggleSidebar(sideBartoggle);
  };

  window.addEventListener('resize', () => {
    if ((window.innerWidth - 440) <= 575) {
      setToggleIcon(true);
    } else {
      setToggleIcon(false);
    }
    if (window.innerWidth <= 1200) {
      setIsVertical(true);
    } else {
      setIsVertical(false);
    }
    if (window.innerWidth <= 992) {
      setDefaultClass(true);
    } else setDefaultClass(false);
  });
  return (
    <Fragment>
      <Loader />
      <TapTop />
      <div className={`page-wrapper ${!defaultClass ? sidebar_types1 : 'compact-wrapper'} ${settings1}`} id="pageWrapper">
        <div className={`page-header ${toggleIcon ? 'close_icon' : ''}`}>
          {/* <Header /> */}
          <i style={togglerStyle} className="status_toggle sidebar-toggle d-flex" onClick={() => openCloseSidebar()}>
              <span style={toggleStyle} className='d-flex justify-content-center'> 
              <ToggleIconss/>
              </span>
            </i>
        </div>
        <div className="page-body-wrapper">
          <div className={`sidebar-wrapper ${toggleIcon ? 'close_icon' : ''}`}>
            <div>
              <SideBarLayout />
            </div>
          </div>
          <div className="page-body">
            <TransitionGroup {...rest}>
              <CSSTransition
                key={location.key}
                timeout={100}
                classNames={animationTheme}
                unmountOnExit
              > 
                <div>
                  <Outlet />
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <Footer />
        </div>
      </div>
      <Themecustomizer />
      <ToastContainer />
    </Fragment>
  );
};
export default Layout;