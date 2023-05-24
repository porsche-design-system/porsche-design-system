/* Auto Generated File */
import type { NextPage } from 'next';
import { PTextList, PTextListItem } from '@porsche-design-system/components-react/ssr';

const TextListPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show text list type=unordered on light background">
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

      <div className="playground dark" title="should show text list type=unordered on dark background">
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

      <div className="playground light" title="should show text list type=numbered on light background">
        <PTextList type="numbered">
          <PTextListItem>Numbered root list item</PTextListItem>
          <PTextListItem>
            Numbered root list item
            <PTextList type="numbered">
              <PTextListItem>Numbered nested list item</PTextListItem>
              <PTextListItem>Numbered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Numbered root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground dark" title="should show text list type=numbered on dark background">
        <PTextList type="numbered" theme="dark">
          <PTextListItem>Numbered root list item</PTextListItem>
          <PTextListItem>
            Numbered root list item
            <PTextList type="numbered" theme="dark">
              <PTextListItem>Numbered nested list item</PTextListItem>
              <PTextListItem>Numbered nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Numbered root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground light" title="should show text list type=alphabetically on light background">
        <PTextList type="alphabetically">
          <PTextListItem>Alphabetically root list item</PTextListItem>
          <PTextListItem>
            Alphabetically root list item
            <PTextList type="alphabetically">
              <PTextListItem>Alphabetically nested list item</PTextListItem>
              <PTextListItem>Alphabetically nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Alphabetically root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground dark" title="should show text list type=alphabetically on dark background">
        <PTextList type="alphabetically" theme="dark">
          <PTextListItem>Alphabetically root list item</PTextListItem>
          <PTextListItem>
            Alphabetically root list item
            <PTextList type="alphabetically" theme="dark">
              <PTextListItem>Alphabetically nested list item</PTextListItem>
              <PTextListItem>Alphabetically nested list item</PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>Alphabetically root list item</PTextListItem>
        </PTextList>
      </div>

      <div className="playground light" title="should show ordered text list numbered on light background">
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

      <div className="playground dark" title="should show ordered text list numbered on dark background">
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

      <div className="playground light" title="should show multiline text list">
        <PTextList listType="ordered" style={{ width: '15rem' }}>
          <PTextListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Cursus mattis molestie a iaculis.
            <PTextList listType="ordered">
              <PTextListItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Cursus mattis molestie a iaculis.
              </PTextListItem>
              <PTextListItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Cursus mattis molestie a iaculis.
              </PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Cursus mattis molestie a iaculis.
            <PTextList>
              <PTextListItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Cursus mattis molestie a iaculis.
              </PTextListItem>
              <PTextListItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Cursus mattis molestie a iaculis.
              </PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Cursus mattis molestie a iaculis.
            <PTextList listType="ordered" orderType="alphabetically">
              <PTextListItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Cursus mattis molestie a iaculis.
              </PTextListItem>
              <PTextListItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Cursus mattis molestie a iaculis.
              </PTextListItem>
            </PTextList>
          </PTextListItem>
        </PTextList>
      </div>

      <div className="playground light" title="should apply custom styles for dedicated slotted content">
        <PTextList>
          <PTextListItem>
            <span>
              Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </PTextListItem>
        </PTextList>
      </div>

      <div className="playground dark" title="should apply custom styles for dedicated slotted content">
        <PTextList theme="dark">
          <PTextListItem>
            <span>
              Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </PTextListItem>
        </PTextList>
      </div>
    </>
  );
};

export default TextListPage;
