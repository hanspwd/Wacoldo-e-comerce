import { useCallback, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormValidator<T> = (values: T) => FormErrors<T>;

interface UseFormOptions<T> {
  validate?: FormValidator<T>;
}

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  { validate }: UseFormOptions<T> = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const setValue = useCallback((name: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValue(event.target.name as keyof T, event.target.value);
    },
    [setValue]
  );

  const validateAll = useCallback((): boolean => {
    if (!validate) return true;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [validate, values]);

  const validateField = useCallback(
    (name: keyof T) => {
      if (!validate) return;
      const nextErrors = validate(values);
      setErrors((prev) => {
        const next = { ...prev };
        if (nextErrors[name]) {
          next[name] = nextErrors[name];
        } else {
          delete next[name];
        }
        return next;
      });
    },
    [validate, values]
  );

  const reset = useCallback(
    (nextValues: T = initialValues) => {
      setValues(nextValues);
      setErrors({});
    },
    [initialValues]
  );

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  return {
    values,
    errors,
    hasErrors,
    setValue,
    setValues,
    setErrors,
    handleChange,
    validateAll,
    validateField,
    reset,
  };
}
