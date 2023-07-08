import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createCategory, getCategory} from "../api/categoryService";

export const addCategory =
    createAsyncThunk('category/addCategory',async (body)=>{
        return  createCategory(
            body.token,
            body.name,
            body.description,
            body.type
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchCategory =
    createAsyncThunk('category/fetchCategory',async (body)=>{
        return  getCategory(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })


const categorySlice = createSlice({
    name: "category", initialState: {
        displayCategoryForm:false,
        addCategoryInProcess:false,
        fetchCategoryInProcess:false,
        categoryList: []
    }, reducers: {
        showCategoryForm: (state) => {
            state.displayCategoryForm = true
        },
        closeCategoryForm:(state) =>{
            state.displayCategoryForm = false
        }
    },
    extraReducers:{
        [addCategory.pending]:(state) => {
            state.addCategoryInProcess = true
            console.log("pending")
        },
        [addCategory.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log("Category Created")
                alert("Category Created")
            }else {
                console.log(action.payload.message)
            }
            state.addCategoryInProcess =false
            state.displayCategoryForm = false
        },
        [addCategory.rejected]:(state)=>{
            state.addCategoryInProcess = false
            console.log("Category Create failed")
            alert("Category Create failed,Try again")
        },
        [fetchCategory.pending]:(state) => {
            state.fetchCategoryInProcess = true
            console.log("pending")
        },
        [fetchCategory.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log(state.categoryList)
                state.categoryList = action.payload.data
                console.log("Category fetched")
                console.log(state.categoryList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchCategoryInProcess =false
        },
        [fetchCategory.rejected]:(state)=>{
            state.fetchCategoryInProcess = false
            console.log("Category fetch failed")
        },
    }
})

export const {showCategoryForm,closeCategoryForm} = categorySlice.actions;

export default categorySlice;