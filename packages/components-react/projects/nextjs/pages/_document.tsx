import { Head, Html, Main, NextScript } from 'next/document';
import { FooterPartials, HeaderPartials } from '../components';

const Document = (): JSX.Element => {
  const cdn = 'local';

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.5638ae59e85b68cac7febfffe555dbe7.png" />
        <HeaderPartials cdn={cdn} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <FooterPartials cdn={cdn} />
      </body>
    </Html>
  );
};

export default Document;
