import { useCallback, useState } from 'react';
import { PButtonPure, PPopover } from '@porsche-design-system/components-react';

export const PopoverControlledExamplePage = (): JSX.Element => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsPopoverOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  return (
    <>
      <PPopover open={isPopoverOpen} onDismiss={onDismiss}>
        <PButtonPure
          slot="button"
          hideLabel={true}
          aria={{ 'aria-expanded': isPopoverOpen }}
          onClick={onOpen}
          icon="information"
        >
          More information
        </PButtonPure>
        Some additional content with some <a href="#">link</a>.
      </PPopover>
    </>
  );
};
