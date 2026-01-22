import { useLocation, useNavigate } from 'react-router';
import { routes } from '../routes.tsx';

interface RouteSelectProps {
  className?: string;
}

export function RouteSelect({ className }: RouteSelectProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <select className={className} value={location.pathname} onChange={(e) => navigate(e.target.value)}>
      {routes.map((route) => (
        <option key={route.path} value={route.path}>
          {route.label}
        </option>
      ))}
    </select>
  );
}
