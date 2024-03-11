import { Head, Html, Main, NextScript } from 'next/document';
import { FooterPartials, HeaderPartials } from '../components';

const Document = (): JSX.Element => {
  const cdn = 'local';

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.d42ac2876697ec701e95e4a4d608fb0e.png" />
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
