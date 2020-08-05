import {
  PGrid as Grid,
  PGridItem as GridItem,
  PHeadline as Headline,
  PTextList as TextList,
  PTextListItem as TextListItem,
  PDivider as Divider
} from '@porsche-design-system/components-react';
import React from 'react';

export const ContentPage = (): JSX.Element => {
  return (
    <div>
      <Headline variant="headline-2">Content</Headline>
      <Divider />
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-text-list&gt;
          </Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-block">
            <TextList>
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick <a href="https://designsystem.porsche.com">brown fox</a> jumps <b>over</b> the{' '}
                <strong>lazy</strong> dog
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
          <Divider />
          <div className="playground light spacing-block">
            <TextList listType="ordered">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick <a href="https://designsystem.porsche.com">brown fox</a> jumps <b>over</b> the{' '}
                <strong>lazy</strong> dog
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
          <Divider />
          <div className="playground light spacing-block">
            <TextList listType="ordered" orderType="alphabetically">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick <a href="https://designsystem.porsche.com">brown fox</a> jumps <b>over</b> the{' '}
                <strong>lazy</strong> dog
                <TextList listType="ordered" orderType="alphabetically">
                  <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
                  <TextListItem>
                    The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
                  </TextListItem>
                </TextList>
              </TextListItem>
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
            </TextList>
          </div>
          <Divider />
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-block">
            <TextList theme="dark">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick <a href="https://designsystem.porsche.com">brown fox</a> jumps <b>over</b> the{' '}
                <strong>lazy</strong> dog
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
          <Divider />
          <div className="playground dark spacing-block">
            <TextList listType="ordered" theme="dark">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick <a href="https://designsystem.porsche.com">brown fox</a> jumps <b>over</b> the{' '}
                <strong>lazy</strong> dog
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
          <Divider />
          <div className="playground dark spacing-block">
            <TextList listType="ordered" orderType="alphabetically" theme="dark">
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
              <TextListItem>
                The quick <a href="https://designsystem.porsche.com">brown fox</a> jumps <b>over</b> the{' '}
                <strong>lazy</strong> dog
                <TextList listType="ordered" orderType="alphabetically" theme="dark">
                  <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
                  <TextListItem>
                    The quick brown fox jumps over the lazy dog, the lazy dog jumps over the quick brown fox
                  </TextListItem>
                </TextList>
              </TextListItem>
              <TextListItem>The quick brown fox jumps over the lazy dog</TextListItem>
            </TextList>
          </div>
          <Divider />
        </GridItem>
      </Grid>
    </div>
  );
};
