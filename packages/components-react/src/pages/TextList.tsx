import { PTextList as TextList, PTextListItem as TextListItem } from '@porsche-design-system/components-react';
import React from 'react';

export const TextListPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show unordered text list on light background">
        <TextList>
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
          <TextListItem>
            The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
            <TextList>
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
        </TextList>
      </div>

      <div className="playground dark" title="should show unordered text list on dark background">
        <TextList theme="dark">
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
          <TextListItem>
            The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
            <TextList theme="dark">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
        </TextList>
      </div>

      <div className="playground light" title="should show ordered text list numbered on light background">
        <TextList listType="ordered">
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
          <TextListItem>
            The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
            <TextList listType="ordered">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
        </TextList>
      </div>

      <div className="playground dark" title="should show ordered text list numbered on dark background">
        <TextList listType="ordered" theme="dark">
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
          <TextListItem>
            The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
            <TextList listType="ordered" theme="dark">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
        </TextList>
      </div>

      <div className="playground light" title="should show ordered text list alphabetically on light background">
        <TextList listType="ordered" order-type="alphabetically">
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
          <TextListItem>
            The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
            <TextList listType="ordered" order-type="alphabetically">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
        </TextList>
      </div>

      <div className="playground dark" title="should show ordered text list alphabetically on dark background">
        <TextList listType="ordered" order-type="alphabetically" theme="dark">
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
          <TextListItem>
            The quick <a href="#">brown fox</a> jumps <b>over</b> the <strong>lazy</strong> dog
            <TextList listType="ordered" order-type="alphabetically" theme="dark">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
              </TextListItem>
            </TextList>
          </TextListItem>
          <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
        </TextList>
      </div>
    </>
  );
};
