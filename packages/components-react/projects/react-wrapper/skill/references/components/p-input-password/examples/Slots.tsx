import React from 'react';
import { PInputPassword, PPopover } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PInputPassword state="error">
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
        <span slot="message">
          Some error message with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
          .
        </span>
      </PInputPassword>
    </>
  )
}
