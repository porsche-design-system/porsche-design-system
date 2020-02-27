import { Grid, GridItem, Headline, SelectWrapper, CheckboxWrapper} from '@porsche-design-system/components-react';
import React from 'react';

export function Form() {
  return (
    <div>
      <Headline variant={'headline-2'}>Form</Headline>
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
      <Grid>
        <GridItem size={2}>
          <Headline variant={'headline-4'} tag={'h4'}>&lt;p-checkbox-wrapper&gt;</Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-inline">
            <CheckboxWrapper label={'Some label'}>
              <input type="checkbox" name="some-name"/>
            </CheckboxWrapper>
            <CheckboxWrapper label={'Some label'}>
              <input type="checkbox" name="some-name" checked={true}/>
            </CheckboxWrapper>
            <CheckboxWrapper label={'Some label'} hideLabel={true}>
              <input type="checkbox" name="some-name"/>
            </CheckboxWrapper>
            <CheckboxWrapper label={'Some label'} hideLabel={true}>
              <input type="checkbox" name="some-name" checked={true}/>
            </CheckboxWrapper>
            <CheckboxWrapper label={'Some label'}>
              <input type="checkbox"
                     ref={(elem: HTMLInputElement) => elem && (elem.indeterminate = true)}
                     name="some-name" />
            </CheckboxWrapper>
            <CheckboxWrapper label={'Some label'}>
              <input type="checkbox"
                     name="some-name"
                     ref={(elem: HTMLInputElement) => elem && (elem.indeterminate = true)}
                     checked={true} />
            </CheckboxWrapper>
            <CheckboxWrapper label={'Some label'}>
              <input type="checkbox" name="some-name" disabled={true}/>
            </CheckboxWrapper>
            <CheckboxWrapper label={'Some label'}>
              <input type="checkbox" name="some-name" checked={true} disabled={true}/>
            </CheckboxWrapper>
            <CheckboxWrapper label={'Some label'} state={'success'} message={'Some success validation message.'}>
              <input type="checkbox" name="some-name"/>
            </CheckboxWrapper>
            <CheckboxWrapper state="success">
              <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
              <input type="checkbox" name="some-name"/>
              <span slot="message">Some success message with a <a
                href="https://designsystem.porsche.com">link</a>.</span>
            </CheckboxWrapper>
            <CheckboxWrapper label={'Some label'} state={'error'} message={'Some error validation message.'}>
              <input type="checkbox" name="some-name"/>
            </CheckboxWrapper>
            <CheckboxWrapper state="error">
              <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
              <input type="checkbox" name="some-name"/>
              <span slot="message">Some error message with a <a
                href="https://designsystem.porsche.com">link</a>.</span>
            </CheckboxWrapper>
          </div>
          <hr/>
        </GridItem>
      </Grid>
    </div>
  );
}
