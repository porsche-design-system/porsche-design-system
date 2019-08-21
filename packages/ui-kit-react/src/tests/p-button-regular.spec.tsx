import React from 'react';
import { PButtonRegular }  from '@porsche-ui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Button Regular component", () => {
  it('should render correctly in variant: default', () => {
    const component = renderer.create(
      <PButtonRegular>Button Regular</PButtonRegular>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

  it('should render correctly in variant: highlight', () => {
    const component = renderer.create(
      <PButtonRegular variant="highlight">Button Regular</PButtonRegular>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

});

