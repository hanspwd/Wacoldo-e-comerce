import { useMemo } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { useToast } from '@/context/ToastContext';
import {
  esStockCritico,
  validarCategoria,
  validarCodigoProducto,
  validarDescripcion,
  validarNombreProducto,
  validarPrecio,
  validarStock,
  validarStockCritico,
} from '@/utils/validaciones';
import { IMAGEN_POR_DEFECTO, IMAGENES_DISPONIBLES } from '@/data';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormActions } from '@/components/forms/FormActions';
import { FormCol, FormGrid } from '@/components/forms/FormGrid';
import { FormSection } from '@/components/forms/FormSection';
import { useForm } from '@/hooks/useForm';
import { usePageTitle } from '@/hooks/usePageTitle';

interface ProductFormValues {
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: string;
  stockCritico: string;
  categoria: string;
  imagen: string;
  [key: string]: string;
}

export const AdminProductForm = () => {
  const { categorias, obtenerProducto, guardarProducto } = useProducts();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const codigoParam = searchParams.get('codigo');
  const enEdicion = Boolean(codigoParam);
  const producto = useMemo(
    () => (codigoParam ? obtenerProducto(codigoParam) : undefined),
    [codigoParam, obtenerProducto]
  );

  usePageTitle(enEdicion ? 'Editar producto' : 'Nuevo producto');

  const { values, errors, setValue, setErrors, validateAll, validateField } =
    useForm<ProductFormValues>(
      {
        codigo: producto?.codigo ?? '',
        nombre: producto?.nombre ?? '',
        descripcion: producto?.descripcion ?? '',
        precio: producto ? String(producto.precio) : '',
        stock: producto ? String(producto.stock) : '',
        stockCritico: producto ? String(producto.stockCritico) : '',
        categoria: producto?.categoria ?? '',
        imagen: producto?.imagen ?? '',
      },
      {
        validate: (current) => {
          const nextErrors: Partial<Record<keyof ProductFormValues, string>> = {};

          let codigo = validarCodigoProducto(current.codigo);
          if (!enEdicion && codigo.valido && obtenerProducto(current.codigo)) {
            codigo = { valido: false, mensaje: 'El código ya está en uso.' };
          }
          if (!codigo.valido) nextErrors.codigo = codigo.mensaje;

          const nombre = validarNombreProducto(current.nombre);
          if (!nombre.valido) nextErrors.nombre = nombre.mensaje;

          const descripcion = validarDescripcion(current.descripcion);
          if (!descripcion.valido) nextErrors.descripcion = descripcion.mensaje;

          const precio = validarPrecio(current.precio);
          if (!precio.valido) nextErrors.precio = precio.mensaje;

          const stock = validarStock(current.stock);
          if (!stock.valido) nextErrors.stock = stock.mensaje;

          const stockCritico = validarStockCritico(current.stockCritico);
          if (!stockCritico.valido) nextErrors.stockCritico = stockCritico.mensaje;

          const categoria = validarCategoria(current.categoria);
          if (!categoria.valido) nextErrors.categoria = categoria.mensaje;

          return nextErrors;
        },
      }
    );

  const stockNumero = Number.parseInt(values.stock, 10);
  const criticoNumero = Number.parseInt(values.stockCritico, 10);
  const nivelCritico =
    !Number.isNaN(stockNumero) &&
    !Number.isNaN(criticoNumero) &&
    stockNumero > 0 &&
    esStockCritico(stockNumero, criticoNumero);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateAll()) return;

    const codigo = values.codigo.trim();
    const resultado = guardarProducto(
      {
        codigo,
        nombre: values.nombre.trim(),
        descripcion: values.descripcion.trim(),
        precio: Number.parseFloat(values.precio),
        stock: Number.parseInt(values.stock, 10),
        stockCritico: values.stockCritico === '' ? 0 : Number.parseInt(values.stockCritico, 10),
        categoria: values.categoria,
        imagen: values.imagen || IMAGEN_POR_DEFECTO,
      },
      enEdicion
    );

    if (!resultado.exito) {
      setErrors((prev) => ({ ...prev, codigo: resultado.mensaje }));
      showToast(resultado.mensaje, 'danger');
      return;
    }

    showToast(resultado.mensaje);
    navigate('/admin/productos');
  };

  if (enEdicion && !producto) {
    return (
      <EmptyState
        icon="search"
        title="Producto no encontrado"
        description="El código indicado no corresponde a ningún producto del catálogo."
        action={
          <ActionBar
            nodes={[
              {
                keyId: 'volver',
                label: 'Volver a productos',
                to: '/admin/productos',
                variant: 'primary',
                icon: 'arrow-left',
              },
            ]}
          />
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title={enEdicion ? 'Editar producto' : 'Nuevo producto'}
        description={
          enEdicion
            ? 'Actualiza la información del producto. Los cambios se verán en la tienda al guardar.'
            : 'Completa la información para incorporar un nuevo producto al catálogo.'
        }
        actions={[
          {
            keyId: 'volver',
            label: 'Volver a productos',
            to: '/admin/productos',
            variant: 'outline',
            icon: 'arrow-left',
          },
        ]}
      />

      <Card>
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <FormSection
              title="Información general"
              description="Datos que verá el cliente en el catálogo y en la ficha del producto."
            >
              <FormGrid>
                <FormCol span={6}>
                  <Field
                    id="codigo"
                    label="Código del producto"
                    error={errors.codigo}
                    hint={enEdicion ? 'El código no se puede modificar.' : 'Mínimo 3 caracteres.'}
                    required
                  >
                    <TextInput
                      id="codigo"
                      name="codigo"
                      value={values.codigo}
                      disabled={enEdicion}
                      invalid={Boolean(errors.codigo)}
                      onChange={(event) => setValue('codigo', event.target.value)}
                      onBlur={() => validateField('codigo')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field id="nombre" label="Nombre" error={errors.nombre} required>
                    <TextInput
                      id="nombre"
                      name="nombre"
                      value={values.nombre}
                      maxLength={100}
                      invalid={Boolean(errors.nombre)}
                      onChange={(event) => setValue('nombre', event.target.value)}
                      onBlur={() => validateField('nombre')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={12}>
                  <Field
                    id="descripcion"
                    label="Descripción"
                    error={errors.descripcion}
                    hint="Opcional. Máximo 500 caracteres."
                  >
                    <Textarea
                      id="descripcion"
                      name="descripcion"
                      rows={3}
                      maxLength={500}
                      value={values.descripcion}
                      invalid={Boolean(errors.descripcion)}
                      onChange={(event) => setValue('descripcion', event.target.value)}
                      onBlur={() => validateField('descripcion')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field id="categoria" label="Categoría" error={errors.categoria} required>
                    <Select
                      id="categoria"
                      name="categoria"
                      value={values.categoria}
                      options={categorias.map((categoria) => ({
                        value: categoria,
                        label: categoria,
                      }))}
                      placeholder="Selecciona una categoría"
                      invalid={Boolean(errors.categoria)}
                      onChange={(event) => setValue('categoria', event.target.value)}
                      onBlur={() => validateField('categoria')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field id="imagen" label="Imagen">
                    <Select
                      id="imagen"
                      name="imagen"
                      value={values.imagen}
                      options={IMAGENES_DISPONIBLES.map((imagen) => ({
                        value: imagen.valor,
                        label: imagen.label,
                      }))}
                      onChange={(event) => setValue('imagen', event.target.value)}
                    />
                  </Field>
                </FormCol>
              </FormGrid>
            </FormSection>

            <FormSection
              title="Precio e inventario"
              description="Define el precio y el stock disponible. Un precio en 0 se mostrará como gratis."
            >
              <FormGrid>
                <FormCol span={4}>
                  <Field id="precio" label="Precio" error={errors.precio} hint="Ej: 4999.9" required>
                    <TextInput
                      id="precio"
                      name="precio"
                      value={values.precio}
                      invalid={Boolean(errors.precio)}
                      inputMode="decimal"
                      onChange={(event) => setValue('precio', event.target.value)}
                      onBlur={() => validateField('precio')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={4}>
                  <Field id="stock" label="Stock" error={errors.stock} required>
                    <TextInput
                      id="stock"
                      name="stock"
                      type="number"
                      min={0}
                      step={1}
                      value={values.stock}
                      invalid={Boolean(errors.stock)}
                      onChange={(event) => setValue('stock', event.target.value)}
                      onBlur={() => validateField('stock')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={4}>
                  <Field
                    id="stock-critico"
                    label="Stock crítico"
                    error={errors.stockCritico}
                    hint="Opcional."
                  >
                    <TextInput
                      id="stock-critico"
                      name="stockCritico"
                      type="number"
                      min={0}
                      step={1}
                      value={values.stockCritico}
                      invalid={Boolean(errors.stockCritico)}
                      onChange={(event) => setValue('stockCritico', event.target.value)}
                      onBlur={() => validateField('stockCritico')}
                    />
                  </Field>
                </FormCol>
              </FormGrid>

              {nivelCritico && (
                <Alert variant="warning" className="mb-0">
                  Con los valores ingresados, este producto se marcará como <strong>stock crítico</strong>.
                </Alert>
              )}
            </FormSection>

            <FormActions
              submitLabel={enEdicion ? 'Guardar cambios' : 'Crear producto'}
              cancelTo="/admin/productos"
              cancelLabel="Volver"
            />
          </form>
        </div>
      </Card>
    </>
  );
};
