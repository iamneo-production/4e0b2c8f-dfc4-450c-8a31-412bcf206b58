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

export async function updateAccount(token,body){
    console.log("account/updateAccount",body)
    return await axios.put(`${baseUrl}/accounts?accountId=${body.accountId}`,{
        "name":body.name,
        "currentBalance":body.currentBalance,
        "paymentTypes":body.paymentTypes
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function deleteAccount(token,accountId){
    return await axios.delete(`${baseUrl}/accounts?accountId=${accountId}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function getAccount(token){
    return await axios.get(`${baseUrl}/accounts`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}