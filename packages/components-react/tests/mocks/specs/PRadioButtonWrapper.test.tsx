import * as React from 'react';
import { render } from '@testing-library/react';
import { PRadioButtonWrapper } from '../../../projects/components-wrapper/src';

describe('PRadioButtonWrapper', () => {
  it('should render PRadioButtonWrapper input name', () => {
    const {container} = render(
      <PRadioButtonWrapper>
        <input type={"radio"} name={"Wrapped-RadioButton"}/>
      </PRadioButtonWrapper>
    );
    expect(container.getElementsByTagName('input').namedItem("Wrapped-RadioButton")).toBeTruthy();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PRadioButtonWrapper/>);
    expect(container.getElementsByTagName('p-radiobutton-wrapper')).toBeTruthy();
  });
});
