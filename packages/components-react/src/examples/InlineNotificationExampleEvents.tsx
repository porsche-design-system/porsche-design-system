import { PInlineNotification } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const InlineNotificationExampleEventsPage = (): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const onShow = useCallback(() => setIsActive(true), []);
  const onDismiss = useCallback(() => setIsActive(false), []);

  return (
    <>
      <button type="button" onClick={onShow}>
        Show Inline Notification
      </button>
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
