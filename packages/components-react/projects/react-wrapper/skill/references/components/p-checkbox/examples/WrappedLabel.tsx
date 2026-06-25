import React from 'react';
import { PCheckbox, PPopover } from '@porsche-design-system/components-react';

export const Example = () => {
  const onClick = () => {
    setChecked(true);
  }

  return (
    <>
      <div className="flex items-start w-64 border-2 border-contrast-lower rounded-md hover:border-primary transition-colors">
        <label className="inline-flex flex-col p-fluid-xs gap-static-xs prose-text-sm cursor-pointer hover:[--p-checkbox-border-color:var(--color-primary)]" onClick={onClick}>
          <span>
            Some wrapped custom label besides a popover
          </span>
          <PCheckbox checked={false}></PCheckbox>
        </label>
        <PPopover className="mr-static-xs mt-static-xs">
          Some additional content.
        </PPopover>
      </div>
    </>
  )
}
