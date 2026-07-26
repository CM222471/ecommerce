import Usuario from "../interfaces/Usuario";

const USUARIOS_KEY = "usuarios";
const USUARIO_ACTIVO_KEY = "usuarioActivo";

function navegadorDisponible(): boolean {
  return typeof window !== "undefined";
}

export function obtenerUsuarios(): Usuario[] {
  if (!navegadorDisponible()) return [];

  try {
    const usuariosGuardados = localStorage.getItem(USUARIOS_KEY);

    if (!usuariosGuardados) return [];

    return JSON.parse(usuariosGuardados) as Usuario[];
  } catch (error) {
    console.error("No se pudieron recuperar los usuarios:", error);
    return [];
  }
}

export function guardarUsuarios(usuarios: Usuario[]): void {
  if (!navegadorDisponible()) return;

  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
}

export function registrarUsuario(usuario: Usuario): boolean {
  if (!navegadorDisponible()) return false;

  const usuarios = obtenerUsuarios();

  const correoNormalizado = usuario.correo.trim().toLowerCase();

  const usuarioExistente = usuarios.some(
    (u) => u.correo.trim().toLowerCase() === correoNormalizado
  );

  if (usuarioExistente) return false;

  usuarios.push({
    ...usuario,
    nombre: usuario.nombre.trim(),
    correo: correoNormalizado,
  });

  guardarUsuarios(usuarios);

  return true;
}

export function iniciarSesion(
  correo: string,
  password: string
): boolean {
  if (!navegadorDisponible()) return false;

  const correoNormalizado = correo.trim().toLowerCase();
  const usuarios = obtenerUsuarios();

  const usuario = usuarios.find(
    (u) =>
      u.correo.trim().toLowerCase() === correoNormalizado &&
      u.password === password
  );

  if (!usuario) return false;

  localStorage.setItem(
    USUARIO_ACTIVO_KEY,
    JSON.stringify(usuario)
  );

  return true;
}

export function obtenerUsuarioActivo(): Usuario | null {
  if (!navegadorDisponible()) return null;

  try {
    const usuarioGuardado = localStorage.getItem(
      USUARIO_ACTIVO_KEY
    );

    if (!usuarioGuardado) return null;

    return JSON.parse(usuarioGuardado) as Usuario;
  } catch (error) {
    console.error("No se pudo recuperar la sesión:", error);
    return null;
  }
}

export function cerrarSesion(): void {
  if (!navegadorDisponible()) return;

  localStorage.removeItem(USUARIO_ACTIVO_KEY);
}