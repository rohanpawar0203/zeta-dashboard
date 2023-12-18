import React, { useContext, useState } from 'react';
import { Image } from '../../AbstractElements';
import CheckContext from '../../_helper/customizer/index';
import ulaiLogo from '../../assets/images/dashboard/ulai-logo-01-dark-small.png';
import logo1 from '../../assets/images/logo/small-white-logo.png';

const SidebarIcon = () => {
  const { toggleSidebar } = useContext(CheckContext);
  const [toggle, setToggle] = useState(false);
  const openCloseSidebar = () => {
    setToggle(!toggle);
    toggleSidebar(toggle);
  };
  return (
    <div className="logo-wrapper">
      <a href="#javascript">
        <Image attrImage={{ className: 'img-fluid for-light', src: `${ulaiLogo}`, alt: '' }} />
        <Image attrImage={{ className: 'img-fluid for-dark', src: `${ulaiLogo}`, alt: '' }} />
      </a>
      <div className='back-btn' onClick={() => openCloseSidebar()}><i className='fa fa-angle-left' style={{cursor: 'pointer', color: 'white'}}></i></div>
    </div>
  );
};
export default SidebarIcon;