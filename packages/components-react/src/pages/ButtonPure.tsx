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
        <PButtonPure disabled={true}>Some label</PButtonPure>
        <PButtonPure loading={true}>Some label</PButtonPure>
      </div>
      <div className="playground dark" title="should render button with label on dark theme">
        <PButtonPure theme="dark">Some label</PButtonPure>
        <PButtonPure disabled={true} theme="dark">
          Some label
        </PButtonPure>
        <PButtonPure loading={true} theme="dark">
          Some label
        </PButtonPure>
      </div>

      <div className="playground light" title="should render button without label">
        <PButtonPure hideLabel={true}>Some label</PButtonPure>
        <PButtonPure hideLabel={true} disabled={true}>
          Some label
        </PButtonPure>
        <PButtonPure hideLabel={true} loading={true}>
          Some label
        </PButtonPure>
      </div>
      <div className="playground dark" title="should render button without label on dark theme">
        <PButtonPure hideLabel={true} theme="dark">
          Some label
        </PButtonPure>
        <PButtonPure hideLabel={true} disabled={true} theme="dark">
          Some label
        </PButtonPure>
        <PButtonPure hideLabel={true} loading={true} theme="dark">
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
        <PButtonPure icon-source="./assets/icon-custom-kaixin.svg">Some label</PButtonPure>
      </div>

      <div className="playground light" title="should render button with multiline label">
        <PButtonPure style={{ width: 240 }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButtonPure>
      </div>

      <div className="playground light" title="should render button-pure with custom clickable area">
        <PButtonPure style={{ padding: '1rem' }}>Some label</PButtonPure>
        <PButtonPure hideLabel={true} style={{ padding: '1rem' }}>
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
        <PButtonPure size="medium" disabled={true}>
          Some label<p slot="subline">Some subline</p>
        </PButtonPure>
      </div>
    </>
  );
};
