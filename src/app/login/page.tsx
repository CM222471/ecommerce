"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { iniciarSesionRedux } from "../../redux/slices/AuthSlice";
import {
  iniciarSesion,
  obtenerUsuarioActivo,
} from "../../utils/auth";
import {
  mostrarError,
  mostrarExito,
} from "../../utils/mensajes";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const correoLimpio = correo.trim().toLowerCase();

    if (!correoLimpio || !password.trim()) {
      await mostrarError("Todos los campos son obligatorios.");
      return;
    }

    const loginCorrecto = iniciarSesion(
      correoLimpio,
      password
    );

    if (!loginCorrecto) {
      await mostrarError(
        "Correo o contraseña incorrectos."
      );
      return;
    }

    const usuario = obtenerUsuarioActivo();

    if (!usuario) {
      await mostrarError(
        "No fue posible recuperar la información del usuario."
      );
      return;
    }

    dispatch(iniciarSesionRedux(usuario));

    await mostrarExito(
      "Inicio de sesión exitoso",
      `Bienvenido, ${usuario.nombre}.`
    );

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-amber-900 text-center mb-2">
          Iniciar sesión
        </h1>

        <p className="text-center text-stone-600 mb-8">
          Bienvenido nuevamente.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
              autoComplete="current-password"
              className="w-full border border-orange-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-stone-600">
          ¿No tienes cuenta?{" "}
          <Link
            href="/registro"
            className="text-amber-700 font-semibold hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}