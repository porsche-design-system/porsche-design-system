import { PButton, PInlineNotification } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const InlineNotificationExampleActionButtonPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onAction = useCallback(() => setIsLoading((prevValue) => !prevValue), []);

  return (
    <>
      <PInlineNotification
        heading="Some heading"
        headingTag="h3"
        description="Some description."
        actionLabel="Retry"
        actionIcon="reset"
        actionLoading={isLoading}
        onAction={onAction}
      />
      <PButton type="button" compact={true} onClick={onAction}>
        Reset `actionLoading`
      </PButton>
    </>
  );
};
