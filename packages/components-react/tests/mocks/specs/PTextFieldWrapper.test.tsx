import React from 'react';
import { render } from '@testing-library/react';
import { PTextFieldWrapper } from '../../../projects/components-wrapper/src/lib/components';

describe('PTextFieldWrapper', () => {
  it('should render PTextFieldWrapper text input', () => {
    const {container} = render(
      <PTextFieldWrapper>
        <input type={"text"} name={"Wrapped-TextField"}></input>
      </PTextFieldWrapper>
    );
    expect(container.getElementsByTagName('input').namedItem("Wrapped-TextField")).toBeTruthy();
  });
});
