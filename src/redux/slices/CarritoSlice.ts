import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CarritoItem from "../../interfaces/CarritoItem";
import Producto from "../../interfaces/Producto";

interface CarritoState {
    carrito: CarritoItem[];
}
const InicialState: CarritoState ={
 carrito: []
}

const CarritoSlice = createSlice({
    name: "carrito",
    initialState: InicialState,
    reducers:{ agregarAlCarrito:(state,action:PayloadAction<Producto>)=>{
        const producto = action.payload;
        const productoExistente = state.carrito.find(articulo => articulo.id === producto.id);
        if(productoExistente){
            productoExistente.cantidad ++;
        } else {
            state.carrito.push({ ...producto, cantidad: 1 });   
        }
    }}
})

export const {agregarAlCarrito} = CarritoSlice.actions;
export default CarritoSlice.reducer;