/* Auto Generated File */
import type { NextPage } from 'next';
import { PTextList, PTextListItem } from '@porsche-design-system/components-react/ssr';

const TextListPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show unordered text list on light background">
        <PTextList>
          <PTextListItem>Unordered root list item</PTextListItem>
          <PTextListItem>
            Unordered root list item
            <PTextList>
              <PTextListItem>Unordered nested list item</PTextListItem>
              <PTextListItem>Unordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Unordered root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground dark" title="should show unordered text list on dark background">
        <PTextList theme="dark">
          <PTextListItem>Unordered root list item</PTextListItem>
          <PTextListItem>
            Unordered root list item
            <PTextList theme="dark">
              <PTextListItem>Unordered nested list item</PTextListItem>
              <PTextListItem>Unordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Unordered root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground light" title="should show ordered text list Numbered, on light background">
        <PTextList listType="ordered">
          <PTextListItem>
            Numbered, ordered root list item
            <PTextList listType="unordered">
              <PTextListItem>Unordered nested list item</PTextListItem>
              <PTextListItem>Unordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>
            Numbered, ordered root list item
            <PTextList listType="ordered">
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground dark" title="should show ordered text list Numbered, on dark background">
        <PTextList listType="ordered" theme="dark">
          <PTextListItem>
            Numbered, ordered root list item
            <PTextList listType="unordered" theme="dark">
              <PTextListItem>Unordered nested list item</PTextListItem>
              <PTextListItem>Unordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>
            Numbered, ordered root list item
            <PTextList listType="ordered" theme="dark">
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground light" title="should show ordered text list alphabetically on light background">
        <PTextList listType="ordered" orderType="alphabetically">
          <PTextListItem>
            Alphabetically, ordered root list item
            <PTextList listType="unordered">
              <PTextListItem>Unordered nested list item</PTextListItem>
              <PTextListItem>Unordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>
            Alphabetically, ordered root list item
            <PTextList listType="ordered" orderType="alphabetically">
              <PTextListItem>Alphabetically, ordered nested list item</PTextListItem>
              <PTextListItem>Alphabetically, ordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Alphabetically, ordered root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground dark" title="should show ordered text list alphabetically on dark background">
        <PTextList listType="ordered" orderType="alphabetically" theme="dark">
          <PTextListItem>
            Alphabetically, ordered root list item
            <PTextList listType="unordered" theme="dark">
              <PTextListItem>Unordered nested list item</PTextListItem>
              <PTextListItem>Unordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>
            Alphabetically, ordered root list item
            <PTextList listType="ordered" orderType="alphabetically" theme="dark">
              <PTextListItem>Alphabetically, ordered nested list item</PTextListItem>
              <PTextListItem>Alphabetically, ordered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Alphabetically, ordered root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground light" title="should handle edge cases">
        <PTextList listType="ordered">
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
          <PTextListItem>
            Numbered, ordered root list item
            <PTextList listType="ordered">
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>Numbered, ordered nested list item</PTextListItem>
              <PTextListItem>
                Numbered, ordered nested list item
                <PTextList listType="ordered">
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                  <PTextListItem>Numbered, ordered nested list item</PTextListItem>
                </PTextList>
              </PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Numbered, ordered root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground light" title="should apply custom styles for dedicated slotted content">
        <PTextList>
          <PTextListItem>
            <span>
              Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text
            </span>
          </PTextListItem>
        </PTextList>
      </div>
    </>
  );
};

export default TextListPage;
