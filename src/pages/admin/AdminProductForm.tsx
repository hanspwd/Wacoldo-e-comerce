import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import {
  validarCodigoProducto,
  validarNombreProducto,
  validarDescripcion,
  validarPrecio,
  validarStock,
  validarStockCritico,
  validarCategoria,
  esStockCritico,
} from '../../utils/validaciones';

const imagenesDisponibles = [
  { label: 'Sin imagen', valor: '' },
  { label: 'ariculares_inalambricos.png', valor: '/img/ariculares_inalambricos.png' },
  { label: 'teclado_mecanico.png', valor: '/img/teclado_mecanico.png' },
  { label: 'polera_algodon.png', valor: '/img/polera_algodon.png' },
  { label: 'zapatillas_flex.png', valor: '/img/zapatillas_flex.png' },
  { label: 'lampara_led.png', valor: '/img/lampara_led.png' },
  { label: 'termo.png', valor: '/img/termo.png' },
  { label: 'cafe.png', valor: '/img/cafe.png' },
  { label: 'botella_deportive.png', valor: '/img/botella_deportive.png' },
];

export const AdminProductForm: React.FC = () => {
  const { categorias, obtenerProducto, guardarProducto } = useProducts();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const codigoParam = searchParams.get('codigo');
  const enEdicion = Boolean(codigoParam);
  const prod = enEdicion && codigoParam ? obtenerProducto(codigoParam) : undefined;

  const [codigo, setCodigo] = useState(prod ? prod.codigo : '');
  const [nombre, setNombre] = useState(prod ? prod.nombre : '');
  const [descripcion, setDescripcion] = useState(prod ? prod.descripcion || '' : '');
  const [precio, setPrecio] = useState(prod ? String(prod.precio) : '');
  const [stock, setStock] = useState(prod ? String(prod.stock) : '');
  const [stockCritico, setStockCritico] = useState(prod ? String(prod.stockCritico || '') : '');
  const [categoria, setCategoria] = useState(prod ? prod.categoria : '');
  const [imagen, setImagen] = useState(prod ? prod.imagen || '' : '');

  const [errores, setErrores] = useState<Record<string, string>>({});

  const stockNum = parseInt(stock, 10);
  const criticoNum = parseInt(stockCritico, 10);
  const nivelCritico =
    !isNaN(stockNum) && !isNaN(criticoNum) && stockNum > 0 && esStockCritico(stockNum, criticoNum);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});

    let valido = true;
    const nuevosErrores: Record<string, string> = {};

    let rCod = validarCodigoProducto(codigo);
    if (!enEdicion && rCod.valido && obtenerProducto(codigo)) {
      rCod = { valido: false, mensaje: 'El código ya está en uso.' };
    }
    if (!rCod.valido) {
      nuevosErrores.codigo = rCod.mensaje;
      valido = false;
    }

    const rNom = validarNombreProducto(nombre);
    if (!rNom.valido) {
      nuevosErrores.nombre = rNom.mensaje;
      valido = false;
    }

    const rDesc = validarDescripcion(descripcion);
    if (!rDesc.valido) {
      nuevosErrores.descripcion = rDesc.mensaje;
      valido = false;
    }

    const rPrec = validarPrecio(precio);
    if (!rPrec.valido) {
      nuevosErrores.precio = rPrec.mensaje;
      valido = false;
    }

    const rStk = validarStock(stock);
    if (!rStk.valido) {
      nuevosErrores.stock = rStk.mensaje;
      valido = false;
    }

    const rCrit = validarStockCritico(stockCritico);
    if (!rCrit.valido) {
      nuevosErrores.stockCritico = rCrit.mensaje;
      valido = false;
    }

    const rCat = validarCategoria(categoria);
    if (!rCat.valido) {
      nuevosErrores.categoria = rCat.mensaje;
      valido = false;
    }

    if (!valido) {
      setErrores(nuevosErrores);
      return;
    }

    guardarProducto(
      {
        codigo,
        nombre,
        descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock, 10),
        stockCritico: stockCritico === '' ? 0 : parseInt(stockCritico, 10),
        categoria,
        imagen: imagen || '/img/ariculares_inalambricos.png',
      },
      enEdicion
    );

    navigate('/admin/productos');
  };

  return (
    <>
      <header className="admin-encabezado">
        <h1>{enEdicion ? 'Editar producto' : 'Nuevo producto'}</h1>
      </header>

      <form id="form-producto" className="tarjeta formulario" onSubmit={handleSubmit} noValidate>
        <div className={`campo ${errores.codigo ? 'campo-invalido' : ''}`}>
          <label htmlFor="codigo">Código producto</label>
          <input
            type="text"
            id="codigo"
            value={codigo}
            disabled={enEdicion}
            onChange={(e) => setCodigo(e.target.value)}
          />
          {errores.codigo && <p className="mensaje-error" style={{ display: 'block' }}>{errores.codigo}</p>}
        </div>

        <div className={`campo ${errores.nombre ? 'campo-invalido' : ''}`}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            maxLength={100}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errores.nombre && <p className="mensaje-error" style={{ display: 'block' }}>{errores.nombre}</p>}
        </div>

        <div className={`campo ${errores.descripcion ? 'campo-invalido' : ''}`}>
          <label htmlFor="descripcion">Descripción (opcional)</label>
          <textarea
            id="descripcion"
            rows={3}
            maxLength={500}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
          {errores.descripcion && <p className="mensaje-error" style={{ display: 'block' }}>{errores.descripcion}</p>}
        </div>

        <div className={`campo ${errores.precio ? 'campo-invalido' : ''}`}>
          <label htmlFor="precio">Precio</label>
          <input
            type="text"
            id="precio"
            placeholder="Ej: 4999.9"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          {errores.precio && <p className="mensaje-error" style={{ display: 'block' }}>{errores.precio}</p>}
        </div>

        <div className={`campo ${errores.stock ? 'campo-invalido' : ''}`}>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            min={0}
            step={1}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          {errores.stock && <p className="mensaje-error" style={{ display: 'block' }}>{errores.stock}</p>}
        </div>

        <div className={`campo ${errores.stockCritico ? 'campo-invalido' : ''}`}>
          <label htmlFor="stock-critico">Stock crítico (opcional)</label>
          <input
            type="number"
            id="stock-critico"
            min={0}
            step={1}
            value={stockCritico}
            onChange={(e) => setStockCritico(e.target.value)}
          />
          {errores.stockCritico && (
            <p className="mensaje-error" style={{ display: 'block' }}>{errores.stockCritico}</p>
          )}
        </div>

        {nivelCritico && (
          <div className="alerta alerta-critico" style={{ marginBottom: '16px' }}>
            El stock está en nivel crítico.
          </div>
        )}

        <div className={`campo ${errores.categoria ? 'campo-invalido' : ''}`}>
          <label htmlFor="categoria">Categoría</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">-- Seleccione la categoría --</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errores.categoria && <p className="mensaje-error" style={{ display: 'block' }}>{errores.categoria}</p>}
        </div>

        <div className="campo">
          <label htmlFor="imagen">Imagen (opcional)</label>
          <select id="imagen" value={imagen} onChange={(e) => setImagen(e.target.value)}>
            {imagenesDisponibles.map((img) => (
              <option key={img.valor} value={img.valor}>
                {img.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grupo-botones">
          <button className="btn btn-primario" type="submit">
            Guardar
          </button>
          <Link className="btn btn-secundario" to="/admin/productos">
            Volver
          </Link>
        </div>
      </form>
    </>
  );
};
