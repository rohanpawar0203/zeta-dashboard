import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Image, LI, UL } from "../../../AbstractElements";
import start_conversion from "../../../assets/images/start-conversion.jpg";
import UserProfile from "../../../assets/images/user/userProfile.png";
import customerService from "../../../assets/images/dashboard/icons8-customer-support-100.png";
import { toast } from "react-toastify";
import { joinSession, sendDataToConnectedUser } from "../Client/wss";
import appStore from "../Client/AppStore";

const ChatMessage = ({ viewConversation, showKeyboard }) => {
  const chatContainerRef = useRef(null);
  const { liveConversation } = appStore();
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const botImgSrc =
    "https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75";

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
    // console.log("showKeyboard", showKeyboard);
    if (showKeyboard === true) {
      joinSession(viewConversation.roomId);
    }
  }, [showKeyboard]);

  const checkMessageType = (data) => {
    // Parse the JSON string
    try {
      const parsedObject = JSON.parse(data);

      // Check if parsedObject has the expected properties
      return parsedObject.message;
    } catch (error) {
      return data;
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [viewConversation, liveConversation]);
  return (
    <Fragment>
      <div
        ref={chatContainerRef}
        className="chat-history chat-msg-box custom-scrollbar"
      >
        {viewConversation?.chat &&
          viewConversation?.chat?.length > 0 &&
          viewConversation?.chat?.map((item, index) => {
            return (
              <UL attrUL={{ className: "simple-list" }} key={index}>
                <LI attrLI={{ className: "clearfix" }}>
                  <div
                    style={{
                      backgroundColor: `${
                        item?.from === "BOT"
                          ? "#64FFDA"
                          : item?.from === "USER"
                          ? "#EEEEEE"
                          : "whitesmoke"
                      }`,
                      color: "black",
                    }}
                    className={`message my-message  ${
                      item?.from === "USER" ? "" : "pull-right other-message"
                    }`}
                  >
                    <Image
                      attrImage={{
                        src: `${
                          item?.from === "BOT"
                            ? botImgSrc
                            : item?.from === "AGENT"
                            ? customerService
                            : UserProfile
                        }`,
                        className: `rounded-circle ${
                          item?.from === "USER" ? "float-start " : "float-end "
                        }chat-user-img img-30`,
                        alt: "",
                      }}
                    />
                    <div className="message-data text-end">
                      <span className="message-data-time">
                        {`${
                          item?.from === "USER"
                            ? viewConversation?.phoneNumber
                            : item?.from
                        }`}{" "}
                        {formatDateTime(item.time).time}
                      </span>
                    </div>
                    {`${checkMessageType(item?.message)}`}
                  </div>
                </LI>
              </UL>
            );
          })}
      </div>
    </Fragment>
  );
};
export default ChatMessage;
