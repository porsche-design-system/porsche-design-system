import React from 'react';
import { PFlex, PFlexItem }  from '@porsche-ui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Flex component", () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <PFlex>
        <PFlexItem>Lorem ipsum</PFlexItem>
      </PFlex>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with gap of 16', () => {
    const component = renderer.create(
      <PFlex gap={16}>
        <PFlexItem>Lorem ipsum</PFlexItem>
      </PFlex>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with responsive direction={{ base: "column", l: "row" }}', () => {
    const component = renderer.create(
      <PFlex direction={{ base: "column", l: "row" }}>
        <PFlexItem>Lorem ipsum</PFlexItem>
      </PFlex>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

