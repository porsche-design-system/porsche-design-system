import React from 'react';
import { PButtonPure, PIcon, PInputMonth, PPopover } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PInputMonth state="error">
        <span slot="label" id="some-label-id">
          Some label with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
           and a "label-after" slot.
        </span>
        <PPopover slot="label-after">
          Some Popover content with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
          .
        </PPopover>
        <span slot="description" id="some-description-id">
          Some description with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
          .
        </span>
        <PIcon slot="start" name="shopping-cart" color="contrast-medium" aria-hidden={true}></PIcon>
        <PButtonPure slot="end" icon="delete" hideLabel={true} className="p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)" aria={{'aria-label': 'Delete'}}></PButtonPure>
        <span slot="message" id="some-message-id">
          Some error message with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
          .
        </span>
      </PInputMonth>
    </>
  )
}
