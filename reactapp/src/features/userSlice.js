import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createAccountService, loginAccountService, validateTokenService, editNameService, editEmailService, editPasswordService, editImageService} from "../api/userService";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../assets/success-icon.svg";

export const createAccount =
    createAsyncThunk('user/createAccount',async (body)=>{
        return createAccountService(
            body.firstName,
            body.lastName,
            body.email,
            body.password
        ).then((response)=>{
            return response.data
        }).catch((error) =>{
            return error.response.data
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

//Edit name
export const editName = 
    createAsyncThunk('user/editName', async(body) => {
        return editNameService(
            body.token,
            body.firstName,
            body.lastName
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response
        })
    })
//Edit email
export const editEmail = 
    createAsyncThunk('user/editEmail', async(body) => {
        return editEmailService(
            body.token,
            body.email
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

//Edit Password
export const editPassword = createAsyncThunk(
  "user/editPassword",
  async (body) => {
    // console.log(body)
    return editPasswordService(body.token, body.oldPassword, body.password)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data.message);
        return err.response.data.message;
      });
  }
);

//Edit image
export const editImage = 
createAsyncThunk('user/editImage', async(body) => {
    // console.log(body)
    return editImageService(
        body.token,
        body.image
    ).then((res) =>{
        console.log(res.data)
        return res.data
    }).catch((err) =>{
        console.log(err.response.data.message)
        return err.response.data.message
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
            state.currentUser = {
                firstName:'',
                lastName:'',
                email:'',
                profileImage:'',
                userId:''
            }
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
            if(action.payload.message ==="success"){
                state.displaySignupForm = false
                console.log("Account Created")
                notifications.show({
                    title: 'Account Created Successfully',
                    message: 'Now you can login to you account with signin option',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                console.log(action.payload)
                notifications.show({
                    title: action.payload.message,
                    message: 'Please try again!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.displaySignupForm = false
        },
        [createAccount.rejected]:(state)=>{
            state.signupInProgress = false
            console.log("Account Create failed")
            notifications.show({
                title: 'Request Failed',
                message: 'Please try again!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
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
                notifications.show({
                    title: action.payload.message,
                    message: 'Please try again!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [loginAccount.rejected]:(state)=>{
            state.signinInProgress = false
            notifications.show({
                title: "Something went wrong ",
                message: 'Please try again!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
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
                state.currentUser.profileImage = action.payload.data.user.profileImage
            }else {
                state.loginError = action.payload.message
                state.token = null
                notifications.show({
                    title: action.payload.message,
                    message: 'Please Login again!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [validateToken.rejected]:(state)=>{
            state.token = null
            console.log("validate token  failed")
            notifications.show({
                title: 'Session expired',
                message: 'Login again!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
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
