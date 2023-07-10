import axios from "axios";
import {baseUrl} from "./config";

export async function createAccount(token,name,currentBalance,paymentTypes){
    return await axios.post(`${baseUrl}/accounts`,{
        "name":name,
        "currentBalance":currentBalance,
        "paymentTypes":paymentTypes
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function getAccount(token){
    return await axios.get(`${baseUrl}/accounts`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}