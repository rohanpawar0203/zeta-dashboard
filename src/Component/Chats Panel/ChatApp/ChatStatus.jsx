import React, { Fragment, useContext, useEffect } from "react";
import ChatAppContext from "../../../_helper/chat-app/index";
import { Image, LI, UL } from "../../../AbstractElements";
import errorImg from "../../../assets/images/search-not-found.png";
import SearchChatList from "./SearchChatList";
import CurrentUser from "./CurrentUser";
import { Media } from "reactstrap";
import { FaRegUser } from "react-icons/fa";
import UserProfile from "../../../assets/images/user/userProfile.png";
import appStore from "../../Live Chats/Client/AppStore";
import axios from "axios";

const ChatStatus = ({}) => {
  const {
    selectedUserr,
    memberss,
    currentUserr,
    chatss,
    changeChat,
    createNewChatAsyn,
    setCurrentLocationPathName,
  } = useContext(ChatAppContext);
  const userData = JSON.parse(sessionStorage.getItem("currentUser"));
  const { liveConversation, isConnected } = appStore();
  const changeChatClick = (e, selectedUserId) => {
    // const currentUserId = currentUserr.id;
    const currentChat = memberss.find((x) => x._id === selectedUserId);
    if (currentChat) {
      changeChat(selectedUserId);
    }
    // else {
    //   createNewChatAsyn(currentUserId, selectedUserId, chatss);
    // }
  };
  const checkMessageType = (data) => {
    // Parse the JSON string
    try {
      const parsedObject = JSON.parse(data);

      // Check if parsedObject has the expected properties
      return parsedObject.message.slice(0, 25);
    } catch (error) {
      return data.slice(0, 25);
    }
  };
  var activeChat = 0;
  if (selectedUserr != null) activeChat = selectedUserr._id;

  // const getName = async (data) => {
  //   console.log("Get Name", data);
  //   try {
  //     await axios
  //       .get(
  //         `${process.env.REACT_APP_API_BASE_URL}/customers/${data.phoneNumber}/${data.userId}`
  //       )
  //       .then((resp) => {
  //         if (resp.data.customer) {
  //           console.log("resp", resp);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error", error);
  //       });
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  // useEffect(async () => {

  //   await getName();
  // }, []);

  return (
    <Fragment>
      <div className="chat-box">
        <div className="chat-left-aside">
          {/* <CurrentUser /> */}
          <h5>All Chats</h5>
          <div className="people-list" id="people-list">
            <SearchChatList />
            {memberss && memberss.length > 0 ? (
              <UL attrUL={{ className: "simple-list list custom-scrollbar" }}>
                {memberss
                  .filter((x) => x._id !== userData._id)
                  .map((item, i) => {
                    return (
                      <LI
                        attrLI={{
                          className: `clearfix border border-white ${
                            activeChat === item?._id &&
                            "bg-light border-primary"
                          }`,
                          style: { cursor: "pointer" },
                          onClick: (e) => {
                            activeChat = item._id;
                            changeChatClick(e, item._id);
                          },
                        }}
                        key={i}
                      >
                        <Media className="d-flex align-items-center">
                          <Image
                            attrImage={{
                              src: `${UserProfile}`,
                              className: "rounded-circle user-image",
                              alt: "",
                            }}
                          />
                          {/* <div className={`status-circle ${item.online === true ? 'online' : 'offline'}`}
                        ></div> */}
                          <Media body>
                            <div className="about">
                              <div className="name">
                                {item?.customer.firstName !== ""
                                  ? `${
                                      item?.customer.firstName +
                                      " " +
                                      item?.customer.lastName
                                    }`
                                  : item?.phoneNumber}
                                <br />
                                <p
                                  style={{
                                    fontSize: "10px",
                                    color: "gray",
                                    lineHeight: 1,
                                  }}
                                >
                                  {item?.chatSessionId}
                                </p>
                              </div>
                              <div className="status">
                                {checkMessageType(
                                  item?.chat[item?.chat.length - 1]?.message
                                )}
                              </div>
                            </div>
                          </Media>
                        </Media>
                      </LI>
                    );
                  })}
              </UL>
            ) : (
              <Image
                attrImage={{
                  className: "img-fluid m-auto",
                  src: errorImg,
                  alt: "",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ChatStatus;
