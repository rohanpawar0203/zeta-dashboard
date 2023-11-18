import React, { Fragment } from 'react';
import ChatAppContain from '../../../Component/Live Chats/ChatApp';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';

const ChatApp = () => {
  return (
    <Fragment>
      <Breadcrumbs parent="Chat" title="Live Chats" />
      <ChatAppContain />
    </Fragment>
  );
};
export default ChatApp;