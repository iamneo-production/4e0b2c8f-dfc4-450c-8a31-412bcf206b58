import {createSlice} from "@reduxjs/toolkit";
import {createAccountService} from "../api/userService";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        token:null,
        signupInProgress:false,
        loginInProgress:false,
        signupError:null,
        loginError:null
    },
    reducers:{
        createAccount: (state, action) => {
            state.signupInProgress = true;
            createAccountService(
                action.payload.firstName,
                action.payload.lastName,
                action.payload.email,
                action.payload.password
            )
        },
        loginAccount:(state,action) =>{
            state.currentUser ={
                email:action.payload.email,
                password:action.payload.password
            }
            console.log(action.payload.email)
        },
        createAccountSuccess:(state, action) =>{

        },
        createAccountError:(state, action) =>{

        },
        loginAccountSuccess:(state, action) =>{

        },
        loginAccountError:(state,action) => {

        }
    }
})

export const {createAccount,loginAccount} = userSlice.actions
export default userSlice.reducer