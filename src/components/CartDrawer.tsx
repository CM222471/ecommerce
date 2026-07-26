"use client";
import { useSelector } from "react-redux";
import {RootState } from "../redux/store";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
    incrementarCantidad,
    disminuirCantidad,
    eliminarProducto,
} from "../redux/slices/CarritoSlice";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({isOpen, onClose,}: CartDrawerProps) {
 const carrito = useSelector( (state: RootState)=> state.cart.carrito)
    if (!isOpen) return null;
const dispatch = useDispatch();
    return (
            <aside className="fixed top-0 right-0 h-screen w-96 bg-white shadow-2xl z-50 flex flex-col">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">Mi Carrito</h2>


            <button
                onClick={onClose}
                className="text-3xl hover:text-red-500"
            >
                ×
            </button>

        </div>

        {carrito.length === 0 ? (

    <p className="text-gray-500">
        Tu carrito está vacío.
    </p>

) : (

    <div className="flex-1 overflow-y-auto p-6">

        {carrito.map((producto) => (

            <div
                key={producto.id}
                className="flex gap-4 border-b pb-4"
            >

                <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                />

                <div className="flex-1">

                    <h3 className="font-semibold">
                        {producto.nombre}
                    </h3>

                    <p className="text-sm text-gray-500">
                        ${producto.precio}
                    </p>

                    <div className="flex items-center justify-between mt-4">

    <div className="flex items-center gap-3">

        <button
            onClick={() => dispatch(disminuirCantidad(producto.id))}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
        >
            -
        </button>

        <span className="font-semibold">

            {producto.cantidad}

        </span>

        <button
            onClick={() => dispatch(incrementarCantidad(producto.id))}
            className="w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
            +
        </button>

    </div>

    <button
        onClick={() => dispatch(eliminarProducto(producto.id))}
        className="text-red-600 hover:text-red-700"
    >
        🗑️
    </button>

</div>
                    <p className="text-sm">
                        Total por Producto: ${producto.cantidad * producto.precio}
                    </p>

                </div>

            </div>

        ))}

    </div>

)}

    </aside>

    );

}