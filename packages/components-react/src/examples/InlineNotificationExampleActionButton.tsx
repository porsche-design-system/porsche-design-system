import { useCallback, useState } from 'react';
import { PInlineNotification, PButton } from '@porsche-design-system/components-react';

export const InlineNotificationExampleActionButtonPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onAction = useCallback(() => setIsLoading((prevValue) => !prevValue), []);

  return (
    <>
      <PInlineNotification
        heading="Some inline-notification heading"
        description="Some inline-notification description."
        actionLabel="Retry"
        actionIcon="reset"
        actionLoading={isLoading}
        onAction={onAction}
      />
      <PButton onClick={onAction}>Reset</PButton>
    </>
  );
};
