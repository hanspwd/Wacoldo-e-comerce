import { Link } from 'react-router-dom';
import type { BlogPost } from '@/types';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => (
  <Card as="article" hover className="blog-card h-100">
    <Link to={`/blog/${post.id}`} className="blog-card__media" aria-label={`Leer ${post.titulo}`}>
      <img src={post.imagen} alt={post.titulo} loading="lazy" decoding="async" />
      <span className="blog-card__badge">{post.categoria}</span>
    </Link>
    <div className="card-body d-flex flex-column">
      <div className="blog-card__meta">
        <span><Icon name="clock" size={15} /> {post.tiempoLectura}</span>
        <span>{post.fecha}</span>
      </div>
      <h2 className="blog-card__title">
        <Link to={`/blog/${post.id}`}>{post.titulo}</Link>
      </h2>
      <p className="blog-card__summary">{post.resumen}</p>
      <Link to={`/blog/${post.id}`} className="blog-card__link">
        Leer artículo <Icon name="arrow-right" size={17} />
      </Link>
    </div>
  </Card>
);
