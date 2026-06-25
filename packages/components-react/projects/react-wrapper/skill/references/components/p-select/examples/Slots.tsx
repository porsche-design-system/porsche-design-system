import React from 'react';
import { PPopover, PSelect, PSelectOption } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PSelect name="options" state="error">
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
        <span slot="message" id="some-message-id">
          Some error message with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
          .
        </span>
        <PSelectOption value="a">
          Option A
        </PSelectOption>
        <PSelectOption value="b">
          Option B
        </PSelectOption>
        <PSelectOption value="c">
          Option C
        </PSelectOption>
      </PSelect>
    </>
  )
}
