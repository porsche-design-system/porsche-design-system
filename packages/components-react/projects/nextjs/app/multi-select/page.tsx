/* Auto Generated File */
import type { NextPage } from 'next';
import { PMultiSelect, PMultiSelectOption } from '@porsche-design-system/components-react/ssr';

const MultiSelectPage: NextPage = (): JSX.Element => {
  const style = `
    @media only screen and (min-width: 760px) {
      #app,
      :host {
        display: grid;
        grid-template-columns: repeat(2, 50%);
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render without label and without description">
        <PMultiSelect name="options">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render without label and without description on dark theme">
        <PMultiSelect name="options" theme="dark">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render with label">
        <PMultiSelect name="options" label="Some Label">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render with label on dark theme">
        <PMultiSelect name="options" label="Some Label" theme="dark">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render with label and description">
        <PMultiSelect name="options" label="Some Label" description="Some description">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render with label and description on dark theme">
        <PMultiSelect name="options" label="Some Label" description="Some description" theme="dark">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render with responsive label and description">
        <PMultiSelect
          name="options"
          label="Hide label responsive"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render with responsive label and description">
        <PMultiSelect
          name="options"
          label="Hide label responsive"
          description="Some description"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
          theme="dark"
        >
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render in disabled state">
        <PMultiSelect name="options" label="Some Label disabled" disabled={true}>
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render in disabled state on dark theme">
        <PMultiSelect name="options" label="Some Label disabled" disabled={true} theme="dark">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render in required state">
        <PMultiSelect name="options" label="Some label required" required={true}>
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
        <PMultiSelect
          name="options"
          label="This is a very insanely super long label across multiple lines required"
          required={true}
        >
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render in required state on dark theme">
        <PMultiSelect name="options" label="Some label required" required={true} theme="dark">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
        <PMultiSelect
          name="options"
          label="This is a very insanely super long label across multiple lines required"
          required={true}
          theme="dark"
        >
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render with error state and error message">
        <PMultiSelect name="options" label="Error state" state="error" message="Some error message.">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render with error state and error message on dark theme">
        <PMultiSelect name="options" label="Error state" state="error" message="Some error message." theme="dark">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render with error state and no error message">
        <PMultiSelect name="options" label="Error state (no message)" state="error">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render with error state and no error message">
        <PMultiSelect name="options" label="Error state (no message)" state="error" theme="dark">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render with success state and success message">
        <PMultiSelect name="options" label="Success state" state="success" message="Some success message.">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render with success state and success message on dark theme">
        <PMultiSelect name="options" label="Success state" state="success" message="Some success message." theme="dark">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render with success state and no success message">
        <PMultiSelect name="options" label="Success state (no message)" state="success">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render with success state and no success message on dark theme">
        <PMultiSelect name="options" label="Success state (no message)" state="success" theme="dark">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render with default state and no message">
        <PMultiSelect
          name="options"
          label="Default state, no message should be visible"
          state="none"
          message="Some message which should not be rendered."
        >
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render with default state and no message on dark theme">
        <PMultiSelect
          name="options"
          label="Default state, no message should be visible"
          state="none"
          message="Some message which should not be rendered."
          theme="dark"
        >
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render label, description and message by slotted content with error state">
        <PMultiSelect name="options" state="error">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <span slot="message">
            <span>
              Slotted error message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PMultiSelect>
      </div>
      <div
        className="playground dark"
        title="should render label, description and message by slotted content with error state on dark theme"
      >
        <PMultiSelect name="options" state="error" theme="dark">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <span slot="message">
            <span>
              Slotted error message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PMultiSelect>
      </div>

      <div
        className="playground light"
        title="should render label, description and message by slotted content with success state"
      >
        <PMultiSelect name="options" state="success">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <span slot="message">
            <span>
              Slotted success message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PMultiSelect>
      </div>
      <div
        className="playground dark"
        title="should render label, description and message by slotted content with success state on dark theme"
      >
        <PMultiSelect name="options" state="success" theme="dark">
          <span slot="label">
            <span>
              Slotted label. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <span slot="description">
            <span>
              Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <span slot="message">
            <span>
              Slotted success message. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
              {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
            </span>
          </span>
        </PMultiSelect>
      </div>

      <div
        className="playground light"
        title="should render with multiline label, description and message and cut off too long option text"
      >
        <PMultiSelect
          name="options"
          label="Extra long label and selected option to see the text being cut off"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          style={{ maxWidth: '15rem' }}
          className="selected"
        >
          <PMultiSelectOption value="a">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</PMultiSelectOption>
          <PMultiSelectOption value="b">sed diam nonumy eirmod tempor invidunt ut labore</PMultiSelectOption>
          <PMultiSelectOption value="c">et dolore magna aliquyam erat, sed diam voluptua</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div
        className="playground dark"
        title="should render with multiline label, description and message and cut off too long option text on dark theme"
      >
        <PMultiSelect
          name="options"
          label="Extra long label and selected option to see the text being cut off"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing lorem ipsum dolor sit amet"
          state="error"
          message="At vero eos et accusam et justo duo dolores et ea rebum."
          theme="dark"
          style={{ maxWidth: '15rem' }}
          className="selected"
        >
          <PMultiSelectOption value="a">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</PMultiSelectOption>
          <PMultiSelectOption value="b">sed diam nonumy eirmod tempor invidunt ut labore</PMultiSelectOption>
          <PMultiSelectOption value="c">et dolore magna aliquyam erat, sed diam voluptua</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render unopened with selection and input focus">
        <PMultiSelect name="options" label="Selection with input focus" className="selected focus">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render unopened with selection and input focus on dark theme">
        <PMultiSelect name="options" label="Selection with input focus" theme="dark" className="selected focus">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div className="playground light" title="should render opened" style={{ paddingBottom: 'calc(1rem + 450px)' }}>
        <PMultiSelect name="options" label="Opened" dropdownDirection="down" className="open">
          <PMultiSelectOption value="a"
            >Multiline options could be quite long, especially on smaller screens. Let&apos;s check if the height of the option is
            displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
            top.</PMultiSelectOption
          >
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d"
            >Multiline options could be quite long, especially on smaller screens. Let&apos;s check if the height of the option is
            displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
            top.</PMultiSelectOption
          >
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div className="playground dark" title="should render opened on dark theme" style={{ paddingBottom: 'calc(1rem + 450px)' }}>
        <PMultiSelect name="options" label="Opened" dropdownDirection="down" theme="dark" className="open">
          <PMultiSelectOption value="a"
            >Multiline options could be quite long, especially on smaller screens. Let&apos;s check if the height of the option is
            displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
            top.</PMultiSelectOption
          >
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d"
            >Multiline options could be quite long, especially on smaller screens. Let&apos;s check if the height of the option is
            displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
            top.</PMultiSelectOption
          >
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div
        className="playground light"
        title="should render with open dropdown direction up"
        style={{ paddingTop: 'calc(1rem + 450px)' }}
      >
        <PMultiSelect name="options" label="Opened direction up" dropdownDirection="up" className="open">
          <PMultiSelectOption value="a">Should show dropdown direction up</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d"
            >Multiline options could be quite long, especially on smaller screens. Let&apos;s check if the height of the option is
            displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
            top.</PMultiSelectOption
          >
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div
        className="playground dark"
        title="should render with open dropdown direction up on dark theme"
        style={{ paddingTop: 'calc(1rem + 450px)' }}
      >
        <PMultiSelect name="options" label="Opened direction up" dropdownDirection="up" theme="dark" className="open">
          <PMultiSelectOption value="a">Should show dropdown direction up</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d"
            >Multiline options could be quite long, especially on smaller screens. Let&apos;s check if the height of the option is
            displaying correctly. Also, the checkbox-wrapper should show up on the right of the text, aligned to the
            top.</PMultiSelectOption
          >
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div
        className="playground light"
        title="should render opened and with disabled, highlighted and selected"
        style={{ paddingBottom: 'calc(1rem + 450px)' }}
      >
        <PMultiSelect
          name="options"
          label="Opened with disabled (Option A), highlighted (Option B) and selected (Option C)"
          dropdownDirection="down"
          className="open highlight selected"
        >
          <PMultiSelectOption value="a" disabled={true}>Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d">Option D</PMultiSelectOption>
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div
        className="playground dark"
        title="should render opened and with disabled, highlighted and selected on dark theme"
        style={{ paddingBottom: 'calc(1rem + 450px)' }}
      >
        <PMultiSelect
          name="options"
          label="Opened with disabled (Option A), highlighted (Option B) and selected (Option C)"
          dropdownDirection="down"
          theme="dark"
          className="open highlight selected"
        >
          <PMultiSelectOption value="a" disabled={true}>Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d">Option D</PMultiSelectOption>
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div
        className="playground light"
        title="should render opened and with multiple selected options and highlighted"
        style={{ paddingBottom: 'calc(1rem + 450px)' }}
      >
        <PMultiSelect
          name="options"
          label="Opened with multiple selected options and Option B highlighted"
          dropdownDirection="down"
          className="open selected-multiple highlight"
        >
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d">Option D</PMultiSelectOption>
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div
        className="playground dark"
        title="should render opened and with multiple selected options and highlighted on dark theme"
        style={{ paddingBottom: 'calc(1rem + 450px)' }}
      >
        <PMultiSelect
          name="options"
          label="Opened with multiple selected options and Option B highlighted"
          dropdownDirection="down"
          theme="dark"
          className="open selected-multiple highlight"
        >
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d">Option D</PMultiSelectOption>
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div
        className="playground light"
        title="should render opened with filter input and no results"
        style={{ paddingBottom: 'calc(1rem + 60px)' }}
      >
        <PMultiSelect name="options" label="Opened with no results" dropdownDirection="down" className="open no-results-1">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d">Option D</PMultiSelectOption>
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>
      <div
        className="playground dark"
        title="should render opened with filter input and no results on dark theme"
        style={{ paddingBottom: 'calc(1rem + 60px)' }}
      >
        <PMultiSelect
          name="options"
          label="Opened with no results"
          dropdownDirection="down"
          theme="dark"
          className="open no-results-2"
        >
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          <PMultiSelectOption value="d">Option D</PMultiSelectOption>
          <PMultiSelectOption value="e">Option E</PMultiSelectOption>
          <PMultiSelectOption value="f">Option F</PMultiSelectOption>
          <PMultiSelectOption value="g">Option G</PMultiSelectOption>
          <PMultiSelectOption value="h">Option H</PMultiSelectOption>
          <PMultiSelectOption value="i">Option I</PMultiSelectOption>
          <PMultiSelectOption value="j">Option J</PMultiSelectOption>
          <PMultiSelectOption value="k">Option K</PMultiSelectOption>
        </PMultiSelect>
      </div>
    </>
  );
};

export default MultiSelectPage;
