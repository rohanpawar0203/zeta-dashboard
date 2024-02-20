import React, { Fragment, useContext } from "react";
import { Col, Row } from "reactstrap";
import ChatMessage from "./ChatMessage";
import ChatMenu from "./ChatMenu";
import ChatHeader from "./ChatHeader";
import SendChat from "./SendChat";
import ChatAppContext from "../../../_helper/chat-app";
import { H6, Image, Spinner } from "../../../AbstractElements";
import errorImg from "../../../assets/images/search-not-found.png";

const Chatting = ({ isFetching }) => {
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
      <Row className="chat-box" style={{ height: "100%", overflow: "hidden" }}>
        <Col className="chat-right-aside h-100">
          <div className="chat h-100">
            {isFetching ? (
              <div className="loader-box mt-5">
                <Spinner attrSpinner={{ className: "loader-3" }} />
              </div>
            ) : selectedUserr ? (
              <>
                <ChatHeader />
                <ChatMessage />
              </>
            ) : (
              <div
                style={{ border: "1px solid none", height: "250px" }}
                className="mw-100 mh-100 d-flex align-items-center justify-content-center"
              >
                <H6>No Chats Available</H6>
              </div>
            )}
          </div>
        </Col>
        <ChatMenu />
      </Row>
    </Fragment>
  );
};
export default Chatting;
