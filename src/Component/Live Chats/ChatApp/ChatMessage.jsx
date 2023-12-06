import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Image, LI, UL } from '../../../AbstractElements';
import start_conversion from '../../../assets/images/start-conversion.jpg';
import  UserProfile  from '../../../assets/images/user/userProfile.png';
import { toast } from 'react-toastify';
import { joinSession, sendDataToConnectedUser }  from '../Client/wss';
import appStore from '../Client/AppStore';

const ChatMessage = ({viewConversation,showKeyboard}) => {
  // const chatContainerRef = useRef();
  const user = JSON.parse(sessionStorage.getItem('currentUser'));
  const botImgSrc = 'https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75';

  function formatDateTime(timestamp) {
    const dateObject = new Date(timestamp);
    const timeFormat = dateObject.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const dateFormat = dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return {
      time: timeFormat,
      date: dateFormat,
    };
  }
  useEffect(() => {
    if (showKeyboard === true) {
      toast.success("Live chat connected!");
      // console.log(viewConversation.roomId)
      joinSession(viewConversation.roomId);
    }
  }, []);
  
  // useEffect(() => {
  //   // Scroll to the bottom whenever messages change
  //   chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  // }, [viewConversation]);
  return (
    <Fragment>
      {viewConversation?.chat ?
        <div className="chat-history chat-msg-box custom-scrollbar">
          {viewConversation?.chat && viewConversation?.chat?.length > 0 ? (
            viewConversation?.chat?.map((item, index) => {
              return (
                <UL attrUL={{ className: 'simple-list' }} key={index}>
                  <LI attrLI={{ className: 'clearfix' }}>
                    <div style={{backgroundColor:`${item?.from !== 'AGENT' ? '#EEEEEE' : '#64FFDA' }`, color: 'black'}} className={`message my-message  ${item?.from === "USER"
                      ? '' : 'pull-right other-message'}`}>
                      <Image attrImage={{
                        src: `${item?.from !== 'AGENT' ? UserProfile : botImgSrc }`,
                         className: `rounded-circle ${item?.from === "USER"
                          ? 'float-start ' : 'float-end '}chat-user-img img-30`, alt: ''
                      }} />
                      < div className="message-data text-end">
                        <span className="message-data-time">
                        {`+${item?.from === "USER" ? item?.from : viewConversation?.phoneNumber}`}   {formatDateTime(item.time).time}
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