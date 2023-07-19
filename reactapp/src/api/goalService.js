import axios from "axios";
import {baseUrl} from "./config";

export async function createGoal(token,name,description,type){
    return await axios.post(`${baseUrl}/categories`,{
        "name":name,
        "description":description,
        "type":type
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function getGoals(token){
    return await axios.get(`${baseUrl}/categories`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}