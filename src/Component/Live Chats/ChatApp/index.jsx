import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ChatStatus from "./ChatStatus";
import Chatting from "./Chatting";
import { toast } from "react-toastify";
import { getLiveRooms, getRoomExists } from "../../Live Chats/Client/wss";
import AutomaiteBackend from "../../Agents/components/automaiteBackend";
import appStore from "../Client/AppStore";

const ChatAppContain = () => {
  const {
    liveConversation,
    isConnected,
    setCurrentLocationPathName,
    viewConversation,
    setViewConversation,
    isFetchLiveConversation,
  } = appStore();
  const [isFetchingLiveConvers, setisFetchingLiveConvers] = useState(false);
  const [error, setError] = useState(false);

  const checkValid = async (el) => {
    try {
      console.log("checkValid", el);
      if (el) {
        const resp = await getRoomExists(el.chatSessionId);
        console.log("roomExists");
        if (resp.roomExists) {
          setViewConversation(el);
        } else {
          setError(true);
        }
      }
    } catch (error) {
      // toast.error("Please try in a while !");
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("First useEffect triggered");
    setCurrentLocationPathName(window.location.pathname);
    if (liveConversation?.length) {
    }
    (async () => {
      try {
        if (liveConversation.length === 0) {
          getLiveRooms();
        }
      } catch (error) {
        console.log("Error", error);
      }
    })();
  }, [liveConversation]);

  useEffect(() => {
    // console.log("Second useEffect triggered");

    setViewConversation({});
    // console.log("notified");
  }, []);
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col className="call-chat-sidebar">
            <Card style={{ height: "90%", overflowY: "hidden" }}>
              <CardBody className="chat-body">
                <ChatStatus
                  isFetchLiveConversation={isFetchLiveConversation}
                  checkValid={checkValid}
                  viewConversation={viewConversation}
                  setViewConversation={setViewConversation}
                />
              </CardBody>
            </Card>
          </Col>
          <Col className="call-chat-body">
            <Card style={{ height: "90%" }}>
              <CardBody className="p-0 h-100">
                <Chatting
                  isFetchLiveConversation={isFetchLiveConversation}
                  viewConversation={viewConversation}
                  showKeyboard={true}
                  setViewConversation={setViewConversation}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default ChatAppContain;
