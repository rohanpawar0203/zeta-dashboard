import { create } from "zustand";
import "./app-store.css";
import { toast } from "react-toastify";
import { PlanDetails } from "../../../api";
const appStore = create((set, get) => ({
  isConnected: false,
  socket: null,
  userData: JSON.parse(sessionStorage.getItem("currentUser")) || {},
  token: sessionStorage.getItem("token") || "",
  conversation: [],
  viewConversation: {},
  allAgents: [],
  liveConversationNewEntry: [],
  currentLocationPathname: "",
  plans: [],
  whatsAppAnalytics: {},
  chatPanelMsgs: {},
  setSocket: (data) => set(data),
  setChatPanelMsgs: (data) => set({ chatPanelMsgs: data }),
  setwhatsAppAnalytics: (data) => set({ whatsAppAnalytics: data }),
  setUserData: (data) => set({ userData: data }),
  setConversation: (data) => set({ conversation: data }),
  setViewConversation: (data) => set({ viewConversation: data }),
  setToken: (data) => set({ token: data }),
  profileCreated: false,
  setProfileCreated: (status) => set({ profileCreated: status }),
  botCreated: false,
  setBotCreated: (status) => set({ botCreated: status }),
  newProductModalId: null,
  setNewProductModalId: (status) => set({ newProductModalId: status }),
  liveConversation: [],
  isFetchLiveConversation: false,
  setisFetchLiveConversation: (value) =>
    set({ isFetchLiveConversation: value }),
  setLiveConversation: (data) => set({ liveConversation: data }),
  setLiveConversationNewEntry: (data) =>
    set({ liveConversationNewEntry: data }),
  setIsConnected: (status) => set({ isConnected: status }),
  setAllAgents: (data) => set({ allAgents: data }),
  setCurrentLocationPathName: (data) => set({ currentLocationPathname: data }),
  messages: [],
  botDetails: {},
  roomId: "",
  showTyping: false,
  setShowTyping: (data) => set({ showTyping: data }),
  setBotDetails: (data) => set({ botDetails: data }),
  setRoomId: (data) => set({ roomId: data }),
  setPlans: (data) => set({ plans: data }),
  setMessages: (data, isUser) => {
    set(() => ({
      messages: [...get().messages, { text: data, user: isUser }],
    }));
  },
  clearMessages: () => set({ messages: [] }),
  messageType: (data) => {
    if (data.productList && data.productList.length !== 0) {
      data.productList.map((ele) => {
        const text = (
          <ul className="list-message">
            <li className="message">
              <div className="product-image">
                <img src={ele.imageUrl} alt="" />
              </div>
              <div className="product-details">
                <p className="product-name">Product Name: {ele.productName}</p>
                <p className="product-description">
                  Product Description:
                  {ele.productSpecification}
                </p>
                <p className="product-price">Product Price: {ele.price}</p>
                <button
                  style={{
                    background: `${get().botDetails.accentColor}`,
                  }}
                  onClick={() => window.location.replace(`${ele.buyNowLink}`)}
                >
                  Buy Now
                </button>
              </div>
            </li>
          </ul>
        );
        get().setMessages(text, false);
      });
    } else {
      get().setMessages(data.message, false);
    }
  },
}));
export default appStore;
