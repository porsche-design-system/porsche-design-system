import React, { useState } from 'react';
import { PButton, PBanner } from '@porsche-design-system/components-react';

export const BannerExamplePage = (): JSX.Element => {
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  const handleDismiss = () => {
    setIsBannerOpen(false);
  };

  const handleButtonClick = () => {
    setIsBannerOpen(true);
  };

  return (
    <>
      <PButton type="button" onClick={handleButtonClick}>
        Open Banner
      </PButton>
      <PBanner open={isBannerOpen} heading="Some Heading" description="Some Description" onDismiss={handleDismiss} />
    </>
  );
};
