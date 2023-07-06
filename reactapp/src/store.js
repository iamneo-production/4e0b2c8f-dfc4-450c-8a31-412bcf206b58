import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./features/userSlice";
import transactionSlice from "./features/transactionSlice";
import accountSlice from "./features/accountSlice";


const store = configureStore({
    reducer: {
        user:userSlice.reducer,
        account:accountSlice.reducer,
        transaction:transactionSlice.reducer,
    }
    }
)

export default store;