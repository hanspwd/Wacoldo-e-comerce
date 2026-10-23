import { EQUIPO } from '@/data';
import { ActionBar } from '@/components/ui/ActionGroup';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { usePageTitle } from '@/hooks/usePageTitle';

const VALORES = [
  {
    icon: 'shield' as const,
    title: 'Compra segura',
    text: 'Validamos cada dato y protegemos tus compras con Webpay Plus.',
  },
  {
    icon: 'truck' as const,
    title: 'Cobertura nacional',
    text: 'Despachamos a todo Chile con seguimiento de tu pedido.',
  },
  {
    icon: 'heart' as const,
    title: 'Atención cercana',
    text: 'Un equipo real disponible para ayudarte antes y después de comprar.',
  },
];

export const About = () => {
  usePageTitle('Nosotros');

  return (
    <div className="page container page-stack">
      <PageHeader
        eyebrow="Nosotros"
        title="Una tienda pensada para simplificarte la vida"
        description="Somos una tienda online chilena dedicada a ofrecer productos de calidad en tecnología, ropa, hogar, deportes y alimentos."
      />

      <Card className="about-story">
        <div className="card-body">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-7">
              <h2 className="about-story__title">Calidad, cercanía y transparencia.</h2>
              <p>
                Nuestro compromiso es entregar una experiencia de compra simple, segura y
                transparente. Cada producto pasa por una selección cuidadosa para que encuentres
                exactamente lo que necesitas.
              </p>
              <p className="mb-0">
                Detrás de Wacoldo Store hay un equipo de desarrollo enfocado en la mejora continua:
                validaciones claras, stock actualizado y una interfaz que funciona igual de bien en
                tu computador y en tu teléfono.
              </p>
            </div>
            <div className="col-12 col-lg-5">
              <div className="about-story__stats">
                <div>
                  <strong>+8</strong>
                  <span>productos seleccionados</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>categorías para explorar</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>compra protegida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <section className="page-section">
        <SectionHeader
          title="Lo que nos mueve"
          description="Tres compromisos que están presentes en cada compra."
        />
        <div className="row g-4">
          {VALORES.map((valor) => (
            <div className="col-12 col-md-4" key={valor.title}>
              <Card className="value-card h-100">
                <div className="card-body">
                  <span className="value-card__icon">
                    <Icon name={valor.icon} size={22} />
                  </span>
                  <h3 className="value-card__title">{valor.title}</h3>
                  <p className="value-card__text mb-0">{valor.text}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeader
          title="Equipo de desarrollo"
          description="Las personas detrás de la experiencia Wacoldo Store."
        />
        <div className="row g-4">
          {EQUIPO.map((miembro) => (
            <div className="col-12 col-md-6" key={miembro.nombre}>
              <TeamMemberCard miembro={miembro} />
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="home-cta">
          <div>
            <p className="home-cta__eyebrow">¿Tienes alguna duda?</p>
            <h2 className="home-cta__title">Estamos aquí para ayudarte.</h2>
            <p className="home-cta__text">
              Escríbenos y te responderemos a la brevedad. También puedes revisar nuestro catálogo
              completo.
            </p>
          </div>
          <ActionBar
            nodes={[
              {
                keyId: 'contacto',
                label: 'Contactarnos',
                to: '/contacto',
                variant: 'accent',
                size: 'lg',
                icon: 'mail',
              },
              {
                keyId: 'productos',
                label: 'Ver productos',
                to: '/productos',
                variant: 'ghost',
                size: 'lg',
                icon: 'arrow-right',
                iconPosition: 'end',
              },
            ]}
            align="end"
          />
        </div>
      </section>
    </div>
  );
};
