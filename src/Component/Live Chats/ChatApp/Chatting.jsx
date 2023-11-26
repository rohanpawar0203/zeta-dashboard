import React, { Fragment, useContext } from 'react';
import { Col, Row, } from 'reactstrap';
import ChatMessage from './ChatMessage';
import ChatMenu from './ChatMenu';
import ChatHeader from './ChatHeader';
import SendChat from './SendChat';
import ChatAppContext from '../../../_helper/chat-app';
import { Image } from '../../../AbstractElements';
import errorImg from '../../../assets/images/search-not-found.png';
import appStore from '../Client/AppStore';

const Chatting = ({viewConversation,showKeyboard, setViewConversation}) => {
  const { liveUser } = useContext(ChatAppContext);
  console.log('in chatting ', viewConversation);
  return (
    <Fragment>
      <Row className="chat-box">
        <Col className="chat-right-aside">
          <div className="chat">
            {liveUser ? <>
              <ChatHeader />
            <ChatMessage viewConversation={viewConversation}
              showKeyboard={showKeyboard}
              setViewConversation={setViewConversation}/>
            </> : (
              <div style={{height: '375px'}} className='w-100 d-flex justify-content-center align-items-center'>
                <Image attrImage={{ style: {width: '200px', height: '200px', objectFit: 'cover'}, className: 'm-auto', src: errorImg, alt: '' }} />
              </div>
            )}
           { liveUser ? <SendChat viewConversation={viewConversation} showKeyboard={showKeyboard} setViewConversation={setViewConversation}/> : null }
          </div>
        </Col>
        <ChatMenu />
      </Row>
    </Fragment>
  );
};
export default Chatting;