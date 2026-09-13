# Anexo 1: Mockups y Diagramas de Flujo

## Figura 1: Diagrama de flujo de navegación del proyecto, propuesta entrega 1.
```mermaid
flowchart LR
    subgraph TIENDA
        direction LR
        HOME[PÁGINA PRINCIPAL<br>HOME]
        PRODUCTOS[PRODUCTOS]
        DETALLE_PROD[DETALLE PRODUCTOS]
        REGISTRO[REGISTRO USUARIO]
        LOGIN[INICIAR SESIÓN]
        NOSOTROS[NOSOTROS]
        BLOGS[BLOGS]
        DETALLE_B1[DETALLE BLOG #1]
        DETALLE_B2[DETALLE BLOG #2]
        CONTACTO[CONTACTO]

        HOME --> PRODUCTOS
        PRODUCTOS --> DETALLE_PROD
        HOME --> REGISTRO
        HOME --> LOGIN
        LOGIN --> REGISTRO
        HOME --> NOSOTROS
        HOME --> BLOGS
        BLOGS --> DETALLE_B1
        BLOGS --> DETALLE_B2
        HOME --> CONTACTO
    end

    subgraph ADMINISTRADOR
        direction LR
        ADMIN_HOME[HOME]
        ADMIN_PROD[PRODUCTO]
        NUEVO_PROD[NUEVO PRODUCTO]
        EDITAR_PROD[EDITAR PRODUCTO]
        MOSTRAR_PROD[MOSTRAR PRODUCTO]
        ADMIN_USR[USUARIO]
        NUEVO_USR[NUEVO USUARIO]
        EDITAR_USR[EDITAR USUARIO]
        MOSTRAR_USR[MOSTRAR USUARIO]

        ADMIN_HOME --> ADMIN_PROD
        ADMIN_PROD --> NUEVO_PROD
        ADMIN_PROD --> EDITAR_PROD
        ADMIN_PROD --> MOSTRAR_PROD
        MOSTRAR_PROD --> EDITAR_PROD

        ADMIN_HOME --> ADMIN_USR
        ADMIN_USR --> NUEVO_USR
        ADMIN_USR --> EDITAR_USR
        ADMIN_USR --> MOSTRAR_USR
        MOSTRAR_USR --> EDITAR_USR
    end

    LOGIN --> ADMIN_HOME
```

## Figura 2: Diagrama de flujo de navegación de la tienda, propuesta entrega 1.
```mermaid
flowchart LR
    subgraph TIENDA
        direction LR
        HOME[PÁGINA PRINCIPAL<br>HOME]
        PRODUCTOS[PRODUCTOS]
        DETALLE_PROD[DETALLE PRODUCTOS]
        REGISTRO[REGISTRO USUARIO]
        LOGIN[INICIAR SESIÓN]
        NOSOTROS[NOSOTROS]
        BLOGS[BLOGS]
        DETALLE_B1[DETALLE BLOG #1]
        DETALLE_B2[DETALLE BLOG #2]
        CONTACTO[CONTACTO]

        HOME --> PRODUCTOS
        PRODUCTOS --> DETALLE_PROD
        HOME --> REGISTRO
        HOME --> LOGIN
        LOGIN --> REGISTRO
        HOME --> NOSOTROS
        HOME --> BLOGS
        BLOGS --> DETALLE_B1
        BLOGS --> DETALLE_B2
        HOME --> CONTACTO
    end
```

## Figura 3: Mockup Home

| ⬛ **Site Name** | Home \| Productos \| Nosotros \| Blogs \| Contacto | 🛒 Cart (0) |
|:---|:---:|---:|

*Iniciar sesión* | *Registrar usuario*

> ### TIENDA ONLINE
> Our North American Field Guides provide tips for identifying birds in all of the regions of the United States and Canada. Download any of our guides for free now!
> 
> **[ 📥 ver productos ]**
> 
> <img src="../img/ariculares_inalambricos.png" width="150" height="150" style="object-fit: cover;">

| <img src="../img/ariculares_inalambricos.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/teclado_mecanico.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/polera_algodon.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/zapatillas_flex.png" width="80" height="80" style="object-fit: contain;"> |
|:---:|:---:|:---:|:---:|
| **Auriculares Inalámbricos Pro** | **Teclado Mecánico RGB** | **Polera Algodón Premium** | **Zapatillas Urbanas Flex** |
| Tecnología **$49.990** | Tecnología **$35.990** | Ropa **$12.990** | Deportes **$42.990** |

| <img src="../img/lampara_led.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/termo.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/cafe.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/botella_deportive.png" width="80" height="80" style="object-fit: contain;"> |
|:---:|:---:|:---:|:---:|
| **Lámpara de Escritorio LED** | **Termo Acero Inox 1L** | **Café de Grano 500g** | **Botella Deportiva 750ml** |
| Hogar **$19.990** | Hogar **$15.990** | Alimentos **$8.990** | Deportes **$8.990** |

---

| Site Name | Category X \| Category Y \| Category Z | Stay in Touch! Join our Newsletter: |
|:---|:---:|---:|
| 💳 💳 💳 | | `[ Enter Email ]` **[ Subscribe ]** |

## Figura 4: Mockup registro de usuario, propuesta entrega 1.

| ⬛ **Site Name** | Home \| Productos \| Nosotros \| Blogs \| Contacto | 🛒 Cart (0) |
|:---|:---:|---:|

> **Registro de usuario**
>
> NOMBRE COMPLETO
> `[                                                ]`
> 
> CORREO
> `[                                                ]`
> 
> CONTRASEÑA
> `[                                                ]`
> 
> CONFIRMAR CONTRASEÑA
> `[                                                ]`
> 
> TELEFONO (opcional)
> `[                                                ]`
> 
> | `-- Seleccione la región -- ▼` | `-- Seleccione la comuna -- ▼` |
> |---------------------------------|---------------------------------|
> | Región Metropolitana de Santiago<br>Región de la Araucanía<br>Región de Ñuble | Linares<br>Longaví<br>Concepción |
>
> **[ REGISTRAR ]**

## Figura 5: Mockup inicio de sesión (login), propuesta entrega 1.

| ⬛ **Site Name** | Home \| Productos \| Nosotros \| Blogs \| Contacto | 🛒 Cart (0) |
|:---|:---:|---:|

> **[ LOGO ]**
> ### nombre empresa
>
> **Inicio de sesión**
> 
> CORREO
> `[                                                ]`
> 
> CONTRASEÑA
> `[                                                ]`
> 
> **[ Iniciar sesión ]**

## Figura 6: Mockup página blogs, propuesta entrega 1.

| ⬛ **Site Name** | Home \| Productos \| Nosotros \| Blogs \| Contacto | 🛒 Cart (0) |
|:---|:---:|---:|

### NOTICIAS IMPORTANTES

| CASO CURIOSO #1 | <img src="../img/cafe.png" width="120" height="120" style="object-fit: contain;"> |
|:---|:---:|
| Our North American Field Guides provide tips for identifying birds in all of the regions of the United States and Canada. Download any of our guides for free now! | |
| **[ VER CASO ▼ ]** | |

| CASO CURIOSO #2 | <img src="../img/zapatillas_flex.png" width="120" height="120" style="object-fit: contain;"> |
|:---|:---:|
| Our North American Field Guides provide tips for identifying birds in all of the regions of the United States and Canada. Download any of our guides for free now! | |
| **[ VER CASO ▼ ]** | |


## Figura 7: Mockup página de contacto, propuesta entrega 1.

| ⬛ **Site Name** | Home \| Productos \| Nosotros \| Blogs \| Contacto | 🛒 Cart (0) |
|:---|:---:|---:|

> **[ LOGO ]**
> ### nombre empresa
>
> **FORMULARIO DE CONTACTOS**
> 
> NOMBRE COMPLETO
> `[                                                ]`
> 
> CORREO
> `[                                                ]`
> 
> CONTENIDO
> `[                                                ]`
> `[                                                ]`
> `[                                                ]`
> 
> **[ ENVIAR MENSAJE ]**

## Figura 8: Mockup página productos, muestra un listado de los productos, propuesta entrega 1.

| ⬛ **Site Name** | Home \| Productos \| Nosotros \| Blogs \| Contacto | 🛒 Cart (0) |
|:---|:---:|---:|

### PRODUCTOS

| <img src="../img/ariculares_inalambricos.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/teclado_mecanico.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/polera_algodon.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/zapatillas_flex.png" width="80" height="80" style="object-fit: contain;"> |
|:---:|:---:|:---:|:---:|
| Auriculares Inalámbricos Pro | Teclado Mecánico RGB | Polera Algodón Premium | Zapatillas Urbanas Flex |
| **$49.990** | **$35.990** | **$12.990** | **$42.990** |
| **[ Añadir ]** | **[ Añadir ]** | **[ Añadir ]** | **[ Añadir ]** |

| <img src="../img/lampara_led.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/termo.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/cafe.png" width="80" height="80" style="object-fit: contain;"> | <img src="../img/botella_deportive.png" width="80" height="80" style="object-fit: contain;"> |
|:---:|:---:|:---:|:---:|
| Lámpara de Escritorio LED | Termo Acero Inox 1L | Café de Grano 500g | Botella Deportiva 750ml |
| **$19.990** | **$15.990** | **$8.990** | **$8.990** |
| **[ Añadir ]** | **[ Añadir ]** | **[ Añadir ]** | **[ Añadir ]** |

## Figura 9: Mockup detalle de un producto, botón para añadir al carrito de compra, propuesta entrega 1.

| ⬛ **Site Name** | Home \| Productos \| Nosotros \| Blogs \| Contacto | 🛒 Cart (0) |
|:---|:---:|---:|

Home > Tecnología > Auriculares Inalámbricos Pro

| <img src="../img/ariculares_inalambricos.png" width="200" height="200" style="object-fit: contain;"> | **Auriculares Inalámbricos Pro** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **$49.990** |
|:---|:---|
| <img src="../img/ariculares_inalambricos.png" width="40" height="40" style="object-fit: contain;"> <img src="../img/teclado_mecanico.png" width="40" height="40" style="object-fit: contain;"> <img src="../img/polera_algodon.png" width="40" height="40" style="object-fit: contain;"> | Auriculares con cancelación activa de ruido, 30 horas de batería y micrófono integrado para llamadas. Disponibles en una variedad de colores, son una opción perfecta para cualquier ocasión. |
| | Cantidad: `[ 1 ▼ ]` |
| | **[ Añadir al carrito ]** |

**Related Products**

| <img src="../img/teclado_mecanico.png" width="60" height="60" style="object-fit: contain;"> | <img src="../img/polera_algodon.png" width="60" height="60" style="object-fit: contain;"> | <img src="../img/zapatillas_flex.png" width="60" height="60" style="object-fit: contain;"> | <img src="../img/lampara_led.png" width="60" height="60" style="object-fit: contain;"> | <img src="../img/termo.png" width="60" height="60" style="object-fit: contain;"> |
|:---:|:---:|:---:|:---:|:---:|


## Figura 10: Diagrama de flujo de navegación del administrador, propuesta entrega 1.
```mermaid
flowchart LR
    subgraph ADMINISTRADOR
        direction LR
        ADMIN_HOME[HOME]
        ADMIN_PROD[PRODUCTO]
        NUEVO_PROD[NUEVO PRODUCTO]
        EDITAR_PROD[EDITAR PRODUCTO]
        MOSTRAR_PROD[MOSTRAR PRODUCTO]
        ADMIN_USR[USUARIO]
        NUEVO_USR[NUEVO USUARIO]
        EDITAR_USR[EDITAR USUARIO]
        MOSTRAR_USR[MOSTRAR USUARIO]

        ADMIN_HOME --> ADMIN_PROD
        ADMIN_PROD --> NUEVO_PROD
        ADMIN_PROD --> EDITAR_PROD
        ADMIN_PROD --> MOSTRAR_PROD
        MOSTRAR_PROD --> EDITAR_PROD

        ADMIN_HOME --> ADMIN_USR
        ADMIN_USR --> NUEVO_USR
        ADMIN_USR --> EDITAR_USR
        ADMIN_USR --> MOSTRAR_USR
        MOSTRAR_USR --> EDITAR_USR
    end
```

## Figura 11: Mockup página home del administrador, propuesta entrega 1.

| Ø Company | ¡HOLA Administrador! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🔔 |
|:---|:---|
| **⊞ Dashboard** | |
| 📋 Orders | |
| 📦 Inventory | |
| 📄 Reports | |
| 👤 Employees | |
| 👥 Customers | |
| | |
| ⚙ Settings | |
| 👤 Profile | |
| 🔍 Search | |
| ❓ Help | |
| **👤 Profile** | |


## Figura 12: Mockup página listado de usuarios, propuesta entrega 1.

| Ø Company | **Usuarios**  `[ NUEVO USUARIO ]` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🔔 |
|:---|:---|
| ⊞ Dashboard | All Sales Orders ∨ |
| **📋 Orders** | |
| 📦 Inventory | |
| 📄 Reports | |
| 👤 Employees | |
| 👥 Customers | |

**Listado:**
| Date | Order # | Customer | Status | Amount |
|---|---|---|---|---|
| 2024-06-01 | SO1001 | Acme Corporation | Shipped | $2500.00 |
| 2024-06-02 | SO1002 | Bravo Solutions | Pending | $1200.00 |
| 2024-06-02 | SO1003 | Charlie's Workshop | Cancelled | $500.00 |
| 2024-06-03 | SO1004 | Delta Retail | Processing | $750.00 |
| ... | ... | ... | ... | ... |

« ‹ 1 2 3 **4** 5 › »


## Figura 13: Mockup página nuevo usuario en el administrador, propuesta entrega 1.

| Ø Company | **NUEVO USUARIO** |
|:---|:---|
| ⊞ Dashboard | |
| 📋 Orders | > **Registro de usuario** |
| **📦 Inventory** | > |
| 📄 Reports | > NOMBRE COMPLETO |
| 👤 Employees | > `[                                                ]` |
| 👥 Customers | > |
| | > CORREO |
| | > `[                                                ]` |
| | > |
| | > CONTRASEÑA |
| | > `[                                                ]` |
| | > |
| | > CONFIRMAR CONTRASEÑA |
| | > `[                                                ]` |
| | > |
| | > TELEFONO (opcional) |
| | > `[                                                ]` |
| | > |
| | > `-- Seleccione la región -- ▼` &nbsp;&nbsp;&nbsp; `-- Seleccione la comuna -- ▼` |
| | > `Región Metropolitana...     ` &nbsp;&nbsp;&nbsp; `Linares                     ` |
| | > |
| | > **[ REGISTRAR ]** |


## Figura 14: Diagrama de flujo de navegación del proyecto, donde se destaca las vistas que tendrán formularios con validación en JavaScript
```mermaid
flowchart LR
    subgraph TIENDA
        direction LR
        HOME[ ]
        PRODUCTOS[PRODUCTOS]
        DETALLE_PROD[DETALLE PRODUCTOS]
        REGISTRO[REGISTRO USUARIO]
        LOGIN[INICIAR SESIÓN]
        NOSOTROS[ ]
        BLOGS[ ]
        DETALLE_B1[ ]
        DETALLE_B2[ ]
        CONTACTO[CONTACTO]

        style HOME fill:#333
        style NOSOTROS fill:#333
        style BLOGS fill:#333
        style DETALLE_B1 fill:#333
        style DETALLE_B2 fill:#333

        HOME --> PRODUCTOS
        PRODUCTOS --> DETALLE_PROD
        HOME --> REGISTRO
        HOME --> LOGIN
        LOGIN --> REGISTRO
        HOME --> NOSOTROS
        HOME --> BLOGS
        BLOGS --> DETALLE_B1
        BLOGS --> DETALLE_B2
        HOME --> CONTACTO
    end

    subgraph ADMINISTRADOR
        direction LR
        ADMIN_HOME[ ]
        ADMIN_PROD[ ]
        NUEVO_PROD[NUEVO PRODUCTO]
        EDITAR_PROD[EDITAR PRODUCTO]
        MOSTRAR_PROD[ ]
        ADMIN_USR[ ]
        NUEVO_USR[NUEVO USUARIO]
        EDITAR_USR[EDITAR USUARIO]
        MOSTRAR_USR[ ]

        style ADMIN_HOME fill:#333
        style ADMIN_PROD fill:#333
        style MOSTRAR_PROD fill:#333
        style ADMIN_USR fill:#333
        style MOSTRAR_USR fill:#333

        ADMIN_HOME --> ADMIN_PROD
        ADMIN_PROD --> NUEVO_PROD
        ADMIN_PROD --> EDITAR_PROD
        ADMIN_PROD --> MOSTRAR_PROD
        MOSTRAR_PROD --> EDITAR_PROD

        ADMIN_HOME --> ADMIN_USR
        ADMIN_USR --> NUEVO_USR
        ADMIN_USR --> EDITAR_USR
        ADMIN_USR --> MOSTRAR_USR
        MOSTRAR_USR --> EDITAR_USR
    end

    LOGIN --> ADMIN_HOME
```

## Figura 15: Mockup página carrito de compras, propuesta entrega 1.

| ⬛ **Site Name** | Home \| Productos \| Nosotros \| Blogs \| Contacto | 🛒 Cart (3) |
|:---|:---:|---:|

### Mi carrito de compras

| Producto | Descripción | Precio | Cantidad |
|:---|:---|:---|:---:|
| <img src="../img/ariculares_inalambricos.png" width="60" height="60" style="object-fit: contain;"> | **Auriculares Inalámbricos Pro**<br>Tecnología | **$ 49.990** | ⊖ `[ 1 ]` ⊕ |
| <img src="../img/teclado_mecanico.png" width="60" height="60" style="object-fit: contain;"> | **Teclado Mecánico RGB**<br>Tecnología | **$ 35.990** | ⊖ `[ 1 ]` ⊕ |
| <img src="../img/polera_algodon.png" width="60" height="60" style="object-fit: contain;"> | **Polera Algodón Premium**<br>Ropa | **$ 12.990** | ⊖ `[ 1 ]` ⊕ |

---

**TOTAL:** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **$ 98.970**

Ingrese el cupón de descuento
`[                       ]` **[ APLICAR ]**

<br>

**[ PAGAR ]**
