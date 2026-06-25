import React from 'react';
import { useState } from 'react';
import { PAccordion, PHeading, PText, type AccordionUpdateEventDetail } from '@porsche-design-system/components-react';

export const Example = () => {
  const [open, setOpen] = useState(false);

  const onUpdate = (e: CustomEvent<AccordionUpdateEventDetail>) => {
    setOpen(e.detail.open);
  }

  return (
    <>
      <PAccordion open={open} onUpdate={onUpdate}>
        <PHeading slot="summary" tag="h2" size="small" weight="semibold">
          Some summary
        </PHeading>
        <PText>
          Some details. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore agna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PText>
      </PAccordion>
    </>
  )
}
