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
        {/* the scroll position bug was only reproducible with nested routing */}
        <li key="100">
          <Link href="modal-standalone">Modal Page</Link>
        </li>
      </ul>
    </>
  );
};

export default HomePage;
