import { useCallback, useState } from 'react';
import { PBannerInline, PButton } from '@porsche-design-system/components-react';

export const BannerInlineExampleEventsPage = (): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const onShow = useCallback(() => setIsActive(true), []);
  const onDismiss = useCallback(() => setIsActive(false), []);

  return (
    <>
      <PButton onClick={onShow}>Show BannerInline</PButton>
      {isActive && (
        <PBannerInline
          heading="Some banner-inline heading"
          description="Some banner-inline description."
          onDismiss={onDismiss}
        />
      )}
    </>
  );
};
