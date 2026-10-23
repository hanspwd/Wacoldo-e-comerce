import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { validarContrasena, validarCorreo } from '@/utils/validaciones';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Field, TextInput } from '@/components/ui/Field';
import { Icon } from '@/components/ui/Icon';
import { useForm } from '@/hooks/useForm';
import { usePageTitle } from '@/hooks/usePageTitle';

interface LoginValues {
  correo: string;
  password: string;
  [key: string]: string;
}

export const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState('');

  usePageTitle('Iniciar sesión');

  const { values, errors, setValue, validateAll, validateField } = useForm<LoginValues>(
    { correo: '', password: '' },
    {
      validate: (current) => {
        const nextErrors: Partial<Record<keyof LoginValues, string>> = {};
        const correo = validarCorreo(current.correo);
        if (!correo.valido) nextErrors.correo = correo.mensaje;

        const password = validarContrasena(current.password);
        if (!password.valido) nextErrors.password = password.mensaje;

        return nextErrors;
      },
    }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setAlerta('');

    if (!validateAll()) return;

    const resultado = login(values.correo, values.password);
    if (!resultado.exito) {
      setAlerta(resultado.mensaje);
      return;
    }

    showToast(`¡Bienvenido de vuelta! Sesión iniciada como ${resultado.tipo}.`);
    navigate(resultado.tipo === 'Administrador' || resultado.tipo === 'Vendedor' ? '/admin' : '/');
  };

  return (
    <div className="page auth-page">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-12 col-lg-5">
            <div className="auth-aside">
              <span className="hero-eyebrow">
                <Icon name="user" size={17} />
                Tu cuenta Wacoldo
              </span>
              <h1 className="auth-aside__title">Todo lo que compraste, siempre a mano.</h1>
              <p className="auth-aside__text">
                Inicia sesión para revisar tu carrito, gestionar tus datos y disfrutar de una
                experiencia de compra más rápida.
              </p>
              <ul className="auth-benefits">
                <li><Icon name="shield" size={18} /> Datos protegidos y compra segura.</li>
                <li><Icon name="cart" size={18} /> Carrito guardado en tu dispositivo.</li>
                <li><Icon name="heart" size={18} /> Atención personalizada cuando la necesites.</li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <Card className="auth-card">
              <div className="card-body">
                <p className="page-header__eyebrow">Acceso</p>
                <h2 className="auth-card__title">Inicio de sesión</h2>
                <p className="auth-card__subtitle">
                  Ingresa con tu correo y contraseña para continuar.
                </p>

                {alerta && (
                  <Alert variant="danger" onDismiss={() => setAlerta('')}>
                    {alerta}
                  </Alert>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <Field id="correo" label="Correo" error={errors.correo} required>
                    <TextInput
                      id="correo"
                      name="correo"
                      type="email"
                      value={values.correo}
                      invalid={Boolean(errors.correo)}
                      autoComplete="email"
                      placeholder="tucorreo@duoc.cl"
                      onChange={(event) => setValue('correo', event.target.value)}
                      onBlur={() => validateField('correo')}
                    />
                  </Field>

                  <Field id="password" label="Contraseña" error={errors.password} required>
                    <TextInput
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      invalid={Boolean(errors.password)}
                      autoComplete="current-password"
                      placeholder="Tu contraseña"
                      onChange={(event) => setValue('password', event.target.value)}
                      onBlur={() => validateField('password')}
                    />
                  </Field>

                  <ActionBar
                    nodes={[
                      {
                        keyId: 'registro',
                        label: 'Crear una cuenta',
                        to: '/registro',
                        variant: 'outline',
                      },
                      {
                        keyId: 'entrar',
                        label: 'Iniciar sesión',
                        type: 'submit',
                        variant: 'primary',
                        icon: 'arrow-right',
                        iconPosition: 'end',
                        className: 'w-100 w-sm-auto',
                      },
                    ]}
                    align="between"
                    className="auth-actions"
                  />
                </form>

                <Alert variant="info" className="mt-4 mb-0">
                  <strong>Usuarios de prueba:</strong> admin@duoc.cl / admin123 · vendedor@duoc.cl /
                  vende123
                </Alert>

                <p className="auth-card__footer mb-0">
                  ¿Primera vez aquí? <Link to="/registro">Regístrate en un minuto</Link>.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
