import React from 'react';
import { PButtonPure, PIcon, PInputTel, PPopover } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PInputTel state="error">
        <span slot="label">
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
        <span slot="description">
          Some description with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
          .
        </span>
        <PIcon slot="start" name="home" color="contrast-medium" aria-hidden={true}></PIcon>
        <PButtonPure slot="end" icon="delete" hideLabel={true} className="p-(--ref-p-input-slotted-padding) m-(--ref-p-input-slotted-margin)" aria={{'aria-label': 'Delete'}}></PButtonPure>
        <span slot="message">
          Some error message with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
          .
        </span>
      </PInputTel>
    </>
  )
}
