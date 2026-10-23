import { BLOG_POSTS } from '@/data';
import { BlogCard } from '@/components/blog/BlogCard';
import { ActionBar } from '@/components/ui/ActionGroup';
import { PageHeader } from '@/components/ui/PageHeader';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Blogs = () => {
  usePageTitle('Blogs');

  return (
    <div className="page container page-stack">
      <PageHeader
        eyebrow="Blog"
        title="Noticias y casos curiosos"
        description="Ideas, consejos y datos útiles para sacar el máximo provecho a tus productos favoritos."
      />

      <div className="row g-4">
        {BLOG_POSTS.map((post) => (
          <div className="col-12 col-lg-6" key={post.id}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      <section className="page-section">
        <div className="home-cta">
          <div>
            <p className="home-cta__eyebrow">¿Tienes una idea para el blog?</p>
            <h2 className="home-cta__title">Nos encantaría leerte.</h2>
            <p className="home-cta__text">
              Escríbenos con tus preguntas o sugerencias y las tendremos en cuenta para próximos
              artículos.
            </p>
          </div>
          <ActionBar
            nodes={[
              {
                keyId: 'contacto',
                label: 'Enviar sugerencia',
                to: '/contacto',
                variant: 'accent',
                size: 'lg',
                icon: 'mail',
              },
            ]}
            align="end"
          />
        </div>
      </section>
    </div>
  );
};
