import React from 'react';
import { PFieldset, PInputText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PFieldset>
        <span slot="label">
          Some legend label
        </span>
        <PInputText label="Some label" name="some-name"></PInputText>
      </PFieldset>
    </>
  )
}
