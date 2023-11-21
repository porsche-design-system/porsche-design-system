import { Link } from '@remix-run/react';
import { PHeading } from '@porsche-design-system/components-react/ssr';
import { routes } from '~/routes';

export default function _index(): JSX.Element {
  return (
    <main>
      <PHeading>Welcome to React Remix!</PHeading>

      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
        <li>
          {/* the scroll position bug was only reproducible with nested routing */}
          <Link preventScrollReset={true} to="/modal-standalone">
            Modal Page
          </Link>
        </li>
      </ul>
    </main>
  );
}
