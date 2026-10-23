import { useParams } from 'react-router-dom';
import { BLOG_POSTS, obtenerBlogPost } from '@/data';
import { BlogCard } from '@/components/blog/BlogCard';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { usePageTitle } from '@/hooks/usePageTitle';

export const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const articulo = id ? obtenerBlogPost(id) : undefined;

  usePageTitle(articulo?.titulo ?? 'Artículo');

  if (!articulo) {
    return (
      <div className="page container page-stack">
        <EmptyState
          icon="search"
          title="Artículo no encontrado"
          description="Puede que el enlace haya cambiado o que el artículo ya no esté disponible."
          action={
            <ActionBar
              nodes={[
                {
                  keyId: 'volver',
                  label: 'Volver a blogs',
                  to: '/blogs',
                  variant: 'primary',
                  icon: 'arrow-left',
                },
              ]}
            />
          }
        />
      </div>
    );
  }

  const relacionados = BLOG_POSTS.filter((post) => post.id !== articulo.id);

  return (
    <div className="page container page-stack">
      <Breadcrumbs items={[{ label: 'Blogs', to: '/blogs' }, { label: articulo.titulo }]} />

      <article className="row g-4 g-lg-5">
        <div className="col-12 col-lg-8">
          <Card className="blog-detail">
            <div className="card-body">
              <span className="blog-detail__category">{articulo.categoria}</span>
              <h1 className="blog-detail__title">{articulo.subtitulo}</h1>
              <div className="blog-detail__meta">
                <span><Icon name="clock" size={16} /> {articulo.tiempoLectura}</span>
                <span>{articulo.fecha}</span>
              </div>
              <img
                src={articulo.imagen}
                alt={articulo.titulo}
                className="blog-detail__image"
                loading="eager"
                decoding="async"
              />
              <div className="blog-detail__content">
                {articulo.parrafos.map((parrafo, index) => (
                  <p key={index}>{parrafo}</p>
                ))}
              </div>
              <ActionBar
                nodes={[
                  {
                    keyId: 'volver',
                    label: 'Volver a blogs',
                    to: '/blogs',
                    variant: 'outline',
                    icon: 'arrow-left',
                  },
                ]}
              />
            </div>
          </Card>
        </div>

        <aside className="col-12 col-lg-4">
          <div className="blog-detail__aside">
            <SectionHeader title="Sigue leyendo" description="Otros artículos que te pueden interesar." />
            {relacionados.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </aside>
      </article>
    </div>
  );
};
