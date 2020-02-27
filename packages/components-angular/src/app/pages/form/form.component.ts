import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <p-headline [variant]="'headline-2'">Form</p-headline>
    <hr>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">&lt;p-radio-button&gt;</p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-inline">
          <p-radio-button-wrapper [label]="'Some label'"><input type="radio" name="some-name-1"/></p-radio-button-wrapper>
          <p-radio-button-wrapper [label]="'Some label'"><input type="radio" name="some-name-1" checked="checked"/></p-radio-button-wrapper>
          <p-radio-button-wrapper [label]="'Some label'" [hideLabel]="true"><input type="radio" name="some-name-1"/></p-radio-button-wrapper>
          <p-radio-button-wrapper [label]="'Some label'"><input type="radio" name="some-name-1" disabled="disabled"/></p-radio-button-wrapper>
          <p-radio-button-wrapper [label]="'Some label'" [state]="'error'"><input type="radio" name="some-name-1"/></p-radio-button-wrapper>
          <p-radio-button-wrapper [label]="'Some label'" [state]="'error'" [message]="'Some error validation message.'"><input type="radio" name="some-name-1"/></p-radio-button-wrapper>
          <p-radio-button-wrapper [state]="'error'"><span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span><input type="radio" name="some-name-1"><span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span></p-radio-button-wrapper>
        </div>
        <hr>
      </p-grid-item>
    </p-grid>
  `
})
export class FormComponent {

}
