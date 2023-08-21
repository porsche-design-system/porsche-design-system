/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-multi-select',
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
    <div class="playground light" title="should render without label and without description">
      <p-multi-select [name]="'options'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render without label and without description on dark theme">
      <p-multi-select [name]="'options'" [theme]="'dark'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render with label">
      <p-multi-select [name]="'options'" [label]="'Some Label'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render with label on dark theme">
      <p-multi-select [name]="'options'" [label]="'Some Label'" [theme]="'dark'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render with label and description">
      <p-multi-select [name]="'options'" [label]="'Some Label'" [description]="'Some description'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render with label and description on dark theme">
      <p-multi-select [name]="'options'" [label]="'Some Label'" [description]="'Some description'" [theme]="'dark'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render with responsive label and description">
      <p-multi-select
        [name]="'options'"
        [label]="'Hide label responsive'"
        [description]="'Some description'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render with responsive label and description">
      <p-multi-select
        [name]="'options'"
        [label]="'Hide label responsive'"
        [description]="'Some description'"
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        [theme]="'dark'"
      >
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render in disabled state">
      <p-multi-select [name]="'options'" [label]="'Some Label disabled'" disabled>
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render in disabled state on dark theme">
      <p-multi-select [name]="'options'" [label]="'Some Label disabled'" disabled [theme]="'dark'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render in required state">
      <p-multi-select [name]="'options'" [label]="'Some label required'" required>
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
      <p-multi-select
        [name]="'options'"
        [label]="'This is a very insanely super long label across multiple lines required'"
        required
      >
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render in required state on dark theme">
      <p-multi-select [name]="'options'" [label]="'Some label required'" required [theme]="'dark'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
      <p-multi-select
        [name]="'options'"
        [label]="'This is a very insanely super long label across multiple lines required'"
        required
        [theme]="'dark'"
      >
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render with error state and error message">
      <p-multi-select [name]="'options'" [label]="'Error state'" [state]="'error'" [message]="'Some error message.'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render with error state and error message on dark theme">
      <p-multi-select [name]="'options'" [label]="'Error state'" [state]="'error'" [message]="'Some error message.'" [theme]="'dark'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render with error state and no error message">
      <p-multi-select [name]="'options'" [label]="'Error state (no message)'" [state]="'error'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render with error state and no error message">
      <p-multi-select [name]="'options'" [label]="'Error state (no message)'" [state]="'error'" [theme]="'dark'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render with success state and success message">
      <p-multi-select [name]="'options'" [label]="'Success state'" [state]="'success'" [message]="'Some success message.'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render with success state and success message on dark theme">
      <p-multi-select [name]="'options'" [label]="'Success state'" [state]="'success'" [message]="'Some success message.'" [theme]="'dark'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render with success state and no success message">
      <p-multi-select [name]="'options'" [label]="'Success state (no message)'" [state]="'success'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render with success state and no success message on dark theme">
      <p-multi-select [name]="'options'" [label]="'Success state (no message)'" [state]="'success'" [theme]="'dark'">
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render with default state and no message">
      <p-multi-select
        [name]="'options'"
        [label]="'Default state, no message should be visible'"
        [state]="'none'"
        [message]="'Some message which should not be rendered.'"
      >
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>
    <div class="playground dark" title="should render with default state and no message on dark theme">
      <p-multi-select
        [name]="'options'"
        [label]="'Default state, no message should be visible'"
        [state]="'none'"
        [message]="'Some message which should not be rendered.'"
        [theme]="'dark'"
      >
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
      </p-multi-select>
    </div>

    <div class="playground light" title="should render label, description and message by slotted content with error state">
      <p-multi-select [name]="'options'" [state]="'error'">
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
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
        <span slot="message">
          <span>
            Slotted error message. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-multi-select>
    </div>
    <div
      class="playground dark"
      title="should render label, description and message by slotted content with error state on dark theme"
    >
      <p-multi-select [name]="'options'" [state]="'error'" [theme]="'dark'">
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
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
        <span slot="message">
          <span>
            Slotted error message. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-multi-select>
    </div>

    <div
      class="playground light"
      title="should render label, description and message by slotted content with success state"
    >
      <p-multi-select [name]="'options'" [state]="'success'">
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
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
        <span slot="message">
          <span>
            Slotted success message. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-multi-select>
    </div>
    <div
      class="playground dark"
      title="should render label, description and message by slotted content with success state on dark theme"
    >
      <p-multi-select [name]="'options'" [state]="'success'" [theme]="'dark'">
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
        <p-multi-select-option [value]="'a'">Option A</p-multi-select-option>
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
        <span slot="message">
          <span>
            Slotted success message. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
            <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </span>
      </p-multi-select>
    </div>

    <div
      class="playground light"
      title="should render with multiline label, description and message and cut off too long option text"
    >
      <p-multi-select
        [name]="'options'"
        [label]="'Lorem ipsum dolor sit amet, consetetur sadipscing'"
        [description]="'Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet'"
        [state]="'error'"
        [message]="'At vero eos et accusam et justo duo dolores et ea rebum.'"
        style="max-width: 15rem"
      >
        <p-multi-select-option [value]="'a'">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</p-multi-select-option>
        <p-multi-select-option [value]="'b'">sed diam nonumy eirmod tempor invidunt ut labore</p-multi-select-option>
        <p-multi-select-option [value]="'c'">et dolore magna aliquyam erat, sed diam voluptua</p-multi-select-option>
      </p-multi-select>
    </div>
    <div
      class="playground dark"
      title="should render with multiline label, description and message and cut off too long option text on dark theme"
    >
      <p-multi-select
        [name]="'options'"
        [label]="'Lorem ipsum dolor sit amet, consetetur sadipscing'"
        [description]="'Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet'"
        [state]="'error'"
        [message]="'At vero eos et accusam et justo duo dolores et ea rebum.'"
        [theme]="'dark'"
        style="max-width: 15rem"
      >
        <p-multi-select-option [value]="'a'">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</p-multi-select-option>
        <p-multi-select-option [value]="'b'">sed diam nonumy eirmod tempor invidunt ut labore</p-multi-select-option>
        <p-multi-select-option [value]="'c'">et dolore magna aliquyam erat, sed diam voluptua</p-multi-select-option>
      </p-multi-select>
    </div>

    <div
      class="playground light"
      title="should render in focus state and be open"
      style="padding-bottom: calc(1rem + 422px)"
    >
      <p-multi-select [label]="'Some label'" class="open">
        <p-multi-select-option [value]="'a'"
          >Multiline options could be quite long, especially on smaller screens. Let's check if the height of the option is
          displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
          top.</p-multi-select-option
        >
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
        <p-multi-select-option [value]="'d'"
          >Multiline options could be quite long, especially on smaller screens. Let's check if the height of the option is
          displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
          top.</p-multi-select-option
        >
        <p-multi-select-option [value]="'e'">Option E</p-multi-select-option>
        <p-multi-select-option [value]="'f'">Option F</p-multi-select-option>
        <p-multi-select-option [value]="'g'">Option G</p-multi-select-option>
        <p-multi-select-option [value]="'h'">Option H</p-multi-select-option>
        <p-multi-select-option [value]="'i'">Option I</p-multi-select-option>
        <p-multi-select-option [value]="'j'">Option J</p-multi-select-option>
        <p-multi-select-option [value]="'k'">Option K</p-multi-select-option>
      </p-multi-select>
    </div>
    <div
      class="playground light"
      title="should render in focus state and be open on dark theme"
      style="padding-bottom: calc(1rem + 422px)"
    >
      <p-multi-select [label]="'Some label'" [theme]="'dark'" class="open">
        <p-multi-select-option [value]="'a'"
          >Multiline options could be quite long, especially on smaller screens. Let's check if the height of the option is
          displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
          top.</p-multi-select-option
        >
        <p-multi-select-option [value]="'b'">Option B</p-multi-select-option>
        <p-multi-select-option [value]="'c'">Option C</p-multi-select-option>
        <p-multi-select-option [value]="'d'"
          >Multiline options could be quite long, especially on smaller screens. Let's check if the height of the option is
          displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
          top.</p-multi-select-option
        >
        <p-multi-select-option [value]="'e'">Option E</p-multi-select-option>
        <p-multi-select-option [value]="'f'">Option F</p-multi-select-option>
        <p-multi-select-option [value]="'g'">Option G</p-multi-select-option>
        <p-multi-select-option [value]="'h'">Option H</p-multi-select-option>
        <p-multi-select-option [value]="'i'">Option I</p-multi-select-option>
        <p-multi-select-option [value]="'j'">Option J</p-multi-select-option>
        <p-multi-select-option [value]="'k'">Option K</p-multi-select-option>
      </p-multi-select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent {}
