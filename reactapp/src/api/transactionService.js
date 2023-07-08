import axios from "axios";
import {baseUrl} from "./config";

export async function createTransaction(token,amount,description,paymentType,dateTime,categoryId,accountId){
    console.log("heer")
    console.log(dateTime)
    return await axios.post(`${baseUrl}/transactions`,{
        "amount":amount,
        "description":description,
        "paymentType":paymentType,
        "dateTime":dateTime,
        "categoryId":categoryId,
        "accountId":accountId
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function getTransaction(token){
    return await axios.get(`${baseUrl}/transactions`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}