import React, { Fragment, useContext } from "react";
import { Col, Row } from "reactstrap";
import ChatMessage from "./ChatMessage";
import ChatMenu from "./ChatMenu";
import ChatHeader from "./ChatHeader";
import SendChat from "./SendChat";
import ChatAppContext from "../../../_helper/chat-app";
import { H6, Image, Spinner } from "../../../AbstractElements";
import errorImg from "../../../assets/images/search-not-found.png";
import appStore from "../Client/AppStore";

const Chatting = ({isFetchLiveConversation, viewConversation, showKeyboard, setViewConversation }) => {
  const { liveUser } = useContext(ChatAppContext);
  return (
    <Fragment>
      <Row className="chat-box h-100">
        <Col className="chat-right-aside">
          <div className="chat">

            {
              isFetchLiveConversation ? 
              <div className="loader-box mt-5">
            <Spinner attrSpinner={{ className: "loader-3" }} />
          </div> : 
            <>
            {liveUser ? (
              <>
                <ChatHeader viewConversation={viewConversation}/>
                <ChatMessage
                  viewConversation={viewConversation}
                  showKeyboard={showKeyboard}
                  setViewConversation={setViewConversation}
                />
                <SendChat
              viewConversation={viewConversation}
              showKeyboard={showKeyboard}
              setViewConversation={setViewConversation}
            />
              </>
            ) : (
              <div style={{border: '1px solid none', height: '250px'}} className="mw-100 mh-100 d-flex align-items-center justify-content-center">
              <H6>No Live Chats Available</H6>
              </div>
            )}
            </>
            }
          </div>
        </Col>
        <ChatMenu />
      </Row>
    </Fragment>
  );
};
export default Chatting;
