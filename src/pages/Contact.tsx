import { useState } from 'react';
import type { FormEvent } from 'react';
import { guardarMensaje } from '@/services/messages';
import {
  validarComentario,
  validarCorreo,
  validarLargo,
  validarRequerido,
} from '@/utils/validaciones';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Field, Textarea, TextInput } from '@/components/ui/Field';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { FormActions } from '@/components/forms/FormActions';
import { useToast } from '@/context/ToastContext';
import { useForm } from '@/hooks/useForm';
import { usePageTitle } from '@/hooks/usePageTitle';

interface ContactValues {
  nombre: string;
  correo: string;
  contenido: string;
  [key: string]: string;
}

export const Contact = () => {
  const { showToast } = useToast();
  const [enviado, setEnviado] = useState(false);

  usePageTitle('Contacto');

  const { values, errors, setValue, reset, validateAll, validateField } = useForm<ContactValues>(
    { nombre: '', correo: '', contenido: '' },
    {
      validate: (current) => {
        const nextErrors: Partial<Record<keyof ContactValues, string>> = {};

        let nombre = validarRequerido(current.nombre, 'Nombre completo');
        if (nombre.valido) nombre = validarLargo(current.nombre, null, 100, 'Nombre completo');
        if (!nombre.valido) nextErrors.nombre = nombre.mensaje;

        const correo = validarCorreo(current.correo);
        if (!correo.valido) nextErrors.correo = correo.mensaje;

        const contenido = validarComentario(current.contenido);
        if (!contenido.valido) nextErrors.contenido = contenido.mensaje;

        return nextErrors;
      },
    }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateAll()) return;

    guardarMensaje({
      nombre: values.nombre,
      correo: values.correo,
      comentario: values.contenido,
    });

    reset({ nombre: '', correo: '', contenido: '' });
    setEnviado(true);
    showToast('Mensaje enviado. Te contactaremos pronto.');
  };

  return (
    <div className="page container page-stack">
      <PageHeader
        eyebrow="Contacto"
        title="Conversemos"
        description="¿Tienes una duda sobre un producto, tu pedido o la tienda? Escríbenos y te responderemos a la brevedad."
      />

      <div className="row g-4 g-lg-5 align-items-start">
        <div className="col-12 col-lg-4">
          <Card className="contact-info">
            <div className="card-body">
              <h2 className="h4 mb-3">Canales de atención</h2>
              <p className="text-secondary">
                Nuestro equipo está disponible para ayudarte con lo que necesites.
              </p>

              <ul className="contact-channels">
                <li>
                  <span className="contact-channels__icon"><Icon name="mail" size={19} /></span>
                  <div>
                    <strong>Correo</strong>
                    <span>hola@wacaldostore.cl</span>
                  </div>
                </li>
                <li>
                  <span className="contact-channels__icon"><Icon name="phone" size={19} /></span>
                  <div>
                    <strong>Teléfono</strong>
                    <span>+56 2 2345 6789</span>
                  </div>
                </li>
                <li>
                  <span className="contact-channels__icon"><Icon name="clock" size={19} /></span>
                  <div>
                    <strong>Horario</strong>
                    <span>Lunes a viernes, 9:00 a 18:00</span>
                  </div>
                </li>
              </ul>

              <ActionBar
                nodes={[
                  {
                    keyId: 'correo',
                    label: 'Escribir por correo',
                    href: 'mailto:hola@wacaldostore.cl',
                    variant: 'outline',
                    icon: 'mail',
                  },
                  {
                    keyId: 'llamar',
                    label: 'Llamar',
                    href: 'tel:+56223456789',
                    variant: 'ghost',
                    icon: 'phone',
                  },
                ]}
              />
            </div>
          </Card>
        </div>

        <div className="col-12 col-lg-8">
          <Card className="contact-form">
            <div className="card-body">
              <h2 className="h4 mb-1">Envíanos un mensaje</h2>
              <p className="text-secondary mb-4">Completa el formulario y te contactaremos pronto.</p>

              {enviado && (
                <Alert variant="success" onDismiss={() => setEnviado(false)}>
                  ¡Mensaje enviado! Nuestro equipo te contactará a la brevedad.
                </Alert>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <Field id="nombre" label="Nombre completo" error={errors.nombre} required>
                      <TextInput
                        id="nombre"
                        name="nombre"
                        value={values.nombre}
                        maxLength={100}
                        invalid={Boolean(errors.nombre)}
                        autoComplete="name"
                        onChange={(event) => {
                          setValue('nombre', event.target.value);
                          setEnviado(false);
                        }}
                        onBlur={() => validateField('nombre')}
                      />
                    </Field>
                  </div>

                  <div className="col-12 col-md-6">
                    <Field id="correo" label="Correo" error={errors.correo} required>
                      <TextInput
                        id="correo"
                        name="correo"
                        type="email"
                        value={values.correo}
                        maxLength={100}
                        invalid={Boolean(errors.correo)}
                        autoComplete="email"
                        onChange={(event) => {
                          setValue('correo', event.target.value);
                          setEnviado(false);
                        }}
                        onBlur={() => validateField('correo')}
                      />
                    </Field>
                  </div>

                  <div className="col-12">
                    <Field
                      id="contenido"
                      label="Mensaje"
                      error={errors.contenido}
                      hint={`${values.contenido.length}/500 caracteres`}
                      required
                    >
                      <Textarea
                        id="contenido"
                        name="contenido"
                        rows={5}
                        maxLength={500}
                        value={values.contenido}
                        invalid={Boolean(errors.contenido)}
                        onChange={(event) => {
                          setValue('contenido', event.target.value);
                          setEnviado(false);
                        }}
                        onBlur={() => validateField('contenido')}
                      />
                    </Field>
                  </div>
                </div>

                <FormActions submitLabel="Enviar mensaje" align="start" />
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
