import React, { Fragment, useContext, useEffect } from "react";
import ChatAppContext from "../../../_helper/chat-app/index";
import { Image, LI, UL } from "../../../AbstractElements";
import errorImg from "../../../assets/images/search-not-found.png";
import SearchChatList from "./SearchChatList";
import { Media } from "reactstrap";
import UserProfile from "../../../assets/images/user/userProfile.png";
import appStore from "../Client/AppStore";

const ChatStatus = ({ checkValid }) => {
  const { liveUser, setliveUser } = useContext(ChatAppContext);
  const { liveConversation, setLiveConversation } = appStore();
  function calculateTimePassed(timestamp) {
    const currentTime = new Date().getTime();
    timestamp = new Date(timestamp).getTime();
    const timeDifference = currentTime - timestamp;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timePassedString = "";
    if (days > 0) return (timePassedString += `${days}d`);
    if (hours > 0) return (timePassedString += `${hours % 24}h`);
    if (minutes > 0) return (timePassedString += `${minutes % 60}m`);
    if (seconds > 0) return (timePassedString += `${seconds % 60}s`);
    return timePassedString;
  }

  var activeChat = 0;
  if (liveUser != null) activeChat = liveUser._id;

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

  useEffect(() => {
    console.log("LiveConversation", liveConversation);
  }, [liveConversation]);

  return (
    <Fragment>
      <div className="chat-box">
        <div className="chat-left-aside">
          {/* <CurrentUser /> */}
          <h5>Your Inbox</h5>
          <div className="people-list" id="people-list">
            <SearchChatList />
            {liveConversation && liveConversation.length > 0 ? (
              <UL attrUL={{ className: "simple-list list custom-scrollbar" }}>
                {liveConversation?.map((item, i) => {
                  return (
                    <LI
                      attrLI={{
                        className: `clearfix border border-white ${
                          activeChat === item?._id && "bg-light border-primary"
                        }`,
                        style: { cursor: "pointer" },
                        onClick: (e) => {
                          activeChat = item._id;
                          checkValid(item);
                          setliveUser(item);
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
                          <div className="w-100 about">
                            <div className="name">
                              {item?.customer.firstName !== ""
                                ? `${
                                    item?.customer.firstName +
                                    " " +
                                    item?.customer.lastName
                                  }`
                                : item?.phoneNumber}
                            </div>
                            <div className="w-100 d-flex justify-content-between align-items-center pe-1">
                              <div className="status">
                                {checkMessageType(
                                  item?.chat[item?.chat.length - 1]?.message
                                )}
                              </div>
                              <div className="status fw-bolder">
                                {calculateTimePassed(
                                  item?.chat[item?.chat.length - 1].time
                                )}
                              </div>
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

/*

*/
