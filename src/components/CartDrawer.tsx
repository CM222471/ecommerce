"use client";
import { useSelector } from "react-redux";
import {RootState } from "../redux/store";
import Image from "next/image";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({
    isOpen,
    onClose,
}: CartDrawerProps) {
 const carrito = useSelector( (state: RootState)=> state.cart.carrito)
    if (!isOpen) return null;

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

                    <p className="text-sm">
                        Cantidad: {producto.cantidad}
                    </p>
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