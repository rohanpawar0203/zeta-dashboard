import React, { Fragment, useEffect, useState } from "react";
import { Col, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import { VscSend } from "react-icons/vsc";
import ChatHeader from "./ChatHeader";
import ScrollBar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import { BotCreate } from "../../../../../api";
import {
  createOrConnectRoom,
  sendDataToConnectedUser,
} from "../../../../Live Chats/Client/wss";
import appStore from "../../../../Live Chats/Client/AppStore";
import { getSessionId } from "../../../../Bots/sessionSetup";
const BigBot = ({ myBot }) => {
  const {
    messages,
    setMessages,
    setBotDetails,
    botDetails,
    roomId,
    showTyping,
    liveConversation,
  } = appStore.getState();
  // const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const botAvatar =
    "https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75";

  // const sendMessageToBot = async () => {
  //   const sendData = {
  //     sessionId: `${user?.contact}@c.us`,
  //     roomId: `${user?.contact}@c.us`,
  //     message: userMessage,
  //     phoneNumber: `${user?.contact}`,
  //     organization_id: myBot.userId,
  //     type: myBot.botType,
  //     botId: myBot._id
  //   };

  //   setMessages((prev) => [...prev, { text: userMessage, user: true }]);

  //   setUserMessage("");

  //   try {
  //     const response = await fetch(`${BotCreate}/chat`, {
  //       method: "POST",
  //       body: JSON.stringify(sendData),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const responseData = await response.json();
  //     if (response.ok) {
  //       if (responseData.response.message) {
  //         setMessages((prev) => [
  //           ...prev,
  //           { text: responseData.response.message, user: false },
  //         ]);
  //         console.log('messages ', messages);
  //       }
  //     } else {
  //       toast.error(responseData.response.message || responseData.message);
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const sendMessageToBot = async () => {
    // console.log(
    //   "getSessionId",
    //   getSessionId(sessionStorage.getItem("sessionUUID"))
    // );
    const sendData = {
      identity: "USER",
      message: userMessage,
      roomId: getSessionId(sessionStorage.getItem("sessionUUID")),
      organization_id: "6560dd4d0ae6f208b594f9e8",
      type: "csv",
      time: "",
    };
    sendDataToConnectedUser(sendData);
    setMessages(userMessage, true);

    setUserMessage("");
  };

  useEffect(() => {
    createOrConnectRoom();
  }, [myBot]);

  return (
    <Fragment>
      <div
        style={{
          width: "350px",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          zIndex: "3",
          background: "white",
        }}
        className="d-flex flex-column"
      >
        <ChatHeader myBot={myBot} />
        <ScrollBar>
          <div
            style={{
              height: "250px",
              padding: "15px",
              border: "1px solid none",
            }}
            className="w-100"
          >
            <div className="d-flex jusify-content-end align-items-center mb-1">
              <img
                src="https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75"
                alt=""
                width="30px"
                height="30px"
              />
              <p
                style={{ background: "whitesmoke" }}
                className="mx-2 p-2 rounded"
              >
                {myBot?.welcomeMessage}
              </p>
            </div>
            {messages.map((ele, ind) => (
              <div
                key={ind}
                className={`d-flex jusify-content-end align-items-center mb-1 ${
                  ele?.user ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <img
                  src={`${ele?.user ? myBot.companyLogo : botAvatar}`}
                  alt={`${ele?.user ? "user avatar" : "bot avatar"}`}
                  width="30px"
                  height="30px"
                />
                <p
                  style={{ background: "whitesmoke" }}
                  className="mx-2 p-2 rounded"
                >
                  {ele.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollBar>

        <div
          style={{
            borderBottomRightRadius: "25px",
            borderBottomLeftRadius: "25px",
          }}
          className="border border-lightgray p-2"
        >
          <div
            style={{
              zIndex: "2",
              paddding: "5px",
              borderRadius: "25px",
              border: `1px solid ${myBot?.accentColor}`,
            }}
            className="d-flex"
          >
            <Input
              onChange={(e) => {
                setUserMessage(e.target.value);
              }}
              defaultValue={userMessage}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!userMessage) {
                    toast.error("Please enter message to send!");
                  } else {
                    sendMessageToBot();
                  }
                }
              }}
              style={{ border: "none", borderRadius: "25px" }}
              className="form-control"
              type="text"
              aria-label="Amount (to the nearest dollar)"
              placeholder="Send Message..."
            />
            <InputGroupText
              onClick={() => {
                if (!userMessage) {
                  toast.error("Please enter message to send!");
                } else {
                  sendMessageToBot();
                }
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: `${myBot?.accentColor}`,
              }}
            >
              <VscSend className="text-white fw-bolder" />
            </InputGroupText>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BigBot;
