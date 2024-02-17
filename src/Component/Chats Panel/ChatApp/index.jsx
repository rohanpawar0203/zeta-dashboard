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
        {/* <div style={{height: '63vh'}}> */}
        <Row>
          <Col className="call-chat-sidebar" style={{height: "63vh"}}>
            <Card>
              <CardBody className="chat-body" style={{height: '63vh',border: '1px solid none'}}>
                <ChatStatus isFetching={isFetching} />
              </CardBody>
            </Card>
          </Col>
          <Col className="call-chat-body"  style={{height: "63vh"}}>
            <Card>
              <CardBody className="p-0" style={{height: '63vh',border: '1px solid none'}}>
                <Chatting isFetching={isFetching} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* </div> */}
        { 
        chatPanelMsgs['total_count'] && (
          <div className="pagination">
          <div
          style={{
            borderRadius: "6px",
            marginTop: "4px",
            height: "auto",
            border: "1px solid none",
            backgroundColor: "white",
          }}
          className="w-100 d-flex align-items-center justify-content-center"
        >
          <DynPagination totalCount={chatPanelMsgs['total_count']} switchPage={getChatMembersData} />
        </div>
        </div>

        )
        }
      </Container>
    </Fragment>
  );
};
export default ChatAppContain;
