/* Auto Generated File */
// @ts-nocheck
import { PMarque } from '@porsche-design-system/components-react';

export const MarquePage = (): JSX.Element => {
  return (
    <>
      <div className="playground" title="should show marque with trademark sign and different sizing">
        <PMarque />
        <PMarque size="small" />
        <PMarque size="medium" />
      </div>

      <div className="playground" title="should show marque without trademark sign and different sizing">
        <PMarque trademark={false} />
        <PMarque trademark={false} size="small" />
        <PMarque trademark={false} size="medium" />
      </div>
    </>
  );
};
