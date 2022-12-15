/* Auto Generated File */
import type { NextPage } from 'next';
import { PButton } from '@porsche-design-system/components-react';
import { PButton as PButtonSSR } from '@porsche-design-system/components-react/ssr';

const ButtonPage: NextPage = (): JSX.Element => {
  const style = `
    p-button:not(:last-child) {
      margin-right: 0.5rem;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render button primary with label">
        <PButton variant="primary">Some label</PButton>
        <PButtonSSR variant="primary">Some label</PButtonSSR>
      </div>
    </>
  );
};

export default ButtonPage;
