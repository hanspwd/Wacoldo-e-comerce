import type { MiembroEquipo } from '@/types';
import { Card } from '@/components/ui/Card';

interface TeamMemberCardProps {
  miembro: MiembroEquipo;
}

export const TeamMemberCard = ({ miembro }: TeamMemberCardProps) => (
  <Card as="article" className="team-card h-100">
    <div className="card-body">
      <span className="team-card__avatar" aria-hidden="true">
        {miembro.iniciales}
      </span>
      <h3 className="team-card__name">{miembro.nombre}</h3>
      <p className="team-card__role">{miembro.rol}</p>
      <p className="team-card__description">{miembro.descripcion}</p>
    </div>
  </Card>
);
