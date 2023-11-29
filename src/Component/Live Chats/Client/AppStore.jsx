import { create } from "zustand";
import "./app-store.css";
const appStore = create((set, get) => ({
  isConnected: false,
  userData: JSON.parse(localStorage.getItem("currentUser")) || {},
  token: localStorage.getItem("token") || "",
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
  setMessages: (data, isUser) => {
    set(() => ({
      messages: [...get().messages, { text: data, user: isUser }],
    }));
  },
  messageType: (data) => {
    console.log("messageType", data, typeof data);
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
      console.log("Simplet text", data.message);
      get().setMessages(data.message, false);
    }
  },
}));
export default appStore;
