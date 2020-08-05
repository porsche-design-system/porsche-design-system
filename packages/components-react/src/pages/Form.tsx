import {
  PGrid as Grid,
  PGridItem as GridItem,
  PFieldsetWrapper as FieldsetWrapper,
  PHeadline as Headline,
  PCheckboxWrapper as CheckboxWrapper,
  PSelectWrapper as SelectWrapper,
  PRadioButtonWrapper as RadioButtonWrapper,
  PTextFieldWrapper as TextFieldWrapper,
  PTextareaWrapper as TextareaWrapper,
  PDivider as Divider
} from '@porsche-design-system/components-react';
import React from 'react';

export const FormPage = (): JSX.Element => {
  return (
    <div>
      <Headline variant="headline-2">Form</Headline>
      <Divider />
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-text-field-wrapper&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <TextFieldWrapper label="Some label">
              <input type="text" name="some-name" />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label">
              <input type="text" name="some-name" placeholder="Some placeholder text" />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label" description="Some description">
              <input type="text" name="some-name" />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label" hideLabel={true}>
              <input type="text" name="some-name" />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label" hideLabel={{ base: true, l: false }}>
              <input type="text" name="some-name" />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label">
              <input type="text" name="some-name" disabled />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label">
              <input type="text" name="some-name" readOnly value="Some value" />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label">
              <input type="password" name="some-name" value="some-password" />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label">
              <input type="search" name="some-name" />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label" state="error" message="Error message">
              <input type="text" name="some-name" />
            </TextFieldWrapper>
            <TextFieldWrapper label="Some label" state="success" message="Success message">
              <input type="text" name="some-name" />
            </TextFieldWrapper>
            <TextFieldWrapper state="error">
              <span slot="label">
                Some label with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <span slot="description">
                Some description with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <input type="text" name="some-name" placeholder="Some placeholder" />
              <span slot="message">
                Some error message with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
            </TextFieldWrapper>
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-select-wrapper&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <SelectWrapper label="Some label">
              <select name="some-name">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </SelectWrapper>
            <SelectWrapper label="Some label" description="Some description">
              <select name="some-name">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </SelectWrapper>
            <SelectWrapper label="Some label">
              <select name="some-name" disabled={true}>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </SelectWrapper>
            <SelectWrapper label="Some label" state="error" message="Some error message.">
              <select name="some-name">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </SelectWrapper>
            <SelectWrapper state="success">
              <span slot="label">
                Some label with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <span slot="description">
                Some description with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <select name="some-name">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
              <span slot="message">
                Some success message with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
            </SelectWrapper>
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-checkbox-wrapper&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-inline">
            <CheckboxWrapper label="Some label">
              <input type="checkbox" name="some-name" />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label">
              <input type="checkbox" name="some-name" checked={true} />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label" hideLabel={true}>
              <input type="checkbox" name="some-name" />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label" hideLabel={true}>
              <input type="checkbox" name="some-name" checked={true} />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label">
              <input
                type="checkbox"
                ref={(elem: HTMLInputElement) => elem && (elem.indeterminate = true)}
                name="some-name"
              />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label">
              <input
                type="checkbox"
                name="some-name"
                ref={(elem: HTMLInputElement) => elem && (elem.indeterminate = true)}
                checked={true}
              />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label">
              <input type="checkbox" name="some-name" disabled={true} />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label">
              <input type="checkbox" name="some-name" checked={true} disabled={true} />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label" state="success">
              <input type="checkbox" name="some-name" />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label" state="success" message="Some success validation message.">
              <input type="checkbox" name="some-name" />
            </CheckboxWrapper>
            <CheckboxWrapper state="success">
              <span slot="label">
                Some label with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <input type="checkbox" name="some-name" />
              <span slot="message">
                Some success message with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label" state="error">
              <input type="checkbox" name="some-name" />
            </CheckboxWrapper>
            <CheckboxWrapper label="Some label" state="error" message="Some error validation message.">
              <input type="checkbox" name="some-name" />
            </CheckboxWrapper>
            <CheckboxWrapper state="error">
              <span slot="label">
                Some label with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <input type="checkbox" name="some-name" />
              <span slot="message">
                Some error message with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
            </CheckboxWrapper>
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-textarea-wrapper&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-block">
            <TextareaWrapper label="Some label">
              <textarea name="some-name"></textarea>
            </TextareaWrapper>
            <TextareaWrapper label="Some label">
              <textarea name="some-name" placeholder="Some placeholder text"></textarea>
            </TextareaWrapper>
            <TextareaWrapper label="Some label" description="Some description">
              <textarea name="some-name"></textarea>
            </TextareaWrapper>
            <TextareaWrapper label="Some label" hideLabel={true}>
              <textarea name="some-name"></textarea>
            </TextareaWrapper>
            <TextareaWrapper label="Some label" hideLabel={{ base: true, l: false }}>
              <textarea name="some-name"></textarea>
            </TextareaWrapper>
            <TextareaWrapper label="Some label">
              <textarea name="some-name" disabled={true}></textarea>
            </TextareaWrapper>
            <TextareaWrapper label="Some label">
              <textarea name="some-name" readOnly={true}>
                Some value
              </textarea>
            </TextareaWrapper>
            <TextareaWrapper label="Some label" state="error" message="error message">
              <textarea name="some-name"></textarea>
            </TextareaWrapper>
            <TextareaWrapper label="Some label" state="success" message="success message">
              <textarea name="some-name"></textarea>
            </TextareaWrapper>
            <TextareaWrapper state="error">
              <span slot="label">
                Some label with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <span slot="description">
                Some description with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <textarea name="some-name">Some value</textarea>
              <span slot="message">
                Some error message with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
            </TextareaWrapper>
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size={2}>
          <Headline variant="headline-4" tag="h4">
            &lt;p-radio-button&gt;
          </Headline>
        </GridItem>
        <GridItem size={10}>
          <div className="playground light spacing-inline">
            <RadioButtonWrapper label="Some label">
              <input type="radio" name="some-name-1" />
            </RadioButtonWrapper>
            <RadioButtonWrapper label="Some label">
              <input type="radio" name="some-name-1" checked={true} />
            </RadioButtonWrapper>
            <RadioButtonWrapper label="Some label" hideLabel={true}>
              <input type="radio" name="some-name-1" />
            </RadioButtonWrapper>
            <RadioButtonWrapper label="Some label">
              <input type="radio" name="some-name-1" disabled={true} />
            </RadioButtonWrapper>
            <RadioButtonWrapper label="Some label" state="success">
              <input type="radio" name="some-name-1" />
            </RadioButtonWrapper>
            <RadioButtonWrapper label="Some label" state="success" message="Some success validation message.">
              <input type="radio" name="some-name-1" />
            </RadioButtonWrapper>
            <RadioButtonWrapper state="success">
              <span slot="label">
                Some label with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <input type="radio" name="some-name-1" />
              <span slot="message">
                Some success message with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
            </RadioButtonWrapper>
            <RadioButtonWrapper label="Some label" state="error">
              <input type="radio" name="some-name-1" />
            </RadioButtonWrapper>
            <RadioButtonWrapper label="Some label" state="error" message="Some error validation message.">
              <input type="radio" name="some-name-1" />
            </RadioButtonWrapper>
            <RadioButtonWrapper state="error">
              <span slot="label">
                Some label with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
              <input type="radio" name="some-name-1" />
              <span slot="message">
                Some error message with a <a href="https://designsystem.porsche.com">link</a>.
              </span>
            </RadioButtonWrapper>
          </div>
          <Divider />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem size="2">
          <Headline variant="headline-4" tag="h4">
            &lt;p-fieldset-wrapper&gt;
          </Headline>
        </GridItem>
        <GridItem size="10">
          <div className="playground light spacing-inline">
            <FieldsetWrapper label="Some label">
              <TextFieldWrapper label="Some label">
                <input type="text" name="some-name" />
              </TextFieldWrapper>
            </FieldsetWrapper>
          </div>
        </GridItem>
      </Grid>
    </div>
  );
};
