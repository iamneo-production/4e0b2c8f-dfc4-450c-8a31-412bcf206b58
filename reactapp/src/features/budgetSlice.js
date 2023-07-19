import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createBudget, getBudget} from "../api/budgetService";


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
            if(action.payload.message ==="success"){
                console.log("Budget Created")
                alert("Budget Created")
            }else {
                console.log(action.payload.message)
            }
            state.addBudgetInProcess =false
            state.displayBudgetForm = false
        },
        [addBudget.rejected]:(state)=>{
            state.addBudgetInProcess = false
            console.log("Budget Create failed")
            alert("Budget Create failed,Try again")
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