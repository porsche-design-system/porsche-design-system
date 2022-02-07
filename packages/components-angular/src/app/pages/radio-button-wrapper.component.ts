/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-radio-button-wrapper',
  styles: [
    `
      .playground > * {
        margin-bottom: 2px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render with label">
      <p-radio-button-wrapper [label]="'Some label'">
        <input [type]="'radio'" [name]="'some-name-1'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'">
        <input [type]="'radio'" [name]="'some-name-1'" checked />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render without label">
      <p-radio-button-wrapper [label]="'Some label'" [hideLabel]="true">
        <input [type]="'radio'" [name]="'some-name-2'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'" [hideLabel]="true">
        <input [type]="'radio'" [name]="'some-name-2'" checked />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render with responsive label">
      <p-radio-button-wrapper
        [label]="'Some label'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        <input [type]="'radio'" [name]="'some-name-3'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper
        [label]="'Some label'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        <input [type]="'radio'" [name]="'some-name-3'" checked />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render in required state">
      <p-radio-button-wrapper [label]="'Some label'">
        <input [type]="'radio'" [name]="'some-name-3a'" required />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'This is a very insanely super long label across multiple lines'">
        <input [type]="'radio'" [name]="'some-name-3a'" required />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'">
        <input [type]="'radio'" [name]="'some-name-3a'" required disabled />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'">
        <input [type]="'radio'" [name]="'some-name-3a'" required checked />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'">
        <input [type]="'radio'" [name]="'some-name-3b'" required checked disabled />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render in disabled state">
      <p-radio-button-wrapper [label]="'Some label'">
        <input [type]="'radio'" [name]="'some-name-4'" disabled />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'">
        <input [type]="'radio'" [name]="'some-name-4'" checked disabled />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render with success state and success message">
      <p-radio-button-wrapper [label]="'Some label'" [state]="'success'">
        <input [type]="'radio'" [name]="'some-name-5'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'" [state]="'success'" [message]="'Some success validation message.'">
        <input [type]="'radio'" [name]="'some-name-5'" checked />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render with success state but without success message and not checked">
      <p-radio-button-wrapper [label]="'Some label'" [state]="'success'">
        <input [type]="'radio'" [name]="'some-name-6'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'" [state]="'success'">
        <input [type]="'radio'" [name]="'some-name-6'" checked />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render with error state and error message">
      <p-radio-button-wrapper [label]="'Some label'" [state]="'error'">
        <input [type]="'radio'" [name]="'some-name-7'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'" [state]="'error'" [message]="'Some error validation message.'">
        <input [type]="'radio'" [name]="'some-name-7'" checked />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render with error state but without error message and not checked">
      <p-radio-button-wrapper [label]="'Some label'" [state]="'error'">
        <input [type]="'radio'" [name]="'some-name-8'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [label]="'Some label'" [state]="'error'">
        <input [type]="'radio'" [name]="'some-name-8'" checked />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render with slotted content with error state and message">
      <p-radio-button-wrapper [state]="'error'">
        <span slot="label">Some label with a <a [href]="'https://designsystem.porsche.com'">link</a>.</span>
        <input [type]="'radio'" [name]="'some-name-9'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [state]="'error'">
        <span slot="label">Some label with a <a [href]="'https://designsystem.porsche.com'">link</a>.</span>
        <input [type]="'radio'" [name]="'some-name-9'" />
        <span slot="message">Some error message with a <a [href]="'https://designsystem.porsche.com'">link</a>.</span>
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render with multiline label">
      <p-radio-button-wrapper [state]="'error'" [label]="'Lorem ipsum dolor sit amet, consetetur sadipscing'" style="width: 240px">
        <input [type]="'radio'" [name]="'some-name-11'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper [state]="'error'" [label]="'Lorem ipsum dolor sit amet, consetetur sadipscing'" style="width: 240px">
        <input [type]="'radio'" [name]="'some-name-11'" />
      </p-radio-button-wrapper>
      <p-radio-button-wrapper
        [label]="'Lorem ipsum dolor sit amet, consetetur sadipscing'"
        [state]="'error'"
        [message]="'At vero eos et accusam et justo duo dolores et ea rebum.'"
        style="width: 240px"
      >
        <input [type]="'radio'" [name]="'some-name-11'" />
      </p-radio-button-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonWrapperComponent {}
