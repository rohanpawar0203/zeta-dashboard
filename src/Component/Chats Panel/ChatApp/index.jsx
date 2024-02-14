import React, { Fragment, useContext, useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ChatStatus from "./ChatStatus";
import Chatting from "./Chatting";
import ChatAppContext from "../../../_helper/chat-app";
import DynPagination from "../../../CommonElements/DynamicPagination/DynPagination";
import appStore from "../../Live Chats/Client/AppStore";

const ChatAppContain = () => {
  const { getChatMembersData, isFetching } = useContext(ChatAppContext);
  const {chatPanelMsgs, userData} = appStore();

  const switchPage = async(curPage) => {

  console.log('chatPanelMsgs length ->', chatPanelMsgs?.length);
  console.log('page ->', curPage);
  }

  useEffect(() => {
    getChatMembersData();
  }, []);

  return (
    <Fragment>
      <Container fluid={true}>
        <Row className="border border-black">
          <Col className="call-chat-sidebar">
            <Card>
              <CardBody className="chat-body">
                <ChatStatus isFetching={isFetching} />
              </CardBody>
            </Card>
          </Col>
          <Col className="call-chat-body">
            <Card>
              <CardBody className="p-0">
                <Chatting isFetching={isFetching}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
          {/* <DynPagination data={chatPanelMsgs} switchPage={switchPage}/> */}
      </Container>
    </Fragment>
  );
};
export default ChatAppContain;
