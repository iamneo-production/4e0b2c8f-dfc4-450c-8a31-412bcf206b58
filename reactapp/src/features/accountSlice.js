import {createSlice} from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account", initialState: {
        accountList: [{
            id:1,
            name: "State Bank of India",
            totalDeposit: 50788,
            totalWithdrawal: 48185,
            currentBalance: 2185,
            paymentType:[
                "Net Banking",
                "UPI"
            ]
        }, {
            id:2,
            name: "Paytm Payment Bank",
            totalDeposit: 20788,
            totalWithdrawal: 2365,
            currentBalance: 18305,
            paymentType:[
                "UPI",
                "Debit Card",
                "Net Banking"
            ]
        }, {
            id:3,
            name: "HDFC Bank",
            totalDeposit: 15788,
            totalWithdrawal: 14895,
            currentBalance: 985,
            paymentType:[
                "UPI",
                "Credit Card",
                "Debit Card",
                "Net Banking"
            ]
        }]
    }, reducers: {
        addAccount: (state, action) => {
            state.accountList.push({
                id:state.accountList.length+1,
                name: action.payload.name,
                totalDeposit: 0,
                totalWithdrawal: 0,
                currentBalance: action.payload.currentBalance,
                paymentType:action.payload.paymentType
            })
        }
    }
})

export const {addAccount} = accountSlice.actions;

export default accountSlice;