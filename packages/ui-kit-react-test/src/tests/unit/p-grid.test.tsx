import React from 'react';
import { PGrid, PGridChild }  from '@porscheui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Grid component", () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <PGrid>
        <PGridChild>Lorem ipsum</PGridChild>
      </PGrid>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

  it('should render correctly in size equals 6', () => {
    const component = renderer.create(
      <PGrid>
        <PGridChild size="6">Lorem ipsum</PGridChild>
      </PGrid>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
});

