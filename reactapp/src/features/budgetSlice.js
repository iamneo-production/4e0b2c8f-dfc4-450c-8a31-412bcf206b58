import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createBudget, deleteBudget, getBudget, updateBudget} from "../api/budgetService";
import _ from "lodash";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../assets/success-icon.svg";

export const addBudget =
    createAsyncThunk('budget/addBudget',async (body)=>{
        return  createBudget(
            body.token,
            body.categoryId,
            body.amount,
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const editBudget =
    createAsyncThunk('budget/editBudget',async (body)=>{
        return  updateBudget(
            body.token,
            body.budgetId,
            body.categoryId,
            body.amount,
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const removeBudget =
    createAsyncThunk('budget/removeBudget',async (body)=>{
        return  deleteBudget(
            body.token,
            body.budgetId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchBudget =
    createAsyncThunk('budget/fetchBudget',async (body)=>{
        return  getBudget(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })


const budgetSlice = createSlice({
    name: "budget", initialState: {
        displayBudgetForm:false,
        addBudgetInProcess:false,
        addBudgetEditInProcess:false,
        fetchBudgetInProcess:false,
        budgetList: []
    }, reducers: {
        showBudgetForm: (state) => {
            state.displayBudgetForm = true
        },
        closeBudgetForm:(state) =>{
            state.displayBudgetForm = false
        }
    },
    extraReducers:{
        [addBudget.pending]:(state) => {
            state.addBudgetInProcess = true
            console.log("Budget Add pending")
        },
        [addBudget.fulfilled]:(state,action) =>{
            state.addBudgetInProcess =false
            if(action.payload?.message ==="success"){
                console.log("Budget Created")
                notifications.show({
                    title: 'Budget Created',
                    message: 'your budget created successfuly!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else if(_.isEmpty(action.payload)){
                notifications.show({
                    title:"Something went wrong",
                    message: 'Please try again!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title:action.payload?.message,
                    message: action.payload?.message,
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.displayBudgetForm = false
        },
        [addBudget.rejected]:(state)=>{
            state.addBudgetInProcess = false
            console.log("Budget Create failed")
            alert("Budget Create failed,Try again")
        },
        [editBudget.pending]:(state) => {
            state.addBudgetEditInProcess = true
            console.log("Budget Add pending")
        },
        [editBudget.fulfilled]:(state,action) =>{
            state.addBudgetEditInProcess =false
            if(action.payload?.message ==="success"){
                console.log("Budget Created")
                notifications.show({
                    title: 'Budget Updated',
                    message: 'your budget update successfuly!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else if(_.isEmpty(action.payload)){
                notifications.show({
                    title:"Something went wrong",
                    message: 'Please try again!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title:action.payload?.message,
                    message: action.payload?.message,
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [editBudget.rejected]:(state)=>{
            state.addBudgetEditInProcess = false
            console.log("Budget update failed")
            alert("Budget update failed,Try again")
        },
        [removeBudget.pending]:(state) => {
            console.log("Budget Add pending")
        },
        [removeBudget.fulfilled]:(state,action) =>{
            if(action.payload?.message ==="success"){
                console.log("Budget Created")
                notifications.show({
                    title: 'Budget removed',
                    message: 'your budget remove successfuly!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else if(_.isEmpty(action.payload)){
                notifications.show({
                    title:"Something went wrong",
                    message: 'Please try again!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title:action.payload?.message,
                    message: action.payload?.message,
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [removeBudget.rejected]:(state)=>{
            console.log("Budget remove failed")
            alert("Budget remove failed,Try again")
        },
        [fetchBudget.pending]:(state) => {
            state.fetchBudgetInProcess = true
            console.log("Budget fetch pending")
        },
        [fetchBudget.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log(state.budgetList)
                state.budgetList = action.payload.data
                console.log("Budget fetched")
                console.log(state.budgetList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchBudgetInProcess =false
        },
        [fetchBudget.rejected]:(state)=>{
            state.fetchBudgetInProcess = false
            console.log("Budget fetch failed")
        },
    }
})

export const {showBudgetForm,closeBudgetForm} = budgetSlice.actions;

export default budgetSlice;