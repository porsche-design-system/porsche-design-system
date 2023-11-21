import type { NextPage } from 'next';
import { PHeading } from '@porsche-design-system/components-react/ssr';
import { routes } from '../routes';
import Link from 'next/link';

const HomePage: NextPage = (): JSX.Element => {
  return (
    <>
      <PHeading>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </PHeading>

      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
