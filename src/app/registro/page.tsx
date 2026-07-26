"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registrarUsuario } from "../../utils/auth";
import { mostrarError, mostrarExito } from "../../utils/mensajes";

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim().toLowerCase();

    if (
      !nombreLimpio ||
      !correoLimpio ||
      !password.trim() ||
      !confirmarPassword.trim()
    ) {
      await mostrarError("Todos los campos son obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correoLimpio)) {
      await mostrarError("Ingrese un correo electrónico válido.");
      return;
    }

    if (password.length < 8) {
      await mostrarError(
        "La contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    if (password !== confirmarPassword) {
      await mostrarError("Las contraseñas no coinciden.");
      return;
    }

    const registrado = registrarUsuario({
      nombre: nombreLimpio,
      correo: correoLimpio,
      password,
    });

    if (!registrado) {
      await mostrarError(
        "Ya existe un usuario registrado con ese correo."
      );
      return;
    }

    await mostrarExito(
      "Registro completado",
      "Tu cuenta fue creada correctamente. Ahora puedes iniciar sesión."
    );

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-amber-900 text-center mb-2">
          Crear cuenta
        </h1>

        <p className="text-center text-stone-600 mb-8">
          Regístrate para comenzar a comprar.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="nombre"
              className="block mb-2 font-medium text-stone-700"
            >
              Nombre
            </label>

            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="name"
              className="w-full border border-orange-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label
              htmlFor="correo"
              className="block mb-2 font-medium text-stone-700"
            >
              Correo
            </label>

            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="email"
              className="w-full border border-orange-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-stone-700"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full border border-orange-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirmarPassword"
              className="block mb-2 font-medium text-stone-700"
            >
              Confirmar contraseña
            </label>

            <input
              id="confirmarPassword"
              type="password"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full border border-orange-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </main>
  );
}