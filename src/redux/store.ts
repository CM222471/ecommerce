import {configureStore} from "@reduxjs/toolkit";
import CarritoReducer from "./slices/CarritoSlice";

export const store = configureStore({

    reducer:{ cart: CarritoReducer}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;