import type { Route } from './+types/home';
import { PHeading } from '@porsche-design-system/components-react/ssr';
import { routes } from '~/routes';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
  return (
    <main>
      <PHeading>Welcome to React Router!</PHeading>

      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
