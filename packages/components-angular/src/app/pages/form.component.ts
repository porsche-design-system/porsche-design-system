import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <p-headline [variant]="'headline-2'">Form</p-headline>
    <hr>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-text-field-wrapper&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-text-field-wrapper [label]="'Some label'"><input type="text" name="some-name"/></p-text-field-wrapper>
          <p-text-field-wrapper [label]="'Some label'"><input type="text" name="some-name" placeholder="Some placeholder text"/></p-text-field-wrapper>
          <p-text-field-wrapper [label]="'Some label'" [hideLabel]="true"><input type="text" name="some-name"/></p-text-field-wrapper>
          <p-text-field-wrapper [label]="'Some label'" [hideLabel]="{ base: true, l: false }"><input type="text" name="some-name"/></p-text-field-wrapper>
          <p-text-field-wrapper [label]="'Some label'"><input type="text" name="some-name" disabled="disabled"/></p-text-field-wrapper>
          <p-text-field-wrapper [label]="'Some label'"><input type="text" name="some-name" readonly="readonly" value="Some value"/></p-text-field-wrapper>
          <p-text-field-wrapper [label]="'Some label'"><input type="password" name="some-name" value="some-password"/></p-text-field-wrapper>
          <p-text-field-wrapper [label]="'Some label'" [state]="'error'" [message]="'Error message'"><input type="text" name="some-name"/></p-text-field-wrapper>
          <p-text-field-wrapper [label]="'Some label'" [state]="'success'" [message]="'Success message'"><input type="text" name="some-name"/></p-text-field-wrapper>
          <p-text-field-wrapper [state]="'error'"><span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span><input type="text" name="some-name" placeholder="Some placeholder"/><span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span></p-text-field-wrapper>
        </div>
        <hr>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-select-wrapper&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-select-wrapper [label]="'Some label'">
            <select name="some-name">
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper [label]="'Some label'">
            <select name="some-name" disabled="disabled">
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper [label]="'Some label'" [state]="'error'" [message]="'Some error message.'">
            <select name="some-name">
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </p-select-wrapper>
          <p-select-wrapper [state]="'success'">
            <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
            <select name="some-name">
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
            <span slot="message">Some success message with a <a href="https://designsystem.porsche.com">link</a>.</span>
          </p-select-wrapper>
        </div>
        <hr>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" tag="h4">&lt;p-checkbox-wrapper&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-inline">
          <p-checkbox-wrapper [label]="'Some label'">
            <input type="checkbox" name="some-name"/>
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [label]="'Some label'">
            <input type="checkbox" name="some-name" checked="checked"/>
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [label]="'Some label'" [hideLabel]="true">
            <input type="checkbox" name="some-name"/>
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [label]="'Some label'" [hideLabel]="true">
            <input type="checkbox" name="some-name" checked="checked"/>
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [label]="'Some label'">
            <input type="checkbox" name="some-name" [indeterminate]="true" />
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [label]="'Some label'">
            <input type="checkbox" name="some-name" checked="checked" [indeterminate]="true" />
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [label]="'Some label'">
            <input type="checkbox" name="some-name" disabled="disabled"/>
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [label]="'Some label'">
            <input type="checkbox" name="some-name" checked="checked" disabled="disabled"/>
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [label]="'Some label'" [state]="'success'" [message]="'Some success validation message.'">
            <input type="checkbox" name="some-name" />
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [state]="'success'">
            <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
            <input type="checkbox" name="some-name" />
            <span slot="message">Some success message with a <a href="https://designsystem.porsche.com">link</a>.</span>
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [label]="'Some label'" [state]="'error'" [message]="'Some error validation message.'">
            <input type="checkbox" name="some-name" />
          </p-checkbox-wrapper>
          <p-checkbox-wrapper [state]="'error'">
            <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
            <input type="checkbox" name="some-name" />
            <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
          </p-checkbox-wrapper>
        </div>
        <hr>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-textarea-wrapper&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-textarea-wrapper [label]="'Some label'"><textarea name="some-name"></textarea></p-textarea-wrapper>
          <p-textarea-wrapper [label]="'Some label'"><textarea name="some-name" placeholder="Some placeholder text"></textarea></p-textarea-wrapper>
          <p-textarea-wrapper [label]="'Some label'" [hideLabel]="true"><textarea name="some-name"></textarea></p-textarea-wrapper>
          <p-textarea-wrapper [label]="'Some label'" [hideLabel]="{ base: true, l: false }"><textarea name="some-name"></textarea></p-textarea-wrapper>
          <p-textarea-wrapper [label]="'Some label'"><textarea name="some-name" disabled="disabled"></textarea></p-textarea-wrapper>
          <p-textarea-wrapper [label]="'Some label'"><textarea name="some-name" readonly="readonly">Some value</textarea></p-textarea-wrapper>
          <p-textarea-wrapper [label]="'Some label'" [state]="'error'" [message]="'error message'"><textarea name="some-name"></textarea></p-textarea-wrapper>
          <p-textarea-wrapper [label]="'Some label'" [state]="'success'" [message]="'success message'"><textarea name="some-name"></textarea></p-textarea-wrapper>
          <p-textarea-wrapper [state]="'error'"><span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span><textarea name="some-name">Some value</textarea><span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span></p-textarea-wrapper>
        </div>
        <hr>
      </p-grid-item>
    </p-grid>
  `
})
export class FormComponent {}
