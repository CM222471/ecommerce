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

  return  (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"/>
    < NabBar />
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center"> Catálogo de Productos </h1>
           <nav className="flex flex-wrap justify-center gap-3 mb-8">
               {categorias.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setCategoriaActiva(cat)}
                   className={`px-5 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                     categoriaActiva === cat
                       ? "bg-blue-600 text-white shadow-lg"
                       : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-blue-100 hover:border-blue-500"
                   }`}
                 >
                    {cat}
                  </button>
                ))}
             </nav>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {productosFiltrados.map((p) => ( <ProductCard key={p.id} producto={p} /> ))}
       </div>
    </main>
    </>
  );
}
