/* Auto Generated File */
import { PSwitch } from '@porsche-design-system/components-react';

export const SwitchPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light auto-layout" title="should render with defaults">
        <PSwitch>Some label</PSwitch>
      </div>

      <div className="playground light auto-layout" title="should render in state checked">
        <PSwitch checked={true}>Some label</PSwitch>
      </div>

      <div className="playground light auto-layout" title="should render in state disabled">
        <PSwitch disabled={true}>Some label</PSwitch>
        <PSwitch disabled={true} checked={true}>Some label</PSwitch>
      </div>

      <div className="playground light auto-layout" title="should render in state loading">
        <PSwitch loading={true}>Some label</PSwitch>
        <PSwitch loading={true} checked={true}>Some label</PSwitch>
      </div>

      <div className="playground light auto-layout" title="should align label to the left">
        <PSwitch alignLabel="left">Some label</PSwitch>
      </div>

      <div className="playground light auto-layout" title="should align label to the left or right depending on viewport">
        <PSwitch alignLabel={{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }}>
          Some label
        </PSwitch>
      </div>

      <div className="playground light auto-layout" title="should render without label">
        <PSwitch hideLabel={true}>Some label</PSwitch>
      </div>
      <div className="playground light auto-layout" title="should render with or without label depending on viewport">
        <PSwitch hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>Some label</PSwitch>
      </div>

      <div className="playground light auto-layout" title="should render with stretched label">
        <PSwitch stretch={true}>Some label</PSwitch>
        <PSwitch stretch={true} alignLabel="left">Some label</PSwitch>
      </div>
      <div className="playground light auto-layout" title="should render with stretched label depending on viewport">
        <PSwitch stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>Some label</PSwitch>
      </div>

      <div className="playground light" title="should render with multiline label">
        <PSwitch style={{ maxWidth: '15rem' }}>
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </PSwitch>
        <PSwitch style={{ maxWidth: '15rem' }} alignLabel="left">
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </PSwitch>
      </div>

      <div className="playground light auto-layout" title="should render with slotted and deeply nested anchor">
        <PSwitch>
          <span>
            Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PSwitch>
      </div>
    </>
  );
};
