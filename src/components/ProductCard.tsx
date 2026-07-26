import Image from "next/image";
import Producto from "../interfaces/Producto";
import {useDispatch} from "react-redux";
import { agregarAlCarrito } from "../redux/slices/CarritoSlice";

interface ProductCardProps {
 producto:Producto;
}

export default function ProductCard({producto}: ProductCardProps){

    const disPatch = useDispatch();
return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100">

        <Image
            src={producto.imagen}
            alt={producto.nombre}
            width={300}
            height={300}
            className="w-full h-60 object-cover"
        />

        <div className="p-5">

            <h3 className="text-xl font-bold text-stone-800 mb-2">
                {producto.nombre}
            </h3>

            <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                {producto.descripcion}
            </p>

            <p className="text-3xl font-bold text-amber-700 mb-5">
                ${producto.precio}
            </p>

            <button
                className="w-full bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                onClick={() => disPatch(agregarAlCarrito(producto))}
            >
                <span className="material-symbols-outlined">
                    shopping_cart
                </span>

                Agregar al carrito
            </button>

        </div>

    </div>
);

}