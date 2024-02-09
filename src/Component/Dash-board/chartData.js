import axios from "axios";

export const apiCall = async (userId, params) => {
  try {
    let token = sessionStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://ulai.in/backend/analytics/${userId}/${params}/data?days=30`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.log("chat-session api", error);
    return error;
  }
};
