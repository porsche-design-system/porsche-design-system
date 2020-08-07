import { PMarque as Marque } from '@porsche-design-system/components-react';
import React from 'react';

export const MarquePage = (): JSX.Element => {
  return (
    <>
      <div className="playground" title="should show marque">
        <Marque />
      </div>

      <div className="playground" title="should show marque without trademark sign">
        <Marque trademark={false} />
      </div>
    </>
  );
};
