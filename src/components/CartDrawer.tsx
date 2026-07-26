"use client";
import { useSelector } from "react-redux";
import {RootState } from "../redux/store";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
    incrementarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito
} from "../redux/slices/CarritoSlice";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({isOpen, onClose,}: CartDrawerProps) {
const carrito = useSelector( (state: RootState)=> state.cart.carrito)
const total = carrito.reduce( (acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
const dispatch = useDispatch();
const handleVaciarCarrito = () => {

    const confirmar = window.confirm("¿Esta seguro de vaciar el carrito?"); 
    if (!confirmar) return; dispatch(vaciarCarrito());};

    return (
    <>
        {/* Fondo oscuro */}
        <div
            onClick={onClose}
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        />

        {/* Drawer */}
        <aside
            className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 
            transition-transform duration-300 flex flex-col ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            {/* Encabezado */}
            <div className="p-6 border-b">

    <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
            Mi Carrito
        </h2>

        <button
            onClick={onClose}
            className="text-3xl hover:text-red-500"
        >
            ×
        </button>

    </div>

    {carrito.length > 0 && (

        <button
            onClick={handleVaciarCarrito}
            className="mt-4 text-red-600 hover:text-red-700 text-sm font-semibold"
        >
            Vaciar carrito
        </button>

    )}

</div>

            {/* Productos */}
            <div className="flex-1 overflow-y-auto p-6">
                {carrito.length === 0 ? (
                    <p className="text-gray-500">
                        Tu carrito está vacío.
                    </p>
                ) : (
                    <div className="space-y-4">
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

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        disminuirCantidad(producto.id)
                                                    )
                                                }
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                                            >
                                                -
                                            </button>

                                            <span className="font-semibold">
                                                {producto.cantidad}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        incrementarCantidad(producto.id)
                                                    )
                                                }
                                                className="w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    eliminarProducto(producto.id)
                                                )
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t p-6">
                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <button
                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Finalizar compra
                </button>
            </div>
        </aside>
    </>
);

}