# Tienda Web

Desarrollo del **Frontend** de una tienda online básica y su respectivo sistema administrativo, enfocado en estructuración, diseño y validaciones dinámicas.

Actualmente el proyecto está diseñado sin Backend, pero con una arquitectura lista para integrarse con APIs o servicios externos en un futuro. Toda la persistencia es local (`localStorage` / `sessionStorage`).

## Tecnologías Utilizadas

- **HTML5**: Estructura clara y semántica de la aplicación (secciones, encabezados, listas).
- **CSS3**: Hoja de estilos propia y externa (`css/style.css`), diseño responsivo, botones tipo pill, navbar con efecto glass y micro-animaciones (sin frameworks).
- **JavaScript (vanilla)**: Lógica del lado del cliente, manipulación del DOM, validación de formularios en tiempo real (con mensajes de error dinámicos) y gestión de datos locales (carrito de compras, catálogo, usuarios, sesión y selectores dinámicos de Región/Comuna).

## Estructura de Carpetas

- `index.html`: Página principal (Home) de la tienda.
- `tienda/`: Vistas públicas (productos, detalle, carrito, registro, login, contacto, nosotros, blogs, blog-1, blog-2).
- `admin/`: Vistas privadas (dashboard, productos, producto-form, usuarios, usuario-form).
- `css/style.css`: Hoja de estilos externa de todo el sitio.
- `js/validaciones.js`: Reglas de negocio reutilizables (retorna `{valido, mensaje}`).
- `js/datos.js`: Arreglo base de productos, categorías, tipos de usuario y catálogo persistente.
- `js/regiones_comunas.js`: Las 16 regiones de Chile con sus comunas.
- `js/carrito.js`: Lógica y reglas del carrito con persistencia en `localStorage`.
- `js/app.js`: Código compartido (navbar, footer, insignia del carrito, sesión y roles, cupones).
- `img/`: Imágenes locales de productos y logo de Webpay.
- `docs/`: Anexos del proyecto (instrucciones, planillas, ERS y mockups con diagramas de flujo).

## Estructura del Sistema

El desarrollo consta de dos partes principales, cada una con su propio flujo de navegación:

### 1. Vistas de la Tienda (Pública)

- **Inicio (Home):** Navbar con logo y carrito con insignia viva, hero con producto destacado, grilla de productos renderizada desde el arreglo JS y footer con categorías clickeables y newsletter.
- **Productos:** Catálogo con filtro por categoría (admite enlace directo `?categoria=`), imagen, nombre, precio y botón añadir.
- **Detalle de Producto:** Miga de pan, imagen, precio, descripción, alerta de stock crítico, selector de cantidad y productos relacionados.
- **Carrito de Compras:** Tabla con cantidades (+/-), eliminación, cupones de descuento (`DUOC10`, `BIENVENIDA15`), cálculo de total, botón pagar y sello de pago seguro Webpay.
- **Nosotros & Blogs:** Información de la empresa/equipo y 2 casos curiosos con su detalle.
- **Contacto:** Formulario con validación (los mensajes se guardan localmente).
- **Registro e Inicio de Sesión:** Alta de clientes con validación en tiempo real y Región/Comuna dinámicas; el login redirige según el rol.

### 2. Vistas del Administrador (Privada)

Acceso protegido por sesión y rol (Administrador total, Vendedor solo productos).

- **Dashboard (Home):** Menú lateral, saludo por usuario y estadísticas (productos, stock crítico, usuarios, mensajes).
- **Mantenedor de Productos:** Listado con resaltado de stock crítico; crear, editar y eliminar (los cambios persisten y se reflejan en la tienda).
- **Mantenedor de Usuarios:** Listado y formularios (crear/editar) con todas las validaciones de negocio.

## Reglas de Negocio y Validaciones (JavaScript)

- **Correos Electrónicos:** Requeridos, máx. 100 caracteres y solo dominios `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- **Contraseñas:** Requeridas, entre 4 y 10 caracteres, con confirmación.
- **Identidad (RUN):** Requerido, 7 a 9 caracteres, sin puntos ni guion y con dígito verificador válido (módulo 11).
- **Productos:** Código mín. 3, nombre máx. 100, descripción opcional máx. 500, precio positivo con decimales (0 = FREE), stock entero positivo y alerta dinámica de *Stock Crítico*.
- **Usuarios:** Nombre máx. 50, apellidos máx. 100, dirección máx. 300, tipo (Administrador/Vendedor/Cliente) y Región/Comuna dinámicas.
- **Contacto:** Nombre máx. 100, correo válido y comentario requerido máx. 500.
- **Carrito:** Cantidad entera entre 1 y el stock disponible, sin superar stock al acumular, sin stock no se añade y todo persiste en `localStorage`.
- **Roles:** Administrador (acceso total), Vendedor (solo productos) y Cliente (solo tienda).

## Usuarios de Prueba

- Administrador: `admin@duoc.cl` / `admin123`
- Vendedor: `vendedor@duoc.cl` / `vende123`
- El registro de la tienda crea usuarios Cliente.

## Cómo Ejecutar

Sin compilación ni dependencias: abrir `index.html` en el navegador.

## Evolución del Proyecto

Toda la interfaz y las interacciones funcionan en el navegador y quedan preparadas para, en las siguientes fases, reemplazar la persistencia local y estática por el consumo de datos reales a través de servicios web y bases de datos.
