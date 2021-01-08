import { PMarque } from '@porsche-design-system/components-react';

export const MarquePage = (): JSX.Element => {
  return (
    <>
      <div className="playground" title="should show marque">
        <PMarque />
      </div>

      <div className="playground" title="should show marque without trademark sign">
        <PMarque trademark={false} />
      </div>
    </>
  );
};
