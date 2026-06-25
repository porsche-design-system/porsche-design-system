import React from 'react';
import { PAiTag, PCheckbox, PFieldset, PText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PFieldset label="Pick your favorite Fruits" labelSize="small" className="flex flex-col gap-static-sm">
        <PText className="-mt-static-md mb-static-sm">
          Slotted description with optional link
        </PText>
        <div className="flex flex-col gap-static-sm">
          <PCheckbox>
            <span slot="label">
              Banana
              <PAiTag variant="generated" className="ms-static-sm"></PAiTag>
            </span>
          </PCheckbox>
          <PCheckbox label="Apple"></PCheckbox>
          <PCheckbox checked={true}>
            <span slot="label">
              Melon
              <PAiTag variant="abbreviation" className="ms-static-sm"></PAiTag>
            </span>
          </PCheckbox>
          <PCheckbox label="Grapefruit"></PCheckbox>
        </div>
      </PFieldset>
    </>
  )
}
