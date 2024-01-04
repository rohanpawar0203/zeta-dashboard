import React, { Fragment, useContext, useEffect } from 'react';
import ChatAppContext from '../../../_helper/chat-app/index';
import { Image, LI, UL } from '../../../AbstractElements';
import errorImg from '../../../assets/images/search-not-found.png';
import SearchChatList from './SearchChatList';
import CurrentUser from './CurrentUser';
import { Media } from 'reactstrap';
import { FaRegUser } from 'react-icons/fa';
import UserProfile from '../../../assets/images/user/userProfile.png'
import appStore from '../../Live Chats/Client/AppStore';

const ChatStatus = ({}) => {
  const { selectedUserr, memberss, currentUserr, chatss, changeChat, createNewChatAsyn, setCurrentLocationPathName } = useContext(ChatAppContext);
  const userData = JSON.parse(sessionStorage.getItem('currentUser'));
  const { liveConversation, isConnected,  } = appStore();
  const changeChatClick = (e, selectedUserId) => {
    // const currentUserId = currentUserr.id;
    const currentChat = memberss.find(
      (x) =>
        x._id === (selectedUserId)
    );
    if (currentChat) {
      changeChat(selectedUserId);
    } 
    // else {
    //   createNewChatAsyn(currentUserId, selectedUserId, chatss);
    // }
  };
  var activeChat = 0;
  if (selectedUserr != null) activeChat = selectedUserr._id;

  
  return (
    <Fragment>
      <div className="chat-box">
        <div className="chat-left-aside">
          {/* <CurrentUser /> */}
          <h5>All Chats</h5>
          <div className="people-list" id="people-list">
            <SearchChatList />
            {memberss && memberss.length > 0 ? (
              <UL attrUL={{ className: 'simple-list list custom-scrollbar' }}>
                {memberss.filter((x) => x._id !== userData._id).map((item, i) => {
                  return (
                    <LI  attrLI={{
                      className: `clearfix border border-white ${activeChat === item?._id && 'bg-light border-primary'}`,
                      style: {cursor: 'pointer'},
                      onClick: (e) => {
                        activeChat = item._id;
                        changeChatClick(e, item._id)
                      }
                    }} key={i}>
                      <Media className='d-flex align-items-center'>
                       <Image attrImage={{
                        src: `${UserProfile}`,
                        className: 'rounded-circle user-image',
                        alt: ''
                      }}
                      />
                        {/* <div className={`status-circle ${item.online === true ? 'online' : 'offline'}`}
                        ></div> */}
                        <Media body>
                          <div className="about">
                            <div className="name">{item?.phoneNumber}</div>
                            <div className="status">{item?.chat[item?.chat.length - 1]?.message?.slice(0, 25)}</div>
                            </div>
                        </Media>
                      </Media>
                    </LI>
                  );
                })}
              </UL>
            ) : (
              <Image attrImage={{ className: 'img-fluid m-auto', src: errorImg, alt: '' }} />
            )}
          </div>
        </div>
      </div>
    </Fragment >
  );
};
export default ChatStatus;