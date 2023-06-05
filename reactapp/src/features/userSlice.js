import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createAccountService, loginAccountService} from "../api/userService";

export const createAccount =
    createAsyncThunk('user/createAccount',async (body)=>{
        return createAccountService(
            body.firstName,
            body.lastName,
            body.email,
            body.password
        ).then((response)=>{
            console.log(response)
        }).catch((error) =>{
            console.log(error)
        })
    })

export const loginAccount =
    createAsyncThunk('user/loginAccount',async (body)=>{
        return loginAccountService(
            body.email,
            body.password
        ).then((response)=>{
            console.log(response)
            return response.data
        }).catch((error) =>{
            console.log(error)
        })
    })

export const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        token:null,
        displaySignupForm:false,
        displaySigninForm:false,
        signupInProgress:false,
        signinInProgress:false,
        signupError:null,
        loginError:null
    },
    reducers:{
        openSignupForm:(state)=>{
            state.displaySignupForm = true
        },
        openSigninForm:(state)=>{
            state.displaySigninForm = true
        },
        closeSignupForm:(state)=>{
            state.displaySignupForm = false
        },
        closeSigninForm:(state)=>{
            state.displaySigninForm = false
        }
    },
    extraReducers:{
        [createAccount.pending]:(state) => {
            state.signupInProgress = true
            console.log("pending")
        },
        [createAccount.fulfilled]:(state,action) =>{
            state.signupInProgress =false
            console.log("Account Created")
            alert("Account Created")
            state.displaySignupForm = false
        },
        [createAccount.rejected]:(state)=>{
            state.signupInProgress = false
            console.log("Account Create failed")
            alert("Account Create failed,Try again")
        },
        [loginAccount.pending]:(state) => {
            state.signinInProgress = true
            console.log("pending")
        },
        [loginAccount.fulfilled]:(state,action) =>{
            state.signinInProgress =false
            console.log("logged in")
            state.token = action.payload.data.token
            state.displaySigninForm = false
        },
        [loginAccount.rejected]:(state)=>{
            state.signinInProgress = false
            console.log("Account Create failed")
            alert("Account Create failed,Try again")
        }
    }
})

export const {
    openSignupForm,
    openSigninForm,
    closeSignupForm,
    closeSigninForm,
} = userSlice.actions
export default userSlice.reducer
