import { useMemo } from 'react';
import { Field, Select } from '@/components/ui/Field';
import { obtenerComunas, obtenerRegiones } from '@/utils/regionesComunas';

interface RegionComunaFieldsProps {
  region: string;
  comuna: string;
  onRegionChange: (value: string) => void;
  onComunaChange: (value: string) => void;
  regionError?: string;
  comunaError?: string;
  onRegionBlur?: () => void;
  onComunaBlur?: () => void;
  idPrefix?: string;
}

export const RegionComunaFields = ({
  region,
  comuna,
  onRegionChange,
  onComunaChange,
  regionError,
  comunaError,
  onRegionBlur,
  onComunaBlur,
  idPrefix = '',
}: RegionComunaFieldsProps) => {
  const regiones = useMemo(() => obtenerRegiones(), []);
  const comunas = useMemo(() => (region ? obtenerComunas(region) : []), [region]);

  const regionOptions = regiones.map((item) => ({ value: item, label: item }));
  const comunaOptions = comunas.map((item) => ({ value: item, label: item }));

  return (
    <>
      <div className="col-12 col-md-6">
        <Field
          id={`${idPrefix}region`}
          label="Región"
          error={regionError}
          required
        >
          <Select
            id={`${idPrefix}region`}
            name={`${idPrefix}region`}
            value={region}
            options={regionOptions}
            placeholder="Selecciona una región"
            invalid={Boolean(regionError)}
            onChange={(event) => onRegionChange(event.target.value)}
            onBlur={onRegionBlur}
          />
        </Field>
      </div>

      <div className="col-12 col-md-6">
        <Field id={`${idPrefix}comuna`} label="Comuna" error={comunaError} required>
          <Select
            id={`${idPrefix}comuna`}
            name={`${idPrefix}comuna`}
            value={comuna}
            options={comunaOptions}
            placeholder="Selecciona una comuna"
            invalid={Boolean(comunaError)}
            disabled={!region || comunas.length === 0}
            onChange={(event) => onComunaChange(event.target.value)}
            onBlur={onComunaBlur}
          />
        </Field>
      </div>
    </>
  );
};
