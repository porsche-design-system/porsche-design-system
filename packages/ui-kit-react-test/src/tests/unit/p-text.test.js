import React from 'react';
import { PText }  from '@porscheui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Text component", () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <PText>Text</PText>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

  it('should render correctly in variant small', () => {
    const component = renderer.create(
      <PText variant="small">Text</PText>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
});

