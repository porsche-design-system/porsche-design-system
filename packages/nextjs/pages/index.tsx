import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { PorscheDesignSystemProvider, PHeadline } from '@porsche-design-system/components-react';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PorscheDesignSystemProvider>
          <PHeadline>Porsche Design System Headline</PHeadline>
        </PorscheDesignSystemProvider>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
