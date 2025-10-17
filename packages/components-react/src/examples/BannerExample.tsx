import { PBanner, PButton } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

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
      <PBanner
        open={isBannerOpen}
        heading="Some Heading"
        headingTag="h3"
        description="Some Description"
        onDismiss={onDismiss}
      />
    </>
  );
};
