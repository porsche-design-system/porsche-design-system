import React from 'react';
import { PAiTag, PHeading, PRadioGroup, PRadioGroupOption } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PHeading size="small" tag="h3">
        Pick your favorite Fruits
      </PHeading>

      <PRadioGroup label="Some Label" name="fruit" value="banana" className="mt-static-sm">
        <PRadioGroupOption value="banana">
          <span slot="label">
            Banana
            <PAiTag variant="generated" className="ms-static-sm"></PAiTag>
          </span>
        </PRadioGroupOption>
        <PRadioGroupOption value="apple" label="Apple"></PRadioGroupOption>
        <PRadioGroupOption value="melon">
          <span slot="label">
            Melon
            <PAiTag variant="abbreviation" className="ms-static-sm"></PAiTag>
          </span>
        </PRadioGroupOption>
        <PRadioGroupOption value="grapefruit" label="Grapefruit"></PRadioGroupOption>
      </PRadioGroup>
    </>
  )
}
