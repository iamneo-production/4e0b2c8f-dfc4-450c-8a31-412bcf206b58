import {createSlice} from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name:"transaction",
    initialState:{
        transactionList:[{
            id: 1,
            amount: 500,
            type: "expenses",
            accountName: "State bank of India",
            paymentType: "Credit card",
            category: "Sent to Fuel",
            description: "At Avinash Indian oil fuel station",
            date: "Sat Aug 26 2023",
            time: "12:00:00 AM"
        }, {
            id: 2,
            amount: 480,
            type: "expenses",
            accountName: "State bank of India",
            paymentType: "Credit card",
            category: "Sent to Movie",
            description: "At Cine Planet Hyderabad",
            date: "Sat Aug 26 2023",
            time: "12:00:00 AM"
        }]
    },
    reducers:{
        addTransaction:(state,action)=>{
            state.transactionList.push({
                id:state.transactionList.length+1,
                amount: action.payload.amount,
                description:action.payload.description,
                type: action.payload.type,
                accountName: action.payload.accountName,
                paymentType: action.payload.paymentType,
                category: action.payload.category,
                date: action.payload.date,
                time:action.payload.time
            })
        }
    }
})

export const {addTransaction} = transactionSlice.actions;

export default transactionSlice;