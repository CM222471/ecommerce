"use client";
import {useState} from "react";
import productos from "../data/productos.json";
import ProductCard from "../components/ProductCard";
import Producto from "../interfaces/Producto";
import NabBar from "../components/NabBar";

const categorias: string[] = ["todas", ...Array.from(new Set(productos.map(p=> p.categoria)))];

export default function Home() {

  const [categoriaActiva, setCategoriaActiva] = useState<string>("todas");
  const productosFiltrados : Producto[] = categoriaActiva === "todas" ? productos : productos.filter(p => p.categoria ===categoriaActiva);

  return (
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    />

    <NabBar />

    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-amber-700 mb-8">
        Catálogo de Productos
      </h1>

      <nav className="flex flex-wrap justify-center gap-3 mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              categoriaActiva === cat
                ? "bg-amber-600 text-white shadow-md"
                : "bg-orange-50 text-stone-700 border border-orange-200 hover:bg-orange-100 hover:border-amber-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {productosFiltrados.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </main>
  </>
);
}
