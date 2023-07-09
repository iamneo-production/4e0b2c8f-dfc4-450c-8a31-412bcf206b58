import axios from "axios";
import {baseUrl} from "./config";

export async function createBudget(token,category,budget){
    return await axios.post(`${baseUrl}/budgets`,{
        "category":category,
        "budget":budget,
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function getBudget(token){
    return await axios.get(`${baseUrl}/budgets`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}