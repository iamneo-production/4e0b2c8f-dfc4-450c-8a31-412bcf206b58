import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createAccount, deleteAccount, getAccount, updateAccount} from "../api/accountService";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../assets/success-icon.svg";

export const addAccount =
    createAsyncThunk('account/addAccount',async (body)=>{
        return  createAccount(
            body.token,
            body.name,
            body.currentBalance,
            body.paymentTypes
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const changeAccount =
    createAsyncThunk('account/changeAccount',async (body)=>{
        console.log("account/changeAccount")
        return  updateAccount(
            body.token,
            body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const removeAccount =
    createAsyncThunk('account/removeAccount',async (body)=>{
        return  deleteAccount(
            body.token,
            body.accountId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchAccount =
    createAsyncThunk('account/fetchAccount',async (body)=>{
        return  getAccount(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })


const accountSlice = createSlice({
    name: "account", initialState: {
        displayAccountForm:false,
        addAccountInProcess:false,
        fetchAccountInProcess:false,
        accountList: []
    }, reducers: {
        showAccountForm: (state) => {
            state.displayAccountForm = true
        },
        closeAccountForm:(state) =>{
            state.displayAccountForm = false
        }
    },
    extraReducers:{
        [addAccount.pending]:(state) => {
            state.addAccountInProcess = true
        },
        [addAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                notifications.show({
                    title: 'Account Added',
                    message: 'your account added successfuly!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title: action.payload.message,
                    message: 'Please try again!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.addAccountInProcess =false
            state.displayAccountForm = false
        },
        [addAccount.rejected]:(state)=>{
            state.addAccountInProcess = false
            notifications.show({
                title: "Account Create failed",
                message: 'Please try again!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
        },
        [fetchAccount.pending]:(state) => {
            state.fetchAccountInProcess = true
            console.log("Account fetch pending")
        },
        [fetchAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                state.accountList = action.payload.data
            }else {
                console.log(action.payload.message)
            }
            state.fetchAccountInProcess =false
        },
        [fetchAccount.rejected]:(state)=>{
            state.fetchAccountInProcess = false
            console.log("Account fetch failed")
        },
        [changeAccount.pending]:(state) => {
            console.log("Account update pending")
        },
        [changeAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                notifications.show({
                    title: 'Account Updated',
                    message: 'your account updated successfuly!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                console.log(action.payload.message)
                notifications.show({
                    title: action.payload.message,
                    message: 'Please try again!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.fetchAccountInProcess =false
        },
        [changeAccount.rejected]:(state)=>{
            console.log("Account update failed")
            notifications.show({
                title: "Account update failed",
                message: 'Please try again!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
        },
        [removeAccount.pending]:(state) => {
            console.log("Account update pending")
        },
        [removeAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                notifications.show({
                    title: 'Account Deleted',
                    message: 'your account deleted successfuly!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                console.log(action.payload.message)
                notifications.show({
                    title: action.payload.message,
                    message: 'Please try again!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.fetchAccountInProcess =false
        },
        [removeAccount.rejected]:(state)=>{
            console.log("Account Delete failed")
            notifications.show({
                title: "Account deleted failed",
                message: 'Please try again!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
        },
    }
})

export const {showAccountForm,closeAccountForm} = accountSlice.actions;

export default accountSlice;