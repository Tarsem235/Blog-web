import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import storage from "redux-persist/lib/storage";
import {persistReducer , persistStore} from 'redux-persist';

const persistConf= {
    key:"root",
    storage
}
const pReducer = persistReducer(persistConf, AuthReducer)

export const store = configureStore({
    reducer:{
        auth:pReducer
    }
})

export const persistor = persistStore(store)