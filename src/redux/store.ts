import {configureStore} from "@reduxjs/toolkit";
import CarritoReducer from "./slices/CarritoSlice";
import { guardarCarrito } from "../utils/localStorage";


export const store = configureStore({

    reducer:{ cart: CarritoReducer}
});

store.subscribe(() => {

    guardarCarrito(
        store.getState().cart.carrito
    );

});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;