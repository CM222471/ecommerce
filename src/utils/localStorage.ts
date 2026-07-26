import CarritoItem from "../interfaces/CarritoItem";

const llave = "carrito";

export function guardarCarrito(carrito: CarritoItem[]) {
    localStorage.setItem(llave, JSON.stringify(carrito));
}

export function obtenerCarrito(): CarritoItem[] {

    const carritoGuardado = localStorage.getItem(llave);

    if (!carritoGuardado) {
        return [];
    }

    return JSON.parse(carritoGuardado);
}