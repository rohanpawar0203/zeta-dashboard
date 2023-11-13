import React, { Fragment, useContext } from 'react';
import { Col, Row, } from 'reactstrap';
import ChatMessage from './ChatMessage';
import ChatMenu from './ChatMenu';
import ChatHeader from './ChatHeader';
import SendChat from './SendChat';
import ChatAppContext from '../../../_helper/chat-app';

const Chatting = () => {
  const { selectedUserr, memberss, currentUserr, chatss, changeChat, createNewChatAsyn } = useContext(ChatAppContext);

  return (
    <Fragment>
      <Row className="chat-box">
        <Col className="chat-right-aside">
          <div className="chat">
           
            {selectedUserr ? <>
              <ChatHeader />
            <ChatMessage />
            </> : (
            <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <h3 className='my-2'>Ulai</h3>
            <h4 className='my-2'>Chat Now!</h4>
          </div>
            )}
            {/* <SendChat /> */}
          </div>
        </Col>
        <ChatMenu />
      </Row>
    </Fragment>
  );
};
export default Chatting;