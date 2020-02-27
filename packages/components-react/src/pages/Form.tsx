import {Grid, GridItem, Headline, RadioButtonWrapper, SelectWrapper} from '@porsche-design-system/components-react';
import React from 'react';

export function Form() {
  return (
    <div>
      <Headline variant={'headline-2'}>Form</Headline>
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
      <hr/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-select-wrapper&gt;</Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <SelectWrapper label={'Some label'}>
              <select name="some-name">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </SelectWrapper>
            <SelectWrapper label={'Some label'}>
              <select name="some-name" disabled={true}>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </SelectWrapper>
            <SelectWrapper label={'Some label'} state={'error'} message={'Some error message.'}>
              <select name="some-name">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </SelectWrapper>
            <SelectWrapper state={'success'}>
              <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
              <select name="some-name">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
              <span slot="message">Some success message with a <a
                href="https://designsystem.porsche.com">link</a>.</span>
            </SelectWrapper>
          </div>
          <hr/>
        </GridItem>
      </Grid>
    </div>
  );
}
