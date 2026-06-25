import React from 'react';
import { PFieldset, PInputText } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PFieldset label="Some legend label" state="error">
        <PInputText label="Some label" name="some-name"></PInputText>
        <span slot="message">
          Some error message
        </span>
      </PFieldset>
    </>
  )
}
