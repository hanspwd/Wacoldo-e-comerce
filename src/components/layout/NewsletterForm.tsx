import { useState } from 'react';
import type { FormEvent } from 'react';
import { useToast } from '@/context/ToastContext';
import { validarCorreo } from '@/utils/validaciones';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/Field';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const resultado = validarCorreo(email);

    if (!resultado.valido) {
      setError(resultado.mensaje);
      return;
    }

    setError('');
    setEmail('');
    showToast('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="newsletter-correo" className="form-label fw-semibold">
        Recibe ofertas y novedades
      </label>
      <div className="d-flex gap-2">
        <TextInput
          id="newsletter-correo"
          name="newsletter"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          invalid={Boolean(error)}
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError('');
          }}
        />
        <Button type="submit" variant="accent" icon="mail" ariaLabel="Suscribirme al newsletter">
          <span className="d-none d-sm-inline">Suscribirme</span>
        </Button>
      </div>
      {error && (
        <p className="invalid-feedback d-block mb-0" role="alert">
          {error}
        </p>
      )}
      <p className="newsletter-form__hint">Sin spam. Solo lo mejor de Wacoldo Store.</p>
    </form>
  );
};
