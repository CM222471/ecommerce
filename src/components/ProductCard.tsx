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
  <article className="h-full bg-white border border-orange-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
    <div className="flex gap-4 h-full">
      <Image
        src={producto.imagen}
        alt={`Imagen de ${producto.nombre}`}
        width={120}
        height={120}
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className="text-lg font-bold text-stone-800 leading-tight">
          {producto.nombre}
        </h3>

        <p className="text-sm text-stone-600 mt-2 line-clamp-2">
          {producto.descripcion}
        </p>

        <p className="text-xl font-bold text-amber-700 mt-3">
          ${producto.precio.toFixed(2)}
        </p>

        <button
          type="button"
          onClick={handleAgregarProducto}
          className="mt-auto pt-3"
        >
          <span className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">
              shopping_cart
            </span>
            Agregar
          </span>
        </button>
      </div>
    </div>
  </article>
);

}