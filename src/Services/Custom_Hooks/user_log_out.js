import { useContext, useEffect } from "react";
import appStore from "../../Component/Live Chats/Client/AppStore";
import ChatAppContext from "../../_helper/chat-app";
import { useNavigate } from "react-router-dom";

const UserLogoutHook = () => {
  appStore.getState().setLiveConversation([]);
  appStore.getState().setChatPanelMsgs([]);
  appStore.getState().clearMessages();
  appStore.getState().setUserData({});
  appStore.getState().setShowTyping(false);
  appStore.getState().setToken('');
  sessionStorage.clear();
  window.location.reload()
};

export default UserLogoutHook;
