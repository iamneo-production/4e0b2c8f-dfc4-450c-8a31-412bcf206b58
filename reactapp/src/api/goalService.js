import axios from "axios";
import {baseUrl} from "./config";

export async function createGoal(token,body){
    return await axios.post(`${baseUrl}/goals`,{
        "name":body.name,
        "description":body.description,
        "targetAmount":body.targetAmount,
        "status":body.status,
        "targetDate":body.targetDate
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}


export async function getGoal(token){
    return await axios.get(`${baseUrl}/goals`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function updateGoal(token,body){
    return await axios.put(`${baseUrl}/goals/${body.goalId}`,{
        "name":body.name,
        "description":body.description,
        "targetAmount":body.targetAmount,
        "status":body.status,
        "targetDate":body.targetDate
    },{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function deleteGoal(token,goalId){
    return await axios.delete(`${baseUrl}/goals/${goalId}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}