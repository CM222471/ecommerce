import  Producto  from "./Producto";

export default interface CarritoItem extends Producto{
    cantidad: number;
}
