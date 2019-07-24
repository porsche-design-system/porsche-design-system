import React from 'react';
import { PTextLink }  from '@porscheui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Text Link component", () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <PTextLink>Text Link</PTextLink>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
});

