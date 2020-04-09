import * as React from 'react';
import { render } from '@testing-library/react';
import { PSelectWrapper } from '../../../projects/components-wrapper/src';

describe('PSelectWrapper', () => {
  it('should render PSelectWrapper select name', () => {
    const {container} = render(
      <PSelectWrapper>
        <select>
          <option value={"Headline A"}>Headline A</option>
          <option value={"Headline B"}>Headline B</option>
        </select>
      </PSelectWrapper>
    );
    expect(container.getElementsByTagName('select')).toBeTruthy();
    expect(container.getElementsByTagName('option[value="Headline A"]')).toBeTruthy();
    expect(container.getElementsByTagName('option[value="Headline B"]')).toBeTruthy();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PSelectWrapper/>);
    expect(container.getElementsByTagName('p-select-wrapper')).toBeTruthy();
  });
});
