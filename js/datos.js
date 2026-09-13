const TIPOS_USUARIO = ["Administrador", "Vendedor", "Cliente"];

const CATEGORIAS = [
    "Tecnología",
    "Ropa",
    "Hogar",
    "Deportes",
    "Alimentos"
];

const productos = [
    {
        codigo: "PRD-001",
        nombre: "Auriculares Inalámbricos Pro",
        descripcion: "Auriculares con cancelación activa de ruido, 30 horas de batería y micrófono integrado para llamadas.",
        precio: 49990,
        stock: 25,
        stockCritico: 5,
        categoria: "Tecnología",
        imagen: "https://picsum.photos/seed/auriculares/400/400"
    },
    {
        codigo: "PRD-002",
        nombre: "Teclado Mecánico RGB",
        descripcion: "Teclado mecánico con switches táctiles, retroiluminación RGB personalizable y reposamuñecas magnético.",
        precio: 35990,
        stock: 40,
        stockCritico: 8,
        categoria: "Tecnología",
        imagen: "https://picsum.photos/seed/teclado/400/400"
    },
    {
        codigo: "PRD-003",
        nombre: "Polera Algodón Premium",
        descripcion: "Polera de algodón 100% peinado, corte regular y variedad de colores disponibles.",
        precio: 12990,
        stock: 60,
        stockCritico: 10,
        categoria: "Ropa",
        imagen: "https://picsum.photos/seed/polera/400/400"
    },
    {
        codigo: "PRD-004",
        nombre: "Zapatillas Urbanas Flex",
        descripcion: "Zapatillas ligeras con suela amortiguada, ideales para el uso diario y actividades deportivas livianas.",
        precio: 42990,
        stock: 32,
        stockCritico: 6,
        categoria: "Deportes",
        imagen: "https://picsum.photos/seed/zapatillas/400/400"
    },
    {
        codigo: "PRD-005",
        nombre: "Lámpara de Escritorio LED",
        descripcion: "Lámpara con 3 niveles de brillo, tinte de luz ajustable y puerto USB para cargar dispositivos.",
        precio: 19990,
        stock: 3,
        stockCritico: 5,
        categoria: "Hogar",
        imagen: "https://picsum.photos/seed/lampara/400/400"
    },
    {
        codigo: "PRD-006",
        nombre: "Termo Acero Inoxidable 1L",
        descripcion: "Termo de acero inoxidable que mantiene la temperatura por 12 horas, con tapa hermética.",
        precio: 15990,
        stock: 0,
        stockCritico: 4,
        categoria: "Hogar",
        imagen: "https://picsum.photos/seed/termo/400/400"
    },
    {
        codigo: "PRD-007",
        nombre: "Café de Grano Premium 500g",
        descripcion: "Mezcla de granos arábica y robusta con notas a chocolate y caramelo, tueste medio.",
        precio: 8990,
        stock: 80,
        stockCritico: 15,
        categoria: "Alimentos",
        imagen: "https://picsum.photos/seed/cafe/400/400"
    },
    {
        codigo: "PRD-008",
        nombre: "Botella Deportiva 750ml",
        descripcion: "Botella de acero inoxidable libre de BPA con tapa antiderrame, apta para bebidas frías y calientes.",
        precio: 0,
        stock: 50,
        stockCritico: 10,
        categoria: "Deportes",
        imagen: "https://picsum.photos/seed/botella/400/400"
    }
];

function buscarProducto(codigo) {
    return productos.find(function (producto) {
        return producto.codigo === codigo;
    }) || null;
}

function formatearPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}