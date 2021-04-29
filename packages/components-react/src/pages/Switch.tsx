import { PSwitch } from '@porsche-design-system/components-react';

export const SwitchPage = (): JSX.Element => {
  const style = `
  PSwitch ~ PSwitch {
    margin-top: 8px;
  }
  `;
  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render with defaults">
        <PSwitch>Some label</PSwitch>
      </div>
      <div className="playground dark" title="should render with defaults with dark theme">
        <PSwitch theme="dark">Some label</PSwitch>
      </div>

      <div className="playground light" title="should render in state checked">
        <PSwitch checked>Some label</PSwitch>
      </div>
      <div className="playground dark" title="should render in state checked mode with dark theme">
        <PSwitch checked theme="dark">
          Some label
        </PSwitch>
      </div>

      <div className="playground light" title="should render in state disabled">
        <PSwitch disabled>Some label</PSwitch>
        <PSwitch disabled checked>
          Some label
        </PSwitch>
      </div>

      <div className="playground dark" title="should render in state disabled with dark theme">
        <PSwitch disabled theme="dark">
          Some label
        </PSwitch>
        <PSwitch disabled checked theme="dark">
          Some label
        </PSwitch>
      </div>

      <div className="playground light" title="should render in state loading">
        <PSwitch loading>Some label</PSwitch>
        <PSwitch loading checked>
          Some label
        </PSwitch>
      </div>

      <div className="playground dark" title="should render in state loading with dark theme">
        <PSwitch loading theme="dark">
          Some label
        </PSwitch>
        <PSwitch loading checked theme="dark">
          Some label
        </PSwitch>
      </div>

      <div className="playground light" title="should align label to the left">
        <PSwitch alignLabel="left">Some label</PSwitch>
      </div>
      <div className="playground light" title="should align label to the left or right depending on viewport">
        <PSwitch alignLabel={{'base': 'left', 'xs': 'right', 's': 'left', 'm': 'right', 'l': 'left', 'xl': 'right'}}>
          Some label
        </PSwitch>
      </div>

      <div className="playground light" title="should render without label">
        <PSwitch hideLabel>Some label</PSwitch>
      </div>
      <div className="playground light" title="should render with or without label depending on viewport">
        <PSwitch hideLabel={{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}}>
          Some label
        </PSwitch>
      </div>

      <div className="playground light" title="should render with stretched label">
        <PSwitch stretch>Some label</PSwitch>
        <PSwitch stretch alignLabel="left">
          Some label
        </PSwitch>
      </div>
      <div className="playground light" title="should render with stretched label depending on viewport">
        <PSwitch stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>Some label</PSwitch>
      </div>

      <div className="playground light" title="should render with multiline label">
        <PSwitch style={{ width: '240px' }}>
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </PSwitch>
        <PSwitch style={{ width: '240px' }} alignLabel="left">
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </PSwitch>
      </div>
    </>
  );
};
