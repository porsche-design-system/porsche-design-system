import {Grid, GridItem, Headline, Spinner} from '@porsche-design-system/components-react';
import React from 'react';

export function Feedback(){
  return(
    <div>
      <Headline variant={'headline-2'}>Feedback</Headline>
      <hr/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-spinner&gt;</Headline>
        </GridItem>
        <GridItem size={5}>
          <div className="playground light spacing-inline">
            <Spinner size={'small'}/>
            <Spinner size={'medium'}/>
            <Spinner size={'large'}/>
            <Spinner size={'inherit'} style={{width: '24px'}}/>
          </div>
          <hr/>
        </GridItem>
        <GridItem size={5}>
          <div className="playground dark spacing-inline">
            <Spinner theme={'dark'} size={'small'}/>
            <Spinner theme={'dark'} size={'medium'}/>
            <Spinner theme={'dark'} size={'large'}/>
            <Spinner theme={'dark'} size={'inherit'} style={{width: '24px'}}/>
          </div>
          <hr/>
        </GridItem>
      </Grid>
    </div>
  );
}
