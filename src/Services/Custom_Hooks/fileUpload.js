import axios from "axios";
import appStore from "../../Component/Live Chats/Client/AppStore";
import { FilesUploadAPI } from "../../api";

export const UploadFiles = async(formData) => {
  let appStoreToken = await appStore.getState()?.token;
  const token = appStoreToken && (appStoreToken !== '') ? 
  appStoreToken : sessionStorage.getItem("token");
  console.log('token ==>', token);
  if(token && token!== ''){
    return new Promise(async (resolve, reject) => {
      try {
        // const res = await axios(`${FilesUploadAPI}`, {
        const res = await axios(FilesUploadAPI, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          data: formData,
        });
        const response = await res?.data;
        // console.log("UploadFiles", response);
        const responseUrl = await res?.data?.file;
        if (responseUrl) {
          resolve({ status: true, url: responseUrl });
        } else {
          resolve({ status: false });
        }
      } catch (error) {
        console.log("UploadFiles upload error ", error);
        reject(error);
      }
    });
  }
};
