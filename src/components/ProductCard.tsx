import Image from "next/image";
import Producto from "../interfaces/Producto";


interface ProductCardProps {
 producto:Producto;
}

export default function ProductCard({producto}: ProductCardProps){

return(
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

    <Image
        src={producto.imagen}
        alt={producto.nombre}
        width={300}
        height={300}
        className="w-full h-60 object-cover"
    />

    <div className="p-4">

        <h3 className="text-lg font-bold mb-2">
            {producto.nombre}
        </h3>

        <p className="text-gray-600 text-sm mb-3">
            {producto.descripcion}
        </p>

        <p className="text-2xl font-bold text-blue-600">
            ${producto.precio}
        </p>

    </div>

</div>
);

}