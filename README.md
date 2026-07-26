ECO-MMerce

Aplicación de comercio electrónico desarrollada con Next.js, React y TypeScript como parte del Primer Desafío Práctico de la asignatura Diseño y Programación de Software Multiplataforma.

Sitio publicado

Vercel: https://ecommerce-j1.vercel.app/

Video:

Video: Reemplazar con el enlace del video.

Repositorio

https://github.com/CM222471/ecommerce

Funcionalidades

-Registro e inicio de sesión de usuarios.
-Validación de formularios.
-Catálogo dinámico con 20 productos.
-Filtrado de productos por categorías.
-Imágenes optimizadas mediante next/image.
-Carrito de compras con Redux Toolkit.
-Agregar productos al carrito.
-Incrementar y disminuir cantidades.
-Eliminar productos con confirmación.
-Vaciar el carrito con confirmación.
-Persistencia del carrito mediante localStorage.
-Mensajes personalizados con SweetAlert2.
-Generación de factura en formato PDF.
-Simulación del envío de la factura al correo del usuario.
-Diseño responsivo y enfoque Mobile First.
-Despliegue continuo mediante GitHub y Vercel.


Instalación

Clonar el repositorio:

git clone https://github.com/CM222471/ecommerce.git

Entrar a la carpeta del proyecto:

cd ecommerce

Instalar las dependencias:

npm install

Ejecutar el servidor de desarrollo:

npm run dev

Abrir en el navegador:

http://localhost:3000

Compilación para producción

Para comprobar que el proyecto puede compilarse correctamente:

npm run build

Para ejecutar la versión de producción localmente:

npm start

Flujo de compra

El usuario visualiza el catálogo.

Filtra los productos por categoría.

Agrega productos al carrito.

Modifica las cantidades o elimina productos.

El carrito se conserva después de recargar la página.

Para finalizar la compra, el usuario debe iniciar sesión.

Se genera una factura en formato PDF.

Se muestra la simulación del envío de la factura al correo registrado.

El carrito se vacía después de completar la compra.

Persistencia de datos

Los datos del proyecto se manejan de forma simulada:

Los productos se almacenan en un archivo JSON.

Los usuarios registrados se almacenan en localStorage.

La sesión activa se almacena en localStorage.

El carrito de compras se almacena en localStorage.

Estructura principal

src/
├── app/
├── components/
├── data/
├── interfaces/
├── providers/
├── redux/
│   └── slices/
└── utils/

Autor

Franklin Cruz Menjívar

Universidad Don Bosco Ingeniería en Ciencias de la Computación
