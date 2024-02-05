import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AgentLiveChatAPI,
  GetConversationsAPI,
  LiveChatsAPI,
} from "../../../api";
import appStore from "./AppStore";
import { getSessionId } from "../../Bots/sessionSetup";
import  UserLogoutHook  from "../../../Services/Custom_Hooks/user_log_out";
const { v4: uuidv4 } = require("uuid");

// import { setLiveConversation } from "../components/dashboard/liveChat/liveChat";
const SERVER = process.env.REACT_APP_API_SERVER;
const user = JSON.parse(sessionStorage.getItem("currentUser"));
const token = sessionStorage.getItem("token");
// const SERVER = `http://localhost:${process.env.REACT_APP_API_AGENT_BACKEND_LOCAL_HOST_PORT}`;

var socket = null;
const { setLiveConversation, liveConversation } = appStore.getState();

export const connectWithSocketIOServer = () => {
  socket = io(SERVER, {
    path: "/agent-live-chat-socket/",
  });

  socket.on("connect", () => {
    appStore.getState().setIsConnected(true);
    agentConnected();
    getLiveRooms();
    // console.log("Bot Connected with Server");
  });
  socket.on("room-id", (data) => {
    const { roomId } = data;
    // console.log(roomId);
  });

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    // console.log(connectedUsers);
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    // console.log("conn-prepare", connUserSocketId);
  });
  socket.on("conn-signal", (data) => {
    // console.log("conn-signal", data);
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    // console.log("conn-init", connUserSocketId);
  });

  socket.on("user-disconnected", (data) => {
    // console.log("Data disconnect", data);
  });

  socket.on("message-recieved", (data) => {
    // console.log("message-recieved", data);
    appStore.getState().setShowTyping(false);
    let newMessage = JSON.parse(data);
    const newArray = appStore.getState().liveConversation.map((el) => {
      if (el.chatSessionId === newMessage.roomId) {
        el.chat = [
          ...el.chat,
          {
            time: newMessage.time,
            message: newMessage.message,
            from: newMessage?.identity,
          },
        ];
      }
      return el;
    });

    if (newMessage.identity === "BOT" || newMessage.identity === "AGENT") {
      appStore.getState().messageType(newMessage);
    }
    appStore.getState().setLiveConversation(newArray.reverse());
  });

  socket.on("disconnect", function () {
    appStore.getState().setIsConnected(false);
    // console.log("client socketio disconnect!");
  });
  socket.on("room-close", function (data) {
    // console.log("roomClose", data);
  });
  socket.on("user-wants-to-chat-agent", function (data) {
    // let roomId = JSON.parse(data);
    // console.log('user want to chat with agent');
    toast.success("New Live Chat for Agent !");
    getLiveRooms();
  });
  socket.on("get-logged-agent-info", function (data) {
  //  console.log('get-logged-agent-info ', data);
  //  console.log('user data' , appStore.getState().userData) 
   handleAgentAutoLogout(data)
  });
};
export const getRoomExists = async (roomId) => {
  // const serverApi = `http://localhost:${process.env.REACT_APP_API_AGENT_BACKEND_LOCAL_HOST_PORT}`;
  const serverApi = `${AgentLiveChatAPI}`;
  const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
  return response.data;
};
export const agentConnected = async () => {
  const data = {
    organization_id: user?.userId
      ? user?.userId //handle for agent
      : user?._id,
    email: user?.email,
  };
  socket.emit("agent-connected", JSON.stringify(data));
};
export const createOrConnectRoom = async (identity) => {
  // console.log("working details", appStore.getState().botDetails);
  let roomId = getSessionId(sessionStorage.getItem("sessionUUID"));
  // console.log("RoomID", roomId);
  const data = {
    identity: "USER",
    defaultConnection: socket.id,
    roomId: roomId,
    organization_id: appStore.getState().botDetails.userId,
  };
  if (!data.organization_id) return;
  if (roomId === undefined || roomId === null || roomId === "null") {
    data.roomId = uuidv4();
    sessionStorage.setItem("connectionId", data.roomId);
  } else {
    const resp = await getRoomExists(roomId);
    if (!resp.roomExists) {
      socket.emit("create-new-room", data);
    }
    appStore.getState().setRoomId(data);
    socket.emit("join-room", data);
    return;
  }
  appStore.getState().setRoomId(data);
  // console.log("createOrConnectRoom", data);
  socket.emit("create-new-room", data);
};

export const joinSession = (roomId) => {
  const data = {
    identity: "AGENT",
    roomId: roomId,
  };
  socket.emit("join-room", data);
};
export const sendDataToConnectedUser = (data) => {
  appStore.getState().setShowTyping(true);
  socket.emit("mssg-sent", JSON.stringify(data));
};
export const getLiveRooms = async () => {
  // const serverApi = `http://localhost:${process.env.REACT_APP_API_AGENT_BACKEND_LOCAL_HOST_PORT}`;
  const serverApi = `${LiveChatsAPI}`;
  const response = await axios.post(`${serverApi}/getChatsForAgent`, {
    organization_id: user?.userId ? user?.userId : user?._id,
    //handle for agent
  });
  appStore.getState().setLiveConversationNewEntry(response.data.rooms);
  setLiveConversations();
};

export const envConversationToServer = async (roomId, name) => {
  // const serverApi = `http://localhost:${process.env.REACT_APP_API_AGENT_BACKEND_LOCAL_HOST_PORT}`;
  const serverApi = `${LiveChatsAPI}`;
  const response = await axios.post(`${serverApi}/endConversation`, {
    roomId: roomId,
  });
  if (response.status === "200" || response.status === 200) {
    getLiveRooms();
    appStore.getState().setViewConversation({});
    toast.success("Conversation got closed");
    informAiBackend(roomId, name);
  }
};

const informAiBackend = async (roomId, name) => {
  try {
    let payload = {
      session_id: roomId,
      event:
        "User has been talking to an agent/customer care/service for a while.Now that conversation has ended.",
      user_name: name,
    };
    const response = await axios.post(
      "https://ulai.in/ai-backend-staging-v1/api/session_event_update",
      {
        data: payload,
      }
    );

    // console.log("informAiBackend", response);
  } catch (error) {
    console.log("Error", error);
  }
};

const setLiveConversations = async () => {

  appStore.getState().setisFetchLiveConversation(true);
  appStore.getState().setConversation([]);
  const liveConversationNewEntry = appStore.getState().liveConversationNewEntry;
  const conversation = appStore.getState().conversation;
  const userData = appStore.getState().userData;
  const token = appStore.getState().token;
  const orgId = userData.userId ? userData.userId : userData._id;
  if (liveConversationNewEntry.length !== 0) {
    if (conversation.length === 0) {
      try {
        const resp = await axios.get(`${GetConversationsAPI}/${orgId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filterArray = resp.data.filter((el) => {
          let flag = false;
          liveConversationNewEntry.forEach((element) => {
            if (element.roomId === el.chatSessionId) {
              flag = true;
            }
          });
          if (flag) {
            return el;
          }
        });
        appStore.getState().setLiveConversation(filterArray.reverse());
        appStore.getState().setConversation(resp.data);
      } catch (error) {
        console.log("Error", error);
      }
    } // comment reason: for fetching latest live conversation
    //  else {
    //   console.log('conversation length > 0', conversation);
    //   const filterArray = conversation.filter((el) => {
    //     let flag = false;
    //     liveConversationNewEntry.forEach((element) => {
    //       if (element.roomId === el.chatSessionId) {
    //         flag = true;
    //       }
    //     });
    //     if (flag) {
    //       return el;
    //     }
    //   });
    //   appStore.getState().setLiveConversation(filterArray.reverse());
    //   console.log('setLiveConversations 2', appStore.getState().liveConversation);
    // }
  }
  appStore.getState().setisFetchLiveConversation(false);
};

export const sendLoggedAgentInfo = (agent_data) => {
  // console.log('sendLoggedAgentInfo ' , agent_data);
  socket.emit('agent-logged-in', agent_data);
}

const handleAgentAutoLogout = (loggedAgent) => {
  let agent_logged_in = loggedAgent;
  let pre_existing_agent = appStore.getState().userData;
  if(Object.keys(pre_existing_agent).length){
  let {userId, _id, logIn_sessionID} = agent_logged_in;  // current logged in agent
  let {userId: preExsUserId, _id: _preExsId, logIn_sessionID: preExsLogIn_sessionID} = pre_existing_agent;  // pre existing agent
  if((userId === preExsUserId) && (_id === _preExsId) && (logIn_sessionID !== preExsLogIn_sessionID)){
    UserLogoutHook();   // autoLoggingOut already logged in agents from system
  }
  }
}