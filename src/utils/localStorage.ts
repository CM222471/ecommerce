import CarritoItem from "../interfaces/CarritoItem";

const CARRITO_KEY = "carrito";

export function guardarCarrito(carrito: CarritoItem[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  } catch (error) {
    console.error("No se pudo guardar el carrito:", error);
  }
}

export function obtenerCarrito(): CarritoItem[] {
  if (typeof window === "undefined") return [];

  try {
    const carritoGuardado = localStorage.getItem(CARRITO_KEY);

    if (!carritoGuardado) return [];

    return JSON.parse(carritoGuardado) as CarritoItem[];
  } catch (error) {
    console.error("No se pudo recuperar el carrito:", error);
    return [];
  }
}