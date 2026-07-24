"use client";
import {useState} from "react";
import productos from "../data/productos.json";
import ProductCard from "../components/ProductCard";
import Producto from "../interfaces/Producto";

const categorias: string[] = ["todas", ...Array.from(new Set(productos.map(p=> p.categoria)))];

export default function Home() {

  const [categoriaActiva, setCategoriaActiva] = useState<string>("todas");
  const productosFiltrados : Producto[] = categoriaActiva === "todas" ? productos : productos.filter(p => p.categoria ===categoriaActiva);

  return  (
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center"> Catálogo de Productos </h1>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {productosFiltrados.map((p) => ( <ProductCard key={p.id} producto={p} /> ))}
       </div>
    </main>
  );
}
