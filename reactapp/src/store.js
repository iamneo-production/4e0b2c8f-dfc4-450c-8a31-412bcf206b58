import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./features/userSlice";
import transactionSlice from "./features/transactionSlice";
import accountSlice from "./features/accountSlice";
import categorySlice from "./features/categorySlice";
import budgetSlice from "./features/budgetSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";

const persistConfig = {
    key: "paymint",
    storage,
};

const rootReducer = combineReducers({
    user: userSlice.reducer,
    account: accountSlice.reducer,
    category: categorySlice.reducer,
    transaction: transactionSlice.reducer,
    budget: budgetSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    }
)

const persistor = persistStore(store);

export { store, persistor };