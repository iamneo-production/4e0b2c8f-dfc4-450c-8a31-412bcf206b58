import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createAccountService, loginAccountService, validateTokenService} from "../api/userService";

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
            console.log(error.response.data)
            return error.response.data
        })
    })

export const validateToken =
    createAsyncThunk('user/validateToken',async (token) =>{
        return validateTokenService(
            token
        ).then((response) =>{
            console.log(response)
            return response.data
        }).catch((error)=>{
            console.log(error)
            return error.responce.data
        })
    })
export const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser: {
            firstName:'',
            lastName:'',
            email:'',
            userId:''
        },
        token:null,
        displaySignupForm:false,
        displaySigninForm:false,
        signupInProgress:false,
        signinInProgress:false,
        signupError:null,
        loginError:null
    },
    reducers:{
        logoutAccount:(state)=>{
            state.token = null
            state.currentUser = null
        },
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
            console.log(action)
            if(action.payload.message ==="success"){
                state.token = action.payload.data.token
                state.displaySigninForm = false
            }else {
                state.loginError = action.payload.message
                alert(action.payload.message)
            }
        },
        [loginAccount.rejected]:(state)=>{
            state.signinInProgress = false
            console.log("Account Create failed")
            alert("Account Create failed,Try again")
        },
        [validateToken.pending]:(state) => {
            console.log("validate token pending")
        },
        [validateToken.fulfilled]:(state,action) =>{
            console.log("validate token success")
            if(action.payload.message ==="success"){
                state.currentUser.firstName = action.payload.data.user.firstName
                state.currentUser.lastName = action.payload.data.user.lastName
                state.currentUser.email = action.payload.data.user.email
                state.currentUser.userId = action.payload.data.user.userId
            }else {
                state.loginError = action.payload.message
                state.token = null
                alert(action.payload.message)
            }
        },
        [validateToken.rejected]:(state)=>{
            console.log("validate token success failed")
            alert("validate token success,Login again")
        }
    }
})

export const {
    logoutAccount,
    openSignupForm,
    openSigninForm,
    closeSignupForm,
    closeSigninForm,
} = userSlice.actions
export default userSlice.reducer
