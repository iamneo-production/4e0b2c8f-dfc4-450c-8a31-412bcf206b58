import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null
    },
    reducers:{
        createAccount: (state, action) => {
            state.currentUser = {
                message:"User registered"
            }
        },
        loginAccount:(state,action) =>{
            state.currentUser ={
                email:action.payload.email,
                password:action.payload.password
            }
            console.log(action.payload.email)
        }
    }
})

export const {createAccount,loginAccount} = userSlice.actions
export default userSlice.reducer