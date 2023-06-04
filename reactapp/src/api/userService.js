import {baseUrl} from "./config";
import axios from "axios";
export async function createAccountService(firstName,lastName,email,password) {
    console.log(password);
    await axios.post(`${baseUrl}/register`, {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    }).then(function (response){
        if(response.data.message === "success"){
            console.log("account created..")
            alert("account created..")
        }else {
            console.log(response.data.message)
        }
    }).catch(function (error){
        console.log(error)
    })
}