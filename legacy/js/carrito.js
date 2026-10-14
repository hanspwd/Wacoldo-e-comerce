const Carrito = (function () {
    const CLAVE = "tienda_carrito";

    function leer() {
        try {
            const datos = JSON.parse(localStorage.getItem(CLAVE));
            return Array.isArray(datos) ? datos : [];
        } catch (error) {
            return [];
        }
    }

    function guardar(items) {
        localStorage.setItem(CLAVE, JSON.stringify(items));
    }

    function obtener() {
        return leer();
    }

    function agregar(codigo, cantidad) {
        const producto = typeof buscarProducto === "function" ? buscarProducto(codigo) : null;
        if (!producto) {
            return { exito: false, mensaje: "El producto no existe en el catálogo." };
        }
        let unidades = parseInt(cantidad, 10);
        if (!Number.isInteger(unidades) || unidades < 1) {
            return { exito: false, mensaje: "La cantidad debe ser un número entero positivo." };
        }
        if (producto.stock === 0) {
            return { exito: false, mensaje: "El producto no tiene stock disponible." };
        }
        const items = leer();
        const encontrado = items.find(function (item) {
            return item.codigo === codigo;
        });
        if (encontrado) {
            const totalSolicitado = encontrado.cantidad + unidades;
            if (totalSolicitado > producto.stock) {
                return { exito: false, mensaje: "Supera el stock disponible (" + producto.stock + " unidades)." };
            }
            encontrado.cantidad = totalSolicitado;
        } else {
            if (unidades > producto.stock) {
                return { exito: false, mensaje: "Supera el stock disponible (" + producto.stock + " unidades)." };
            }
            items.push({
                codigo: producto.codigo,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                stock: producto.stock,
                cantidad: unidades
            });
        }
        guardar(items);
        return { exito: true, mensaje: "Producto añadido al carrito." };
    }

    function actualizarCantidad(codigo, cantidad) {
        let unidades = parseInt(cantidad, 10);
        const items = leer();
        const encontrado = items.find(function (item) {
            return item.codigo === codigo;
        });
        if (!encontrado) {
            return { exito: false, mensaje: "El producto no está en el carrito." };
        }
        if (unidades < 1) {
            quitar(codigo);
            return { exito: true, mensaje: "Producto eliminado del carrito." };
        }
        if (unidades > encontrado.stock) {
            return { exito: false, mensaje: "Supera el stock disponible (" + encontrado.stock + " unidades)." };
        }
        encontrado.cantidad = unidades;
        guardar(items);
        return { exito: true, mensaje: "Cantidad actualizada." };
    }

    function quitar(codigo) {
        const items = leer().filter(function (item) {
            return item.codigo !== codigo;
        });
        guardar(items);
        return { exito: true, mensaje: "Producto eliminado del carrito." };
    }

    function vaciar() {
        guardar([]);
        return { exito: true, mensaje: "El carrito se ha vaciado." };
    }

    function totalArticulos() {
        return leer().reduce(function (total, item) {
            return total + item.cantidad;
        }, 0);
    }

    function totalPrecio() {
        return leer().reduce(function (total, item) {
            return total + item.precio * item.cantidad;
        }, 0);
    }

    return {
        obtener: obtener,
        agregar: agregar,
        actualizarCantidad: actualizarCantidad,
        quitar: quitar,
        vaciar: vaciar,
        totalArticulos: totalArticulos,
        totalPrecio: totalPrecio
    };
})();