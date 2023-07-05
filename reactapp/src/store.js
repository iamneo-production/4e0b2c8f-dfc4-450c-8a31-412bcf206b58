import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./features/userSlice";
import transactionSlice from "./features/transactionSlice";


const store = configureStore({
    reducer: {
        user:userSlice.reducer,
        transaction:transactionSlice.reducer
    }
    }
)

export default store;