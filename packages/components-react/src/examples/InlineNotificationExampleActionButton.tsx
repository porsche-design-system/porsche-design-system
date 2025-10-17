import { PInlineNotification } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const InlineNotificationExampleActionButtonPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onAction = useCallback(() => setIsLoading((prevValue) => !prevValue), []);

  return (
    <>
      <PInlineNotification
        heading="Some heading"
        headingTag="h4"
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
