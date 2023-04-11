import { useCallback, useState } from 'react';
import { PButton, PBanner } from '@porsche-design-system/components-react';

export const BannerExamplePage = (): JSX.Element => {
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsBannerOpen(true);
  }, []);

  const onDismiss = useCallback(() => {
    setIsBannerOpen(false);
  }, []);

  return (
    <>
      <PButton type="button" onClick={onOpen}>
        Open Banner
      </PButton>
      <PBanner open={isBannerOpen} heading="Some Heading" description="Some Description" onDismiss={onDismiss} />
    </>
  );
};
