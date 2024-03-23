import React, { Fragment, useContext, useEffect, useRef } from "react";
import ChatAppContext from "../../../_helper/chat-app/index";
import { Image, LI, UL } from "../../../AbstractElements";
import start_conversion from "../../../assets/images/start-conversion.jpg";
import UserProfile from "../../../assets/images/user/userProfile.png";
import moment from "moment-timezone";
import customerService from "../../../assets/images/dashboard/icons8-customer-support-100.png";
import CustomProducts from "../../../CommonElements/CustomProduct/CustomProduct";

const ChatMessage = () => {
  const chatContainerRef = useRef();
  const {
    allMemberss,
    chatss,
    selectedUserr,
    chatPanelMsgs,
    currentUserr,
    fetchChatMemberAsyn,
    fetchChatAsyn,
  } = useContext(ChatAppContext);
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const botImgSrc =
    "https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75";

  const selectedChat = selectedUserr?.chat ? selectedUserr?.chat : [];
  var activeChat = 0;
  if (selectedUserr != null) activeChat = selectedUserr.id;
  var images = require.context("../../../assets/images", true);
  const dynamicImage = (image) => {
    return images(`./${image}`);
  };
  const getLocaleTime = (utcTimestamp) => {
    return moment
      .utc(utcTimestamp)
      .tz("Asia/Kolkata")
      .format("DD-MM-YYYY h:mm a");
  };

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

  const isProductsExist = (chat) => {
    try {
      const itemParsed  = JSON.parse(chat);
      const products = itemParsed?.productList;
      return products?.length ? (CustomProducts(products)) : '';
    } catch (error) {
      console.log('chat msg parse error ==>', error);
    }
  }

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    isProductsExist()
    console.log('selectedChat==>', selectedChat);
  }, [selectedChat, chatPanelMsgs]);
  return (
    <Fragment>
      {allMemberss && chatss && selectedUserr ? (
        <div ref={chatContainerRef} className="chat-history chat-msg-box custom-scrollbar" style={{ maxHeight: "85%" }}>
          {selectedChat && selectedChat.length > 0
            ? selectedChat.map((item, index) => {
                return (
                  <UL attrUL={{ className: "simple-list" }} key={index}>
                    <LI attrLI={{ className: "clearfix" }}>
                      <div
                        style={{
                          backgroundColor: `${
                            item?.from === "BOT"
                              ? "#64FFDA"
                              : item?.from === "USER"
                              ? "#FAFAFA"
                              : "#E0F7FA"
                          }`,
                          color: "black",
                        }}
                        className={`message my-message  ${
                          item?.from === "USER"
                            ? ""
                            : "pull-right other-message"
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
                              item?.from === "USER"
                                ? "float-start "
                                : "float-end "
                            }chat-user-img img-30`,
                            alt: "",
                          }}
                        />
                        <div className="message-data text-end">
                          <span className="message-data-time">
                            {`${item?.from}`} {getLocaleTime(item.time)}
                          </span>
                        </div>
                        {`${checkMessageType(item?.message)}`}
                        {isProductsExist(item?.message)}
                        {/* {console.log("message", item?.message)} */}
                      </div>
                    </LI>
                  </UL>
                );
              })
            : ""}
        </div>
      ) : (
        <div className="loading"></div>
      )}
    </Fragment>
  );
};
export default ChatMessage;