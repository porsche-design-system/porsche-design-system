import React from 'react';
import { PPagination}  from '@porsche-ui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Pagination component", () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <PPagination />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
});

