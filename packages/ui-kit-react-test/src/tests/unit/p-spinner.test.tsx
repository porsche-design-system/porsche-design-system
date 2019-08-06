import React from 'react';
import { PSpinner}  from '@porscheui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Spinner component", () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <PSpinner />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

  it('should render correctly in size large', () => {
    const component = renderer.create(
      <PSpinner size="large" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
});

