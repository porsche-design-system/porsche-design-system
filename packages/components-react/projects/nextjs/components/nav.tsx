import Link from 'next/link';
import { routes } from '../routes';

export const Nav = (): JSX.Element => {
  return (
    <ul>
      {routes.map((route) => (
        <li key={route.path}>
          <Link href={route.path}>
            <a>{route.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
