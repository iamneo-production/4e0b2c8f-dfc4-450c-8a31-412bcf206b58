import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createGoal, deleteGoal, getGoal, updateGoal} from "../api/goalService";
import _ from "lodash";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../assets/success-icon.svg";

export const addGoal =
    createAsyncThunk('goal/addGoal',async (body)=>{
        return  createGoal(
            body.token,
            body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const editGoal =
    createAsyncThunk('goal/editGoal',async (body)=>{
        return  updateGoal(
            body.token,
            body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const removeGoal =
    createAsyncThunk('goal/removeGoal',async (body)=>{
        return  deleteGoal(
            body.token,
            body.goalId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchGoal =
    createAsyncThunk('goal/fetchGoal',async (body)=>{
        return  getGoal(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })


const goalSlice = createSlice({
    name: "goal", initialState: {
        displayGoalForm:false,
        addGoalInProcess:false,
        addGoalEditInProcess:false,
        fetchGoalInProcess:false,
        goalList: []
    }, reducers: {
        showGoalForm: (state) => {
            state.displayGoalForm = true
        },
        closeGoalForm:(state) =>{
            state.displayGoalForm = false
        }
    },
    extraReducers:{
        [addGoal.pending]:(state) => {
            state.addGoalInProcess = true
            console.log("Goal Add pending")
        },
        [addGoal.fulfilled]:(state,action) =>{
            state.addGoalInProcess =false
            if(action.payload?.message ==="success"){
                console.log("Goal Created")
                notifications.show({
                    title: 'Goal Created',
                    message: 'your goal created successfuly!!',
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
            state.displayGoalForm = false
        },
        [addGoal.rejected]:(state)=>{
            state.addGoalInProcess = false
            console.log("Goal Create failed")
            alert("Goal Create failed,Try again")
        },
        [editGoal.pending]:(state) => {
            state.addGoalEditInProcess = true
            console.log("Goal Add pending")
        },
        [editGoal.fulfilled]:(state,action) =>{
            state.addGoalEditInProcess =false
            if(action.payload?.message ==="success"){
                console.log("Goal Created")
                notifications.show({
                    title: 'Goal Updated',
                    message: 'your goal update successfuly!!',
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
        [editGoal.rejected]:(state)=>{
            state.addGoalEditInProcess = false
            console.log("Goal update failed")
            alert("Goal update failed,Try again")
        },
        [removeGoal.pending]:(state) => {
            console.log("Goal Add pending")
        },
        [removeGoal.fulfilled]:(state,action) =>{
            if(action.payload?.message ==="success"){
                console.log("Goal Created")
                notifications.show({
                    title: 'Goal removed',
                    message: 'your goal remove successfuly!!',
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
        [removeGoal.rejected]:(state)=>{
            console.log("Goal remove failed")
            alert("Goal remove failed,Try again")
        },
        [fetchGoal.pending]:(state) => {
            state.fetchGoalInProcess = true
            console.log("Goal fetch pending")
        },
        [fetchGoal.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log(state.goalList)
                state.goalList = action.payload.data
                console.log("Goal fetched")
                console.log(state.goalList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchGoalInProcess =false
        },
        [fetchGoal.rejected]:(state)=>{
            state.fetchGoalInProcess = false
            console.log("Goal fetch failed")
        },
    }
})

export const {showGoalForm,closeGoalForm} = goalSlice.actions;

export default goalSlice;