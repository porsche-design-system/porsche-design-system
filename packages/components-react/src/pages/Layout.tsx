import {
  PDivider as Divider,
  PFlex as Flex,
  PFlexItem as FlexItem,
  PGrid as Grid,
  PGridItem as GridItem,
  PHeadline as Headline,
  PContentWrapper as ContentWrapper
} from '@porsche-design-system/components-react';
import React from 'react';

export const LayoutPage = (): JSX.Element => {
  return (
    <div>
      <Headline variant="headline-2">Layout</Headline>
      <Divider />
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-grid&gt;
            <br />
            &lt;p-grid-item&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Grid>
              <GridItem size={12} />
            </Grid>
            <Grid>
              <GridItem size={1} />
              <GridItem size={11} />
            </Grid>
            <Grid>
              <GridItem size={2} />
              <GridItem size={10} />
            </Grid>
            <Grid>
              <GridItem size={3} />
              <GridItem size={9} />
            </Grid>
            <Grid>
              <GridItem size={4} />
              <GridItem size={8} />
            </Grid>
            <Grid>
              <GridItem size={5} />
              <GridItem size={7} />
            </Grid>
            <Grid>
              <GridItem size={6} />
              <GridItem size={6} />
            </Grid>
            <Grid>
              <GridItem size={7} />
              <GridItem size={5} />
            </Grid>
            <Grid>
              <GridItem size={8} />
              <GridItem size={4} />
            </Grid>
            <Grid>
              <GridItem size={9} />
              <GridItem size={3} />
            </Grid>
            <Grid>
              <GridItem size={10} />
              <GridItem size={2} />
            </Grid>
            <Grid>
              <GridItem size={11} />
              <GridItem size={1} />
            </Grid>
          </div>
          <div className="playground light spacing-block">
            <Grid>
              <GridItem offset={1} size={11} />
            </Grid>
            <Grid>
              <GridItem offset={2} size={10} />
            </Grid>
            <Grid>
              <GridItem offset={3} size={9} />
            </Grid>
            <Grid>
              <GridItem offset={4} size={8} />
            </Grid>
            <Grid>
              <GridItem offset={5} size={7} />
            </Grid>
            <Grid>
              <GridItem offset={6} size={6} />
            </Grid>
            <Grid>
              <GridItem offset={7} size={5} />
            </Grid>
            <Grid>
              <GridItem offset={8} size={4} />
            </Grid>
            <Grid>
              <GridItem offset={9} size={3} />
            </Grid>
            <Grid>
              <GridItem offset={10} size={2} />
            </Grid>
            <Grid>
              <GridItem offset={11} size={1} />
            </Grid>
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-flex&gt;
            <br />
            &lt;p-flex-item&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Flex>
              <FlexItem width="full" />
            </Flex>
            <Flex>
              <FlexItem offset="one-quarter" width="three-quarters" />
            </Flex>
            <Flex>
              <FlexItem offset="one-third" width="two-thirds" />
            </Flex>
            <Flex>
              <FlexItem offset="half" width="half" />
            </Flex>
            <Flex>
              <FlexItem offset="two-thirds" width="one-third" />
            </Flex>
            <Flex>
              <FlexItem offset="three-quarters" width="one-quarter" />
            </Flex>
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-divider&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <Divider />
            <br />
            <br />
            <Divider color="neutral-contrast-medium" />
            <br />
            <br />
            <Divider color="neutral-contrast-high" />
            <br />
            <br />
            <Divider orientation="vertical" style={{ height: '100px' }} />
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-content-wrapper&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <ContentWrapper>
              <div className="example-content">Some content</div>
            </ContentWrapper>
          </div>
          <Divider />
        </GridItem>
      </Grid>
    </div>
  );
};
