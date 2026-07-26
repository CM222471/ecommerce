import Image from "next/image";
import Producto from "../interfaces/Producto";
import {useDispatch} from "react-redux";
import { agregarAlCarrito } from "../redux/slices/CarritoSlice";
import { mostrarToast } from "../utils/mensajes";

interface ProductCardProps {
 producto:Producto;
}

export default function ProductCard({producto}: ProductCardProps){

    const dispatch = useDispatch();
    const handleAgregarProducto = () => { dispatch(agregarAlCarrito(producto)); mostrarToast("Producto agregado al carrito"); };
return (
  <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-4 hover:shadow-xl transition">
    <div className="flex gap-4">
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        width={120}
        height={120}
        className="w-32 h-32 rounded-xl object-cover flex-shrink-0"
      />

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold text-stone-800">
          {producto.nombre}
        </h3>

        <p className="text-stone-600 mt-2 flex-1">
          {producto.descripcion}
        </p>

        <p className="text-2xl font-bold text-amber-700 mt-4">
          ${producto.precio}
        </p>

        <button
         onClick={handleAgregarProducto}
          className="mt-4 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl font-semibold transition flex items-center justify-center gap-2"> 
          <span className="material-symbols-outlined"> shopping_cart </span>
          Agregar al carrito
        </button>
      </div>
    </div>
  </div>
);

}