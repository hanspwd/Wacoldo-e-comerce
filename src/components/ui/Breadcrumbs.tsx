import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="Migas de pan" className="app-breadcrumbs">
    <ol className="breadcrumb mb-0">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li
            key={`${item.label}-${index}`}
            className={`breadcrumb-item${isLast ? ' active' : ''}`}
            aria-current={isLast ? 'page' : undefined}
          >
            {item.to && !isLast ? <Link to={item.to}>{item.label}</Link> : item.label}
          </li>
        );
      })}
    </ol>
  </nav>
);
