import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PSelectWrapper, PText } from '../../../projects/components-wrapper/src/lib/components';

describe('PSelectWrapper', () => {
  it('should render PSelectWrapper select name', () => {
    const {container} = render(
      <PSelectWrapper>
        <select name={"Wrapped-Select"}>
          <option value={"Headline A"}>Headline A</option>
          <option value={"Headline B"}>Headline B</option>
        </select>
      </PSelectWrapper>
    );
    expect(container.getElementsByTagName('select').namedItem("Wrapped-Select")).toBeTruthy();

  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PSelectWrapper/>);
    expect(container.getElementsByTagName('p-select-wrapper')).toBeTruthy();
  });
});
