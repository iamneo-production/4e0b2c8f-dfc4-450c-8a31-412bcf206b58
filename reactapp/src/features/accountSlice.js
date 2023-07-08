import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createAccount, getAccount} from "../api/accountService";
import {addCategory, fetchCategory} from "./categorySlice";


export const addAccount =
    createAsyncThunk('category/addAccount',async (body)=>{
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

export const fetchAccount =
    createAsyncThunk('category/fetchAccount',async (body)=>{
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
            console.log("Account Add pending")
        },
        [addAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log("Account Created")
                alert("Account Created")
            }else {
                console.log(action.payload.message)
            }
            state.addAccountInProcess =false
            state.displayAccountForm = false
        },
        [addAccount.rejected]:(state)=>{
            state.addAccountInProcess = false
            console.log("Account Create failed")
            alert("Account Create failed,Try again")
        },
        [fetchAccount.pending]:(state) => {
            state.fetchAccountInProcess = true
            console.log("Account fetch pending")
        },
        [fetchAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log(state.accountList)
                state.accountList = action.payload.data
                console.log("Account fetched")
                console.log(state.accountList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchAccountInProcess =false
        },
        [fetchAccount.rejected]:(state)=>{
            state.fetchAccountInProcess = false
            console.log("Account fetch failed")
        },
    }
})

export const {showAccountForm,closeAccountForm} = accountSlice.actions;

export default accountSlice;