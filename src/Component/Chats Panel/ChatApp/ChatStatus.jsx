import React, { Fragment, useContext, useEffect } from "react";
import ChatAppContext from "../../../_helper/chat-app/index";
import { Image, LI, UL, Spinner, H6 } from "../../../AbstractElements";
import errorImg from "../../../assets/images/search-not-found.png";
import SearchChatList from "./SearchChatList";
import CurrentUser from "./CurrentUser";
import { Media } from "reactstrap";
import { FaRegUser, FaWhatsapp  } from "react-icons/fa";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import UserProfile from "../../../assets/images/user/userProfile.png";
import appStore from "../../Live Chats/Client/AppStore";
import axios from "axios";

const ChatStatus = ({ isFetching }) => {
  const {
    selectedUserr,
    currentUserr,
    chatss,
    changeChat,
    createNewChatAsyn,
    setCurrentLocationPathName,
  } = useContext(ChatAppContext);
  const { chatPanelMsgs, userData } = appStore();
  const changeChatClick = (e, selectedUserId) => {
    // const currentUserId = currentUserr.id;
    console.log("chatPanelMsgs -----> ", chatPanelMsgs);
    const currentChat = chatPanelMsgs.data.find(
      (x) => x._id === selectedUserId
    );
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

  useEffect(() => {
    if (!isFetching) {
      let chatMsgs = chatPanelMsgs?.data?.filter((x) => x._id !== userData._id);
      chatMsgs?.length && changeChat(chatMsgs[0]?._id);
      console.log('chatPanelMsgs["data"] ==>', chatPanelMsgs["data"]);
    }
  }, [isFetching]);

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
      <div className="chat-box" style={{ height: "100%", overflowY: "hidden" }}>
        <div className="chat-left-aside h-100">
          {/* <CurrentUser /> */}
          <h5>All Chats</h5>
          <div className="people-list" id="people-list">
            {isFetching ? (
              <div className="loader-box">
                <Spinner attrSpinner={{ className: "loader-3" }} />
              </div>
            ) : (
              <>
                <SearchChatList />
                {chatPanelMsgs && chatPanelMsgs["data"]?.length > 0 ? (
                  <UL
                    attrUL={{ className: "simple-list list custom-scrollbar" }}
                  >
                    {chatPanelMsgs?.data
                      ?.filter((x) => x._id !== userData._id)
                      .map((item, i) => {
                        return (
                          <LI
                            attrLI={{
                              className: `clearfix border border-white`,
                              style: { cursor: "pointer", paddingBottom: '5px'},
                              onClick: (e) => {
                                activeChat = item._id;
                                changeChatClick(e, item._id);
                              },
                            }}
                            key={i}
                          >
                            <Media style={{border: '1px solid lightgray', borderRadius: "4px",  paddingBottom: '5px'}} className={`d-flex align-items-center ${
                                activeChat === item?._id &&
                                "bg-light border-lightgreen"
                              }`}>
                              {/* <Image
                                attrImage={{
                                  src: `${UserProfile}`,
                                  className: "rounded-circle user-image",
                                  alt: "",
                                }}
                              /> */}
                              {/* <div className={`status-circle ${item.online === true ? 'online' : 'offline'}`}
                        ></div> */}
                              <Media body>
                                <div style={{width: '100%', paddingTop: '5px'}} className="about">
                                  <div className="name">
                                    {item?.customer?.firstName &&
                                    item?.customer?.firstName !== ""
                                      ? `${
                                          item?.customer?.firstName +
                                          " " +
                                          item?.customer?.lastName
                                        }`
                                      : item?.chatSessionId ? `Web User-${item?.chatSessionId?.slice(-4)}` : item?.phoneNumber}
                                    <br />
                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                      <div>
                                      {item?.chatSessionId ? <HiMiniComputerDesktop style={{height: '12px', width: '12px'}}/> : <FaWhatsapp style={{height: '12px', width: '12px'}}/>}
                                      </div>
                                      <div>
                                      <p
                                      style={{
                                        fontSize: "12px",
                                        color: "gray",
                                        lineHeight: 1,
                                      }}
                                    >
                                      {`#${item?.chat?.length}`}
                                    </p>
                                      </div>
                                      <div>
                                      <p
                                      style={{
                                        fontSize: "12px",
                                        color: "gray",
                                        lineHeight: 1,
                                      }}
                                    >
                                      {`${(new Date(`${item?.updatedAt}`)).toLocaleString()?.slice(0, -6 )}${(new Date(`${item?.updatedAt}`)).toLocaleString()?.slice(-2)}`}
                                    </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{
                                        fontSize: "13px",
                                        color: "gray",
                                        marginTop: '2px'
                                      }} className="status">
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
                  <div
                    style={{ border: "1px solid none" }}
                    className="mw-100 mh-100 d-flex align-items-center justify-content-center"
                  >
                    <H6>No Chats Available</H6>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ChatStatus;
