import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createTransaction, getTransaction} from "../api/transactionService";

export const addTransaction =
    createAsyncThunk('category/addTransaction',async (body)=>{
        return  createTransaction(
            body.token,
            body.amount,
            body.description,
            body.paymentType,
            body.dateTime,
            body.categoryId,
            body.accountId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchTransaction =
    createAsyncThunk('category/fetchTransaction',async (body)=>{
        return  getTransaction(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

const transactionSlice = createSlice({
    name:"transaction",
    initialState:{
        displayTransactionForm:false,
        addTransactionInProcess:false,
        fetchTransactionInProcess:false,
        transactionList:[]
    },
    reducers:{
        showTransactionForm: (state) => {
            state.displayTransactionForm = true
        },
        closeTransactionForm:(state) =>{
            state.displayTransactionForm = false
        }
    },
    extraReducers:{
        [addTransaction.pending]:(state) => {
            state.addTransactionInProcess = true
            console.log("Transaction Add pending")
        },
        [addTransaction.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log("Transaction Created")
                alert("Transaction Created")
            }else {
                console.log(action.payload.message)
            }
            state.addTransactionInProcess =false
            state.displayTransactionForm = false
        },
        [addTransaction.rejected]:(state)=>{
            state.addTransactionInProcess = false
            console.log("Transaction Create failed")
            alert("Transaction Create failed,Try again")
        },
        [fetchTransaction.pending]:(state) => {
            state.fetchTransactionInProcess = true
            console.log("Transaction fetch pending")
        },
        [fetchTransaction.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log(state.transactionList)
                state.transactionList = action.payload.data
                console.log("Transaction fetched")
                console.log(state.transactionList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchTransactionInProcess =false
        },
        [fetchTransaction.rejected]:(state)=>{
            state.fetchTransactionInProcess = false
            console.log("Transaction fetch failed")
        },
    }
})

export const {showTransactionForm,closeTransactionForm} = transactionSlice.actions;

export default transactionSlice;