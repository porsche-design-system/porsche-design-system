import type { NextPage } from 'next';
import { PHeadline } from '@porsche-design-system/components-react/ssr';
import { routes } from '../routes';
import Link from 'next/link';

const HomePage: NextPage = (): JSX.Element => {
  return (
    <>
      <PHeadline>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </PHeadline>

      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
        <li key="1000">
          <Link href="modal-route-change">Modal Route Change</Link>
        </li>
      </ul>
    </>
  );
};

export default HomePage;
