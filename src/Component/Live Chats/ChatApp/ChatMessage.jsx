import React, { Fragment, useContext, useEffect } from 'react';
import ChatAppContext from '../../../_helper/chat-app/index';
import { Image, LI, UL } from '../../../AbstractElements';
import start_conversion from '../../../assets/images/start-conversion.jpg';
import  UserProfile  from '../../../assets/images/user/userProfile.png';
import { toast } from 'react-toastify';
import { joinSession } from '../Client/wss';
import appStore from '../Client/AppStore';

const ChatMessage = ({viewConversation,showKeyboard, setViewConversation}) => {
  const { allMemberss, chatss, selectedUserr, currentUserr, fetchChatMemberAsyn, fetchChatAsyn} = useContext(ChatAppContext);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const { liveConversation, setLiveConversation} = appStore();
  ;
  const selectedChat = selectedUserr?.chat ? selectedUserr?.chat : [];
  var activeChat = 0;
  if (selectedUserr != null) activeChat = selectedUserr.id;
  var images = require.context('../../../assets/images', true);
  const dynamicImage = (image) => {
    return images(`./${image}`);
  };
  
  
  useEffect(() => {
    if (showKeyboard == true) {
      toast.success("Live chat connected!");
      // console.log(viewConversation.roomId)
      joinSession(viewConversation.roomId);
    }
  }, []);

  return (
    <Fragment>
      {viewConversation?.chat ?
        <div  className="chat-history chat-msg-box custom-scrollbar">
          {viewConversation?.chat && viewConversation?.chat?.length > 0 ? (
            viewConversation?.chat?.map((item, index) => {
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
                        {`+${item?.phoneNumber}`}   {(new Date(item?.time)).toLocaleString()}
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