import { ActionGroup } from '@/components/ui/ActionGroup';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/Field';
import { Icon } from '@/components/ui/Icon';

interface CatalogFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  resultCount: number;
  onClear: () => void;
}

export const CatalogFilters = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  resultCount,
  onClear,
}: CatalogFiltersProps) => {
  const hasFilters = search.trim() !== '' || category !== '';

  return (
    <section className="catalog-filters" aria-label="Filtros del catálogo">
      <div className="row g-3 align-items-end">
        <div className="col-12 col-lg-4">
          <label htmlFor="catalogo-buscar" className="form-label fw-semibold">
            Buscar producto
          </label>
          <TextInput
            id="catalogo-buscar"
            name="buscar"
            type="search"
            placeholder="Ej: auriculares, café..."
            value={search}
            icon="search"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="col-12 col-lg-8">
          <span className="form-label fw-semibold d-block">Categoría</span>
          <ActionGroup gap={2} aria-label="Filtrar por categoría">
            <Button
              variant={category === '' ? 'primary' : 'soft'}
              size="sm"
              onClick={() => onCategoryChange('')}
            >
              Todas
            </Button>
            {categories.map((item) => (
              <Button
                key={item}
                variant={category === item ? 'primary' : 'soft'}
                size="sm"
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </ActionGroup>
        </div>
      </div>

      <div className="catalog-filters__footer">
        <p className="mb-0 text-secondary">
          <Icon name="box" size={16} className="me-1" />
          {resultCount} {resultCount === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
        {hasFilters && (
          <Button variant="link" size="sm" onClick={onClear}>
            Limpiar filtros
          </Button>
        )}
      </div>
    </section>
  );
};
