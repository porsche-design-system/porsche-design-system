import { useCallback, useState } from 'react';
import { PButton, PHeading, PTag, PText, PPopover } from '@porsche-design-system/components-react';

export const PopoverControlledAiTagExamplePage = (): JSX.Element => {
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
        <PTag color="background-frosted" icon="brain" slot="button">
          <button type="button" aria-expanded={isPopoverOpen} onClick={onOpen}>
            AI-generated
          </button>
        </PTag>
        <div className="xs:max-w-[220px] flex flex-col gap-fluid-sm py-[8px]">
          <PHeading size="medium" tag="h3">
            Content Credentials
          </PHeading>
          <PText color="contrast-medium" size="xx-small" className="-mt-fluid-sm">
            Created by Porsche AG, 5th April 2025
          </PText>
          <PText color="contrast-high" size="xx-small">
            This image combines multiple elements. At least one of them was generated using an AI tool.
          </PText>
          <dl className="prose-text-xs m-0">
            <dt className="m-0 text-contrast-medium">Created by</dt>
            <dd className="m-0 text-primary">Porsche AG</dd>
            <dt className="m-0 text-contrast-medium mt-fluid-sm">AI tools used</dt>
            <dd className="m-0 text-primary">Adobe Firefly</dd>
          </dl>
          <PButton type="button" variant="ghost" compact={true} aria={{ 'aria-label': 'Check content credentials' }}>
            Check
          </PButton>
        </div>
      </PPopover>
    </>
  );
};
