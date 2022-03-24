/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-text-field-wrapper',
  template: `
    <div class="playground light" title="should render with label">
      <p-text-field-wrapper [label]="'Label'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with label and placeholder">
      <p-text-field-wrapper [label]="'Label with placeholder'">
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with label, description and placeholder">
      <p-text-field-wrapper [label]="'Label with description and placeholder'" [description]="'Some description'">
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render without label and without description">
      <p-text-field-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true">
        <input [type]="'text'" [value]="'Without label and description'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with responsive label and description">
      <p-text-field-wrapper
        [label]="'Label responsive'"
        [description]="'Some description'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        <input [type]="'text'" [value]="'Responsive label and description'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render in required state">
      <p-text-field-wrapper [label]="'Required'">
        <input [type]="'text'" required />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Required and insanely super long label across multiple lines'">
        <input [type]="'text'" required />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render in disabled state">
      <p-text-field-wrapper [label]="'Disabled'" [description]="'Some description'">
        <input [type]="'text'" disabled />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with placeholder in disabled state">
      <p-text-field-wrapper [label]="'Disabled placeholder'">
        <input [type]="'text'" disabled [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with readonly state">
      <p-text-field-wrapper [label]="'Readonly'" [description]="'Some description'">
        <input [type]="'text'" [value]="'Some value'" readonly />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with counter">
      <p-text-field-wrapper [label]="'Counter'">
        <input [type]="'text'" [maxLength]="20" [value]="'Some value'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type number">
      <p-text-field-wrapper [label]="'Type number'">
        <input [type]="'number'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type email">
      <p-text-field-wrapper [label]="'Type email'">
        <input [type]="'email'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type tel">
      <p-text-field-wrapper [label]="'Type tel'">
        <input [type]="'tel'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type url">
      <p-text-field-wrapper [label]="'Type url'">
        <input [type]="'url'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type date">
      <p-text-field-wrapper [label]="'Type date'">
        <input [type]="'date'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type time">
      <p-text-field-wrapper [label]="'Type time'">
        <input [type]="'time'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type month">
      <p-text-field-wrapper [label]="'Type month'">
        <input [type]="'month'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type week">
      <p-text-field-wrapper [label]="'Type week'">
        <input [type]="'week'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type password in different states">
      <p-text-field-wrapper [label]="'Type password'">
        <input [type]="'password'" [value]="'some password'" />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type password disabled'">
        <input [type]="'password'" [value]="'some password'" disabled />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type password readonly'">
        <input [type]="'password'" [value]="'some password'" readonly />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type password long text'" style="width: 240px">
        <input
          [type]="'password'"
          [value]="'some really long password with many words and amazing special characters, letters big and small, numbers'"
        />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type search in different states">
      <p-text-field-wrapper [label]="'Type search'">
        <input [type]="'search'" />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type search disabled'">
        <input [type]="'search'" disabled />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type search readonly'">
        <input [type]="'search'" readonly />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with error state and error message">
      <p-text-field-wrapper [label]="'Error with message'" [state]="'error'" [message]="'Error message'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with error state and no error message">
      <p-text-field-wrapper [label]="'Error without message'" [state]="'error'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with success state and success message">
      <p-text-field-wrapper [label]="'Success with message'" [state]="'success'" [message]="'Success message'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with success state and no success message">
      <p-text-field-wrapper [label]="'Success without message'" [state]="'success'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with default state and no message">
      <p-text-field-wrapper [label]="'Default without message'" [state]="'none'" [message]="'this message should be hidden'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render label, description and message by slotted content with error state">
      <p-text-field-wrapper [state]="'error'">
        <span slot="label">Slotted error label with a <a [href]="'#'">link</a></span>
        <span slot="description">Slotted description with a <a [href]="'#'">link</a></span>
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
        <span slot="message">Slotted message with a <a [href]="'#'">link</a></span>
      </p-text-field-wrapper>
    </div>

    <div
      class="playground light"
      title="should render label, description and message by slotted content with success state"
    >
      <p-text-field-wrapper [state]="'success'">
        <span slot="label">Slotted success label with a <a [href]="'#'">link</a></span>
        <span slot="description">Slotted description with a <a [href]="'#'">link</a></span>
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
        <span slot="message">Slotted message with a <a [href]="'#'">link</a></span>
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with multiline label, description, message and text">
      <p-text-field-wrapper
        [label]="'Multiline label lorem ipsum dolor sit amet, consetetur sadipscing'"
        [description]="'Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet'"
        [state]="'error'"
        [message]="'Multiline message at vero eos et accusam et justo duo dolores et ea rebum.'"
        style="width: 240px"
      >
        <input [type]="'text'" [value]="'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render input type='text' with unit">
      <p-text-field-wrapper [label]="'Label with unit input type text'" [unit]="'km/h'">
        <input [type]="'text'" [value]="'three hundred'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render input type='number' with unit">
      <p-text-field-wrapper [label]="'Label with unit input type number'" [unit]="'km/h'">
        <input [type]="'number'" [value]="300" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render input type='text' with unit position suffix">
      <p-text-field-wrapper [label]="'Label with unit input type text position suffix'" [unit]="'kWh'" [unitPosition]="'suffix'">
        <input [type]="'text'" [value]="'four hundred'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render input type='number' with unit position suffix">
      <p-text-field-wrapper [label]="'Label with unit input type number position suffix'" [unit]="'kWh'" [unitPosition]="'suffix'">
        <input [type]="'number'" [value]="400" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render counter when counter and unit are set">
      <p-text-field-wrapper [label]="'Label with counter and unit'" [unit]="'km/h'">
        <input [type]="'text'" [value]="'three hundred'" [maxLength]="50" />
      </p-text-field-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldWrapperComponent {}
