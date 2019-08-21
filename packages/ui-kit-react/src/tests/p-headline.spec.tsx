import React from 'react';
import { PHeadline }  from '@porsche-ui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Headline component", () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <PHeadline>Headline</PHeadline>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

  it('should render correctly in variant headline-2', () => {
    const component = renderer.create(
      <PHeadline variant="headline-2">Headline</PHeadline>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
});

