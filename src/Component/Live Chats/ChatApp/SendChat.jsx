import React, { useContext, useState } from 'react';
import { Col, Input, InputGroup, Row } from 'reactstrap';
import Picker from 'emoji-picker-react';
import { Send } from '../../../Constant/index';
import ChatAppContext from '../../../_helper/chat-app/index';
import { Btn, Image } from '../../../AbstractElements';
import { joinSession, sendDataToConnectedUser }  from '../Client/wss';
import appStore from '../Client/AppStore';
import { toast } from 'react-toastify';

const SendChat = ({viewConversation,showKeyboard, setViewConversation}) => {
  const { liveConversation, setLiveConversation} = appStore();

  const [msg, setMsg] = useState("");

  const handleMessageChange = (message) => {
    setMsg(message);
  }
  const handleMessagePress = (e) => {
    if(e.key === 'Enter'){
      if(!msg || msg === ''){
        toast.error('Please enter valid message text !');
      }else{
        sendMsg();
      }
    }
  }

  function getCustomTimestamp() {
    const currentTimeMs = Date.now();
    return currentTimeMs;
  }
  const sendMsg = () => {
    sendDataToConnectedUser({
      message: msg,
      phoneNumber: viewConversation.phoneNumber,
      time: getCustomTimestamp(),
      // chatSessionId: viewConversation.chatSessionId,
      roomId: viewConversation.chatSessionId,
      identity: "AGENT",
      productList: [],
      productData: [],
    });
    const newArray = liveConversation.map((el) => {
      if (el.chatSessionId === viewConversation.chatSessionId) {
        el.chat = [
          ...el.chat,
          { time: getCustomTimestamp(), message: msg, from: "AGENT" },
        ];
      }
      return el;
    });
    setMsg("");
    setLiveConversation(newArray);
    // setLoading(false);
  };
  return (
    <div className="chat-message clearfix">
      <Row>
        <div>
        </div>
        <Col xl="12" className="d-flex">
          <div className="smiley-box bg-primary">
            <div className="picker">
              <Image attrImage={{ src: `${require('../../../assets/images/smiley.png')}`, alt: '' }} /></div>
          </div>
          <InputGroup className="text-box">
            <Input
              type="text"
              className="form-control input-txt-bx"
              placeholder="Type a message......"
              defaultValue={msg}
              onKeyPress={(e) => handleMessagePress(e)}
              onChange={(e) => handleMessageChange(e.target.value)} />
            <Btn attrBtn={{ color: 'primary', onClick: () => sendMsg(), disabled: !msg || msg === '' }}>
              {Send}
            </Btn>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default SendChat;