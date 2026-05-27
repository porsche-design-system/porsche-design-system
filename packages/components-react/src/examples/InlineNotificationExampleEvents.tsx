import { PButton, PInlineNotification } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const InlineNotificationExampleEventsPage = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const onShow = useCallback(() => setIsActive(true), []);
  const onDismiss = useCallback(() => setIsActive(false), []);

  return (
    <>
      <PButton type="button" compact={true} onClick={onShow}>
        Show Inline Notification
      </PButton>
      {isActive && (
        <PInlineNotification
          heading="Some heading"
          headingTag="h4"
          description="Some description."
          onDismiss={onDismiss}
        />
      )}
    </>
  );
};
