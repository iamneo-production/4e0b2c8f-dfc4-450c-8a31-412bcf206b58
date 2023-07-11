import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./features/userSlice";
import transactionSlice from "./features/transactionSlice";
import accountSlice from "./features/accountSlice";
import categorySlice from "./features/categorySlice";
import budgetSlice from "./features/budgetSlice";


const store = configureStore({
        reducer: {
            user: userSlice.reducer,
            account: accountSlice.reducer,
            category: categorySlice.reducer,
            transaction: transactionSlice.reducer,
            budget: budgetSlice.reducer,
        }
    }
)

export default store;