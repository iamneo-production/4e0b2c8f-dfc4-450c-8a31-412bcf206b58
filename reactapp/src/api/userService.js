import {baseUrl} from "./config";
import axios from "axios";


export async function createAccountService(firstName, lastName, email, password) {
    return await axios.post(`${baseUrl}/auth/register`, {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    })
}

export async function loginAccountService(email,password){
    return await axios.post(`${baseUrl}/auth/login`,{
        "email":email,
        "password":password
    })
}

export async function validateTokenService(token){
    return await axios.get(`${baseUrl}/validateToken`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}