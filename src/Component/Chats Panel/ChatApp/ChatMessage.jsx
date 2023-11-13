import React, { Fragment, useContext, useEffect } from 'react';
import ChatAppContext from '../../../_helper/chat-app/index';
import { Image, LI, UL } from '../../../AbstractElements';
import start_conversion from '../../../assets/images/start-conversion.jpg';
import  UserProfile  from '../../../assets/images/user/userProfile.png';

const ChatMessage = () => {
  const { allMemberss, chatss, selectedUserr, currentUserr, fetchChatMemberAsyn, fetchChatAsyn, } = useContext(ChatAppContext);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const selectedChat = selectedUserr?.chat ? selectedUserr?.chat : [];
  var activeChat = 0;
  if (selectedUserr != null) activeChat = selectedUserr.id;
  var images = require.context('../../../assets/images', true);
  const dynamicImage = (image) => {
    return images(`./${image}`);
  };
  return (
    <Fragment>
      {allMemberss && chatss && selectedUserr ?
        <div  className="chat-history chat-msg-box custom-scrollbar">
          {selectedChat && selectedChat.length > 0 ? (
            selectedChat.map((item, index) => {
              return (
                <UL attrUL={{ className: 'simple-list' }} key={index}>
                  <LI attrLI={{ className: 'clearfix' }}>
                    <div style={{backgroundColor:'#bbdefb', color: 'black'}} className={`message my-message  ${item?.sender !== user?._id
                      ? '' : 'pull-right other-message'}`}>
                      <Image attrImage={{
                        src: `${UserProfile}`
                        , className: `rounded-circle ${item.sender !== user?._id
                          ? 'float-start ' : 'float-end '}chat-user-img img-30`, alt: ''
                      }} />
                      < div className="message-data text-end">
                        <span className="message-data-time">
                        {`+${selectedUserr?.phoneNumber}`}   {(new Date(item?.time)).toLocaleString()}
                        </span>
                      </div>
                      {`${item?.message}`}
                    </div>
                  </LI>
                </UL>
              );
            })
          ) : (
            <Image attrImage={{
              className: 'img-fluid',
              src: `${start_conversion}`,
              alt: 'start conversion '
            }} />
          )}

        </div>
        : (<div className="loading"></div>)
      }
    </Fragment >
  );
};
export default ChatMessage;