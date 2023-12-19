import React, { Fragment, useEffect, useRef, useState } from "react";
import { Col, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import { VscSend } from "react-icons/vsc";
import ChatHeader from "./ChatHeader";
import ScrollBar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import { BotCreate } from "../../../../../api";
import Lottie from 'react-lottie';
import animationData from '../../../../../assets/json/lotties/Animation - 1701895887722.json';
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
  } = appStore();
  // const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const chatContainerRef = useRef();
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const botAvatar =
    "https://bot.writesonic.com/_next/image?url=https%3A%2F%2Fwritesonic-frontend.s3.us-east-1.amazonaws.com%2Ffrontend-assets%2Ftemplates-new%2FBotsonicNew.png&w=96&q=75";

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

  const sendMessageToBot = async () => {
    const sendData = {
      identity: "USER",
      message: userMessage,
      roomId: getSessionId(sessionStorage.getItem("sessionUUID")),
      organization_id: user?.store?.id,   // 
      type: "csv",
      time: "",
    };
    sendDataToConnectedUser(sendData);
    setMessages(userMessage, true);
    setUserMessage('');
  };

  useEffect(() => {
    createOrConnectRoom();
  }, [myBot]);
  
  useEffect(() => {
    // Scroll to the bottom whenever messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

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
          <div ref={chatContainerRef}
            style={{
              height: "250px",
              padding: "15px",
              border: "1px solid none",
              overflowY: 'scroll'
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
                className={`d-flex jusify-content-end align-items-center mb-2 ${
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
            
            {showTyping && <div className="w-100 d-flex justify-content-start">
            <div>
            <Lottie options={defaultOptions} height={100} width={100}/>
            </div>
            </div>}
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
            <input value={userMessage}
                style={{ border: "none", borderRadius: "25px" }}
                className="form-control"
                type="text"
                aria-label="Amount (to the nearest dollar)"
                placeholder="Send Message..."
                onChange={(e) => {
                setUserMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!userMessage) {
                    toast.error("Please enter message to send!");
                  } else {
                    sendMessageToBot();
                  }
                }
              }}
              contentEditable
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
