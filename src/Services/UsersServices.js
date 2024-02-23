import axios from "axios"
import { UsersAPI } from "../api"
import appStore from "../Component/Live Chats/Client/AppStore";


export const getUserDetails = async(id) => {
    const token = sessionStorage.getItem('token');
    // console.log('user id got ', id);
    
    return new Promise(async(resolve, reject) => {
        try {
            let result = await axios.get(`${UsersAPI}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                  },
            });
            if(result?.data){
                sessionStorage.setItem('currentUser', JSON.stringify(result?.data));
                resolve(result?.data);
            }
        } catch (error) {
            // console.log('use details fetch error :  ', error);
            reject(error);
        }
    })
    
}

export const updateUserDetails = async (userId) => {
    const {setUserData} = appStore.getState();
    try {
      let newUserDeatils = await getUserDetails(userId);
      setUserData(newUserDeatils);
      sessionStorage.setItem("currentUser", JSON.stringify(newUserDeatils));
    } catch (error) {
      console.log('updateUserDetails error : ',error);
    }
  };

