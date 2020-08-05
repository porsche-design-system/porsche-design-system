import { PLinkPure as LinkPure } from '@porsche-design-system/components-react';
import React from 'react';

export const LinkPurePage = (): JSX.Element => {
  const style = `
    .example-link {
      display: inline-block;
      outline: none;
      text-decoration: none;
    }
  `;
  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render with label">
        <LinkPure href="https://www.porsche.com">Some label</LinkPure>
        <LinkPure>
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
      </div>
      <div className="playground dark" title="should render with label on dark background">
        <LinkPure href="https://www.porsche.com" theme="dark">
          Some label
        </LinkPure>
        <LinkPure theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
      </div>

      <div className="playground light" title="should render without label">
        <LinkPure href="https://www.porsche.com" hideLabel={true}>
          Some label
        </LinkPure>
        <LinkPure hideLabel={true}>
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
      </div>
      <div className="playground dark" title="should render without label on dark background">
        <LinkPure href="https://www.porsche.com" hideLabel={true} theme="dark">
          Some label
        </LinkPure>
        <LinkPure hideLabel={true} theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
      </div>

      <div className="playground light" title="should render with responsive label">
        <LinkPure
          href="https://www.porsche.com"
          hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
        >
          Some label
        </LinkPure>
        <LinkPure
          href="https://www.porsche.com"
          hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
        >
          Some label
          <p slot="subline">Some subline</p>
        </LinkPure>
      </div>

      <div className="playground light" title="should render with different size">
        <LinkPure href="https://www.porsche.com" size="x-small">
          Some label
        </LinkPure>
        <LinkPure size="x-small">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
        <br />
        <LinkPure href="https://www.porsche.com" size="small">
          Some label
        </LinkPure>
        <LinkPure size="small">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
        <br />
        <LinkPure href="https://www.porsche.com" size="medium">
          Some label
        </LinkPure>
        <LinkPure size="medium">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
        <br />
        <LinkPure href="https://www.porsche.com" size="large">
          Some label
        </LinkPure>
        <LinkPure size="large">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
        <br />
        <LinkPure href="https://www.porsche.com" size="x-large">
          Some label
        </LinkPure>
        <LinkPure size="x-large">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
        <br />
        <LinkPure href="https://www.porsche.com" size="inherit" style={{ fontSize: 48 }}>
          Some label
        </LinkPure>
        <LinkPure size="inherit" style={{ fontSize: 48 }}>
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
      </div>

      <div className="playground light" title="should render with responsive size">
        <LinkPure
          href="https://www.porsche.com"
          size="{'base': 'x-small', 'xs': 'small', 's': 'medium', 'm': 'large', 'l': 'x-large', 'xl': 'inherit'}"
          style={{ fontSize: 48 }}
        >
          Some label
        </LinkPure>
      </div>

      <div className="playground light" title="should render with different weight">
        <LinkPure href="https://www.porsche.com" weight="thin">
          Some label
        </LinkPure>
        <LinkPure weight="thin">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
        <LinkPure href="https://www.porsche.com" weight="regular">
          Some label
        </LinkPure>
        <LinkPure weight="regular">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
        <LinkPure href="https://www.porsche.com" weight="bold">
          Some label
        </LinkPure>
        <LinkPure weight="bold">
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
      </div>

      <div className="playground light" title="should render with active state">
        <LinkPure href="https://www.porsche.com" active={true}>
          Some label
        </LinkPure>
        <LinkPure active={true}>
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
      </div>

      <div className="playground light" title="should render with specific icon">
        <LinkPure href="https://www.porsche.com" icon="phone">
          Some label
        </LinkPure>
        <LinkPure href="https://www.porsche.com" icon-source="./assets/icon-custom-kaixin.svg">
          Some label
        </LinkPure>
      </div>

      <div className="playground light" title="should render with multiline label">
        <LinkPure href="https://www.porsche.com" style={{ width: 240 }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing
        </LinkPure>
        <LinkPure style={{ width: 240 }}>
          <a href="https://www.porsche.com">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
        </LinkPure>
      </div>

      <div className="playground light" title="should render with custom clickable area">
        <LinkPure href="https://www.porsche.com" style={{ padding: '1rem' }}>
          Some label
        </LinkPure>
        <LinkPure href="https://www.porsche.com" hideLabel={true} style={{ padding: '1rem' }}>
          Some label
        </LinkPure>
        <LinkPure style={{ padding: '1rem' }}>
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
        <LinkPure hideLabel={true} style={{ padding: '1rem' }}>
          <a href="https://www.porsche.com">Some label</a>
        </LinkPure>
        <a href="https://www.porsche.com" className="example-link">
          <LinkPure style={{ padding: '1rem' }}>Some label</LinkPure>
        </a>
        <a href="https://www.porsche.com" className="example-link">
          <LinkPure hideLabel={true} style={{ padding: '1rem' }}>
            Some label
          </LinkPure>
        </a>
      </div>

      <div className="playground light" title="should render with explicit anchor tag">
        <LinkPure>
          <a href="https://www.porsche.com" id="test-focus-state">
            Some label
          </a>
        </LinkPure>
        <a className="example-link" href="#">
          <LinkPure>Some label</LinkPure>
        </a>
      </div>

      <div className="playground light" title="should render with subline">
        <LinkPure href="https://www.porsche.com" size="small">
          Some label<p slot="subline">Some subline</p>
        </LinkPure>
        <LinkPure href="https://www.porsche.com" size="medium">
          Some label<p slot="subline">Some subline</p>
        </LinkPure>
        <LinkPure href="https://www.porsche.com" size="large">
          Some label<p slot="subline">Some subline</p>
        </LinkPure>
        <LinkPure href="https://www.porsche.com" size="x-large">
          Some label<p slot="subline">Some subline</p>
        </LinkPure>
        <LinkPure size="large">
          <a href="https://www.porsche.com">Some label</a>
          <p slot="subline">Some subline</p>
        </LinkPure>
        <a href="#">
          <LinkPure size="large">
            Some label<p slot="subline">Some subline</p>
          </LinkPure>
        </a>
      </div>
    </>
  );
};
