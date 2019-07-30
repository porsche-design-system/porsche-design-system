import React from 'react';
import { PTextList, PTextListItem }  from '@porscheui/ui-kit-react';
import renderer from 'react-test-renderer';


describe("Text List component", () => {
  it('should render correctly as unordered list', () => {
    const component = renderer.create(
      <PTextList>
        <PTextListItem>1st Textlist item</PTextListItem>
        <PTextListItem>2nd Textlist item</PTextListItem>
        <PTextListItem>3rd Textlist item</PTextListItem>
      </PTextList>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

  it('should render correctly as ordered list', () => {
    const component = renderer.create(
      <PTextList listType="ordered">
        <PTextListItem>1st Textlist item</PTextListItem>
        <PTextListItem>2nd Textlist item</PTextListItem>
        <PTextListItem>3rd Textlist item</PTextListItem>
      </PTextList>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
});

