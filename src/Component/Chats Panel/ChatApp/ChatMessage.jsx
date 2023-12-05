import React, { Fragment, useContext, useEffect, useRef } from 'react';
import ChatAppContext from '../../../_helper/chat-app/index';
import { Image, LI, UL } from '../../../AbstractElements';
import start_conversion from '../../../assets/images/start-conversion.jpg';
import  UserProfile  from '../../../assets/images/user/userProfile.png';

const ChatMessage = () => {
  const chatContainerRef = useRef();
  const { allMemberss, chatss, selectedUserr, currentUserr, fetchChatMemberAsyn, fetchChatAsyn, } = useContext(ChatAppContext);
  const user = JSON.parse(sessionStorage.getItem('currentUser'));
  const botImgSrc = 'https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75';

  const selectedChat = selectedUserr?.chat ? selectedUserr?.chat : [];
  var activeChat = 0;
  if (selectedUserr != null) activeChat = selectedUserr.id;
  var images = require.context('../../../assets/images', true);
  const dynamicImage = (image) => {
    return images(`./${image}`);
  };
  useEffect(() => {
    // Scroll to the bottom whenever messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [selectedChat]);
  return (
    <Fragment>
      {allMemberss && chatss && selectedUserr ?
        <div ref={chatContainerRef} className="chat-history chat-msg-box custom-scrollbar">
          {selectedChat && selectedChat.length > 0 ? (
            selectedChat.map((item, index) => {
              return (
                <UL attrUL={{ className: 'simple-list' }} key={index}>
                  <LI attrLI={{ className: 'clearfix' }}>
                    <div style={{backgroundColor:`${item?.from !== 'BOT' ? '#EEEEEE' : '#64FFDA' }`, color: 'black'}} className={`message my-message  ${item?.from !== "BOT"
                      ? '' : 'pull-right other-message'}`}>
                      <Image attrImage={{
                        src: `${item?.from !== 'BOT' ? UserProfile : botImgSrc }`,
                        className: `rounded-circle ${item?.from !== "BOT"
                          ? 'float-start ' : 'float-end '}chat-user-img img-30`, alt: ''
                      }} />
                      < div className="message-data text-end">
                        <span className="message-data-time">
                        {`${item?.from}`}   {(new Date(item?.time)).toLocaleString()}
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