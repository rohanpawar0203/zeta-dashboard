import React, { Fragment, useContext, useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ChatStatus from "./ChatStatus";
import Chatting from "./Chatting";
import ChatAppContext from "../../../_helper/chat-app";

const ChatAppContain = () => {
  const { getChatMembersData, isFetching } = useContext(ChatAppContext);

  useEffect(() => {
    getChatMembersData();
  }, []);

  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col className="call-chat-sidebar">
            <Card style={{ height: "90%", overflowX: "scroll" }}>
              <CardBody className="chat-body">
                <ChatStatus isFetching={isFetching} />
              </CardBody>
            </Card>
          </Col>
          <Col className="call-chat-body" style={{ height: "77vh" }}>
            <Card style={{ height: "90%", overflowX: "scroll" }}>
              <CardBody className="p-0">
                <Chatting isFetching={isFetching}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default ChatAppContain;
