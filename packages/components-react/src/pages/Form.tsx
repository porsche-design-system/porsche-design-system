import {Grid, GridItem, Headline, RadioButtonWrapper} from '@porsche-design-system/components-react';
import React from 'react';

export function Form(){
  return(
    <div>
      <Headline variant={"headline-2"}>Form</Headline>
      <hr/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={"headline-4"} tag={"h4"}>&lt;p-radio-button&gt;</Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-inline">
            <RadioButtonWrapper label={"Some label"}><input type="radio" name="some-name-1"/></RadioButtonWrapper>
            <RadioButtonWrapper label={"Some label"}><input type="radio" name="some-name-1" checked={true}/></RadioButtonWrapper>
            <RadioButtonWrapper label={"Some label"} hideLabel={true}><input type="radio" name="some-name-1"/></RadioButtonWrapper>
            <RadioButtonWrapper label={"Some label"}><input type="radio" name="some-name-1" disabled={true}/></RadioButtonWrapper>
            <RadioButtonWrapper label={"Some label"} state={"error"}><input type="radio" name="some-name-1"/></RadioButtonWrapper>
            <RadioButtonWrapper label={"Some label"} state={"error"} message={"Some error validation message."}><input type="radio" name="some-name-1"/></RadioButtonWrapper>
            <RadioButtonWrapper state={"error"}><span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span><input type="radio" name="some-name-1"/><span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span></RadioButtonWrapper>
          </div>
          <hr/>
        </GridItem>
      </Grid>
    </div>
  );
}
