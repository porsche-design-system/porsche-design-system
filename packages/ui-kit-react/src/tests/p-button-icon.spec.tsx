import React from 'react';
import { PButtonIcon }  from '@porsche-ui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Button Icon component", () => {
  it('should render correctly in variant: default', () => {
    const component = renderer.create(
      <PButtonIcon />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly in variant: ghost', () => {
    const component = renderer.create(
      <PButtonIcon variant="ghost" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

});

