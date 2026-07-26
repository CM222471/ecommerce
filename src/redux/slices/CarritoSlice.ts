import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CarritoItem from "../../interfaces/CarritoItem";
import Producto from "../../interfaces/Producto";
import { obtenerCarrito } from "../../utils/localStorage";

interface CarritoState {
    carrito: CarritoItem[];
}
const InicialState: CarritoState ={
 carrito: obtenerCarrito()
}

const CarritoSlice = createSlice({
    name: "carrito",
    initialState: InicialState,
    reducers:{ 
        
        agregarAlCarrito:(state,action:PayloadAction<Producto>)=>{
        const producto = action.payload;
        const productoExistente = state.carrito.find(articulo => articulo.id === producto.id);
        if(productoExistente){
            productoExistente.cantidad ++;
        } else {
            state.carrito.push({ ...producto, cantidad: 1 });   
        };},
        
        incrementarCantidad:(state, action: PayloadAction<number>) => {
        const producto = state.carrito.find( articulo => articulo.id === action.payload);        
        if (producto) { producto.cantidad++;}},

        disminuirCantidad: (state, action: PayloadAction<number>) => {
        const producto = state.carrito.find(articulo => articulo.id === action.payload);
        if (producto && producto.cantidad > 1) {producto.cantidad--;}},

        eliminarProducto: (state, action: PayloadAction<number>) => {
        state.carrito = state.carrito.filter(articulo => articulo.id !== action.payload);},

        vaciarCarrito: (state) => {state.carrito = [];}
    }
})

export const {
    agregarAlCarrito,
    incrementarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito
} = CarritoSlice.actions;
export default CarritoSlice.reducer;