import React, { Fragment } from 'react';
import ChatAppContain from '../../../Component/Chats Panel/ChatApp';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';

const ChatApp = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Chat" title=" Chats Panel" />
      <ChatAppContain />
    </Fragment>
  );
};
export default ChatApp;