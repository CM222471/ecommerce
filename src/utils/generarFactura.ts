import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import CarritoItem from "../interfaces/CarritoItem";
import Usuario from "../interfaces/Usuario";

const formatoMoneda = new Intl.NumberFormat("es-SV", {
  style: "currency",
  currency: "USD",
});

export function generarFacturaPDF(
  carrito: CarritoItem[],
  usuario: Usuario
) {
  const total = carrito.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
  );

  const doc = new jsPDF();

  doc.setTextColor(180, 83, 9);
  doc.setFontSize(22);
  doc.text("ECO-MMerce", 14, 20);

  doc.setTextColor(50, 50, 50);
  doc.setFontSize(11);
  doc.text(`Cliente: ${usuario.nombre}`, 14, 31);
  doc.text(`Correo: ${usuario.correo}`, 14, 38);
  doc.text(`Fecha: ${new Date().toLocaleString("es-SV")}`, 14, 45);

  autoTable(doc, {
    startY: 54,
    head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
    body: carrito.map((producto) => [
      producto.nombre,
      producto.cantidad.toString(),
      formatoMoneda.format(producto.precio),
      formatoMoneda.format(producto.precio * producto.cantidad),
    ]),
    foot: [["", "", "Total", formatoMoneda.format(total)]],
    theme: "grid",
    headStyles: {
      fillColor: [217, 119, 6],
      textColor: [255, 255, 255],
    },
    footStyles: {
      fillColor: [255, 247, 237],
      textColor: [146, 64, 14],
      fontStyle: "bold",
    },
  });

  const nombreSeguro = usuario.nombre
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  doc.save(`factura-${nombreSeguro || "cliente"}-${Date.now()}.pdf`);
}