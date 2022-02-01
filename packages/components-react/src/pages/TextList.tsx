/* Auto Generated File */
// @ts-nocheck
import { PTextList, PTextListItem } from '@porsche-design-system/components-react';

export const TextListPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show unordered text list on light background">
        <PTextList>
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
          <PTextListItem>
            The quick brown fox jumps over the lazy dog
            <PTextList>
              <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
              <PTextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
        </PTextList>
      </div>

      <div className="playground dark" title="should show unordered text list on dark background">
        <PTextList theme="dark">
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
          <PTextListItem>
            The quick brown fox jumps over the lazy dog
            <PTextList theme="dark">
              <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
              <PTextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
        </PTextList>
      </div>

      <div className="playground light" title="should show ordered text list numbered on light background">
        <PTextList listType="ordered">
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
          <PTextListItem>
            The quick brown fox jumps over the lazy dog
            <PTextList listType="ordered">
              <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
              <PTextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
        </PTextList>
      </div>

      <div className="playground dark" title="should show ordered text list numbered on dark background">
        <PTextList listType="ordered" theme="dark">
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
          <PTextListItem>
            The quick brown fox jumps over the lazy dog
            <PTextList listType="ordered" theme="dark">
              <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
              <PTextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
        </PTextList>
      </div>

      <div className="playground light" title="should show ordered text list alphabetically on light background">
        <PTextList listType="ordered" orderType="alphabetically">
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
          <PTextListItem>
            The quick brown fox jumps over the lazy dog
            <PTextList listType="ordered" orderType="alphabetically">
              <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
              <PTextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
        </PTextList>
      </div>

      <div className="playground dark" title="should show ordered text list alphabetically on dark background">
        <PTextList listType="ordered" orderType="alphabetically" theme="dark">
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
          <PTextListItem>
            The quick brown fox jumps over the lazy dog
            <PTextList listType="ordered" orderType="alphabetically" theme="dark">
              <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
              <PTextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </PTextListItem>
            </PTextList>
          </PTextListItem>
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
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
