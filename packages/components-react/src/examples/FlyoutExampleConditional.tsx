import { PButton, PFlyout, PHeading, PText } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

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

      <PFlyout open={isOpen} onDismiss={onDismiss}>
        {isOpen && (
          <>
            <PHeading slot="header" size="large" tag="h2">
              Some Heading
            </PHeading>
            <PText>Some Content</PText>
            <button type="button">Test</button>
          </>
        )}
      </PFlyout>
    </>
  );
};
