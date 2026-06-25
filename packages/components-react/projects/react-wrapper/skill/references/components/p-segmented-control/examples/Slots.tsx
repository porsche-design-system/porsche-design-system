import React from 'react';
import { PPopover, PSegmentedControl, PSegmentedControlItem } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PSegmentedControl state="error">
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
        <PSegmentedControlItem value="1">
          Option 1
        </PSegmentedControlItem>
        <PSegmentedControlItem value="2">
          Option 2
        </PSegmentedControlItem>
        <PSegmentedControlItem value="3">
          Option 3
        </PSegmentedControlItem>
        <PSegmentedControlItem value="4">
          Option 4
        </PSegmentedControlItem>
        <PSegmentedControlItem value="5">
          Option 5
        </PSegmentedControlItem>
      </PSegmentedControl>
    </>
  )
}
