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
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    />

    <aside
      className={`fixed top-0 right-0 h-full w-96 bg-orange-50 shadow-2xl z-50 transition-transform duration-300 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-white border-b border-orange-200 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-700">Mi Carrito</h2>

          <button
            onClick={onClose}
            className="text-3xl text-stone-500 hover:text-red-500 transition"
          >
            ×
          </button>
        </div>

        {carrito.length > 0 && (
          <button
            onClick={handleVaciarCarrito}
            className="mt-4 text-red-500 hover:text-red-600 text-sm font-semibold"
          >
            Vaciar carrito
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {carrito.length === 0 ? (
          <p className="text-stone-500 text-center mt-10">
            Tu carrito está vacío.
          </p>
        ) : (
          <div className="space-y-5">
            {carrito.map((producto) => (
              <div
                key={producto.id}
                className="flex gap-4 bg-white rounded-xl shadow-sm border border-orange-100 p-3"
              >
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-stone-800">
                    {producto.nombre}
                  </h3>

                  <p className="text-lg font-bold text-amber-700">
                    ${producto.precio}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          dispatch(disminuirCantidad(producto.id))
                        }
                        className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 transition"
                      >
                        -
                      </button>

                      <span className="font-semibold text-stone-700">
                        {producto.cantidad}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(incrementarCantidad(producto.id))
                        }
                        className="w-8 h-8 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        dispatch(eliminarProducto(producto.id))
                      }
                      className="text-red-500 hover:text-red-600 text-xl"
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

      <div className="bg-white border-t border-orange-200 p-6">
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-stone-700">Total</span>
          <span className="text-amber-700">${total.toFixed(2)}</span>
        </div>

        <button className="mt-5 w-full bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition-all duration-200 active:scale-95">
          Finalizar compra
        </button>
      </div>
    </aside>
  </>
);

}