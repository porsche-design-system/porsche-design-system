import React from 'react';
import { PPopover, PRadioGroup, PRadioGroupOption } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PRadioGroup state="error" value="a">
        <span slot="label">
          Some slotted label with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
           text and a "label-after" slot.
        </span>
        <PPopover slot="label-after">
          Some Popover description
        </PPopover>
        <span slot="description">
          Some slotted description with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
          .
        </span>
        <span slot="message">
          Some slotted error message with a 
          <a href="https://designsystem.porsche.com" className="underline">
            link
          </a>
          .
        </span>
        <PRadioGroupOption value="a">
          <span slot="label">
            <img src="assets/911.png" alt="" className="object-contain inline-block align-middle -mt-2 me-static-sm w-[70px]" />
            Some slotted label with custom content and a "label-after" slot
          </span>
          <PPopover slot="label-after">
            Option A with slotted label and a popover 
          </PPopover>
        </PRadioGroupOption>
        <PRadioGroupOption value="b">
          <span slot="label">
            Option B with slotted label
          </span>
        </PRadioGroupOption>
        <PRadioGroupOption value="c" disabled="true">
          <span slot="label">
            Disabled Option C with slotted label, a nested 
            <a href="https://www.porsche.com" className="underline">
              link
            </a>
             and a label-after slot.
          </span>
          <PPopover slot="label-after">
            Some information about the disabled state.
          </PPopover>
        </PRadioGroupOption>
        <PRadioGroupOption value="d">
          <span slot="label">
            Option C with slotted label and a nested 
            <a href="https://www.porsche.com" className="underline">
              link
            </a>
          </span>
        </PRadioGroupOption>
      </PRadioGroup>
    </>
  )
}
