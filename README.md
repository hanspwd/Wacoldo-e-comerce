# Tienda Web

Este proyecto corresponde a la primera entrega de la Evaluación Parcial 1. Consiste en el desarrollo del **Frontend** de una tienda online básica y su respectivo sistema administrativo, enfocado en estructuración, diseño, y validaciones dinámicas. 

Actualmente el proyecto está diseñado sin Backend, pero con una arquitectura lista para integrarse con APIs o servicios externos en un futuro.

## Tecnologías Utilizadas

- **HTML5**: Estructura clara y semántica de la aplicación (secciones, encabezados, listas).
- **CSS3 y Bootstrap**: Hoja de estilos personalizada combinada con componentes preconstruidos de Bootstrap para asegurar un diseño responsivo, estético y consistente de manera ágil.
- **JavaScript**: Lógica del lado del cliente, manipulación del DOM, validación de formularios en tiempo real (con mensajes de error dinámicos) y gestión de datos locales (ej. `localStorage` para el carrito de compras y selectores dinámicos de Región/Comuna).

## Estructura del Sistema

El desarrollo consta de dos partes principales, cada una con su propio flujo de navegación:

### 1. Vistas de la Tienda (Pública)
Cara visible para los clientes. Incluye las siguientes pantallas:
- **Inicio (Home):** Menú de navegación, logo, información principal, listado breve de productos y footer.
- **Productos:** Catálogo con imagen, nombre, precio y opción de añadir al carrito.
- **Detalle de Producto:** Vista ampliada de un producto.
- **Carrito de Compras:** Gestión de productos añadidos y cálculo de totales (manejado vía `localStorage`).
- **Nosotros & Blogs:** Información sobre la empresa/desarrolladores y artículos/casos curiosos.
- **Contacto:** Formulario para consultas de usuarios.
- **Registro e Inicio de Sesión:** Vistas para el ingreso y alta de usuarios.

### 2. Vistas del Administrador (Privada)
Sistema de gestión para configurar y controlar el contenido de la tienda. 
- **Dashboard (Home):** Vista principal con menú de navegación vertical.
- **Mantenedor de Productos:** Listado y formularios (Crear/Editar) para administrar el catálogo.
- **Mantenedor de Usuarios:** Listado y formularios (Crear/Editar) para gestionar el acceso al sistema.

## Reglas de Negocio y Validaciones (JavaScript)

En base a los requerimientos, los formularios cuentan con validaciones estrictas:
- **Correos Electrónicos:** Restringidos únicamente a dominios específicos (`@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`).
- **Contraseñas:** Deben tener una longitud de entre 4 y 10 caracteres.
- **Identidad (RUN):** Formato chileno sin puntos ni guion (ej. `19011022K`), longitud válida de 7 a 9 caracteres.
- **Productos:** Precios positivos (permite decimales), validación de stock (números enteros), y alertas dinámicas para *Stock Crítico*.
- **Roles:** Soporte para perfiles de **Administrador** (acceso total), **Vendedor** (acceso a productos y órdenes) y **Cliente** (solo tienda).
- **Dirección:** Selectores dinámicos en donde las comunas se actualizan dependiendo de la Región seleccionada.

## Evolución del Proyecto

Toda la interfaz y las interacciones están diseñadas para funcionar en el navegador y quedan preparadas para, en las siguientes fases del curso, reemplazar la persistencia local y estática por el consumo de datos reales a través de servicios web y bases de datos.
