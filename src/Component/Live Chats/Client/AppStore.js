import { create } from "zustand";

const appStore = create((set, get) => ({
  isConnected: false,
  userData: "",
  token: "",
  conversation: [],
  allAgents: [],
  liveConversationNewEntry: [],
  currentLocationPathname: "",
  setUserData: (data) => set({ userData: data }),
  setConversation: (data) => set({ conversation: data }),
  setToken: (data) => set({ token: data }),
  profileCreated: false,
  setProfileCreated: (status) => set({ profileCreated: status }),
  botCreated: false,
  setBotCreated: (status) => set({ botCreated: status }),
  newProductModalId: null,
  setNewProductModalId: (status) => set({ newProductModalId: status }),
  liveConversation: [],
  setLiveConversation: (data) => set({ liveConversation: data }),
  setLiveConversationNewEntry: (data) => set({ liveConversationNewEntry: data }),
  setIsConnected: (status) => set({ isConnected: status }),
  setAllAgents: (data) => set({ allAgents: data }),
  setCurrentLocationPathName: (data) => set({ currentLocationPathname: data }),
}));
export default appStore;
