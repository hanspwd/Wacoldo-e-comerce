const TIPOS_USUARIO = ["Administrador", "Vendedor", "Cliente"];

const CATEGORIAS = [
    "Tecnología",
    "Ropa",
    "Hogar",
    "Deportes",
    "Alimentos"
];

const CLAVE_CATALOGO = "tienda_catalogo";

const productos = [
    {
        codigo: "PRD-001",
        nombre: "Auriculares Inalámbricos Pro",
        descripcion: "Auriculares con cancelación activa de ruido, 30 horas de batería y micrófono integrado para llamadas.",
        precio: 49990,
        stock: 25,
        stockCritico: 5,
        categoria: "Tecnología",
        imagen: "img/ariculares_inalambricos.png"
    },
    {
        codigo: "PRD-002",
        nombre: "Teclado Mecánico RGB",
        descripcion: "Teclado mecánico con switches táctiles, retroiluminación RGB personalizable y reposamuñecas magnético.",
        precio: 35990,
        stock: 40,
        stockCritico: 8,
        categoria: "Tecnología",
        imagen: "img/teclado_mecanico.png"
    },
    {
        codigo: "PRD-003",
        nombre: "Polera Algodón Premium",
        descripcion: "Polera de algodón 100% peinado, corte regular y variedad de colores disponibles.",
        precio: 12990,
        stock: 60,
        stockCritico: 10,
        categoria: "Ropa",
        imagen: "img/polera_algodon.png"
    },
    {
        codigo: "PRD-004",
        nombre: "Zapatillas Urbanas Flex",
        descripcion: "Zapatillas ligeras con suela amortiguada, ideales para el uso diario y actividades deportivas livianas.",
        precio: 42990,
        stock: 32,
        stockCritico: 6,
        categoria: "Deportes",
        imagen: "img/zapatillas_flex.png"
    },
    {
        codigo: "PRD-005",
        nombre: "Lámpara de Escritorio LED",
        descripcion: "Lámpara con 3 niveles de brillo, tinte de luz ajustable y puerto USB para cargar dispositivos.",
        precio: 19990,
        stock: 3,
        stockCritico: 5,
        categoria: "Hogar",
        imagen: "img/lampara_led.png"
    },
    {
        codigo: "PRD-006",
        nombre: "Termo Acero Inoxidable 1L",
        descripcion: "Termo de acero inoxidable que mantiene la temperatura por 12 horas, con tapa hermética.",
        precio: 15990,
        stock: 0,
        stockCritico: 4,
        categoria: "Hogar",
        imagen: "img/termo.png"
    },
    {
        codigo: "PRD-007",
        nombre: "Café de Grano Premium 500g",
        descripcion: "Mezcla de granos arábica y robusta con notas a chocolate y caramelo, tueste medio.",
        precio: 8990,
        stock: 80,
        stockCritico: 15,
        categoria: "Alimentos",
        imagen: "img/cafe.png"
    },
    {
        codigo: "PRD-008",
        nombre: "Botella Deportiva 750ml",
        descripcion: "Botella de acero inoxidable libre de BPA con tapa antiderrame, apta para bebidas frías y calientes.",
        precio: 0,
        stock: 50,
        stockCritico: 10,
        categoria: "Deportes",
        imagen: "img/botella_deportive.png"
    }
];

function leerCambiosCatalogo() {
    const vacio = { agregados: [], editados: {}, eliminados: [] };
    try {
        if (typeof localStorage === "undefined") {
            return vacio;
        }
        const datos = JSON.parse(localStorage.getItem(CLAVE_CATALOGO));
        if (!datos || typeof datos !== "object") {
            return vacio;
        }
        return {
            agregados: Array.isArray(datos.agregados) ? datos.agregados : [],
            editados: datos.editados && typeof datos.editados === "object" ? datos.editados : {},
            eliminados: Array.isArray(datos.eliminados) ? datos.eliminados : []
        };
    } catch (error) {
        return vacio;
    }
}

function guardarCambiosCatalogo(cambios) {
    try {
        if (typeof localStorage === "undefined") {
            return false;
        }
        localStorage.setItem(CLAVE_CATALOGO, JSON.stringify(cambios));
        return true;
    } catch (error) {
        return false;
    }
}

function obtenerCatalogo() {
    const cambios = leerCambiosCatalogo();
    const lista = productos
        .filter(function (producto) {
            return cambios.eliminados.indexOf(producto.codigo) === -1;
        })
        .map(function (producto) {
            const editado = cambios.editados[producto.codigo];
            return editado ? Object.assign({}, producto, editado, { codigo: producto.codigo }) : producto;
        });
    cambios.agregados.forEach(function (producto) {
        lista.push(producto);
    });
    return lista;
}

function guardarProductoLocal(producto) {
    const cambios = leerCambiosCatalogo();
    const esBase = productos.some(function (item) {
        return item.codigo === producto.codigo;
    });
    if (esBase) {
        cambios.editados[producto.codigo] = Object.assign({}, producto, { codigo: producto.codigo });
    } else {
        const indice = cambios.agregados.findIndex(function (item) {
            return item.codigo === producto.codigo;
        });
        if (indice === -1) {
            cambios.agregados.push(producto);
        } else {
            cambios.agregados[indice] = producto;
        }
    }
    guardarCambiosCatalogo(cambios);
    return true;
}

function eliminarProductoLocal(codigo) {
    const cambios = leerCambiosCatalogo();
    cambios.agregados = cambios.agregados.filter(function (item) {
        return item.codigo !== codigo;
    });
    delete cambios.editados[codigo];
    const esBase = productos.some(function (item) {
        return item.codigo === codigo;
    });
    if (esBase && cambios.eliminados.indexOf(codigo) === -1) {
        cambios.eliminados.push(codigo);
    }
    guardarCambiosCatalogo(cambios);
    return true;
}

function buscarProducto(codigo) {
    return obtenerCatalogo().find(function (producto) {
        return producto.codigo === codigo;
    }) || null;
}

function formatearPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}