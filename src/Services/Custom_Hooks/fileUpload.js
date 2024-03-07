import axios from "axios";
import appStore from "../../Component/Live Chats/Client/AppStore";
import { FilesUploadAPI } from "../../api";

export const UploadFiles = (formData) => {
  const { token } = appStore.getState();

  return new Promise(async (resolve, reject) => {
    try {
      console.log("formData : ", formData);
      Object.keys(formData).map((key) => {
        console.log(key, formData[key]);
      });
      const res = await axios(`${FilesUploadAPI}`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });
      const response = await res?.data;
      console.log("UploadFiles", response);
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
};
