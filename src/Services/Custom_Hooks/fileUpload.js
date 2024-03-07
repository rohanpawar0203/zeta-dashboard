import axios from "axios";
import appStore from "../../Component/Live Chats/Client/AppStore"
import { FilesUploadAPI } from "../../api";


export const UploadFiles = (formData, token) => {
  const {token: tokenInfo} = appStore.getState();
  
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.post(`${FilesUploadAPI}`, formData, {
              headers: {
               'Content-Type': 'multipart/form-data',
               "Authorization": `Bearer ${tokenInfo}`
              },
            });
            const responseUrl = await res?.data?.file;
            if (responseUrl) {
              resolve({status: true, url: responseUrl});
            }else{
             resolve({status: false});
            }
          } catch (error) {
            console.log("UploadFiles upload error ", error);
            reject(error);
          }
    })
}