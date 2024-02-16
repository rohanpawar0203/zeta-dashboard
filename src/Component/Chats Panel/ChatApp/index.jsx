import React, { Fragment, useContext, useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ChatStatus from "./ChatStatus";
import Chatting from "./Chatting";
import ChatAppContext from "../../../_helper/chat-app";
import DynPagination from "../../../CommonElements/DynamicPagination/DynPagination";
import appStore from "../../Live Chats/Client/AppStore";
import ScrollBar from "react-perfect-scrollbar";

const ChatAppContain = () => {
  const { getChatMembersData, isFetching } = useContext(ChatAppContext);
  const { chatPanelMsgs, userData } = appStore();

  const scrollbarOptions = {
    suppressScrollX: true, // Set this to true to disable horizontal scrolling
  };

  useEffect(() => {
    getChatMembersData();
  }, []);

  return (
    <Fragment>
      <Container fluid={true}>
        {/* <div
          style={{
            width: "100%",
            height: "63vh",
            border: "1px solid black",
            overflow: "hidden",
          }}
        > */}
        {/* <ScrollBar options={scrollbarOptions}> */}
        {/* <div style={{ height: "80%" }}> */}
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
        {/* </div> */}
        {/* </ScrollBar> */}
        {/* </div> */}
      </Container>
      {/* <div
        style={{
          borderRadius: "6px",
          marginTop: "8px",
          height: "35px",
          border: "1px solid yellow",
          backgroundColor: "white",
        }}
        className="p-1 w-100 d-flex align-items-center justify-content-center"
      >
        <DynPagination data={chatPanelMsgs} switchPage={getChatMembersData} />
      </div> */}
    </Fragment>
  );
};
export default ChatAppContain;
