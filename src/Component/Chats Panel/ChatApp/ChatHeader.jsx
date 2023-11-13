import React, { Fragment, useContext } from 'react';
import { Media } from 'reactstrap';
import ChatAppContext from '../../../_helper/chat-app/index';
import { Image, LI, UL } from '../../../AbstractElements';
import UserProfile from '../../../assets/images/user/userProfile.png'


const ChatHeader = () => {
  const { selectedUserr } = useContext(ChatAppContext);
  return (
    <Fragment>
      {selectedUserr && (
      <Media className="chat-header clearfix d-flex align-items-center">
        <Image
          attrImage={{
            className: 'rounded-circle', src: `${UserProfile}`, alt: ''
          }} />
        <Media body>
          <div className="about">
            <div className="name f-4">
              {selectedUserr ? selectedUserr.phoneNumber : ''}
              {selectedUserr && selectedUserr.typing ? (
                <span className="font-primary f-12"> Typing...</span>
              ) : ('')}
            </div>
            {/* <div className="status digits">{selectedUserr ? (new Date(selectedUserr.updatedAt)).toLocaleString() : '5 May, 5:30 PM'}
            </div> */}
          </div>
        </Media>
      </Media>
      )}
    </Fragment>
  );
};
export default ChatHeader;
