import {configureStore} from "@reduxjs/toolkit";
import CarritoReducer from "./slices/CarritoSlice";

export const store = configureStore({

    reducer:{ cart: CarritoReducer}
});