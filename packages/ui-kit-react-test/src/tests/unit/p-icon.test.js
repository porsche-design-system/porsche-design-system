import React from 'react';
import { PIcon }  from '@porscheui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Icon component", () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <PIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

  it('should render correctly in size large', () => {
    const component = renderer.create(
      <PIcon size="large" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
});

