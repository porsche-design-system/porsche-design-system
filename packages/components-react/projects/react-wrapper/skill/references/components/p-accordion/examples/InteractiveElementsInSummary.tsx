import React from 'react';
import { useState } from 'react';
import { PAccordion, PCheckbox, PHeading, PPopover, PText, type AccordionUpdateEventDetail } from '@porsche-design-system/components-react';

export const Example = () => {
  const [open, setOpen] = useState(true);

  const onUpdate = (e: CustomEvent<AccordionUpdateEventDetail>) => {
    setOpen(e.detail.open);
  }

  return (
    <>
      <PAccordion open={open} background="surface" onUpdate={onUpdate}>
        <PHeading slot="summary" tag="h3" size="small" weight="semibold">
          Some summary
        </PHeading>
        <PCheckbox slot="summary-before" name="some-name" label="Some label" hideLabel={true}></PCheckbox>
        <PPopover slot="summary-after">
          Some content
        </PPopover>
        <PText>
          Some details. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        </PText>
      </PAccordion>
    </>
  )
}
