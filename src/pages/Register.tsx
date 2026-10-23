import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  formatearRut,
  validarConfirmacionContrasena,
  validarContrasena,
  validarCorreo,
  validarLargo,
  validarRequerido,
  validarRut,
  validarTelefono,
} from '@/utils/validaciones';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Card } from '@/components/ui/Card';
import { Field, TextInput } from '@/components/ui/Field';
import { Icon } from '@/components/ui/Icon';
import { FormActions } from '@/components/forms/FormActions';
import { FormCol, FormGrid } from '@/components/forms/FormGrid';
import { FormSection } from '@/components/forms/FormSection';
import { RegionComunaFields } from '@/components/forms/RegionComunaFields';
import { useForm } from '@/hooks/useForm';
import { usePageTitle } from '@/hooks/usePageTitle';

interface RegisterValues {
  rut: string;
  nombre: string;
  correo: string;
  password: string;
  confirmar: string;
  telefono: string;
  region: string;
  comuna: string;
  [key: string]: string;
}

export const Register = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  usePageTitle('Crear cuenta');

  const { values, errors, setValue, setErrors, validateAll, validateField } =
    useForm<RegisterValues>(
      {
        rut: '',
        nombre: '',
        correo: '',
        password: '',
        confirmar: '',
        telefono: '',
        region: '',
        comuna: '',
      },
      {
        validate: (current) => {
          const nextErrors: Partial<Record<keyof RegisterValues, string>> = {};

          const rut = validarRut(current.rut);
          if (!rut.valido) nextErrors.rut = rut.mensaje;

          let nombre = validarRequerido(current.nombre, 'Nombre completo');
          if (nombre.valido) nombre = validarLargo(current.nombre, null, 100, 'Nombre completo');
          if (!nombre.valido) nextErrors.nombre = nombre.mensaje;

          const correo = validarCorreo(current.correo);
          if (!correo.valido) nextErrors.correo = correo.mensaje;

          const password = validarContrasena(current.password);
          if (!password.valido) nextErrors.password = password.mensaje;

          const confirmacion = validarConfirmacionContrasena(
            current.password,
            current.confirmar
          );
          if (!confirmacion.valido) nextErrors.confirmar = confirmacion.mensaje;

          const telefono = validarTelefono(current.telefono);
          if (!telefono.valido) nextErrors.telefono = telefono.mensaje;

          if (!current.region) nextErrors.region = 'Debes seleccionar una región.';
          if (!current.comuna) nextErrors.comuna = 'Debes seleccionar una comuna.';

          return nextErrors;
        },
      }
    );

  const handleRutBlur = () => {
    if (values.rut.trim() && validarRut(values.rut).valido) {
      setValue('rut', formatearRut(values.rut));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateAll()) return;

    const resultado = register({
      rut: values.rut,
      nombre: values.nombre,
      correo: values.correo,
      password: values.password,
      telefono: values.telefono,
      region: values.region,
      comuna: values.comuna,
    });

    if (!resultado.exito) {
      setErrors((prev) => ({
        ...prev,
        [resultado.campo ?? 'correo']: resultado.mensaje,
      }));
      return;
    }

    showToast(resultado.mensaje);
    navigate('/');
  };

  return (
    <div className="page auth-page">
      <div className="container">
        <div className="row g-4 g-lg-5">
          <div className="col-12 col-lg-4">
            <div className="auth-aside auth-aside--sticky">
              <span className="hero-eyebrow">
                <Icon name="sparkles" size={17} />
                Nuevo en Wacoldo
              </span>
              <h1 className="auth-aside__title">Crea tu cuenta y compra en minutos.</h1>
              <p className="auth-aside__text">
                Solo necesitas tus datos básicos. Podrás guardar tu carrito, revisar tus compras y
                recibir novedades.
              </p>
              <ul className="auth-benefits">
                <li><Icon name="check" size={18} /> Registro gratuito y sin letra chica.</li>
                <li><Icon name="shield" size={18} /> Validación segura de tus datos.</li>
                <li><Icon name="truck" size={18} /> Despacho a todo Chile.</li>
              </ul>
              <ActionBar
                nodes={[
                  {
                    keyId: 'login',
                    label: 'Ya tengo cuenta',
                    to: '/login',
                    variant: 'outline',
                    icon: 'arrow-left',
                  },
                ]}
              />
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <Card className="auth-card auth-card--wide">
              <div className="card-body">
                <p className="page-header__eyebrow">Registro</p>
                <h2 className="auth-card__title">Crea tu cuenta</h2>
                <p className="auth-card__subtitle">
                  Completa los datos para comenzar a comprar.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <FormSection title="Datos personales" description="Cuéntanos quién eres.">
                    <FormGrid>
                      <FormCol span={6}>
                        <Field id="rut" label="RUT" error={errors.rut} hint="Ej: 12.345.678-5" required>
                          <TextInput
                            id="rut"
                            name="rut"
                            value={values.rut}
                            maxLength={12}
                            placeholder="12.345.678-5"
                            invalid={Boolean(errors.rut)}
                            autoComplete="off"
                            onChange={(event) => setValue('rut', event.target.value)}
                            onBlur={() => {
                              handleRutBlur();
                              validateField('rut');
                            }}
                          />
                        </Field>
                      </FormCol>

                      <FormCol span={6}>
                        <Field id="nombre" label="Nombre completo" error={errors.nombre} required>
                          <TextInput
                            id="nombre"
                            name="nombre"
                            value={values.nombre}
                            maxLength={100}
                            invalid={Boolean(errors.nombre)}
                            autoComplete="name"
                            onChange={(event) => setValue('nombre', event.target.value)}
                            onBlur={() => validateField('nombre')}
                          />
                        </Field>
                      </FormCol>

                      <FormCol span={6}>
                        <Field id="correo" label="Correo" error={errors.correo} required>
                          <TextInput
                            id="correo"
                            name="correo"
                            type="email"
                            value={values.correo}
                            maxLength={100}
                            invalid={Boolean(errors.correo)}
                            autoComplete="email"
                            placeholder="tucorreo@duoc.cl"
                            onChange={(event) => setValue('correo', event.target.value)}
                            onBlur={() => validateField('correo')}
                          />
                        </Field>
                      </FormCol>

                      <FormCol span={6}>
                        <Field
                          id="telefono"
                          label="Teléfono (opcional)"
                          error={errors.telefono}
                          hint="Solo números, entre 8 y 15 dígitos."
                        >
                          <TextInput
                            id="telefono"
                            name="telefono"
                            type="tel"
                            value={values.telefono}
                            maxLength={15}
                            invalid={Boolean(errors.telefono)}
                            autoComplete="tel"
                            onChange={(event) => setValue('telefono', event.target.value)}
                            onBlur={() => validateField('telefono')}
                          />
                        </Field>
                      </FormCol>
                    </FormGrid>
                  </FormSection>

                  <FormSection title="Seguridad" description="Elige una contraseña fácil de recordar.">
                    <FormGrid>
                      <FormCol span={6}>
                        <Field id="password" label="Contraseña" error={errors.password} required>
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
                          required
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

                  <FormSection title="Ubicación" description="Así podremos coordinar tu despacho.">
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
                    </FormGrid>
                  </FormSection>

                  <FormActions
                    submitLabel="Crear mi cuenta"
                    cancelTo="/login"
                    cancelLabel="Ya tengo cuenta"
                  />
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
