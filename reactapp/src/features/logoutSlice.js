import { createSlice } from "@reduxjs/toolkit";
import {userSlice} from "./userSlice";
import accountSlice from "./accountSlice";
import categorySlice from "./categorySlice";
import transactionSlice from "./transactionSlice";
import budgetSlice from "./budgetSlice";

const logoutSlice = createSlice({
    name: "logout",
    initialState: {},
    reducers: {
        logout: () => {
            console.log("logout")
            return {
                user: userSlice.reducer(undefined, {}),
                account: accountSlice.reducer(undefined, {}),
                category: categorySlice.reducer(undefined, {}),
                transaction: transactionSlice.reducer(undefined, {}),
                budget: budgetSlice.reducer(undefined, {}),
            };
        },
    },
});

export const { logout } = logoutSlice.actions;
export default logoutSlice;