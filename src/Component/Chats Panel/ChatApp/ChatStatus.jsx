import React, { Fragment, useContext, useEffect } from "react";
import ChatAppContext from "../../../_helper/chat-app/index";
import { Image, LI, UL, Spinner, H6 } from "../../../AbstractElements";
import errorImg from "../../../assets/images/search-not-found.png";
import SearchChatList from "./SearchChatList";
import CurrentUser from "./CurrentUser";
import { Media } from "reactstrap";
import { FaRegUser, FaWhatsapp } from "react-icons/fa";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import UserProfile from "../../../assets/images/user/userProfile.png";
import appStore from "../../Live Chats/Client/AppStore";
import axios from "axios";

export const customStyles = {
  listItem: { cursor: "pointer", paddingBottom: "5px" },
  mediaContainer: {
    border: "1px solid lightgray",
    borderRadius: "4px",
    paddingBottom: "5px",
  },
  selectedMsg: "bg-light border-lightgreen",
  iconStyles: { height: "12px", width: "12px" },
  chatInfoTxt: { fontSize: "12px", color: "gray", lineHeight: 1, fontWeight:'normal'},
  msgLineTxt: { fontSize: "13px", color: "gray", marginTop: "0px" },
  aboutStyle: { width: "100%", paddingTop: "5px" },
};

export const getLocaleTimeFormat = (date) => {
  const timeFormOption = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // hour12: true,
  };
  return `${new Date(`${date}`).toLocaleString("en-IN", timeFormOption)}`;
};

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
    // console.log("chatPanelMsgs -----> ", chatPanelMsgs);
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
      // console.log('chatPanelMsgs["data"] ==>', chatPanelMsgs["data"]);
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
          <div
            className="people-list"
            id="people-list"
            style={{ height: "100%" }}
          >
            {isFetching ? (
              <div className="loader-box">
                <Spinner attrSpinner={{ className: "loader-3" }} />
              </div>
            ) : (
              <>
                <SearchChatList />
                {chatPanelMsgs && chatPanelMsgs["data"]?.length > 0 ? (
                  <UL
                    attrUL={{
                      className:
                        "simple-list list custom-scrollbar chat-panel-scroll-bar",
                    }}
                  >
                    {chatPanelMsgs?.data
                      ?.filter((x) => x._id !== userData._id)
                      .map((item, i) => {
                        return (
                          <LI
                            attrLI={{
                              className: `clearfix border border-white`,
                              style: customStyles?.listItem,
                              onClick: (e) => {
                                activeChat = item._id;
                                changeChatClick(e, item._id);
                              },
                            }}
                            key={i}
                          >
                            <Media
                              style={customStyles?.mediaContainer}
                              className={`d-flex align-items-center ${
                                activeChat === item?._id &&
                                `${customStyles?.selectedMsg}`
                              }`}
                            >
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
                                <div
                                  style={customStyles?.aboutStyle}
                                  className="about"
                                >
                                  <div className="name">
                                    <div className="w-100 d-flex justify-content-between align-items-center pe-2">
                                    <span>
                                    {item?.customer?.firstName &&
                                    item?.customer?.firstName !== ""
                                      ? `${
                                          item?.customer?.firstName +
                                          " " +
                                          item?.customer?.lastName
                                        }`
                                      : item?.chatSessionId
                                      ? `Web User-${item?.chatSessionId?.slice(
                                          -4
                                        )}`
                                      : item?.phoneNumber}
                                    </span>
                                    <div>
                                        <p style={customStyles?.chatInfoTxt}>
                                          {getLocaleTimeFormat(
                                            `${item?.updatedAt}`
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div style={{width: '35%'}} className="d-flex justify-content-between align-items-center">
                                      <div>
                                        {(item?.customer?.firstName &&
                                        item?.customer?.firstName !== "") ? (
                                          <FaWhatsapp
                                            style={customStyles?.iconStyles}
                                          />
                                        ) : (
                                          <HiMiniComputerDesktop 
                                            style={customStyles?.iconStyles}
                                          />
                                        )}
                                      </div>
                                      <div>
                                        <p style={customStyles?.chatInfoTxt}>
                                          {`#${item?.chat?.length}`}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={customStyles?.msgLineTxt}
                                    className="status"
                                  >
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
