import React from 'react';
import { useState } from 'react';
import { PButton, PButtonPure, PDisplay, PFlyout, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  }
  const onDismiss = () => {
    setOpen(false);
  }

  return (
    <>
      <PButton type="button" aria={{'aria-haspopup': 'dialog'}} onClick={onClick}>
        Open Flyout
      </PButton>

      <PFlyout open={open} aria={{'aria-label': 'Some Heading'}} footerBehavior="fixed" className="[--p-flyout-width:90vw]" onDismiss={onDismiss}>
        <div className="-mt-(--ref-p-flyout-pt) -mx-(--ref-p-flyout-px) h-[300px]">
          <img className="w-full h-full object-cover" src="assets/lights.jpg" alt="Some image description" />
        </div>
        <PDisplay className="mt-fluid-md" size="small" tag="h2">
          Some heading
        </PDisplay>
        <PText className="mt-fluid-sm">
          Some paragraph.
        </PText>
        <div slot="footer" className="grid grid-cols-[auto_1fr_auto] gap-static-sm justify-items-center">
          <PButtonPure icon="arrow-left" type="button" hideLabel={true}>
            Prev
          </PButtonPure>
          <PText>
            1/4
          </PText>
          <PButtonPure icon="arrow-right" type="button" hideLabel={true}>
            Next
          </PButtonPure>
        </div>
      </PFlyout>
    </>
  )
}
