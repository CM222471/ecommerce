import Usuario from "../interfaces/Usuario";

const USERS_KEY = "usuarios";
const SESSION_KEY = "usuarioActivo";

export function obtenerUsuarios(): Usuario[] {

    const usuarios = localStorage.getItem(USERS_KEY);

    if (!usuarios) {
        return [];
    }

    return JSON.parse(usuarios);

}
export function guardarUsuarios(usuarios: Usuario[]) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(usuarios)
    );

}
export function registrarUsuario(usuario: Usuario): boolean {

    const usuarios = obtenerUsuarios();

    const existe = usuarios.some(
        u => u.correo === usuario.correo
    );

    if (existe) {
        return false;
    }

    usuarios.push(usuario);

    guardarUsuarios(usuarios);

    return true;

}
export function iniciarSesion(
    correo: string,
    password: string
): boolean {

    const usuarios = obtenerUsuarios();

    const usuario = usuarios.find(

        u =>
            u.correo === correo &&
            u.password === password

    );

    if (!usuario) {

        return false;

    }

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(usuario)
    );

    return true;

}
export function obtenerUsuarioActivo(): Usuario | null {

    const usuario = localStorage.getItem(
        SESSION_KEY
    );

    if (!usuario) {

        return null;

    }

    return JSON.parse(usuario);

}

export function cerrarSesion() {

    localStorage.removeItem(
        SESSION_KEY
    );

}