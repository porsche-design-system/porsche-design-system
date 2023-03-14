/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-text-field-wrapper',
  styles: [
    `
      @media only screen and (min-width: 760px) {
        #app,
        :host {
          display: grid;
          grid-template-columns: repeat(2, 50%);
        }
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render with label">
      <p-text-field-wrapper [label]="'Label'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with label on dark theme">
      <p-text-field-wrapper [label]="'Label'" [theme]="'dark'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with label and placeholder">
      <p-text-field-wrapper [label]="'Label with placeholder'">
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with label and placeholder on dark theme">
      <p-text-field-wrapper [label]="'Label with placeholder'" [theme]="'dark'">
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with label, description and placeholder">
      <p-text-field-wrapper [label]="'Label with description and placeholder'" [description]="'Some description'">
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with label, description and placeholder on dark theme">
      <p-text-field-wrapper [label]="'Label with description and placeholder'" [description]="'Some description'" [theme]="'dark'">
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render without label and without description">
      <p-text-field-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true">
        <input [type]="'text'" [value]="'Without label and description'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render without label and without description on dark theme">
      <p-text-field-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true" [theme]="'dark'">
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

    <div class="playground dark" title="should render with responsive label and description on dark theme">
      <p-text-field-wrapper
        [label]="'Label responsive'"
        [description]="'Some description'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        [theme]="'dark'"
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

    <div class="playground dark" title="should render in required state on dark theme">
      <p-text-field-wrapper [label]="'Required'" [theme]="'dark'">
        <input [type]="'text'" required />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Required and insanely super long label across multiple lines'" [theme]="'dark'">
        <input [type]="'text'" required />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render in disabled state">
      <p-text-field-wrapper [label]="'Disabled'" [description]="'Some description'">
        <input [type]="'text'" disabled />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render in disabled state on dark theme">
      <p-text-field-wrapper [label]="'Disabled'" [description]="'Some description'" [theme]="'dark'">
        <input [type]="'text'" disabled />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with placeholder in disabled state">
      <p-text-field-wrapper [label]="'Disabled placeholder'">
        <input [type]="'text'" disabled [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with placeholder in disabled state on dark theme">
      <p-text-field-wrapper [label]="'Disabled placeholder'" [theme]="'dark'">
        <input [type]="'text'" disabled [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with readonly state">
      <p-text-field-wrapper [label]="'Readonly'" [description]="'Some description'">
        <input [type]="'text'" [value]="'Some value'" readonly />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with readonly state on dark theme">
      <p-text-field-wrapper [label]="'Readonly'" [description]="'Some description'" [theme]="'dark'">
        <input [type]="'text'" [value]="'Some value'" readonly />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with counter">
      <p-text-field-wrapper [label]="'Counter'">
        <input [type]="'text'" [maxLength]="20" [value]="'Some value'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with counter on dark theme">
      <p-text-field-wrapper [label]="'Counter'" [theme]="'dark'">
        <input [type]="'text'" [maxLength]="20" [value]="'Some value'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render without counter">
      <p-text-field-wrapper [label]="'showCharacterCount=false'" [showCharacterCount]="false">
        <input [type]="'text'" [maxLength]="20" [value]="'Some value'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render without counter on dark theme">
      <p-text-field-wrapper [label]="'showCharacterCount=false'" [showCharacterCount]="false" [theme]="'dark'">
        <input [type]="'text'" [maxLength]="20" [value]="'Some value'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render without counter">
      <p-text-field-wrapper [label]="'showCounter=false'" [showCounter]="false">
        <input [type]="'text'" [maxLength]="20" [value]="'Some value'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render without counter on dark theme">
      <p-text-field-wrapper [label]="'showCounter=false'" [showCounter]="false" [theme]="'dark'">
        <input [type]="'text'" [maxLength]="20" [value]="'Some value'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type number">
      <p-text-field-wrapper [label]="'Type number'">
        <input [type]="'number'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with type number on dark theme">
      <p-text-field-wrapper [label]="'Type number'" [theme]="'dark'">
        <input [type]="'number'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type email">
      <p-text-field-wrapper [label]="'Type email'">
        <input [type]="'email'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with type email on dark theme">
      <p-text-field-wrapper [label]="'Type email'" [theme]="'dark'">
        <input [type]="'email'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type tel">
      <p-text-field-wrapper [label]="'Type tel'">
        <input [type]="'tel'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with type tel on dark theme">
      <p-text-field-wrapper [label]="'Type tel'" [theme]="'dark'">
        <input [type]="'tel'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type url">
      <p-text-field-wrapper [label]="'Type url'">
        <input [type]="'url'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with type url on dark theme">
      <p-text-field-wrapper [label]="'Type url'" [theme]="'dark'">
        <input [type]="'url'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type date">
      <p-text-field-wrapper [label]="'Type date'">
        <input [type]="'date'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with type date on dark theme">
      <p-text-field-wrapper [label]="'Type date'" [theme]="'dark'">
        <input [type]="'date'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type time">
      <p-text-field-wrapper [label]="'Type time'">
        <input [type]="'time'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with type time on dark theme">
      <p-text-field-wrapper [label]="'Type time'" [theme]="'dark'">
        <input [type]="'time'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type month">
      <p-text-field-wrapper [label]="'Type month'">
        <input [type]="'month'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with type month on dark theme">
      <p-text-field-wrapper [label]="'Type month'" [theme]="'dark'">
        <input [type]="'month'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with type week">
      <p-text-field-wrapper [label]="'Type week'">
        <input [type]="'week'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with type week on dark theme">
      <p-text-field-wrapper [label]="'Type week'" [theme]="'dark'">
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
      <p-text-field-wrapper [label]="'Type password long text'" style="max-width: 15rem">
        <input
          [type]="'password'"
          [value]="'some really long password with many words and amazing special characters, letters big and small, numbers'"
        />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with type password in different states on dark theme">
      <p-text-field-wrapper [label]="'Type password'" [theme]="'dark'">
        <input [type]="'password'" [value]="'some password'" />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type password disabled'" [theme]="'dark'">
        <input [type]="'password'" [value]="'some password'" disabled />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type password readonly'" [theme]="'dark'">
        <input [type]="'password'" [value]="'some password'" readonly />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type password long text'" style="max-width: 15rem" [theme]="'dark'">
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
      <p-text-field-wrapper [label]="'Type search with long value'">
        <input
          [type]="'search'"
          [value]="'some really long password with many words and amazing special characters, letters big and small, numbers'"
        />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type search with action-icon'" [actionIcon]="'locate'">
        <input [type]="'search'" />
      </p-text-field-wrapper>
      <p-text-field-wrapper
        [label]="'Type search with action-icon and action-loading'"
        [actionIcon]="'locate'"
        [actionLoading]="true"
      >
        <input [type]="'search'" />
      </p-text-field-wrapper>
      <form>
        <p-text-field-wrapper [label]="'Type search with long value within form'">
          <input
            [type]="'search'"
            [value]="'some really long password with many words and amazing special characters, letters big and small, numbers'"
          />
        </p-text-field-wrapper>
        <p-text-field-wrapper [label]="'Type search with action-icon within form'" [actionIcon]="'locate'">
          <input [type]="'search'" />
        </p-text-field-wrapper>
        <p-text-field-wrapper
          [label]="'Type search with action-icon and action-loading within form'"
          [actionIcon]="'locate'"
          [actionLoading]="true"
        >
          <input [type]="'search'" />
        </p-text-field-wrapper>
        <p-text-field-wrapper [label]="'Type search with action-icon and long value within form'" [actionIcon]="'locate'">
          <input
            [type]="'search'"
            [value]="'some really long password with many words and amazing special characters, letters big and small, numbers'"
          />
        </p-text-field-wrapper>
      </form>
    </div>

    <div class="playground dark" title="should render with type search in different states on dark theme">
      <p-text-field-wrapper [label]="'Type search'" [theme]="'dark'">
        <input [type]="'search'" />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type search disabled'" [theme]="'dark'">
        <input [type]="'search'" disabled />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type search readonly'" [theme]="'dark'">
        <input [type]="'search'" readonly />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type search with long value'" [theme]="'dark'">
        <input
          [type]="'search'"
          [value]="'some really long password with many words and amazing special characters, letters big and small, numbers'"
        />
      </p-text-field-wrapper>
      <p-text-field-wrapper [label]="'Type search with action-icon'" [actionIcon]="'locate'" [theme]="'dark'">
        <input [type]="'search'" />
      </p-text-field-wrapper>
      <p-text-field-wrapper
        [label]="'Type search with action-icon and action-loading'"
        [actionIcon]="'locate'"
        [actionLoading]="true"
        [theme]="'dark'"
      >
        <input [type]="'search'" />
      </p-text-field-wrapper>
      <form>
        <p-text-field-wrapper [label]="'Type search with long value within form'" [theme]="'dark'">
          <input
            [type]="'search'"
            [value]="'some really long password with many words and amazing special characters, letters big and small, numbers'"
          />
        </p-text-field-wrapper>
        <p-text-field-wrapper [label]="'Type search with action-icon within form'" [actionIcon]="'locate'" [theme]="'dark'">
          <input [type]="'search'" />
        </p-text-field-wrapper>
        <p-text-field-wrapper
          [label]="'Type search with action-icon and action-loading within form'"
          [actionIcon]="'locate'"
          [actionLoading]="true"
          [theme]="'dark'"
        >
          <input [type]="'search'" />
        </p-text-field-wrapper>
        <p-text-field-wrapper
          [label]="'Type search with action-icon and long value within form'"
          [actionIcon]="'locate'"
          [theme]="'dark'"
        >
          <input
            [type]="'search'"
            [value]="'some really long password with many words and amazing special characters, letters big and small, numbers'"
          />
        </p-text-field-wrapper>
      </form>
    </div>

    <div class="playground light" title="should render with error state and error message">
      <p-text-field-wrapper [label]="'Error with message'" [state]="'error'" [message]="'Error message'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with error state and error message on theme dark">
      <p-text-field-wrapper [label]="'Error with message'" [state]="'error'" [message]="'Error message'" [theme]="'dark'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with error state and no error message">
      <p-text-field-wrapper [label]="'Error without message'" [state]="'error'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with error state and no error message on theme dark">
      <p-text-field-wrapper [label]="'Error without message'" [state]="'error'" [theme]="'dark'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with success state and success message">
      <p-text-field-wrapper [label]="'Success with message'" [state]="'success'" [message]="'Success message'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with success state and success message on theme dark">
      <p-text-field-wrapper [label]="'Success with message'" [state]="'success'" [message]="'Success message'" [theme]="'dark'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with success state and no success message">
      <p-text-field-wrapper [label]="'Success without message'" [state]="'success'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with success state and no success message on theme dark">
      <p-text-field-wrapper [label]="'Success without message'" [state]="'success'" [theme]="'dark'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with default state and no message">
      <p-text-field-wrapper [label]="'Default without message'" [state]="'none'" [message]="'this message should be hidden'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with default state and no message on theme dark">
      <p-text-field-wrapper
        [label]="'Default without message'"
        [state]="'none'"
        [message]="'this message should be hidden'"
        [theme]="'dark'"
      >
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render label, description and message by slotted content with error state">
      <p-text-field-wrapper [state]="'error'">
        <span slot="label">
          <span>
            Slotted label. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
        <span slot="message">
          <span>
            Slotted error message. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-text-field-wrapper>
    </div>

    <div
      class="playground dark"
      title="should render label, description and message by slotted content with error state on theme dark"
    >
      <p-text-field-wrapper [state]="'error'" [theme]="'dark'">
        <span slot="label">
          <span>
            Slotted label. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
        <span slot="message">
          <span>
            Slotted error message. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-text-field-wrapper>
    </div>

    <div
      class="playground light"
      title="should render label, description and message by slotted content with success state"
    >
      <p-text-field-wrapper [state]="'success'">
        <span slot="label">
          <span>
            Slotted label. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
        <span slot="message">
          <span>
            Slotted success message. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-text-field-wrapper>
    </div>

    <div
      class="playground dark"
      title="should render label, description and message by slotted content with success state on theme dark"
    >
      <p-text-field-wrapper [state]="'success'" [theme]="'dark'">
        <span slot="label">
          <span>
            Slotted label. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
        <span slot="description">
          <span>
            Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
        <span slot="message">
          <span>
            Slotted success message. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render with multiline label, description, message and text">
      <p-text-field-wrapper
        [label]="'Multiline label lorem ipsum dolor sit amet, consetetur sadipscing'"
        [description]="'Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet'"
        [state]="'error'"
        [message]="'Multiline message at vero eos et accusam et justo duo dolores et ea rebum.'"
        style="max-width: 15rem"
      >
        <input [type]="'text'" [value]="'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render with multiline label, description, message and text on theme dark">
      <p-text-field-wrapper
        [label]="'Multiline label lorem ipsum dolor sit amet, consetetur sadipscing'"
        [description]="'Multiline description lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet'"
        [state]="'error'"
        [message]="'Multiline message at vero eos et accusam et justo duo dolores et ea rebum.'"
        style="max-width: 15rem"
        [theme]="'dark'"
      >
        <input [type]="'text'" [value]="'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render input type text with unit">
      <p-text-field-wrapper [label]="'Label with unit and input type text'" [unit]="'km/h'">
        <input [type]="'text'" [value]="'three hundred'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render input type text with unit on theme dark">
      <p-text-field-wrapper [label]="'Label with unit and input type text'" [unit]="'km/h'" [theme]="'dark'">
        <input [type]="'text'" [value]="'three hundred'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render input type number with unit">
      <p-text-field-wrapper [label]="'Label with unit and input type number'" [unit]="'km/h'">
        <input [type]="'number'" [value]="300" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render input type number with unit on theme dark">
      <p-text-field-wrapper [label]="'Label with unit and input type number'" [unit]="'km/h'" [theme]="'dark'">
        <input [type]="'number'" [value]="300" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render input type text with unit position suffix">
      <p-text-field-wrapper [label]="'Label with unit, input type text and position suffix'" [unit]="'kWh'" [unitPosition]="'suffix'">
        <input [type]="'text'" [value]="'four hundred'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render input type text with unit position suffix on theme dark">
      <p-text-field-wrapper
        [label]="'Label with unit, input type text and position suffix'"
        [unit]="'kWh'"
        [unitPosition]="'suffix'"
        [theme]="'dark'"
      >
        <input [type]="'text'" [value]="'four hundred'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render input type number with unit position suffix">
      <p-text-field-wrapper
        [label]="'Label with unit input, type number and position suffix'"
        [unit]="'kWh'"
        [unitPosition]="'suffix'"
      >
        <input [type]="'number'" [value]="400" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render input type number with unit position suffix on theme dark">
      <p-text-field-wrapper
        [label]="'Label with unit input, type number and position suffix'"
        [unit]="'kWh'"
        [unitPosition]="'suffix'"
        [theme]="'dark'"
      >
        <input [type]="'number'" [value]="400" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render counter when counter and unit are set">
      <p-text-field-wrapper [label]="'Label with counter and unit'" [unit]="'km/h'">
        <input [type]="'text'" [value]="'three hundred'" [maxLength]="50" />
      </p-text-field-wrapper>
    </div>

    <div class="playground dark" title="should render counter when counter and unit are set on theme dark">
      <p-text-field-wrapper [label]="'Label with counter and unit'" [unit]="'km/h'" [theme]="'dark'">
        <input [type]="'text'" [value]="'three hundred'" [maxLength]="50" />
      </p-text-field-wrapper>
    </div>

    <div
      class="playground light"
      title="should render unit when counter and unit are set and show-character-count is false"
    >
      <p-text-field-wrapper [label]="'Label with unit and hidden counter'" [unit]="'km/h'" [showCharacterCount]="false">
        <input [type]="'text'" [value]="'three hundred'" [maxLength]="50" />
      </p-text-field-wrapper>
    </div>

    <div
      class="playground dark"
      title="should render unit when counter and unit are set and show-character-count is false on theme dark"
    >
      <p-text-field-wrapper
        [label]="'Label with unit and hidden counter'"
        [unit]="'km/h'"
        [showCharacterCount]="false"
        [theme]="'dark'"
      >
        <input [type]="'text'" [value]="'three hundred'" [maxLength]="50" />
      </p-text-field-wrapper>
    </div>

    <div
      class="playground light"
      title="should render unit when counter with unit position suffix and show-character-count is false"
    >
      <p-text-field-wrapper
        [label]="'Label with unit, position suffix and hidden counter'"
        [unit]="'km/h'"
        [unitPosition]="'suffix'"
        [showCharacterCount]="false"
      >
        <input [type]="'text'" [value]="'three hundred'" [maxLength]="50" />
      </p-text-field-wrapper>
    </div>

    <div
      class="playground dark"
      title="should render unit when counter with unit position suffix and show-character-count is false on theme dark"
    >
      <p-text-field-wrapper
        [label]="'Label with unit, position suffix and hidden counter'"
        [unit]="'km/h'"
        [unitPosition]="'suffix'"
        [showCharacterCount]="false"
        [theme]="'dark'"
      >
        <input [type]="'text'" [value]="'three hundred'" [maxLength]="50" />
      </p-text-field-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldWrapperComponent {}
