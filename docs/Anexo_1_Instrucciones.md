# Instrucciones del Proyecto

## Objetivos del proyecto:
Desarrollar una tienda online básica utilizando HTML, CSS y JavaScript. Este proyecto sentará las bases para futuros desarrollos. El enfoque principal es dominar la estructura y el diseño web básico, estilos propios, validaciones en formulario, y la colaboración efectiva con herramientas de control de versiones.

### Requisitos del proyecto:

**Estructura y etiquetado con HTML:**
* Crear contenido web utilizando la versión actual de HTML.
* Implementar una estructura clara y semántica que incluya secciones, encabezados, párrafos y listas donde sea necesario.

**Navegación y elementos interactivos:**
Implementar una navegación completa que incluya:
* Hipervínculos para la navegación entre páginas.
* Imágenes y botones para la interacción del usuario.
* Elementos de navegación como menús y barras laterales.
* Formularios para el ingreso de datos.

**Diseño con CSS:**
* Implementar una hoja de estilos CSS personalizada.
* Incorporar la hoja de estilos de manera externa para facilitar el mantenimiento.
* Asegurar que el diseño sea consistente y atractivo visualmente.
* Desarrollar una hoja de estilos externa para aplicar diseño responsivo y estético.
* Usar selectores CSS y propiedades para personalizar el diseño, asegurando que sea consistente en todas las páginas.

**Validación de formularios con JavaScript:**
* Desarrollar validaciones para formularios utilizando JavaScript.
* Implementar sugerencias y mensajes de error personalizados para mejorar la usabilidad.
* Implementar funciones de JavaScript para validar formularios en tiempo real.
* Añadir mensajes de error y sugerencias dinámicas para mejorar la experiencia del usuario.

**Colaboración y uso de repositorios:**
* Configurar un repositorio remoto en GitHub para el proyecto.
* Realizar cambios en el repositorio con comentarios claros y coherentes.
* Colaborar efectivamente con los miembros del equipo, distribuyendo tareas de manera equitativa.

---

## Estructura del Sistema
El desarrollo del sistema consta de 2 partes, una parte que es la tienda y la otra el sistema administrativo.
Se presenta un flujo de navegación que conecta Inicio de Sesión, Registro, Vistas Públicas (Home, Productos, Detalle de Productos, Nosotros, Blogs, Detalle de Blogs, Contacto) y Vistas Privadas de Administrador (Home, Listado y Mantenedor de Productos, Listado y Mantenedor de Usuarios).

---

## Detalle de los mockups web por cada vista

Los contenidos presentados son requisitos mínimos y sugerencias para el desarrollo del proyecto.

### Vistas tienda
Esta vista es de manera pública y será la cara visible de la tienda.

* **Página principal (HOME):**
  * Desarrolla una página que se pueda navegar entre las otras páginas.
  * Crea un menú de navegación, incorporando el logo de la tienda y un carrito de compra.
  * Implementa un componente principal donde se muestre la información e imagen de la tienda.
  * Muestra una lista de productos con su imagen, nombre y precio.
  * Añade un footer.

* **Registro de usuario:**
  * Diseño de la vista de registro (Nombre completo, correo, contraseña, confirmar contraseña, teléfono opcional, región y comuna mediante selects).

* **Inicio de sesión (Login):**
  * Diseño de la vista de ingreso del usuario (Correo y Contraseña).
  * Agregar logo de la empresa y nombre.
  * Formulario de inicio de sesión.

* **Nosotros:**
  * Una página web en donde explican de que se trata la empresa, y sus desarrolladores.

* **Blogs:**
  * Una vista donde se muestra las noticias referentes a la tienda, como datos curiosos (contenido del componente: Imagen, título, descripción corta).
  * **Detalle blogs:** Crea 2 detalles de blogs relacionados a la tienda (Contenido del componente: Imagen, título, descripción larga – Libre elección).

* **Contacto:**
  * Vista para que los usuarios puedan enviar mensajes de manera interna (Nombre, Correo, Contenido/Mensaje).

* **Productos:**
  * Lista todos los productos en ventas.
  * Desarrollo de vista de productos (imagen, nombre, precio y botón añadir).
  * Hacer clic en algún producto nos redireccionará al detalle del producto.
  * Esta ventana tiene un carrito que funciona en esta vista de productos y en el detalle del producto.

* **Detalle del producto:**
  * Detalla el contenido de cada producto y se puede añadir al carrito de compra (Carrusel/imágenes, Nombre, Precio, Descripción, Cantidad a añadir).

---

### Vista administrador
Todo sistema web necesita un sistema de gestión para configurar y controlar lo que muestra cada tienda, incluyendo el listado de productos disponibles. Este sistema de gestión permite actualizar, añadir, eliminar y organizar productos, asegurando que la información mostrada a los usuarios sea precisa y esté actualizada. Estas vistas siempre están protegidas mediante un sistema de autentificación y de permisos.

* **Home principal:**
  * Vista con menú vertical y contenido al centro.
  * El diseño del administrador es libre, pero debe tener un menú visible (ej. Dashboard, Orders, Inventory, Reports, Employees, Customers, Settings, Profile).

* **Producto o Usuario (Mantenedores):**
  * Crear un mantenedor para producto y usuario con las siguientes características:
  * **Listado de todos los Productos o Usuarios:** Tabla con columnas correspondientes.
  * **Crear un nuevo Producto o Usuario:** Formulario de ingreso (CRUD).

---

## Utilización y validación de JavaScript

En esta fase del proyecto, se definirán las reglas de negocio en las vistas desarrolladas anteriormente. A continuación, se detallarán las validaciones que se harán al sistema como requerimientos del cliente, se permite la adición de reglas y atributos adicionales según sea necesario. Es importante que el proceso de implementación y las decisiones tomadas se documenten de manera detallada, ya que luego se usarán para crear la base de datos.

### Vista de la tienda

* **Registro de usuarios:**
  * El registro de usuarios es lo mismo que el crear un usuario en el administrador (ver requerimientos vista administrador).

* **Inicio de sesión:**
  * **Correo:** Requerido / Max: 100 caracteres / Solo correos con `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
  * **Contraseña:** Requerido / Entre 4 a 10 caracteres.

* **Contacto:**
  * **Nombre:** Requerido / Max: 100 caracteres.
  * **Correo:** Max: 100 caracteres / Solo correos con `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
  * **Comentario:** Requerido / Max: 500 caracteres.

* **Productos, Detalle del producto (Carrito de compras):**
  * **Listar productos mediante JavaScript:** Crear un arreglo de productos y mostrar los productos del arreglo.
  * **Carrito de compra:** Implementar un carrito de comprar, añadir un producto al carrito, investigar y definir reglas del carrito mediante lógicas. Guardar información del carrito en `LOCALSTORAGE`.

### Vista del administrador

* **Producto (Nuevo Producto o Editar producto):**
  * **Código producto:** Requerido / Texto / Min: 3 / Max: no tiene límite.
  * **Nombre:** Requerido / Max: 100.
  * **Descripción:** Opcional / Max: 500.
  * **Precio:** Requerido / Min: 0 (se considerará un producto FREE) / Max: No tiene limitaciones / Puede ser números decimales.
  * **Stock (Cantidad en el inventario):** Requerido / Min: 0 / Max: No tiene limitaciones / Solo números enteros.
  * **Stock Crítico:** Mostrar un mensaje de alerta cuando el stock sea igual o inferior. Opcional / Min: 0 / Solo números enteros.
  * **Categorías:** Requerido / Select que muestra la categoría del producto.
  * **Imagen:** Opcional.

* **Usuario:**
  * **Run:** Requerido / Validar si el run está correcto / Sin puntos ni guion, Ej: 19011022K / Min: 7 / Max: 9.
  * **Nombre:** Requerido / Max: 50 caracteres.
  * **Apellidos:** Requerido / Max: 100 caracteres.
  * **Correo:** Requerido / Max: 100 caracteres / Validar Solo correos con `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
  * **Fecha Nacimiento:** Opcional.
  * **Tipo de Usuario:** (implementar solo para la vista administrativa y ver roles asociados al sistema). Select que muestra el perfil del usuario (Administrador, Cliente y Vendedor).
  * **Región y Comuna:** Mostrar las regiones que están en un arreglo de JS complementario. Al momento de cambiar una región, también cambiaría la búsqueda de las comunas.
  * **Dirección:** Requerido / Max: 300 caracteres.

### Roles asociados al sistema:
* **Administrador:** tiene acceso total al sistema.
* **Vendedor:**
  * Puede visualizar la lista de los productos y el detalle.
  * Puede visualizar la lista de órdenes y el detalle.
  * Todos los demás accesos no deben aparecer en la vista del vendedor.
* **Cliente:** Solo puede acceder a la tienda.
