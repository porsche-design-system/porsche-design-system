/* Auto Generated File */
import type { NextPage } from 'next';
import { PButton } from '@porsche-design-system/components-react/ssr';

const ButtonPage: NextPage = (): JSX.Element => {
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

      <div className="playground light auto-layout" title="should render button primary with label only">
        <PButton variant="primary">Some label</PButton>
        <PButton variant="primary" loading={true}>Some label</PButton>
        <PButton variant="primary" disabled={true}>Some label</PButton>
      </div>
      <div className="playground dark auto-layout" title="should render button primary with label only on dark theme">
        <PButton variant="primary" theme="dark">Some label</PButton>
        <PButton variant="primary" theme="dark" loading={true}>Some label</PButton>
        <PButton variant="primary" theme="dark" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button primary with label and icon">
        <PButton variant="primary" icon="arrow-right">Some label</PButton>
        <PButton variant="primary" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="primary" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground dark auto-layout" title="should render button primary with label and icon on dark theme">
        <PButton variant="primary" theme="dark" icon="arrow-right">Some label</PButton>
        <PButton variant="primary" theme="dark" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="primary" theme="dark" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button primary without label">
        <PButton variant="primary" hideLabel={true} icon="arrow-right">Some label</PButton>
        <PButton variant="primary" hideLabel={true} icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="primary" hideLabel={true} icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground dark auto-layout" title="should render button primary without label on dark theme">
        <PButton variant="primary" hideLabel={true} icon="arrow-right" theme="dark">Some label</PButton>
        <PButton variant="primary" hideLabel={true} icon="arrow-right" theme="dark" loading={true}>Some label</PButton>
        <PButton variant="primary" hideLabel={true} icon="arrow-right" theme="dark" disabled={true}>Some label</PButton>
      </div>

      <div className="playground light auto-layout" title="should render button primary as default with label only">
        <PButton>Some label</PButton>
        <PButton loading={true}>Some label</PButton>
        <PButton disabled={true}>Some label</PButton>
      </div>
      <div className="playground dark auto-layout" title="should render button primary as default with label only">
        <PButton theme="dark">Some label</PButton>
        <PButton theme="dark" loading={true}>Some label</PButton>
        <PButton theme="dark" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button primary as default with label and icon">
        <PButton icon="arrow-right">Some label</PButton>
        <PButton icon="arrow-right" loading={true}>Some label</PButton>
        <PButton icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div
        className="playground dark auto-layout"
        title="should render button primary as default with label and icon on dark theme"
      >
        <PButton theme="dark" icon="arrow-right">Some label</PButton>
        <PButton theme="dark" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton theme="dark" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button primary as default without label">
        <PButton hideLabel={true} icon="arrow-right">Some label</PButton>
        <PButton hideLabel={true} icon="arrow-right" loading={true}>Some label</PButton>
        <PButton hideLabel={true} icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground dark auto-layout" title="should render button primary as default without label on dark theme">
        <PButton hideLabel={true} icon="arrow-right" theme="dark">Some label</PButton>
        <PButton hideLabel={true} icon="arrow-right" theme="dark" loading={true}>Some label</PButton>
        <PButton hideLabel={true} icon="arrow-right" theme="dark" disabled={true}>Some label</PButton>
      </div>

      <div className="playground light auto-layout" title="should render button secondary with label only">
        <PButton variant="secondary">Some label</PButton>
        <PButton variant="secondary" loading={true}>Some label</PButton>
        <PButton variant="secondary" disabled={true}>Some label</PButton>
      </div>
      <div className="playground dark auto-layout" title="should render button secondary with label only on dark theme">
        <PButton variant="secondary" theme="dark">Some label</PButton>
        <PButton variant="secondary" theme="dark" loading={true}>Some label</PButton>
        <PButton variant="secondary" theme="dark" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button secondary with label and icon">
        <PButton variant="secondary" icon="arrow-right">Some label</PButton>
        <PButton variant="secondary" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="secondary" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground dark auto-layout" title="should render button secondary with label and icon on dark theme">
        <PButton variant="secondary" theme="dark" icon="arrow-right">Some label</PButton>
        <PButton variant="secondary" theme="dark" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="secondary" theme="dark" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground light auto-layout" title="should render button secondary without label">
        <PButton variant="secondary" hideLabel={true} icon="arrow-right">Some label</PButton>
        <PButton variant="secondary" hideLabel={true} icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="secondary" hideLabel={true} icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div className="playground dark auto-layout" title="should render button secondary without label on dark theme">
        <PButton variant="secondary" hideLabel={true} icon="arrow-right" theme="dark">Some label</PButton>
        <PButton variant="secondary" hideLabel={true} icon="arrow-right" theme="dark" loading={true}>Some label</PButton>
        <PButton variant="secondary" hideLabel={true} icon="arrow-right" theme="dark" disabled={true}>Some label</PButton>
      </div>

      <div
        className="playground light auto-layout"
        title="should render button secondary if tertiary prop is set (deprecated) with label"
      >
        <PButton variant="tertiary">Some label</PButton>
        <PButton variant="tertiary" loading={true}>Some label</PButton>
        <PButton variant="tertiary" disabled={true}>Some label</PButton>
      </div>
      <div
        className="playground dark auto-layout"
        title="should render button secondary if tertiary prop is set (deprecated) with label on dark theme"
      >
        <PButton variant="tertiary" theme="dark">Some label</PButton>
        <PButton variant="tertiary" theme="dark" loading={true}>Some label</PButton>
        <PButton variant="tertiary" theme="dark" disabled={true}>Some label</PButton>
      </div>
      <div
        className="playground light auto-layout"
        title="should render button secondary if tertiary prop is set (deprecated) with label and icon"
      >
        <PButton variant="tertiary" icon="arrow-right">Some label</PButton>
        <PButton variant="tertiary" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="tertiary" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div
        className="playground dark auto-layout"
        title="should render button secondary if tertiary prop is set (deprecated) with label and icon on dark theme"
      >
        <PButton variant="tertiary" theme="dark" icon="arrow-right">Some label</PButton>
        <PButton variant="tertiary" theme="dark" icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="tertiary" theme="dark" icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div
        className="playground light auto-layout"
        title="should render button secondary if tertiary prop is set (deprecated) without label"
      >
        <PButton variant="tertiary" hideLabel={true} icon="arrow-right">Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} icon="arrow-right" loading={true}>Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} icon="arrow-right" disabled={true}>Some label</PButton>
      </div>
      <div
        className="playground dark auto-layout"
        title="should render button secondary if tertiary prop is set (deprecated) without label on dark theme"
      >
        <PButton variant="tertiary" hideLabel={true} icon="arrow-right" theme="dark">Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} icon="arrow-right" theme="dark" loading={true}>Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} icon="arrow-right" theme="dark" disabled={true}>Some label</PButton>
      </div>

      <div className="playground light auto-layout" title="should render button primary with responsive label">
        <PButton hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }} icon="arrow-right"
          >Some label</PButton
        >
      </div>

      <div className="playground dark auto-layout" title="should render button primary with responsive label on dark theme">
        <PButton
          theme="dark"
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
          icon="arrow-right"
          >Some label</PButton
        >
      </div>

      <div className="playground light auto-layout" title="should render button with specific icon">
        <PButton icon="delete">Some label</PButton>
        <PButton iconSource="./assets/icon-custom-kaixin.svg">Some label</PButton>
        <PButton icon="delete" variant="primary">Some label</PButton>
        <PButton iconSource="./assets/icon-custom-kaixin.svg" variant="primary">Some label</PButton>
        <PButton icon="delete" variant="tertiary">Some label</PButton>
        <PButton iconSource="./assets/icon-custom-kaixin.svg" variant="tertiary">Some label</PButton>
      </div>

      <div className="playground dark auto-layout" title="should render button with specific icon on dark theme">
        <PButton theme="dark" icon="delete">Some label</PButton>
        <PButton theme="dark" iconSource="./assets/icon-custom-kaixin.svg">Some label</PButton>
        <PButton theme="dark" icon="delete" variant="primary">Some label</PButton>
        <PButton theme="dark" iconSource="./assets/icon-custom-kaixin.svg" variant="primary">Some label</PButton>
        <PButton theme="dark" icon="delete" variant="tertiary">Some label</PButton>
        <PButton theme="dark" iconSource="./assets/icon-custom-kaixin.svg" variant="tertiary">Some label</PButton>
      </div>

      <div className="playground light auto-layout" title="should render button with multiline label">
        <PButton style={{ width: '15rem' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
        <PButton style={{ width: '15rem' }} icon="arrow-right">Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
        <PButton style={{ width: '15rem' }} icon="arrow-right" loading={true}
          >Lorem ipsum dolor sit amet, consetetur sadipscing</PButton
        >
      </div>

      <div className="playground dark auto-layout" title="should render button with multiline label on dark theme">
        <PButton theme="dark" style={{ width: '15rem' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
        <PButton theme="dark" style={{ width: '15rem' }} icon="arrow-right"
          >Lorem ipsum dolor sit amet, consetetur sadipscing</PButton
        >
        <PButton theme="dark" style={{ width: '15rem' }} icon="arrow-right" loading={true}
          >Lorem ipsum dolor sit amet, consetetur sadipscing</PButton
        >
      </div>

      <div className="playground light auto-layout" title="should render button with centered text/icon if set to 100% width">
        <PButton variant="primary" style={{ width: '100%' }}>Some label</PButton>
        <PButton variant="primary" icon="arrow-right" style={{ width: '100%' }}>Some label</PButton>
        <PButton variant="primary" hideLabel={true} icon="arrow-right" style={{ width: '100%' }}>Some label</PButton>
        <PButton variant="primary" loading={true} style={{ width: '100%' }}>Some label</PButton>
        <PButton variant="primary" disabled={true} style={{ width: '100%' }}>Some label</PButton>
      </div>

      <div
        className="playground dark auto-layout"
        title="should render button with centered text/icon if set to 100% width on dark theme"
      >
        <PButton theme="dark" variant="primary" style={{ width: '100%' }}>Some label</PButton>
        <PButton theme="dark" variant="primary" icon="arrow-right" style={{ width: '100%' }}>Some label</PButton>
        <PButton theme="dark" variant="primary" hideLabel={true} icon="arrow-right" style={{ width: '100%' }}
          >Some label</PButton
        >
        <PButton theme="dark" variant="primary" loading={true} style={{ width: '100%' }}>Some label</PButton>
        <PButton theme="dark" variant="primary" disabled={true} style={{ width: '100%' }}>Some label</PButton>
      </div>
    </>
  );
};

export default ButtonPage;
