"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartDrawer from "./CartDrawer";
import { useDispatch } from "react-redux";
import { cerrarSesionRedux } from "../redux/slices/AuthSlice";
import { cerrarSesion } from "../utils/auth";



export default function Navbar() {

    const carrito = useSelector((state: RootState) => state.cart.carrito);
    const cantidadProductos = carrito.reduce((total, articulo) => total + articulo.cantidad, 0);
    const [isOpen, setIsOpen] = useState(false);
    const usuario = useSelector((state: RootState) => state.auth.usuario);
    const dispatch = useDispatch();
    const handleCerrarSesion = () => {

    cerrarSesion();

    dispatch(cerrarSesionRedux());

};
    return (
    <header className="bg-white border-b border-orange-100 shadow-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

            {/* Logo */}
            <div className="flex items-center gap-4">

                <button className="material-symbols-outlined text-amber-700 hover:bg-orange-100 p-2 rounded-full transition">
                    menu
                </button>

                <Link
                    href="/"
                    className="text-2xl font-extrabold text-amber-700 tracking-wide"
                >
                    ECO-MMerce
                </Link>

            </div>

            {/* Usuario y carrito */}
            <div className="flex items-center gap-4">

                {usuario ? (

                    <div className="flex items-center gap-3">

                        <span className="font-semibold text-stone-700">
                            Hola, {usuario.nombre}
                        </span>

                        <button
                            onClick={handleCerrarSesion}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                            Salir
                        </button>

                    </div>

                ) : (

                    <Link
                        href="/login"
                        className="hover:bg-orange-100 p-2 rounded-full transition"
                    >
                        <span className="material-symbols-outlined text-amber-700 text-3xl">
                            account_circle
                        </span>
                    </Link>

                )}

                <button
                    onClick={() => setIsOpen(true)}
                    className="relative hover:bg-orange-100 p-2 rounded-full transition"
                >

                    <span className="material-symbols-outlined text-amber-700 text-3xl">
                        shopping_cart
                    </span>

                    {cantidadProductos > 0 && (

                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">

                            {cantidadProductos}

                        </span>

                    )}

                </button>

            </div>

        </div>

        <CartDrawer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        />

    </header>
);
}