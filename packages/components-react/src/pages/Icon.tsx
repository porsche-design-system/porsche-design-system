import {
  PGrid as Grid,
  PGridItem as GridItem,
  PHeadline as Headline,
  PIcon as Icon,
  PDivider as Divider
} from '@porsche-design-system/components-react';
import React from 'react';

export const IconPage = (): JSX.Element => {
  return (
    <div>
      <Headline variant="headline-2">Icon</Headline>
      <Divider />
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-icon&gt;
          </Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-inline">
            <Icon name="filter" color="neutral-contrast-high" aria-label="Filter icon" />
            <Icon name="filter" size="medium" color="neutral-contrast-medium" aria-label="Filter icon" />
            <Icon name="filter" size="large" color="neutral-contrast-low" aria-label="Filter icon" />
            <Icon name="filter" size="large" color="brand" aria-label="Filter icon" />
            <Icon name="filter" size="large" color="inherit" aria-label="Filter icon" style={{ color: 'deeppink' }} />
            <Icon name="delete" size="large" aria-label="Delete icon" />
          </div>
          <Divider />
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-inline">
            <Icon name="filter" theme="dark" color="neutral-contrast-high" aria-label="Filter icon" />
            <Icon name="filter" theme="dark" size="medium" color="neutral-contrast-medium" aria-label="Filter icon" />
            <Icon name="filter" theme="dark" size="large" color="neutral-contrast-low" aria-label="Filter icon" />
            <Icon name="filter" theme="dark" size="large" color="brand" aria-label="Filter icon" />
            <Icon
              name="filter"
              theme="dark"
              size="large"
              color="inherit"
              aria-label="Filter icon"
              style={{ color: 'deeppink' }}
            />
            <Icon name="delete" theme="dark" size="large" aria-label="Delete icon" />
          </div>
          <Divider />
        </GridItem>
      </Grid>
    </div>
  );
};
