import {
  PGrid as Grid,
  PGridItem as GridItem,
  PHeadline as Headline,
  PSpinner as Spinner,
  PDivider as Divider
} from '@porsche-design-system/components-react';
import React from 'react';

export const FeedbackPage = (): JSX.Element => {
  return (
    <div>
      <Headline variant="headline-2">Feedback</Headline>
      <Divider />
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-spinner&gt;
          </Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-inline">
            <Spinner size="small" />
            <Spinner size="medium" />
            <Spinner size="large" />
            <Spinner size="inherit" style={{ width: '24px' }} />
          </div>
          <Divider />
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-inline">
            <Spinner theme="dark" size="small" />
            <Spinner theme="dark" size="medium" />
            <Spinner theme="dark" size="large" />
            <Spinner theme="dark" size="inherit" style={{ width: '24px' }} />
          </div>
          <Divider />
        </GridItem>
      </Grid>
    </div>
  );
};
