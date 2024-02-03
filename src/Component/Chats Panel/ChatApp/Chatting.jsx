import React, { Fragment, useContext } from "react";
import { Col, Row } from "reactstrap";
import ChatMessage from "./ChatMessage";
import ChatMenu from "./ChatMenu";
import ChatHeader from "./ChatHeader";
import SendChat from "./SendChat";
import ChatAppContext from "../../../_helper/chat-app";
import { Image, Spinner } from "../../../AbstractElements";
import errorImg from "../../../assets/images/search-not-found.png";

const Chatting = ({isFetching}) => {
  const {
    selectedUserr,
    memberss,
    currentUserr,
    chatss,
    changeChat,
    createNewChatAsyn,
  } = useContext(ChatAppContext);

  return (
    <Fragment>
      <Row className="chat-box">
        <Col className="chat-right-aside">
          <div className="chat">
            { isFetching ? 
            (<div className="loader-box mt-5">
            <Spinner attrSpinner={{ className: "loader-3" }} />
          </div>) : 
          selectedUserr && (
            <>
              <ChatHeader />
              <ChatMessage />
            </>
          )
          }
          </div>
        </Col>
        <ChatMenu />
      </Row>
    </Fragment>
  );
};
export default Chatting;
