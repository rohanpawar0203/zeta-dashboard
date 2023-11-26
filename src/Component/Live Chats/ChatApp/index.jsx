import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ChatStatus from './ChatStatus';
import Chatting from './Chatting';
import { toast } from 'react-toastify';
import { getLiveRooms, getRoomExists} from '../../Live Chats/Client/wss' ;
import AutomaiteBackend from '../../Agents/components/automaiteBackend';
import appStore from '../Client/AppStore';


const ChatAppContain = () => {
  const { liveConversation, isConnected, setCurrentLocationPathName } = appStore();
  const [viewConversation, setViewConversation] = useState("");
  const [error, setError] = useState(false);

  const checkValid = async (el) => {
    try {
      const resp = await getRoomExists(el.chatSessionId);
      if (resp.roomExists) {
        setViewConversation(el);
        console.log("viewConversation ", viewConversation);
      } else {
        setError(true);
      }
    } catch (error) {
      toast.error("Please try in a while !")
      console.log(error)
    }
  };

  useEffect(() => {
    setCurrentLocationPathName(window.location.pathname);
    (async () => {
      try {
        if (liveConversation.length === 0) {
          getLiveRooms();
        }
      } catch (error) {
        console.log("Error", error);
      }
    })();
  }, []);

  useEffect(() => {
    setViewConversation("");
  }, [isConnected]);
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col className="call-chat-sidebar">
            <Card>
              <CardBody className="chat-body">
                <ChatStatus checkValid={checkValid} viewConversation={viewConversation} setViewConversation={setViewConversation}/>
              </CardBody>
            </Card>
          </Col>
          <Col className="call-chat-body">
            <Card>
              <CardBody className="p-0">
                <Chatting viewConversation={viewConversation}
                 showKeyboard={true}
                 setViewConversation={setViewConversation}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default ChatAppContain;