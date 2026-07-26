import Swal from "sweetalert2";

export function mostrarError(mensaje: string) {
  return Swal.fire({
    icon: "error",
    title: "Ocurrió un problema",
    text: mensaje,
    confirmButtonColor: "#d97706",
  });
}

export function mostrarExito(titulo: string, mensaje?: string) {
  return Swal.fire({
    icon: "success",
    title: titulo,
    text: mensaje,
    confirmButtonColor: "#d97706",
  });
}

export function mostrarToast(mensaje: string) {
  return Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 1600,
    timerProgressBar: true,
  });
}