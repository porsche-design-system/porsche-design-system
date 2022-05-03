import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = (): JSX.Element => {
  return (
    <div>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <Link href="/overview">
        <a>Overview</a>
      </Link>
    </div>
  );
};

export default Home;
