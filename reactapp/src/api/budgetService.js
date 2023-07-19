import axios from "axios";
import {baseUrl} from "./config";

export async function createBudget(token,categoryId,amount){
    return await axios.post(`${baseUrl}/budgets`,{
        categoryId:categoryId,
        amount:amount
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function getBudget(token){
    return await axios.get(`${baseUrl}/budgets`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}