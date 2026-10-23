import { useMemo } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import type { TipoUsuario, Usuario } from '@/types';
import { TIPOS_USUARIO } from '@/data';
import {
  formatearRut,
  validarApellidos,
  validarConfirmacionContrasena,
  validarContrasena,
  validarCorreo,
  validarDireccion,
  validarNombreUsuario,
  validarRut,
  validarTelefono,
} from '@/utils/validaciones';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Field, Select, TextInput } from '@/components/ui/Field';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormActions } from '@/components/forms/FormActions';
import { FormCol, FormGrid } from '@/components/forms/FormGrid';
import { FormSection } from '@/components/forms/FormSection';
import { RegionComunaFields } from '@/components/forms/RegionComunaFields';
import { useForm } from '@/hooks/useForm';
import { usePageTitle } from '@/hooks/usePageTitle';

interface UserFormValues {
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
  confirmar: string;
  telefono: string;
  fechaNacimiento: string;
  tipo: string;
  region: string;
  comuna: string;
  direccion: string;
  [key: string]: string;
}

export const AdminUserForm = () => {
  const { usuarios, guardarUsuarioAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const correoParam = searchParams.get('correo');
  const enEdicion = Boolean(correoParam);
  const usuarioOriginal = useMemo(
    () =>
      correoParam
        ? usuarios.find((usuario) => usuario.correo.toLowerCase() === correoParam.toLowerCase()) ?? null
        : null,
    [correoParam, usuarios]
  );

  usePageTitle(enEdicion ? 'Editar usuario' : 'Nuevo usuario');

  const { values, errors, setValue, setErrors, validateAll, validateField } =
    useForm<UserFormValues>(
      {
        run: usuarioOriginal ? usuarioOriginal.rut || usuarioOriginal.run : '',
        nombre: usuarioOriginal?.nombre ?? '',
        apellidos: usuarioOriginal?.apellidos ?? '',
        correo: usuarioOriginal?.correo ?? '',
        password: '',
        confirmar: '',
        telefono: usuarioOriginal?.telefono ?? '',
        fechaNacimiento: usuarioOriginal?.fechaNacimiento ?? '',
        tipo: usuarioOriginal?.tipo ?? 'Cliente',
        region: usuarioOriginal?.region ?? '',
        comuna: usuarioOriginal?.comuna ?? '',
        direccion: usuarioOriginal?.direccion ?? '',
      },
      {
        validate: (current) => {
          const nextErrors: Partial<Record<keyof UserFormValues, string>> = {};

          const run = validarRut(current.run);
          if (!run.valido) nextErrors.run = run.mensaje;

          const nombre = validarNombreUsuario(current.nombre);
          if (!nombre.valido) nextErrors.nombre = nombre.mensaje;

          const apellidos = validarApellidos(current.apellidos);
          if (!apellidos.valido) nextErrors.apellidos = apellidos.mensaje;

          const correo = validarCorreo(current.correo);
          if (!correo.valido) {
            nextErrors.correo = correo.mensaje;
          } else if (
            !enEdicion &&
            usuarios.some(
              (usuario) => usuario.correo.toLowerCase() === current.correo.toLowerCase()
            )
          ) {
            nextErrors.correo = 'El correo ya está registrado.';
          }

          if (!enEdicion || current.password !== '' || current.confirmar !== '') {
            const password = validarContrasena(current.password);
            if (!password.valido) nextErrors.password = password.mensaje;

            const confirmacion = validarConfirmacionContrasena(
              current.password,
              current.confirmar
            );
            if (!confirmacion.valido) nextErrors.confirmar = confirmacion.mensaje;
          }

          const telefono = validarTelefono(current.telefono);
          if (!telefono.valido) nextErrors.telefono = telefono.mensaje;

          if (current.fechaNacimiento !== '') {
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            if (new Date(`${current.fechaNacimiento}T00:00:00`) > hoy) {
              nextErrors.fechaNacimiento = 'La fecha de nacimiento no puede ser futura.';
            }
          }

          const direccion = validarDireccion(current.direccion);
          if (!direccion.valido) nextErrors.direccion = direccion.mensaje;

          if (!current.region) nextErrors.region = 'Debes seleccionar una región.';
          if (!current.comuna) nextErrors.comuna = 'Debes seleccionar una comuna.';

          return nextErrors;
        },
      }
    );

  const handleRutBlur = () => {
    if (values.run.trim() && validarRut(values.run).valido) {
      setValue('run', formatearRut(values.run));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateAll()) return;

    const payload: Usuario = {
      run: values.run,
      rut: values.run,
      nombre: values.nombre.trim(),
      apellidos: values.apellidos.trim(),
      correo: enEdicion && usuarioOriginal ? usuarioOriginal.correo : values.correo.trim(),
      password: values.password !== '' ? values.password : usuarioOriginal?.password ?? '',
      telefono: values.telefono.trim(),
      fechaNacimiento: values.fechaNacimiento,
      tipo: values.tipo as TipoUsuario,
      region: values.region,
      comuna: values.comuna,
      direccion: values.direccion.trim(),
    };

    const resultado = guardarUsuarioAdmin(payload, enEdicion, correoParam || undefined);
    if (!resultado.exito) {
      setErrors((prev) => ({ ...prev, correo: resultado.mensaje }));
      showToast(resultado.mensaje, 'danger');
      return;
    }

    showToast(resultado.mensaje);
    navigate('/admin/usuarios');
  };

  if (enEdicion && !usuarioOriginal) {
    return (
      <EmptyState
        icon="search"
        title="Usuario no encontrado"
        description="El correo indicado no corresponde a ningún usuario registrado."
        action={
          <ActionBar
            nodes={[
              {
                keyId: 'volver',
                label: 'Volver a usuarios',
                to: '/admin/usuarios',
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
        eyebrow="Usuarios"
        title={enEdicion ? 'Editar usuario' : 'Nuevo usuario'}
        description={
          enEdicion
            ? 'Actualiza los datos del usuario. Si dejas la contraseña en blanco, se mantendrá la actual.'
            : 'Crea una cuenta y define su rol dentro de la tienda.'
        }
        actions={[
          {
            keyId: 'volver',
            label: 'Volver a usuarios',
            to: '/admin/usuarios',
            variant: 'outline',
            icon: 'arrow-left',
          },
        ]}
      />

      <Card>
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <FormSection
              title="Datos personales"
              description="Información de identificación y contacto del usuario."
            >
              <FormGrid>
                <FormCol span={6}>
                  <Field
                    id="run"
                    label="RUN / RUT"
                    error={errors.run}
                    hint="Ej: 12.345.678-5"
                    required
                  >
                    <TextInput
                      id="run"
                      name="run"
                      value={values.run}
                      maxLength={12}
                      invalid={Boolean(errors.run)}
                      onChange={(event) => setValue('run', event.target.value)}
                      onBlur={() => {
                        handleRutBlur();
                        validateField('run');
                      }}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field id="nombre" label="Nombre" error={errors.nombre} required>
                    <TextInput
                      id="nombre"
                      name="nombre"
                      value={values.nombre}
                      maxLength={50}
                      invalid={Boolean(errors.nombre)}
                      onChange={(event) => setValue('nombre', event.target.value)}
                      onBlur={() => validateField('nombre')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field id="apellidos" label="Apellidos" error={errors.apellidos} required>
                    <TextInput
                      id="apellidos"
                      name="apellidos"
                      value={values.apellidos}
                      maxLength={100}
                      invalid={Boolean(errors.apellidos)}
                      onChange={(event) => setValue('apellidos', event.target.value)}
                      onBlur={() => validateField('apellidos')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field id="telefono" label="Teléfono" error={errors.telefono} hint="Opcional.">
                    <TextInput
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={values.telefono}
                      maxLength={15}
                      invalid={Boolean(errors.telefono)}
                      onChange={(event) => setValue('telefono', event.target.value)}
                      onBlur={() => validateField('telefono')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field
                    id="fecha-nacimiento"
                    label="Fecha de nacimiento"
                    error={errors.fechaNacimiento}
                    hint="Opcional."
                  >
                    <TextInput
                      id="fecha-nacimiento"
                      name="fechaNacimiento"
                      type="date"
                      value={values.fechaNacimiento}
                      invalid={Boolean(errors.fechaNacimiento)}
                      onChange={(event) => setValue('fechaNacimiento', event.target.value)}
                      onBlur={() => validateField('fechaNacimiento')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field id="tipo" label="Tipo de usuario">
                    <Select
                      id="tipo"
                      name="tipo"
                      value={values.tipo}
                      options={TIPOS_USUARIO.map((tipo) => ({ value: tipo, label: tipo }))}
                      onChange={(event) => setValue('tipo', event.target.value)}
                    />
                  </Field>
                </FormCol>
              </FormGrid>
            </FormSection>

            <FormSection
              title="Acceso"
              description="Credenciales con las que el usuario ingresará a la tienda."
            >
              <FormGrid>
                <FormCol span={12}>
                  <Field
                    id="correo"
                    label="Correo"
                    error={errors.correo}
                    hint={enEdicion ? 'El correo no se puede modificar.' : undefined}
                    required
                  >
                    <TextInput
                      id="correo"
                      name="correo"
                      type="email"
                      value={values.correo}
                      maxLength={100}
                      disabled={enEdicion}
                      invalid={Boolean(errors.correo)}
                      onChange={(event) => setValue('correo', event.target.value)}
                      onBlur={() => validateField('correo')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field
                    id="password"
                    label={enEdicion ? 'Nueva contraseña (opcional)' : 'Contraseña'}
                    error={errors.password}
                    required={!enEdicion}
                  >
                    <TextInput
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      maxLength={10}
                      invalid={Boolean(errors.password)}
                      autoComplete="new-password"
                      onChange={(event) => setValue('password', event.target.value)}
                      onBlur={() => validateField('password')}
                    />
                  </Field>
                </FormCol>

                <FormCol span={6}>
                  <Field
                    id="confirmar"
                    label="Confirmar contraseña"
                    error={errors.confirmar}
                    required={!enEdicion}
                  >
                    <TextInput
                      id="confirmar"
                      name="confirmar"
                      type="password"
                      value={values.confirmar}
                      maxLength={10}
                      invalid={Boolean(errors.confirmar)}
                      autoComplete="new-password"
                      onChange={(event) => setValue('confirmar', event.target.value)}
                      onBlur={() => validateField('confirmar')}
                    />
                  </Field>
                </FormCol>
              </FormGrid>
            </FormSection>

            <FormSection title="Ubicación" description="Dirección y zona de despacho del usuario.">
              <FormGrid>
                <RegionComunaFields
                  region={values.region}
                  comuna={values.comuna}
                  regionError={errors.region}
                  comunaError={errors.comuna}
                  onRegionChange={(value) => {
                    setValue('region', value);
                    setValue('comuna', '');
                  }}
                  onComunaChange={(value) => setValue('comuna', value)}
                  onRegionBlur={() => validateField('region')}
                  onComunaBlur={() => validateField('comuna')}
                />

                <FormCol span={12}>
                  <Field id="direccion" label="Dirección" error={errors.direccion} required>
                    <TextInput
                      id="direccion"
                      name="direccion"
                      value={values.direccion}
                      maxLength={300}
                      invalid={Boolean(errors.direccion)}
                      onChange={(event) => setValue('direccion', event.target.value)}
                      onBlur={() => validateField('direccion')}
                    />
                  </Field>
                </FormCol>
              </FormGrid>
            </FormSection>

            <FormActions
              submitLabel={enEdicion ? 'Guardar cambios' : 'Crear usuario'}
              cancelTo="/admin/usuarios"
              cancelLabel="Volver"
            />
          </form>
        </div>
      </Card>
    </>
  );
};
