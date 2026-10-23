import { Link } from 'react-router-dom';
import type { IconName } from '@/components/ui/Icon';
import { Icon } from '@/components/ui/Icon';

interface CategoryStripProps {
  categories: string[];
}

const CATEGORY_ICONS: Record<string, IconName> = {
  Tecnología: 'box',
  Ropa: 'tag',
  Hogar: 'sparkles',
  Deportes: 'heart',
  Alimentos: 'star',
};

export const CategoryStrip = ({ categories }: CategoryStripProps) => (
  <div className="category-strip" aria-label="Categorías destacadas">
    {categories.map((category) => (
      <Link
        key={category}
        to={`/productos?categoria=${encodeURIComponent(category)}`}
        className="category-chip"
      >
        <span className="category-chip__icon" aria-hidden="true">
          <Icon name={CATEGORY_ICONS[category] ?? 'tag'} size={19} />
        </span>
        <span>{category}</span>
        <Icon name="chevron-right" size={16} className="category-chip__arrow" />
      </Link>
    ))}
  </div>
);
