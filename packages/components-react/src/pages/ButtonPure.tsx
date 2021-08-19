import { PButtonPure } from '@porsche-design-system/components-react';

export const ButtonPurePage = (): JSX.Element => {
  const style = `
    p-button-pure:not(:last-child) {
      margin-right: 8px;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render button with label">
        <PButtonPure>Some label</PButtonPure>
        <PButtonPure disabled>Some label</PButtonPure>
        <PButtonPure loading>Some label</PButtonPure>
      </div>
      <div className="playground dark" title="should render button with label on dark theme">
        <PButtonPure theme="dark">Some label</PButtonPure>
        <PButtonPure disabled theme="dark">
          Some label
        </PButtonPure>
        <PButtonPure loading theme="dark">
          Some label
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button without label">
        <PButtonPure hideLabel>Some label</PButtonPure>
        <PButtonPure hideLabel disabled>
          Some label
        </PButtonPure>
        <PButtonPure hideLabel loading>
          Some label
        </PButtonPure>
      </div>
      <div className="playground dark" title="should render button without label on dark theme">
        <PButtonPure hideLabel theme="dark">
          Some label
        </PButtonPure>
        <PButtonPure hideLabel disabled theme="dark">
          Some label
        </PButtonPure>
        <PButtonPure hideLabel loading theme="dark">
          Some label
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button with responsive label">
        <PButtonPure hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          Some label
        </PButtonPure>
        <PButtonPure hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          Some label
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button with different size">
        <PButtonPure size="x-small">Some label</PButtonPure>
        <br />
        <PButtonPure size="small">Some label</PButtonPure>
        <br />
        <PButtonPure size="medium">Some label</PButtonPure>
        <br />
        <PButtonPure size="large">Some label</PButtonPure>
        <br />
        <PButtonPure size="x-large">Some label</PButtonPure>
        <br />
        <PButtonPure size="inherit" style={{ fontSize: 48 }}>
          Some label
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button with responsive size">
        <PButtonPure
          size={{ base: 'x-small', xs: 'small', s: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }}
          style={{ fontSize: 48 }}
        >
          Some label
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button with different weight">
        <PButtonPure weight="thin">Some label</PButtonPure>
        <PButtonPure weight="regular">Some label</PButtonPure>
        <PButtonPure weight="semibold">Some label</PButtonPure>
        <PButtonPure weight="bold">Some label</PButtonPure>
      </div>

      <div className="playground light" title="should render button with specific icon">
        <PButtonPure icon="delete">Some label</PButtonPure>
        <PButtonPure iconSource="./assets/icon-custom-kaixin.svg">Some label</PButtonPure>
      </div>

      <div className="playground light" title="should render button with multiline label">
        <PButtonPure style={{ width: 240 }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButtonPure>
      </div>

      <div className="playground light" title="should render button-pure with custom clickable area">
        <PButtonPure style={{ padding: '1rem' }}>Some label</PButtonPure>
        <PButtonPure hideLabel style={{ padding: '1rem' }}>
          Some label
        </PButtonPure>
      </div>

      <div className="playground light" title="should render with subline">
        <PButtonPure size="small">
          Some label<p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure size="medium">
          Some label<p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure size="large">
          Some label<p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure size="x-large">
          Some label<p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure size="medium" disabled>
          Some label<p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground light" title="should render with no icon">
        <PButtonPure icon="none">Without icon</PButtonPure>
        <PButtonPure size="small" icon="none">
          Without icon
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground light" title="should render icon if hide-label and icon none is set">
        <PButtonPure hide-label={true} icon="none">
          With hideLabel and no icon
        </PButtonPure>
        <PButtonPure hide-label={true} size="small" icon="none">
          With hideLabel and no icon
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>

      <div className="playground light" title="should align label to the left">
        <PButtonPure alignLabel="left">Align-label left</PButtonPure>
      </div>
      <div className="playground light" title="should align label to the left or right depending on viewport">
        <PButtonPure alignLabel={{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }}>
          With breakpoint customizable align-label
        </PButtonPure>
      </div>

      <div className="playground light" title="should render with stretched label">
        <PButtonPure stretch={true}>Stretched icon left</PButtonPure>
        <PButtonPure stretch={true} alignLabel="left">
          Stretched icon right
        </PButtonPure>
      </div>
      <div className="playground light" title="should render with stretched label depending on viewport">
        <PButtonPure stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>
          Stretched depending on viewport
        </PButtonPure>
      </div>

      <div className="playground light" title="should not align label left or stretch if it has a subline">
        <PButtonPure alignLabel="left">
          With align-label and subline
          <p slot="subline">Some subline</p>
        </PButtonPure>
        <PButtonPure stretch={true}>
          With stretch and subline
          <p slot="subline">Some subline</p>
        </PButtonPure>
      </div>
    </>
  );
};
