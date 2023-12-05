import axios from "axios"
import { UsersAPI } from "../api"


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
                resolve(result?.data);
            }
        } catch (error) {
            console.log('use details fetch error :  ', error);
            reject(error);
        }
    })
    
}