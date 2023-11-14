import { Link, Outlet } from '@remix-run/react';
import { PLink } from '@porsche-design-system/components-react/ssr';

export default function Overview(): JSX.Element {
  return (
    <main>
      <PLink>
        <Link to="/">Back to Home</Link>
      </PLink>
      <div style={{ height: '1000px' }}></div>
      <PLink>
        <Link to="/modal-route-change/open">Open Modal</Link>
      </PLink>
      <Outlet />
    </main>
  );
}
