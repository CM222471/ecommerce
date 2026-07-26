import {configureStore} from "@reduxjs/toolkit";
import CarritoReducer from "./slices/CarritoSlice";
import { guardarCarrito } from "../utils/localStorage";
import authReducer from "./slices/AuthSlice";


export const store = configureStore({

    reducer:{ cart: CarritoReducer,
              auth: authReducer
    }
    
});

store.subscribe(() => {

    guardarCarrito(
        store.getState().cart.carrito
    );

});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;