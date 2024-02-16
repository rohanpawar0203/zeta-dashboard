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
            <Card>
              <CardBody
                className="chat-body"
                style={{ height: "75vh", overflowY: "hidden" }}
              >
                <ChatStatus isFetching={isFetching} />
              </CardBody>
            </Card>
          </Col>
          <Col className="call-chat-body">
            <Card>
              <CardBody
                className="p-0"
                style={{ height: "75vh", overflowY: "hidden" }}
              >
                <Chatting isFetching={isFetching} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default ChatAppContain;
