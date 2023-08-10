/* Auto Generated File */
import type { NextPage } from 'next';
import { PSwitch } from '@porsche-design-system/components-react/ssr';

const SwitchPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light auto-layout" title="should render with defaults">
        <PSwitch>Some label</PSwitch>
      </div>
      <div className="playground dark auto-layout" title="should render with defaults with dark theme">
        <PSwitch theme="dark">Some label</PSwitch>
      </div>

      <div className="playground light auto-layout" title="should render in state checked">
        <PSwitch checked={true}>Some label</PSwitch>
      </div>
      <div className="playground dark auto-layout" title="should render in state checked mode with dark theme">
        <PSwitch checked={true} theme="dark">Some label</PSwitch>
      </div>

      <div className="playground light auto-layout" title="should render in state disabled">
        <PSwitch disabled={true}>Some label</PSwitch>
        <PSwitch disabled={true} checked={true}>Some label</PSwitch>
      </div>

      <div className="playground dark auto-layout" title="should render in state disabled with dark theme">
        <PSwitch disabled={true} theme="dark">Some label</PSwitch>
        <PSwitch disabled={true} checked={true} theme="dark">Some label</PSwitch>
      </div>

      <div className="playground light auto-layout" title="should render in state loading">
        <PSwitch loading={true}>Some label</PSwitch>
        <PSwitch loading={true} checked={true}>Some label</PSwitch>
      </div>

      <div className="playground dark auto-layout" title="should render in state loading with dark theme">
        <PSwitch loading={true} theme="dark">Some label</PSwitch>
        <PSwitch loading={true} checked={true} theme="dark">Some label</PSwitch>
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
          This is the first time I&apos;ve seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It&apos;s a long one.
        </PSwitch>
        <PSwitch style={{ maxWidth: '15rem' }} alignLabel="left">
          This is the first time I&apos;ve seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It&apos;s a long one.
        </PSwitch>
      </div>

      <div
        className="playground light auto-layout"
        title="should render with slotted and deeply nested anchor on light background"
      >
        <PSwitch>
          <span>
            Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PSwitch>
      </div>

      <div className="playground dark auto-layout" title="should render with slotted and deeply nested anchor on dark background">
        <PSwitch theme="dark">
          <span>
            Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PSwitch>
      </div>
    </>
  );
};

export default SwitchPage;
