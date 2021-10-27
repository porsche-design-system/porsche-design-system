import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-text-field-wrapper',
  template: `
    <div class="playground light" title="should render with label">
      <p-text-field-wrapper [label]="'Label default'">
        <input type="text" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with label and placeholder">
      <p-text-field-wrapper [label]="'Label with placeholder'">
        <input type="text" placeholder="Some placeholder" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with label, description and placeholder">
      <p-text-field-wrapper [label]="'Label with description'" [description]="'Some description'">
        <input type="text" placeholder="Some placeholder" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render without label and without description">
      <p-text-field-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true">
        <input type="text" placeholder="Without label and without description" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with responsive label and description">
      <p-text-field-wrapper
        [label]="'Label responsive'"
        [description]="'Some description'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        <input type="text" placeholder="Responsive label and description" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render in required state">
      <p-text-field-wrapper [label]="'Label required'">
        <input type="text" required />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'This is a very insanely super long required label across multiple lines'">
        <input type="text" required />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render in disabled state">
      <p-text-field-wrapper [label]="'Label disabled'" [description]="'Some description'">
        <input type="text" disabled />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with placeholder in disabled state">
      <p-text-field-wrapper [label]="'Label disabled with placeholder'">
        <input type="text" placeholder="Some placeholder" disabled />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with readonly state">
      <p-text-field-wrapper [label]="'Label readonly with description'" [description]="'Some description'">
        <input type="text" value="Some value" readonly />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type number">
      <p-text-field-wrapper [label]="'Label type number'">
        <input type="number" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type email">
      <p-text-field-wrapper [label]="'Label type email'">
        <input type="email" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type tel">
      <p-text-field-wrapper [label]="'Label type tel'">
        <input type="tel" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type url">
      <p-text-field-wrapper [label]="'Label type url'">
        <input type="url" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type date">
      <p-text-field-wrapper [label]="'Label type date'">
        <input type="date" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type time">
      <p-text-field-wrapper [label]="'Label type time'">
        <input type="time" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type month">
      <p-text-field-wrapper [label]="'Label type month'">
        <input type="month" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type week">
      <p-text-field-wrapper [label]="'Label type week'">
        <input type="week" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type password in different states">
      <p-text-field-wrapper [label]="'Label type password'">
        <input type="password" value="some password" />
      </p-text-field-wrapper>
      <br />
      <p-text-field-wrapper [label]="'Label type password disabled'">
        <input type="password" value="some password" disabled />
      </p-text-field-wrapper>
      <br />
      <p-text-field-wrapper [label]="'Label type password readonly'">
        <input type="password" value="some password" readonly />
      </p-text-field-wrapper>
      <br />
      <p-text-field-wrapper [label]="'Label type password'" style="width: 240px;">
        <input
          type="password"
          value="some really long password with many words and amazing special characters, letters big and small, numbers"
        />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type search in different states">
      <p-text-field-wrapper [label]="'Label type search'">
        <input type="search" />
      </p-text-field-wrapper>
      <br />
      <p-text-field-wrapper [label]="'Label type search disabled'">
        <input type="search" disabled />
      </p-text-field-wrapper>
      <br />
      <p-text-field-wrapper [label]="'Label type search readonly'">
        <input type="search" readonly />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with error state and error message">
      <p-text-field-wrapper [label]="'Label state error with message'" [state]="'error'" [message]="'error message'">
        <input type="text" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with error state and no error message">
      <p-text-field-wrapper [label]="'Label state error without message'" [state]="'error'">
        <input type="text" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with success state and success message">
      <p-text-field-wrapper
        [label]="'Label state success with message'"
        [state]="'success'"
        [message]="'success message'"
      >
        <input type="text" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with success state and no success message">
      <p-text-field-wrapper [label]="'Label state success without message'" [state]="'success'">
        <input type="text" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with default state and no message">
      <p-text-field-wrapper
        [label]="'Label default state no message'"
        [state]="'none'"
        [message]="'this message should be hidden'"
      >
        <input type="text" />
      </p-text-field-wrapper>
    </div>

    <div
      class="playground light"
      title="should render label, description and message by slotted content with error state"
    >
      <p-text-field-wrapper [state]="'error'">
        <span slot="label">Label slotted with a <a href="https://designsystem.porsche.com">link</a>.</span>
        <span slot="description">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
        <input type="text" placeholder="Some placeholder" />
        <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
      </p-text-field-wrapper>
    </div>

    <div
      class="playground light"
      title="should render label, description and message by slotted content with success state"
    >
      <p-text-field-wrapper [state]="'success'">
        <span slot="label">Label slotted with a <a href="https://designsystem.porsche.com">link</a>.</span>
        <span slot="description">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
        <input type="text" placeholder="Some placeholder" />
        <span slot="message">Some success message with a <a href="https://designsystem.porsche.com">link</a>.</span>
      </p-text-field-wrapper>
    </div>

    <div
      class="playground light"
      title="should render with multiline label, description and message and cut off too long option text"
    >
      <p-text-field-wrapper
        [label]="'Lorem ipsum dolor sit amet, consetetur sadipscing'"
        [description]="'Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet'"
        [state]="'error'"
        [message]="'At vero eos et accusam et justo duo dolores et ea rebum.'"
        style="width: 240px;"
      >
        <input type="text" value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr," />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with unit">
      <p-text-field-wrapper [label]="'Label with unit'" [unit]="'km/h'">
        <input type="number" value="300" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with unit position suffix">
      <p-text-field-wrapper [label]="'Label with unit position suffix'" [unit]="'kWh'" [unitPosition]="'suffix'">
        <input type="number" value="400" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render a maximum of five characters per unit">
      <p-text-field-wrapper [label]="'Label with long unit'" [unit]="'kg/m³55555'">
        <input type="number" value="7777" />
      </p-text-field-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldWrapperComponent {}
