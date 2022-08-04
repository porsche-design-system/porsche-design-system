import { useCallback, useState } from 'react';
import { PInlineNotification } from '@porsche-design-system/components-react';

export const InlineNotificationExampleActionButtonPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onAction = useCallback(() => setIsLoading((prevValue) => !prevValue), []);

  return (
    <>
      <PInlineNotification
        heading="Some heading"
        description="Some description."
        actionLabel="Retry"
        actionIcon="reset"
        actionLoading={isLoading}
        onAction={onAction}
      />
      <button type="button" onClick={onAction}>
        Reset `actionLoading`
      </button>
    </>
  );
};
