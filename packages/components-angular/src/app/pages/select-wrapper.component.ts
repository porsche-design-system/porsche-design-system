import { Component } from '@angular/core';

@Component({
  selector: 'page-select',
  template: `
    <div class="playground light" title="should render with label">
      <p-select-wrapper [label]="'Some label'">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render with label and description">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render without label and without description">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render with responsive label and description">
      <p-select-wrapper
        [label]="'Some label'"
        [description]="'Some description'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render with disabled state">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'">
        <select name="some-name" disabled>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render with error state and error message">
      <p-select-wrapper [label]="'Some label'" [state]="'error'" [message]="'Some error message.'">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render with error state and no error message">
      <p-select-wrapper [label]="'Some label'" [state]="'error'">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render with success state and success message">
      <p-select-wrapper [label]="'Some label'" [state]="'success'" [message]="'Some success message.'">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render with success state and no success message">
      <p-select-wrapper [label]="'Some label'" [state]="'success'">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render with default state and no message">
      <p-select-wrapper
        [label]="'Some label'"
        [state]="'none'"
        [message]="'Some message which should not be rendered.'"
      >
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div
      class="playground light"
      title="should render label, description and message by slotted content with error state"
    >
      <p-select-wrapper [state]="'error'">
        <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
        <span slot="description">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
        <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
      </p-select-wrapper>
    </div>

    <div
      class="playground light"
      title="should render label, description and message by slotted content with success state"
    >
      <p-select-wrapper [state]="'success'">
        <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
        <span slot="description">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
        <span slot="message">Some success message with a <a href="https://designsystem.porsche.com">link</a>.</span>
      </p-select-wrapper>
    </div>

    <div
      class="playground light"
      title="should render with multiline label, description and message and cut off too long option text"
    >
      <p-select-wrapper
        [label]="'Lorem ipsum dolor sit amet, consetetur sadipscing'"
        [description]="'Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet'"
        [state]="'error'"
        [message]="'At vero eos et accusam et justo duo dolores et ea rebum.'"
        style="width: 240px;"
      >
        <select name="some-name">
          <option value="a">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</option>
          <option value="b">sed diam nonumy eirmod tempor invidunt ut labore</option>
          <option value="c">et dolore magna aliquyam erat, sed diam voluptua</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render in focus state">
      <p-select-wrapper [label]="'Some label'">
        <select id="test-focus-state" name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    </div>
  `
})
export class SelectWrapperComponent {}
