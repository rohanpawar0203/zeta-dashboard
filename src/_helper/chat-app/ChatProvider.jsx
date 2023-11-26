import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Context from './index';
import { ChatApi, ChatMemberApi, GetConversationsAPI } from '../../api';

export const ChatProvider = (props) => {
  const [allMemberss, setAllMembers] = useState([]);
  const [memberss, setMembers] = useState();
  const [chatss, setChats] = useState([]);
  const [currentUserr, setCurrentUser] = useState();
  const [selectedUserr, setSelectedUser] = useState();
  const [liveUser, setliveUser] = useState();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorage.getItem('token');
  const [appStore, setappStore] = useState({
  isConnected: false,
  userData: "",
  token: "",
  conversation: [],
  allAgents: [],
  liveConversationNewEntry: [],
  currentLocationPathname: "",
  // setUserData: (data) => set({ userData: data }),
//   setConversation: (data) => set({ conversation: data }),
  // setToken: (data) => set({ token: data }),
  profileCreated: false,
  // setProfileCreated: (status) => set({ profileCreated: status }),
  botCreated: false,
  // setBotCreated: (status) => set({ botCreated: status }),
  newProductModalId: null,
  // setNewProductModalId: (status) => set({ newProductModalId: status }),
  liveConversation: [],
  // setLiveConversation: (data) => set({ liveConversation: data }),
  // setLiveConversationNewEntry: (data) => set({ liveConversationNewEntry: data }),
  // setIsConnected: (status) => set({ isConnected: status }),
  // setAllAgents: (data) => set({ allAgents: data }),
  // setCurrentLocationPathName: (data) => set({ currentLocationPathname: data }),
  })

  const setUserData = (data) => setappStore((pre) => ({...pre, userData: data }));
  const setConversation = (data) => setappStore((pre) => ({...pre, conversation: data }));
  const setToken = (data) => setappStore((pre) => ({...pre, token: data }));
  const setProfileCreated = (data) => setappStore((pre) => ({...pre, profileCreated: data }));
  const setBotCreated = (data) => setappStore((pre) => ({...pre, botCreated: data }));
  const setNewProductModalId = (data) => setappStore((pre) => ({...pre, newProductModalId: data }));
  const setLiveConversation = (data) => setappStore((pre) => ({...pre, liveConversation: data }));
  const setLiveConversationNewEntry = (data) => setappStore((pre) => ({...pre, liveConversationNewEntry: data }));
  const setIsConnected = (data) => setappStore((pre) => ({...pre, isConnected: data }));
  const setAllAgents = (data) => setappStore((pre) => ({...pre, allAgents: data }));

  const getChatMembersData = async () => {
    try {
      const orgId = userData.userId ? userData.userId : userData._id;
      const resp = await axios.get(
        `${GetConversationsAPI}/${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMembers(resp.data);
      console.log('memberss ', resp.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getMembersSuccess = (chats) => {
    setCurrentUser(chats[0]);
    setMembers(chats);
  };

  const fetchChatMemberAsyn = () => {
    if (allMemberss.length > 0) getMembersSuccess(allMemberss);
  };

  useEffect(() => {
    const getChatData = async () => {
      try {
        await axios.get(ChatApi).then((resp) => {
          setChats(resp.data);
        });
      } catch (error) {
        console.log('error', error);
      }
    };
    getChatData();
  }, [setChats]);

  const getChatsSuccess = (chats, selectedUser, online) => {
    if (allMemberss.length > 0) {
      setChats(chats);
      setSelectedUser(allMemberss.find((x) => x.id === selectedUser));
    }
  };

  const updateSelectedUser = (selectedUser, online) => {
    if (allMemberss.length > 0)
      return allMemberss.find((x) => x.id === selectedUser);
  };

  const fetchChatAsyn = () => {
    if (chatss?.data?.length > 0) {
      const currentUserId = 0;
      const online = true;

      const chat = chatss.data.filter((x) => x.users.includes(currentUserId));
      const selectedUser = chatss.data[0].users.find((x) => x !== currentUserId);

      getChatsSuccess(chat, selectedUser, online);
      updateSelectedUser(selectedUser, online);
    }
  };

  const sendMessageToChat = async (currentUserId, chats) => {
    try {
      await axios.put(
        `${ChatApi}/${chats.data[currentUserId].id}`,
        chats.data[currentUserId]
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const sendMessageAsyn = (
    currentUserId,
    selectedUserId,
    messageInput,
    chats,
    online
  ) => {
    let chat = chats.find(
      (x) => x.users.includes(currentUserId) && x.users.includes(selectedUserId)
    );
    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();
    const status = online;
    if (chat) {
      chat.messages.push({
        sender: currentUserId,
        time: time,
        text: messageInput,
        status: true,
      });
      chat.lastMessageTime = time;
      chat.online = status;

      let chats_data = chats.filter((x) => x.id !== chat.id);
      chats_data.splice(0, 0, chat);
      getChatsSuccess(chats, selectedUserId, online);
    }
    setTimeout(() => {
      sendMessageToChat(currentUserId, chats);
    }, 1000);

  };

  const replyByUserAsyn = (
    currentUserId,
    selectedUserId,
    replyMessage,
    chats,
    online
  ) => {
    let chat = chats.find(
      (x) => x.users.includes(currentUserId) && x.users.includes(selectedUserId)
    );
    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();
    const status = online;
    if (chat) {
      chat.messages.push({
        sender: selectedUserId,
        time: time,
        text: replyMessage,
        status: true,
      });
      chat.lastMessageTime = time;
      chat.online = status;
      let chats_data = chats.filter((x) => x.id !== chat.id);
      chats_data.splice(0, 0, chat);

      getChatsSuccess(chats_data, selectedUserId, online);
    }

    sendMessageToChat(currentUserId, chats);

  };

  const createNewChatAsyn = (currentUserId, selectedUserId, chats) => {
    let conversation = {
      id: chats.length + 1,
      users: [currentUserId, selectedUserId],
      lastMessageTime: '-',
      messages: [],
    };
    chats.splice(0, 0, conversation);
    getChatsSuccess(chats, selectedUserId);
  };

  const changeChat = (userID) => {
    setSelectedUser(memberss.find((x) => x._id === userID));
  };

  const searchMember = (keywords) => {
    if (keywords === '') {
      setMembers(allMemberss);
    } else {
      const keyword = keywords.toLowerCase();
      const searchedMembers = allMemberss.filter(
        (member) => member.name.toLowerCase().indexOf(keyword) > -1
      );
      setMembers(searchedMembers);
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        allMemberss,
        chatss,
        selectedUserr,
        liveUser, 
        currentUserr,
        memberss,
        sidebarToggle,
        setSidebarToggle: setSidebarToggle,
        getChatsSuccess: getChatsSuccess,
        updateSelectedUserr: updateSelectedUser,
        fetchChatAsyn: fetchChatAsyn,
        fetchChatMemberAsyn: fetchChatMemberAsyn,
        sendMessageAsyn: sendMessageAsyn,
        replyByUserAsyn: replyByUserAsyn,
        createNewChatAsyn: createNewChatAsyn,
        changeChat: changeChat,
        searchMember: searchMember,
         setUserData,
         setConversation,
         setToken,
         setProfileCreated,
         setBotCreated,
         setNewProductModalId,
         setLiveConversation,
         setLiveConversationNewEntry,
         setIsConnected,
         setAllAgents,
         getChatMembersData,
         setliveUser
      }}
    >
      {props.children}
    </Context.Provider>
  );
};


