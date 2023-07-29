import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./features/userSlice";
import transactionSlice from "./features/transactionSlice";
import accountSlice from "./features/accountSlice";
import categorySlice from "./features/categorySlice";
import budgetSlice from "./features/budgetSlice";
import logoutReducer from './features/logoutSlice';
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import goalSlice from "./features/goalSlice";

const persistConfig = {
    key: "paymint",
    storage,
    blacklist: ["logout"],
};

const rootReducer = combineReducers({
    user: userSlice.reducer,
    account: accountSlice.reducer,
    category: categorySlice.reducer,
    transaction: transactionSlice.reducer,
    budget: budgetSlice.reducer,
    goal:goalSlice.reducer,
    logout: logoutReducer.reducer,
});

const persistedReducer = persistReducer(persistConfig,
    (state, action) => {
        if (action.type === "logout/logout") {
            state = rootReducer(undefined, action);
        }
        return rootReducer(state, action);
    });

const store = configureStore({
    reducer: persistedReducer,
    }
)

const persistor = persistStore(store);

export { store, persistor };