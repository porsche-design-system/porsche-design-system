import { Grid, GridItem, Headline, SelectWrapper, TextFieldWrapper } from '@porsche-design-system/components-react';
import React from 'react';

export function Form() {
  return (
    <div>
      <Headline variant={'headline-2'}>Form</Headline>
      <hr/>
      <Grid>
        <GridItem size={2}>
          <Headline variant={"headline-4"} tag={"h4"}>&lt;p-text-field-wrapper&gt;</Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <TextFieldWrapper label={"Some label"}><input type="text" name="some-name"/></TextFieldWrapper>
            <TextFieldWrapper label={"Some label"}><input type="text" name="some-name" placeholder="Some placeholder text"/></TextFieldWrapper>
            <TextFieldWrapper><input type="text" name="some-name"/></TextFieldWrapper>
            <TextFieldWrapper label={"Some label"} hideLabel={{ base: true, l: false }}><input type="text" name="some-name"/></TextFieldWrapper>
            <TextFieldWrapper label={"Some label"}><input type="text" name="some-name" disabled /></TextFieldWrapper>
            <TextFieldWrapper label={"Some label"}><input type="text" name="some-name" readOnly value="Some value"/></TextFieldWrapper>
            <TextFieldWrapper label={"Some label"}><input type="password" name="some-name" value="some-password"/></TextFieldWrapper>
            <TextFieldWrapper label={"Some label"} state={"error"} message={"Error message"}><input type="text" name="some-name"/></TextFieldWrapper>
            <TextFieldWrapper label={"Some label"} state={"success"} message={"Success message"}><input type="text" name="some-name"/></TextFieldWrapper>
            <TextFieldWrapper state={"error"}><span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span><input type="text" name="some-name" placeholder="Some placeholder"/><span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span></TextFieldWrapper>
          </div>
          <hr/>
        </GridItem>
      </Grid>
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
