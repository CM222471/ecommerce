"use client";

import { useState } from "react";
import { registrarUsuario } from "../../utils/auth";
import { useRouter } from "next/navigation";

export default function RegistroPage() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (
        !nombre.trim() ||
        !correo.trim() ||
        !password.trim() ||
        !confirmarPassword.trim()
    ) {

        alert("Todos los campos son obligatorios.");
        return;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correo)) {

        alert("Ingrese un correo válido.");
        return;

    }

    if (password.length < 8) {

        alert("La contraseña debe tener al menos 8 caracteres.");
        return;

    }

    if (password !== confirmarPassword) {

        alert("Las contraseñas no coinciden.");
        return;

    }

    const registrado = registrarUsuario({

        nombre,
        correo,
        password,

    });

    if (!registrado) {

        alert("Ya existe un usuario con ese correo.");
        return;

    }

    alert("Usuario registrado correctamente.");

    router.push("/login");

};

    return (

        <main className="min-h-screen bg-orange-50 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-amber-900 text-center mb-2">
                    Crear Cuenta
                </h1>

                <p className="text-center text-stone-600 mb-8">
                    Regístrate para comenzar a comprar.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>

                        <label className="block mb-2 font-medium text-stone-700">
                            Nombre
                        </label>

                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full border border-orange-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium text-stone-700">
                            Correo
                        </label>

                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className="w-full border border-orange-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium text-stone-700">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-orange-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium text-stone-700">
                            Confirmar contraseña
                        </label>

                        <input
                            type="password"
                            value={confirmarPassword}
                            onChange={(e) => setConfirmarPassword(e.target.value)}
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