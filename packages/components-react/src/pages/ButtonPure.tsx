import { PButtonPure as ButtonPure } from '@porsche-design-system/components-react';
import React from 'react';

export const ButtonPurePage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render button with label">
        <ButtonPure>Some label</ButtonPure>
        <ButtonPure disabled={true}>Some label</ButtonPure>
        <ButtonPure loading={true}>Some label</ButtonPure>
      </div>
      <div className="playground dark" title="should render button with label on dark theme">
        <ButtonPure theme="dark">Some label</ButtonPure>
        <ButtonPure disabled={true} theme="dark">
          Some label
        </ButtonPure>
        <ButtonPure loading={true} theme="dark">
          Some label
        </ButtonPure>
      </div>

      <div className="playground light" title="should render button without label">
        <ButtonPure hideLabel={true}>Some label</ButtonPure>
        <ButtonPure hideLabel={true} disabled={true}>
          Some label
        </ButtonPure>
        <ButtonPure hideLabel={true} loading={true}>
          Some label
        </ButtonPure>
      </div>
      <div className="playground dark" title="should render button without label on dark theme">
        <ButtonPure hideLabel={true} theme="dark">
          Some label
        </ButtonPure>
        <ButtonPure hideLabel={true} disabled={true} theme="dark">
          Some label
        </ButtonPure>
        <ButtonPure hideLabel={true} loading={true} theme="dark">
          Some label
        </ButtonPure>
      </div>

      <div className="playground light" title="should render button with responsive label">
        <ButtonPure hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}">
          Some label
        </ButtonPure>
        <ButtonPure hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}">
          Some label
          <p slot="subline">Some subline</p>
        </ButtonPure>
      </div>

      <div className="playground light" title="should render button with different size">
        <ButtonPure size="x-small">Some label</ButtonPure>
        <br />
        <ButtonPure size="small">Some label</ButtonPure>
        <br />
        <ButtonPure size="medium">Some label</ButtonPure>
        <br />
        <ButtonPure size="large">Some label</ButtonPure>
        <br />
        <ButtonPure size="x-large">Some label</ButtonPure>
        <br />
        <ButtonPure size="inherit" style={{ fontSize: 48 }}>
          Some label
        </ButtonPure>
      </div>

      <div className="playground light" title="should render button with responsive size">
        <ButtonPure
          size="{'base': 'x-small', 'xs': 'small', 's': 'medium', 'm': 'large', 'l': 'x-large', 'xl': 'inherit'}"
          style={{ fontSize: 48 }}
        >
          Some label
        </ButtonPure>
      </div>

      <div className="playground light" title="should render button with different weight">
        <ButtonPure weight="thin">Some label</ButtonPure>
        <ButtonPure weight="regular">Some label</ButtonPure>
        <ButtonPure weight="semibold">Some label</ButtonPure>
        <ButtonPure weight="bold">Some label</ButtonPure>
      </div>

      <div className="playground light" title="should render button with specific icon">
        <ButtonPure icon="delete">Some label</ButtonPure>
        <ButtonPure icon-source="./assets/icon-custom-kaixin.svg">Some label</ButtonPure>
      </div>

      <div className="playground light" title="should render button with multiline label">
        <ButtonPure style={{ width: 240 }}>Lorem ipsum dolor sit amet, consetetur sadipscing</ButtonPure>
      </div>

      <div className="playground light" title="should render button-pure with custom clickable area">
        <ButtonPure style={{ padding: '1rem' }}>Some label</ButtonPure>
        <ButtonPure hideLabel={true} style={{ padding: '1rem' }}>
          Some label
        </ButtonPure>
      </div>

      <div className="playground light" title="should render with subline">
        <ButtonPure size="small">
          Some label<p slot="subline">Some subline</p>
        </ButtonPure>
        <ButtonPure size="medium">
          Some label<p slot="subline">Some subline</p>
        </ButtonPure>
        <ButtonPure size="large">
          Some label<p slot="subline">Some subline</p>
        </ButtonPure>
        <ButtonPure size="x-large">
          Some label<p slot="subline">Some subline</p>
        </ButtonPure>
        <ButtonPure size="medium" disabled={true}>
          Some label<p slot="subline">Some subline</p>
        </ButtonPure>
      </div>
    </>
  );
};
