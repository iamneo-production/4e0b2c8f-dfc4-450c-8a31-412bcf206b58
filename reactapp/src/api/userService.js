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
    return await axios.get(`${baseUrl}/auth/validateToken`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function sendVerificationSecurityCode(email){
    return await axios.post(`${baseUrl}/auth/send-verification-email?email=${email}`,)
}

export async function sendVerificationSecurityCodeForFP(email){
    return await axios.post(`${baseUrl}/auth/forgot-password/send-verification-email?email=${email}`,)
}

export async function resetPassword(email,password){
    return await axios.put(`${baseUrl}/auth/new-password?email=${email}&password=${password}`)
}

export async function verifySecurityCode(email,otp){
    return await axios.post(`${baseUrl}/auth/verify-security-code?email=${email}&otp=${otp}`,)
}

// edit name
export async function editNameService(token, firstName, lastName) {
    return await axios.post(`${baseUrl}/profile/name`,{
        "firstName": firstName,
        "lastName": lastName
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

// edit email
export async function editEmailService(token, inemail) {
    return await axios.post(`${baseUrl}/profile/email`,{
        "email": inemail
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

// edit password
export async function editPasswordService(token, oldPassword, password) {
    return await axios.put(`${baseUrl}/profile/password`,{
        "oldPassword": oldPassword,
        "password": password
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

// edit image
export async function editImageService(token, image) {
    return await axios.post(`${baseUrl}/profile/image`,{     
        "image": image
    }, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type":'multipart/form-data' }
    })
}