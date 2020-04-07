import React from 'react';
import { render } from '@testing-library/react';
import { PButtonPure, PCheckboxWrapper } from '../../../projects/components-wrapper/src/lib/components';

describe('PCheckboxWrapper', () => {
  it('should render PCheckboxWrapper input name', () => {
    const {container} = render(
      <PCheckboxWrapper>
        <input type={"checkbox"} name={"Wrapped-Checkbox"}/>
      </PCheckboxWrapper>
    );
    expect(container.getElementsByTagName('input').namedItem("Wrapped-Checkbox")).toBeTruthy();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PCheckboxWrapper/>);
    expect(container.getElementsByTagName('p-checkbox-wrapper')).toBeTruthy();
  });
});
