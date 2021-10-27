import { useCallback, useState } from 'react';
import { PInlineNotification, PButton } from '@porsche-design-system/components-react';

export const InlineNotificationExampleEventsPage = (): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const onShow = useCallback(() => setIsActive(true), []);
  const onDismiss = useCallback(() => setIsActive(false), []);

  return (
    <>
      <PButton onClick={onShow}>Show InlineNotification</PButton>
      {isActive && (
        <PInlineNotification
          heading="Some inline-notification heading"
          description="Some inline-notification description."
          onDismiss={onDismiss}
        />
      )}
    </>
  );
};
