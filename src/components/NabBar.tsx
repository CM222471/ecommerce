"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartDrawer from "./CartDrawer";


export default function Navbar() {

    const carrito = useSelector((state: RootState) => state.cart.carrito);
    const cantidadProductos = carrito.reduce((total, articulo) => total + articulo.cantidad, 0);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
<CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <button className="material-symbols-outlined text-blue-600 hover:bg-gray-100 p-2 rounded-full transition">
                        menu
                    </button>

                    <Link
                        href="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        ECO-MMerce
                    </Link>
                </div>

                {/* Iconos */}
                <div className="flex items-center gap-4">

                    <button onClick={() => setIsOpen(true)} className="relative hover:bg-gray-100 p-2 rounded-full transition">

    <span className="material-symbols-outlined text-blue-600 text-3xl">
        shopping_cart
    </span>

    {cantidadProductos > 0 && (
        <span
            className=" absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold " >
            {cantidadProductos}
        </span>
    )}

</button>

                </div>

            </div>
            <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </header>
        
    );
}