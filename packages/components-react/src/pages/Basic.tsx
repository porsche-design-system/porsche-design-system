import {
  PGrid as Grid,
  PGridItem as GridItem,
  PHeadline as Headline,
  PMarque as Marque,
  PText as Text,
  PDivider as Divider
} from '@porsche-design-system/components-react';
import React from 'react';

export const BasicPage = (): JSX.Element => {
  return (
    <div>
      <Headline variant="headline-2" tag="h2">
        Basic
      </Headline>
      <Divider />
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-marque&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Marque />
            <Marque trademark={false} />
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-headline&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Headline variant="large-title">The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant="headline-1">The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant="headline-2">The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant="headline-3">The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant="headline-4">The quick brown fox jumps over the lazy dog</Headline>
            <Headline variant="headline-5">The quick brown fox jumps over the lazy dog</Headline>
          </div>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={5} offset={2}>
          <div className="playground light spacing-block">
            <Headline variant="headline-3" color="default" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Headline>
            <Headline variant="headline-3" color="inherit" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Headline>
          </div>
          <Divider />
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-block">
            <Headline theme="dark" variant="headline-3" color="default" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Headline>
            <Headline theme="dark" variant="headline-3" color="inherit" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Headline>
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-text&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Text>The quick brown fox jumps over the lazy dog</Text>
            <Text size="x-small">The quick brown fox jumps over the lazy dog</Text>
          </div>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem offset={2} size={5}>
          <div className="playground light spacing-block">
            <Text color="default" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text color="brand" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text color="neutral-contrast-high" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text color="neutral-contrast-medium" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text color="neutral-contrast-low" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text color="notification-success" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text color="notification-warning" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text color="notification-error" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text color="inherit" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
          </div>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-block">
            <Text theme="dark" color="default" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text theme="dark" color="brand" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text theme="dark" color="neutral-contrast-high" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text theme="dark" color="neutral-contrast-medium" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text theme="dark" color="neutral-contrast-low" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text theme="dark" color="notification-success" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text theme="dark" color="notification-warning" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text theme="dark" color="notification-error" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text theme="dark" color="inherit" style={{ color: 'deeppink' }}>
              The quick brown fox jumps over the lazy dog
            </Text>
          </div>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={10} offset={2}>
          <div className="playground light spacing-block">
            <Text ellipsis={true}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </Text>
          </div>
          <div className="playground light spacing-block">
            <Text>
              Lorem ipsum dolor sit amet <a href="https://designsystem.porsche.com">linked text</a> et, <b>bold text</b>
              ' ' &amp; <strong>strong text</strong>
            </Text>
          </div>
          <Divider />
        </GridItem>
      </Grid>
    </div>
  );
};
