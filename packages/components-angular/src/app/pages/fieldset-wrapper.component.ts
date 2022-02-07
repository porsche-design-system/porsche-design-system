/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-fieldset-wrapper',
  styles: [
    `
      p-fieldset-wrapper > *:not(:last-child) {
        margin-bottom: 2px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render with label">
      <p-fieldset-wrapper [label]="'Some label'"></p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render with label and text-field-wrapper with defined spacing">
      <p-fieldset-wrapper [label]="'Some label'">
        <p-text-field-wrapper [label]="'Some label'">
          <input [type]="'text'" [name]="'some-name'" />
        </p-text-field-wrapper>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render with required">
      <p-fieldset-wrapper [label]="'Some label'" [required]="true">
        <p-checkbox-wrapper [label]="'Some label'">
          <input [type]="'checkbox'" [name]="'some-name-1'" />
        </p-checkbox-wrapper>
        <p-checkbox-wrapper [label]="'Some label'">
          <input [type]="'checkbox'" [name]="'some-name-1'" />
        </p-checkbox-wrapper>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render with slotted label">
      <p-fieldset-wrapper>
        <span slot="label">Some slotted Label</span>
        <p-checkbox-wrapper [label]="'Some label'">
          <input [type]="'checkbox'" [name]="'some-name-1'" />
        </p-checkbox-wrapper>
        <p-checkbox-wrapper [label]="'Some label'">
          <input [type]="'checkbox'" [name]="'some-name-1'" />
        </p-checkbox-wrapper>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render with label size small">
      <p-fieldset-wrapper [label]="'Some label'" [labelSize]="'small'">
        <p-radio-button-wrapper [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
        <p-radio-button-wrapper [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render with label size small and required">
      <p-fieldset-wrapper [label]="'Some label'" [labelSize]="'small'" [required]="true">
        <p-radio-button-wrapper [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
        <p-radio-button-wrapper [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render with error state and error message">
      <p-fieldset-wrapper [label]="'Some label'" [state]="'error'" [message]="'Some error message'">
        <p-radio-button-wrapper [state]="'error'" [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
        <p-radio-button-wrapper [state]="'error'" [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render with error state and slotted error message">
      <p-fieldset-wrapper [label]="'Some label'" [state]="'error'">
        <p-radio-button-wrapper [state]="'error'" [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
        <p-radio-button-wrapper [state]="'error'" [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
        <span slot="message">Some slotted error Message</span>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render with success state and success message">
      <p-fieldset-wrapper [label]="'Some label'" [state]="'success'" [message]="'Some success message'">
        <p-radio-button-wrapper [state]="'success'" [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
        <p-radio-button-wrapper [state]="'success'" [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render with success state and slotted success message">
      <p-fieldset-wrapper [label]="'Some label'" [state]="'success'">
        <p-radio-button-wrapper [state]="'success'" [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
        <p-radio-button-wrapper [state]="'success'" [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" />
        </p-radio-button-wrapper>
        <span slot="message">Some slotted success Message</span>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render fieldset in fieldset as section">
      <p-fieldset-wrapper [label]="'Some label'">
        <p-fieldset-wrapper [label]="'Some label'" [labelSize]="'small'">
          <p-radio-button-wrapper [label]="'Some label'">
            <input [type]="'radio'" [name]="'some-name-1'" />
          </p-radio-button-wrapper>
          <p-radio-button-wrapper [label]="'Some label'">
            <input [type]="'radio'" [name]="'some-name-1'" />
          </p-radio-button-wrapper>
        </p-fieldset-wrapper>
      </p-fieldset-wrapper>
    </div>

    <div class="playground light" title="should render required only on fieldset">
      <p-fieldset-wrapper [label]="'Some label'" [labelSize]="'small'" [required]="true">
        <p-text-field-wrapper [label]="'Some label'" [state]="'error'">
          <input [type]="'text'" [name]="'some-name'" required />
        </p-text-field-wrapper>
        <p-textarea-wrapper [label]="'Some label'" [hideLabel]="false">
          <textarea [name]="'some-name'" required></textarea>
        </p-textarea-wrapper>
        <p-radio-button-wrapper [label]="'Some label'">
          <input [type]="'radio'" [name]="'some-name-1'" required />
        </p-radio-button-wrapper>
        <p-checkbox-wrapper [label]="'Some label'">
          <input [type]="'checkbox'" [name]="'some-name-1'" required />
        </p-checkbox-wrapper>
        <p-select-wrapper [label]="'Some label'">
          <select [name]="'some-name'" required>
            <option [value]="'a'">Option A</option>
            <option [value]="'b'">Option B</option>
            <option [value]="'c'">Option C</option>
          </select>
        </p-select-wrapper>
      </p-fieldset-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetWrapperComponent {}
