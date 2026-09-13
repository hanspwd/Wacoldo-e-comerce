const Validaciones = (function () {
    const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const EMAIL_MAX = 100;
    const CONTRASENA_MIN = 4;
    const CONTRASENA_MAX = 10;
    const RUN_MIN = 7;
    const RUN_MAX = 9;

    function limpiar(valor) {
        return String(valor === null || valor === undefined ? "" : valor).trim();
    }

    function valido(mensaje) {
        return { valido: mensaje === "", mensaje: mensaje };
    }

    function validarRequerido(valor, nombreCampo) {
        const texto = limpiar(valor);
        if (texto.length === 0) {
            return valido("El campo '" + nombreCampo + "' es obligatorio.");
        }
        return valido("");
    }

    function validarLargo(valor, min, max, nombreCampo) {
        const largo = limpiar(valor).length;
        if (min !== null && min !== undefined && largo < min) {
            return valido("El campo '" + nombreCampo + "' debe tener al menos " + min + " caracteres.");
        }
        if (max !== null && max !== undefined && largo > max) {
            return valido("El campo '" + nombreCampo + "' no puede superar los " + max + " caracteres.");
        }
        return valido("");
    }

    function validarEntero(valor, nombreCampo) {
        const texto = limpiar(valor);
        if (texto.length === 0) {
            return valido("El campo '" + nombreCampo + "' es obligatorio.");
        }
        if (!/^[0-9]+$/.test(texto)) {
            return valido("El campo '" + nombreCampo + "' debe ser un número entero.");
        }
        return valido("");
    }

    function validarCorreo(valor) {
        const correo = limpiar(valor);
        if (correo.length === 0) {
            return valido("El correo es obligatorio.");
        }
        if (correo.length > EMAIL_MAX) {
            return valido("El correo no puede superar los " + EMAIL_MAX + " caracteres.");
        }
        if (correo.indexOf("@") === -1) {
            return valido("El correo debe contener el símbolo '@'.");
        }
        const dominio = correo.slice(correo.indexOf("@"));
        if (DOMINIOS_PERMITIDOS.indexOf(dominio) === -1) {
            return valido("Solo se aceptan correos de los dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.");
        }
        return valido("");
    }

    function validarContrasena(valor) {
        const contrasena = limpiar(valor);
        if (contrasena.length === 0) {
            return valido("La contraseña es obligatoria.");
        }
        if (contrasena.length < CONTRASENA_MIN) {
            return valido("La contraseña debe tener entre " + CONTRASENA_MIN + " y " + CONTRASENA_MAX + " caracteres.");
        }
        if (contrasena.length > CONTRASENA_MAX) {
            return valido("La contraseña debe tener entre " + CONTRASENA_MIN + " y " + CONTRASENA_MAX + " caracteres.");
        }
        return valido("");
    }

    function validarConfirmacionContrasena(contrasena, confirmacion) {
        const clave = limpiar(contrasena);
        const repeticion = limpiar(confirmacion);
        if (repeticion.length === 0) {
            return valido("Debes confirmar la contraseña.");
        }
        if (clave !== repeticion) {
            return valido("Las contraseñas no coinciden.");
        }
        return valido("");
    }

    function validarRun(valor) {
        const run = limpiar(valor);
        if (run.length === 0) {
            return valido("El RUN es obligatorio.");
        }
        if (run.length < RUN_MIN || run.length > RUN_MAX) {
            return valido("El RUN debe tener entre " + RUN_MIN + " y " + RUN_MAX + " caracteres.");
        }
        if (!/^[0-9]+[0-9kK]$/.test(run)) {
            return valido("El RUN no debe contener puntos ni guiones. Ej: 19011022K");
        }
        const cuerpo = run.slice(0, -1);
        const digitoVerificador = run.slice(-1).toUpperCase();
        let suma = 0;
        let multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }
        const resto = suma % 11;
        const dvCalculado = 11 - resto;
        const dvEsperado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : String(dvCalculado);
        if (digitoVerificador !== dvEsperado) {
            return valido("El RUN ingresado no es válido.");
        }
        return valido("");
    }

    function validarCodigoProducto(valor) {
        const codigo = limpiar(valor);
        if (codigo.length === 0) {
            return valido("El código del producto es obligatorio.");
        }
        if (codigo.length < 3) {
            return valido("El código del producto debe tener al menos 3 caracteres.");
        }
        return valido("");
    }

    function validarNombreProducto(valor) {
        const requerido = validarRequerido(valor, "Nombre");
        if (!requerido.valido) {
            return requerido;
        }
        return validarLargo(valor, null, 100, "Nombre");
    }

    function validarDescripcion(valor) {
        const descripcion = limpiar(valor);
        if (descripcion.length === 0) {
            return valido("");
        }
        return validarLargo(valor, null, 500, "Descripción");
    }

    function validarPrecio(valor) {
        const texto = limpiar(valor);
        if (texto.length === 0) {
            return valido("El precio es obligatorio.");
        }
        if (!/^[0-9]+(\.[0-9]+)?$/.test(texto)) {
            return valido("El precio debe ser un número positivo, permite decimales. Ej: 4999.9");
        }
        return valido("");
    }

    function validarStock(valor) {
        const entero = validarEntero(valor, "Stock");
        if (!entero.valido) {
            return entero;
        }
        return valido("");
    }

    function validarStockCritico(valor) {
        const texto = limpiar(valor);
        if (texto.length === 0) {
            return valido("");
        }
        if (!/^[0-9]+$/.test(texto)) {
            return valido("El stock crítico debe ser un número entero.");
        }
        return valido("");
    }

    function validarCategoria(valor) {
        const texto = limpiar(valor);
        if (texto.length === 0) {
            return valido("Debes seleccionar una categoría.");
        }
        return valido("");
    }

    function validarNombreUsuario(valor) {
        const requerido = validarRequerido(valor, "Nombre");
        if (!requerido.valido) {
            return requerido;
        }
        return validarLargo(valor, null, 50, "Nombre");
    }

    function validarApellidos(valor) {
        const requerido = validarRequerido(valor, "Apellidos");
        if (!requerido.valido) {
            return requerido;
        }
        return validarLargo(valor, null, 100, "Apellidos");
    }

    function validarTelefono(valor) {
        const texto = limpiar(valor);
        if (texto.length === 0) {
            return valido("");
        }
        if (!/^[0-9]{8,15}$/.test(texto)) {
            return valido("El teléfono debe contener solo números.");
        }
        return valido("");
    }

    function validarDireccion(valor) {
        const requerido = validarRequerido(valor, "Dirección");
        if (!requerido.valido) {
            return requerido;
        }
        return validarLargo(valor, null, 300, "Dirección");
    }

    function validarComentario(valor) {
        const requerido = validarRequerido(valor, "Comentario");
        if (!requerido.valido) {
            return requerido;
        }
        return validarLargo(valor, null, 500, "Comentario");
    }

    function validarRegionYComuna(region, comuna) {
        if (!limpiar(region)) {
            return valido("Debes seleccionar una región.");
        }
        if (!limpiar(comuna)) {
            return valido("Debes seleccionar una comuna.");
        }
        return valido("");
    }

    function esStockCritico(stock, stockCritico) {
        const limite = Number.isFinite(parseFloat(stockCritico)) ? parseInt(stockCritico, 10) : 0;
        return parseInt(stock, 10) <= limite;
    }

    return {
        DOMINIOS_PERMITIDOS: DOMINIOS_PERMITIDOS,
        validarRequerido: validarRequerido,
        validarLargo: validarLargo,
        validarEntero: validarEntero,
        validarCorreo: validarCorreo,
        validarContrasena: validarContrasena,
        validarConfirmacionContrasena: validarConfirmacionContrasena,
        validarRun: validarRun,
        validarCodigoProducto: validarCodigoProducto,
        validarNombreProducto: validarNombreProducto,
        validarDescripcion: validarDescripcion,
        validarPrecio: validarPrecio,
        validarStock: validarStock,
        validarStockCritico: validarStockCritico,
        validarCategoria: validarCategoria,
        validarNombreUsuario: validarNombreUsuario,
        validarApellidos: validarApellidos,
        validarTelefono: validarTelefono,
        validarDireccion: validarDireccion,
        validarComentario: validarComentario,
        validarRegionYComuna: validarRegionYComuna,
        esStockCritico: esStockCritico
    };
})();