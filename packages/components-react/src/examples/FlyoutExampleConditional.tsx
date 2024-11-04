import { useCallback, useState } from 'react';
import { PButton, PFlyout, PHeading, PText } from '@porsche-design-system/components-react';

export const FlyoutExampleConditionalPage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onDismiss = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Modal
      </PButton>

      <PFlyout open={isOpen} onDismiss={onDismiss} style={{ '--p-flyout-width': '33vw' } as any}>
        {isOpen && (
          <>
            <PHeading slot="header" size="large" tag="h2">
              Some Heading
            </PHeading>
            <PText>Some Content</PText>
            <button type="button" autoFocus={true}>
              Test
            </button>
          </>
        )}
      </PFlyout>
    </>
  );
};
