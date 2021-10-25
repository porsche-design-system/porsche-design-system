import { useCallback, useState } from 'react';
import { PBannerInline, PButton } from '@porsche-design-system/components-react';

export const BannerInlineExampleActionButtonPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onAction = useCallback(() => setIsLoading((prevValue) => !prevValue), []);

  return (
    <>
      <PBannerInline
        heading="Some banner-inline heading"
        description="Some banner-inline description."
        actionLabel="Retry"
        actionIcon="reset"
        actionLoading={isLoading}
        onAction={onAction}
      />
      <PButton onClick={onAction}>Reset</PButton>
    </>
  );
};
