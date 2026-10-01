# Tienda Web (E-Commerce Wacoldo)

Desarrollo del **Frontend** de una tienda online y su respectivo sistema administrativo, migrado y estructurado con **React 19**, **Vite** y **TypeScript**.

Actualmente el proyecto está diseñado sin Backend, pero con una arquitectura desacoplada y lista para integrarse con APIs o servicios externos (REST/GraphQL/Firebase). Toda la persistencia es local mediante `localStorage` y `sessionStorage`.

## Tecnologías Utilizadas

- **React 19**: Componentes funcionales, hooks (`useState`, `useEffect`, `useMemo`), Context API para estado global (`AuthContext`, `ProductContext`, `CartContext`).
- **TypeScript**: Tipado estático riguroso para modelos de datos (`Usuario`, `Producto`, `ItemCarrito`), validaciones y props.
- **Vite 8**: Servidor de desarrollo ultra rápido con Hot Module Replacement (HMR) y empaquetador de producción optimizado.
- **React Router DOM 7**: Enrutamiento declarativo para vistas públicas, navegación protegida (`ProtectedRoute`) y subrutas administrativas con `<Outlet />`.
- **CSS3**: Hoja de estilos propia (`css/style.css`), diseño responsivo, botones tipo pill, navbar con efecto glass y micro-animaciones.
- **React-Bootstrap & Bootstrap 5**: Integrados en las dependencias para componentes UI según preferencias del proyecto.

## Estructura del Proyecto

```text
├── index.html                  # Punto de entrada de la aplicación Vite
├── vite.config.ts              # Configuración de Vite y plugin de React
├── tsconfig.json               # Configuración de compilador TypeScript
├── package.json                # Dependencias y scripts de ejecución
├── public/                     # Archivos estáticos y multimedia (/img/...)
├── css/
│   └── style.css               # Estilos globales y responsive del sitio
├── src/
│   ├── main.tsx                # Montaje de la aplicación React
│   ├── App.tsx                 # Enrutador principal y proveedores de contexto
│   ├── vite-env.d.ts           # Declaraciones de tipos para assets de Vite
│   ├── types/
│   │   └── index.ts            # Interfaces y tipos (Producto, Usuario, Carrito, etc.)
│   ├── utils/
│   │   ├── validaciones.ts     # Validaciones de negocio (RUT chileno Módulo 11, correo, etc.)
│   │   ├── regionesComunas.ts  # 16 regiones de Chile y sus comunas asociadas
│   │   └── datos.ts            # Semilla inicial de productos, usuarios y cupones
│   ├── context/
│   │   ├── AuthContext.tsx     # Estado global de sesión, login, registro y roles
│   │   ├── ProductContext.tsx  # Estado global de productos y catálogo
│   │   └── CartContext.tsx     # Estado global de carrito, cupones y totales
│   ├── components/
│   │   ├── Navbar.tsx          # Barra de navegación con badge dinámico y sesión
│   │   ├── Footer.tsx          # Footer con categorías dinámicas y newsletter
│   │   ├── ProductCard.tsx     # Tarjeta reutilizable con stock y alertas
│   │   └── ProtectedRoute.tsx  # Guardián de rutas administrativas por rol
│   └── pages/
│       ├── Home.tsx            # Portada principal con producto destacado y novedades
│       ├── Products.tsx        # Catálogo con filtro dinámico por categoría
│       ├── ProductDetail.tsx   # Ficha de producto, selector de cantidad y relacionados
│       ├── Cart.tsx            # Carrito de compras, cupones y sello Webpay
│       ├── Login.tsx           # Inicio de sesión con validación y redirección por rol
│       ├── Register.tsx        # Registro de clientes con validación completa de RUT
│       ├── About.tsx           # Información de la empresa y equipo
│       ├── Blogs.tsx           # Lista de casos y noticias
│       ├── BlogDetail.tsx      # Detalle de artículos
│       ├── Contact.tsx         # Formulario de contacto con almacenamiento local
│       └── admin/
│           ├── AdminLayout.tsx     # Layout con menú lateral administrativo
│           ├── Dashboard.tsx       # Estadísticas (KPIs) y accesos rápidos
│           ├── AdminProducts.tsx   # Mantenedor de productos con alerta de stock crítico
│           ├── AdminProductForm.tsx# Formulario de creación/edición de productos
│           ├── AdminUsers.tsx      # Mantenedor de usuarios con RUT/RUN
│           └── AdminUserForm.tsx   # Formulario de creación/edición de usuarios
├── tienda/                     # (Respaldo) Vistas vanilla originales
├── admin/                      # (Respaldo) Vistas admin vanilla originales
└── index.vanilla.html          # (Respaldo) Home vanilla original
```

## Reglas de Negocio y Validaciones (TypeScript)

- **Identidad (RUT / RUN chileno):** Validación completa según el algoritmo Módulo 11 para el cálculo del dígito verificador (`0-9` y `K`). Admite formatos con puntos y guion (`12.345.678-5`), con guion (`12345678-5`) y continuos (`123456785`), con autoformateo al salir del campo (`blur`) y validación de unicidad.
- **Correos Electrónicos:** Requeridos, máx. 100 caracteres y solo dominios institucionales/comerciales permitidos: `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- **Contraseñas:** Requeridas, entre 4 y 10 caracteres, con confirmación coincidente.
- **Productos:** Código mín. 3, nombre máx. 100, descripción opcional máx. 500, precio positivo con decimales (0 = FREE), stock entero positivo y alerta dinámica de *Stock Crítico*.
- **Usuarios:** Nombre máx. 50, apellidos máx. 100, dirección máx. 300, tipo (`Administrador` / `Vendedor` / `Cliente`) y selectores dinámicos de Región y Comuna.
- **Contacto:** Nombre máx. 100, correo válido y comentario requerido máx. 500 caracteres.
- **Carrito:** Cantidad entera entre 1 y el stock disponible, sin permitir superar stock al acumular. Cupones de descuento activos (`DUOC10` para 10% y `BIENVENIDA15` para 15%). Persistencia automática en `localStorage`.
- **Roles:**
  - `Administrador`: Acceso total (Dashboard, Productos y Usuarios).
  - `Vendedor`: Acceso restringido (Dashboard y Productos).
  - `Cliente`: Acceso a la tienda pública.

## Usuarios de Prueba

- **Administrador:** `admin@duoc.cl` / `admin123`
- **Vendedor:** `vendedor@duoc.cl` / `vende123`
- El registro de nuevos usuarios en la tienda pública crea perfiles de rol **Cliente**.

## Cómo Ejecutar el Proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo (Vite):**
   ```bash
   npm run dev
   ```
   Abre la URL proporcionada (por defecto `http://localhost:3000`).

3. **Compilar para producción (TypeScript + Vite):**
   ```bash
   npm run build
   ```

4. **Previsualizar la versión de producción:**
   ```bash
   npm run preview
   ```
