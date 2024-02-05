import React, { Fragment, useContext, useEffect } from "react";
import ChatAppContext from "../../../_helper/chat-app/index";
import { Image, LI, UL, Spinner, H6} from "../../../AbstractElements";
import errorImg from "../../../assets/images/search-not-found.png";
import SearchChatList from "./SearchChatList";
import CurrentUser from "./CurrentUser";
import { Media } from "reactstrap";
import { FaRegUser } from "react-icons/fa";
import UserProfile from "../../../assets/images/user/userProfile.png";
import appStore from "../../Live Chats/Client/AppStore";
import axios from "axios";

const ChatStatus = ({isFetching}) => {
  const {
    selectedUserr,
    currentUserr,
    chatss,
    changeChat,
    createNewChatAsyn,
    setCurrentLocationPathName,
  } = useContext(ChatAppContext);
  const {chatPanelMsgs, userData} = appStore();
  const changeChatClick = (e, selectedUserId) => {
    // const currentUserId = currentUserr.id;
    const currentChat = chatPanelMsgs.find((x) => x._id === selectedUserId);
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
    if(!isFetching){
      let chatMsgs = chatPanelMsgs?.filter((x) => x._id !== userData._id);
      chatMsgs?.length && changeChat(chatMsgs[0]?._id);
    }
  }, [isFetching])
  

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
            {isFetching ? 
            <div className="loader-box">
            <Spinner attrSpinner={{ className: "loader-3" }} />
          </div> :
            <>
            <SearchChatList />
            {chatPanelMsgs && chatPanelMsgs.length > 0 ? (
              <UL attrUL={{ className: "simple-list list custom-scrollbar" }}>
                {chatPanelMsgs
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
                                {item?.customer?.firstName && item?.customer?.firstName !== "" 
                                  ? `${
                                      item?.customer?.firstName +
                                      " " +
                                      item?.customer?.lastName
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
              <div style={{border: '1px solid none'}} className="mw-100 mh-100 d-flex align-items-center justify-content-center">
            <H6>No Chats Available</H6>
             </div>
            )}
            </>
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ChatStatus;
