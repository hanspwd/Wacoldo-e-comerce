var App = (function () {
    const CLAVE_USUARIOS = "tienda_usuarios";
    const CLAVE_SESION = "tienda_sesion";
    const CLAVE_MENSAJES = "tienda_mensajes";
    const CUPONES = { "DUOC10": 10, "BIENVENIDA15": 15 };
    const IMAGEN_VACIA = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e9ecef'/%3E%3Ctext x='200' y='210' font-family='sans-serif' font-size='24' fill='%236c757d' text-anchor='middle'%3ESin imagen%3C/text%3E%3C/svg%3E";

    function base() {
        return (typeof BASE === "string") ? BASE : "";
    }

    function ruta(rel) {
        return base() + rel;
    }

    function escapar(texto) {
        return String(texto === null || texto === undefined ? "" : texto)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function valor(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
    }

    function mostrarError(id, mensaje) {
        const campo = document.getElementById(id);
        if (!campo) {
            return;
        }
        const contenedor = campo.closest(".campo");
        const destino = contenedor ? contenedor.querySelector(".mensaje-error") : null;
        if (destino) {
            destino.textContent = mensaje;
        }
        if (contenedor) {
            contenedor.classList.add("campo-invalido");
        }
    }

    function limpiarError(id) {
        const campo = document.getElementById(id);
        if (!campo) {
            return;
        }
        const contenedor = campo.closest(".campo");
        if (contenedor) {
            contenedor.classList.remove("campo-invalido");
        }
    }

    function limpiarErrores(formId) {
        const form = document.getElementById(formId);
        if (!form) {
            return;
        }
        form.querySelectorAll(".campo-invalido").forEach(function (el) {
            el.classList.remove("campo-invalido");
        });
    }

    function avisar(mensaje, tipo) {
        const aviso = document.createElement("div");
        aviso.className = "toast toast-" + (tipo === "error" ? "error" : "exito");
        aviso.textContent = mensaje;
        document.body.appendChild(aviso);
        setTimeout(function () {
            aviso.remove();
        }, 3000);
    }

    function etiquetaPrecio(precio) {
        return Number(precio) === 0 ? "Gratis" : formatearPrecio(precio);
    }

    function imagenProducto(p) {
        return p.imagen ? ruta(p.imagen) : IMAGEN_VACIA;
    }

    function insigniasProducto(p) {
        let html = "";
        if (p.stock === 0) {
            html += '<span class="insignia-sin-stock">Sin stock</span>';
        } else if (Validaciones.esStockCritico(p.stock, p.stockCritico)) {
            html += '<span class="insignia-critico">¡Stock crítico!</span>';
        }
        if (Number(p.precio) === 0) {
            html += ' <span class="insignia-gratis">FREE</span>';
        }
        return html;
    }

    function tarjetaProducto(p) {
        const detalle = ruta("tienda/detalle.html?codigo=" + encodeURIComponent(p.codigo));
        const deshabilitado = p.stock === 0 ? "disabled" : "";
        return '<article class="tarjeta tarjeta-producto">' +
            '<a href="' + detalle + '"><img class="producto-img" src="' + imagenProducto(p) + '" alt="' + escapar(p.nombre) + '"></a>' +
            '<h3>' + escapar(p.nombre) + '</h3>' +
            '<p class="producto-categoria">' + escapar(p.categoria) + '</p>' +
            '<p class="producto-precio">' + etiquetaPrecio(p.precio) + '</p>' +
            '<p>' + insigniasProducto(p) + '</p>' +
            '<div class="grupo-botones">' +
            '<a class="btn btn-secundario" href="' + detalle + '">Ver detalle</a>' +
            '<button class="btn btn-primario" type="button" data-agregar data-codigo="' + escapar(p.codigo) + '" ' + deshabilitado + '>Añadir</button>' +
            "</div></article>";
    }

    function pintarCatalogo(idContenedor, lista) {
        const contenedor = document.getElementById(idContenedor);
        if (!contenedor) {
            return;
        }
        if (!lista || lista.length === 0) {
            contenedor.innerHTML = '<p>No hay productos para mostrar.</p>';
            return;
        }
        contenedor.innerHTML = lista.map(tarjetaProducto).join("");
    }

    function areaSesion() {
        const sesion = obtenerSesion();
        if (!sesion) {
            return '<a href="' + ruta("tienda/login.html") + '">Iniciar sesión</a> | ' +
                '<a href="' + ruta("tienda/registro.html") + '">Registrar usuario</a>';
        }
        let html = "<span>Hola, " + escapar(sesion.nombre) + "</span> | ";
        if (sesion.tipo === "Administrador" || sesion.tipo === "Vendedor") {
            html += '<a href="' + ruta("admin/index.html") + '">Administración</a> | ';
        }
        html += '<a href="#" data-salir>Salir</a>';
        return html;
    }

    function renderNavbar(activo) {
        const el = document.getElementById("navbar");
        if (!el) {
            return;
        }
        const enlaces = [
            { clave: "home", texto: "Home", href: ruta("index.html") },
            { clave: "productos", texto: "Productos", href: ruta("tienda/productos.html") },
            { clave: "nosotros", texto: "Nosotros", href: ruta("tienda/nosotros.html") },
            { clave: "blogs", texto: "Blogs", href: ruta("tienda/blogs.html") },
            { clave: "contacto", texto: "Contacto", href: ruta("tienda/contacto.html") }
        ];
        const menu = enlaces.map(function (e) {
            const clase = e.clave === activo ? ' class="activo"' : "";
            return '<li><a' + clase + ' href="' + e.href + '">' + e.texto + "</a></li>";
        }).join("");
        el.innerHTML = '<nav class="navbar"><div class="contenedor navbar-contenedor">' +
            '<a class="navbar-logo" href="' + ruta("index.html") + '">Tienda Web</a>' +
            '<ul class="navbar-menu">' + menu + "</ul>" +
            '<div class="navbar-carrito"><a href="' + ruta("tienda/carrito.html") + '">Carrito (<span id="insignia-carrito">0</span>)</a></div>' +
            '<div class="navbar-sesion">' + areaSesion() + "</div>" +
            "</div></nav>";
        actualizarInsigniaCarrito();
    }

    function renderFooter() {
        const el = document.getElementById("footer");
        if (!el) {
            return;
        }
        el.innerHTML = '<footer class="footer"><div class="contenedor footer-grid">' +
            '<div><h4>Tienda Web</h4><p>Tu tienda online de confianza.</p></div>' +
            '<div><h4>Categorías</h4><p>' + CATEGORIAS.map(escapar).join(" | ") + "</p></div>" +
            '<div><h4>Newsletter</h4><form id="form-newsletter"><div class="grupo-botones">' +
            '<input type="email" id="newsletter-correo" placeholder="Enter Email" aria-label="Correo newsletter">' +
            '<button class="btn btn-secundario" type="submit">Subscribe</button>' +
            "</div></form></div>" +
            "</div></footer>";
    }

    function actualizarInsigniaCarrito() {
        const el = document.getElementById("insignia-carrito");
        if (el && typeof Carrito !== "undefined") {
            el.textContent = Carrito.totalArticulos();
        }
    }

    function cargarRegiones(idRegion, idComuna, selRegion, selComuna) {
        const regionEl = document.getElementById(idRegion);
        const comunaEl = document.getElementById(idComuna);
        if (!regionEl || !comunaEl) {
            return;
        }
        regionEl.innerHTML = '<option value="">-- Seleccione la región --</option>' +
            obtenerRegiones().map(function (r) {
                const sel = r === selRegion ? " selected" : "";
                return '<option value="' + escapar(r) + '"' + sel + ">" + escapar(r) + "</option>";
            }).join("");
        function pintarComunas(region) {
            const comunas = obtenerComunas(region);
            comunaEl.innerHTML = '<option value="">-- Seleccione la comuna --</option>' +
                comunas.map(function (c) {
                    const sel = c === selComuna ? " selected" : "";
                    return '<option value="' + escapar(c) + '"' + sel + ">" + escapar(c) + "</option>";
                }).join("");
            comunaEl.disabled = comunas.length === 0;
        }
        pintarComunas(selRegion || "");
        regionEl.addEventListener("change", function () {
            pintarComunas(regionEl.value);
        });
    }

    function leerUsuarios() {
        try {
            if (typeof localStorage === "undefined") {
                return null;
            }
            const datos = JSON.parse(localStorage.getItem(CLAVE_USUARIOS));
            return Array.isArray(datos) ? datos : null;
        } catch (error) {
            return null;
        }
    }

    function semillaUsuarios() {
        return [
            {
                run: "111111111",
                nombre: "Admin",
                apellidos: "Tienda",
                correo: "admin@duoc.cl",
                password: "admin123",
                telefono: "",
                fechaNacimiento: "",
                tipo: "Administrador",
                region: "Metropolitana de Santiago",
                comuna: "Santiago",
                direccion: "Casa matriz"
            },
            {
                run: "222222222",
                nombre: "Vendedor",
                apellidos: "Tienda",
                correo: "vendedor@duoc.cl",
                password: "vende123",
                telefono: "",
                fechaNacimiento: "",
                tipo: "Vendedor",
                region: "Metropolitana de Santiago",
                comuna: "Santiago",
                direccion: "Casa matriz"
            }
        ];
    }

    function obtenerUsuarios() {
        const guardados = leerUsuarios();
        if (guardados) {
            return guardados;
        }
        const semilla = semillaUsuarios();
        guardarUsuarios(semilla);
        return semilla;
    }

    function guardarUsuarios(lista) {
        try {
            if (typeof localStorage === "undefined") {
                return false;
            }
            localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
            return true;
        } catch (error) {
            return false;
        }
    }

    function buscarUsuarioPorCorreo(correo) {
        const objetivo = String(correo).trim().toLowerCase();
        return obtenerUsuarios().find(function (u) {
            return String(u.correo).toLowerCase() === objetivo;
        }) || null;
    }

    function registrarUsuario(datos) {
        if (buscarUsuarioPorCorreo(datos.correo)) {
            return { exito: false, mensaje: "El correo ya está registrado." };
        }
        const lista = obtenerUsuarios();
        lista.push({
            run: "",
            nombre: datos.nombre,
            apellidos: "",
            correo: datos.correo,
            password: datos.password,
            telefono: datos.telefono || "",
            fechaNacimiento: "",
            tipo: "Cliente",
            region: datos.region,
            comuna: datos.comuna,
            direccion: ""
        });
        guardarUsuarios(lista);
        guardarSesion({ correo: datos.correo, nombre: datos.nombre, tipo: "Cliente" });
        return { exito: true, mensaje: "Registro exitoso. ¡Bienvenido!" };
    }

    function iniciarSesion(correo, password) {
        const usuario = buscarUsuarioPorCorreo(correo);
        if (!usuario || usuario.password !== password) {
            return { exito: false, mensaje: "Credenciales inválidas." };
        }
        guardarSesion({ correo: usuario.correo, nombre: usuario.nombre, tipo: usuario.tipo });
        return { exito: true, mensaje: "Sesión iniciada.", tipo: usuario.tipo };
    }

    function guardarSesion(sesion) {
        try {
            sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
        } catch (error) {
            return;
        }
    }

    function obtenerSesion() {
        try {
            const datos = JSON.parse(sessionStorage.getItem(CLAVE_SESION));
            return datos && datos.correo ? datos : null;
        } catch (error) {
            return null;
        }
    }

    function cerrarSesion() {
        try {
            sessionStorage.removeItem(CLAVE_SESION);
        } catch (error) {
            return;
        }
    }

    function requerirRol(roles, destino) {
        const sesion = obtenerSesion();
        if (!sesion) {
            location.href = ruta("tienda/login.html");
            return false;
        }
        if (roles.indexOf(sesion.tipo) === -1) {
            location.href = ruta(destino || "index.html");
            return false;
        }
        return true;
    }

    function esAdmin() {
        const sesion = obtenerSesion();
        return !!sesion && sesion.tipo === "Administrador";
    }

    function renderAdmin(activo) {
        const menu = document.getElementById("admin-menu");
        const usuarioEl = document.getElementById("admin-usuario");
        const sesion = obtenerSesion();
        if (usuarioEl) {
            usuarioEl.textContent = sesion ? "¡HOLA " + sesion.nombre + "!" : "";
        }
        if (!menu) {
            return;
        }
        const enlaces = [
            { clave: "dashboard", texto: "Dashboard", href: ruta("admin/index.html"), roles: ["Administrador", "Vendedor"] },
            { clave: "productos", texto: "Productos", href: ruta("admin/productos.html"), roles: ["Administrador", "Vendedor"] },
            { clave: "usuarios", texto: "Usuarios", href: ruta("admin/usuarios.html"), roles: ["Administrador"] }
        ];
        menu.innerHTML = enlaces
            .filter(function (e) {
                return sesion && e.roles.indexOf(sesion.tipo) !== -1;
            })
            .map(function (e) {
                const clase = e.clave === activo ? ' class="activo"' : "";
                return '<a' + clase + ' href="' + e.href + '">' + e.texto + "</a>";
            }).join("") + '<a href="#" data-salir>Salir</a>';
    }

    function aplicarCupon(codigo) {
        const cupon = String(codigo || "").trim().toUpperCase();
        if (!cupon) {
            return { exito: false, porcentaje: 0, mensaje: "Ingresa un cupón de descuento." };
        }
        if (!CUPONES[cupon]) {
            return { exito: false, porcentaje: 0, mensaje: "Cupón inválido." };
        }
        return { exito: true, porcentaje: CUPONES[cupon], mensaje: "Cupón aplicado: " + CUPONES[cupon] + "% de descuento." };
    }

    function guardarMensaje(datos) {
        try {
            const lista = JSON.parse(localStorage.getItem(CLAVE_MENSAJES)) || [];
            lista.push(datos);
            localStorage.setItem(CLAVE_MENSAJES, JSON.stringify(lista));
        } catch (error) {
            return;
        }
    }

    function obtenerMensajes() {
        try {
            const lista = JSON.parse(localStorage.getItem(CLAVE_MENSAJES));
            return Array.isArray(lista) ? lista : [];
        } catch (error) {
            return [];
        }
    }

    function conectarEventosGlobales() {
        document.addEventListener("click", function (e) {
            const agregar = e.target.closest("[data-agregar]");
            if (agregar && !agregar.disabled) {
                const codigo = agregar.getAttribute("data-codigo");
                const cantidad = parseInt(agregar.getAttribute("data-cantidad") || "1", 10);
                const resultado = Carrito.agregar(codigo, cantidad);
                avisar(resultado.mensaje, resultado.exito ? "exito" : "error");
                actualizarInsigniaCarrito();
                return;
            }
            const salir = e.target.closest("[data-salir]");
            if (salir) {
                e.preventDefault();
                cerrarSesion();
                location.href = ruta("index.html");
            }
        });
        document.addEventListener("submit", function (e) {
            if (e.target && e.target.id === "form-newsletter") {
                e.preventDefault();
                const correo = e.target.querySelector("#newsletter-correo").value.trim();
                const resultado = Validaciones.validarCorreo(correo);
                avisar(resultado.valido ? "Suscripción exitosa." : resultado.mensaje, resultado.valido ? "exito" : "error");
                if (resultado.valido) {
                    e.target.reset();
                }
            }
        });
    }

    if (typeof document !== "undefined") {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", conectarEventosGlobales);
        } else {
            conectarEventosGlobales();
        }
    }

    return {
        CUPONES: CUPONES,
        ruta: ruta,
        escapar: escapar,
        valor: valor,
        mostrarError: mostrarError,
        limpiarError: limpiarError,
        limpiarErrores: limpiarErrores,
        avisar: avisar,
        etiquetaPrecio: etiquetaPrecio,
        imagenProducto: imagenProducto,
        insigniasProducto: insigniasProducto,
        tarjetaProducto: tarjetaProducto,
        pintarCatalogo: pintarCatalogo,
        renderNavbar: renderNavbar,
        renderFooter: renderFooter,
        actualizarInsigniaCarrito: actualizarInsigniaCarrito,
        cargarRegiones: cargarRegiones,
        obtenerUsuarios: obtenerUsuarios,
        guardarUsuarios: guardarUsuarios,
        buscarUsuarioPorCorreo: buscarUsuarioPorCorreo,
        registrarUsuario: registrarUsuario,
        iniciarSesion: iniciarSesion,
        cerrarSesion: cerrarSesion,
        obtenerSesion: obtenerSesion,
        requerirRol: requerirRol,
        esAdmin: esAdmin,
        renderAdmin: renderAdmin,
        aplicarCupon: aplicarCupon,
        guardarMensaje: guardarMensaje,
        obtenerMensajes: obtenerMensajes
    };
})();