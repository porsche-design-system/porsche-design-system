import { PButton as Button } from '@porsche-design-system/components-react';
import React from 'react';

export const ButtonPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render button primary with label">
        <Button variant="primary">Some label</Button>
        <Button variant="primary" disabled={true}>
          Some label
        </Button>
        <Button variant="primary" loading={true}>
          Some label
        </Button>
      </div>
      <div className="playground dark" title="should render button primary with label on dark theme">
        <Button variant="primary" theme="dark">
          Some label
        </Button>
        <Button variant="primary" theme="dark" disabled={true}>
          Some label
        </Button>
        <Button variant="primary" theme="dark" loading={true}>
          Some label
        </Button>
      </div>

      <div className="playground light" title="should render button primary without label">
        <Button variant="primary" hideLabel={true}>
          Some label
        </Button>
        <Button variant="primary" hideLabel={true} disabled={true}>
          Some label
        </Button>
        <Button variant="primary" hideLabel={true} loading={true}>
          Some label
        </Button>
      </div>
      <div className="playground dark" title="should render button primary without label on dark theme">
        <Button variant="primary" hideLabel={true} theme="dark">
          Some label
        </Button>
        <Button variant="primary" hideLabel={true} theme="dark" disabled={true}>
          Some label
        </Button>
        <Button variant="primary" hideLabel={true} theme="dark" loading={true}>
          Some label
        </Button>
      </div>

      <div className="playground light" title="should render button secondary with label">
        <Button>Some label</Button>
        <Button disabled={true}>Some label</Button>
        <Button loading={true}>Some label</Button>
      </div>
      <div className="playground dark" title="should render button secondary with label on dark theme">
        <Button theme="dark">Some label</Button>
        <Button theme="dark" disabled={true}>
          Some label
        </Button>
        <Button theme="dark" loading={true}>
          Some label
        </Button>
      </div>

      <div className="playground light" title="should render button secondary without label">
        <Button hideLabel={true}>Some label</Button>
        <Button hideLabel={true} disabled={true}>
          Some label
        </Button>
        <Button hideLabel={true} loading={true}>
          Some label
        </Button>
      </div>
      <div className="playground dark" title="should render button secondary without label on dark theme">
        <Button hideLabel={true} theme="dark">
          Some label
        </Button>
        <Button hideLabel={true} theme="dark" disabled={true}>
          Some label
        </Button>
        <Button hideLabel={true} theme="dark" loading={true}>
          Some label
        </Button>
      </div>

      <div className="playground light" title="should render button tertiary with label">
        <Button variant="tertiary">Some label</Button>
        <Button variant="tertiary" disabled={true}>
          Some label
        </Button>
        <Button variant="tertiary" loading={true}>
          Some label
        </Button>
      </div>
      <div className="playground dark" title="should render button tertiary with label on dark theme">
        <Button variant="tertiary" theme="dark">
          Some label
        </Button>
        <Button variant="tertiary" theme="dark" disabled={true}>
          Some label
        </Button>
        <Button variant="tertiary" theme="dark" loading={true}>
          Some label
        </Button>
      </div>

      <div className="playground light" title="should render button tertiary without label">
        <Button variant="tertiary" hideLabel={true}>
          Some label
        </Button>
        <Button variant="tertiary" hideLabel={true} disabled={true}>
          Some label
        </Button>
        <Button variant="tertiary" hideLabel={true} loading={true}>
          Some label
        </Button>
      </div>
      <div className="playground dark" title="should render button tertiary without label on dark theme">
        <Button variant="tertiary" hideLabel={true} theme="dark">
          Some label
        </Button>
        <Button variant="tertiary" hideLabel={true} theme="dark" disabled={true}>
          Some label
        </Button>
        <Button variant="tertiary" hideLabel={true} theme="dark" loading={true}>
          Some label
        </Button>
      </div>

      <div className="playground light" title="should render button secondary with responsive label">
        <Button hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}">
          Some label
        </Button>
      </div>

      <div className="playground light" title="should render button secondary with specific icon">
        <Button icon="delete">Some label</Button>
        <Button icon-source="./assets/icon-custom-kaixin.svg">Some label</Button>
      </div>

      <div className="playground light" title="should render button with multiline label">
        <Button style={{ width: 240 }}>Lorem ipsum dolor sit amet, consetetur sadipscing</Button>
      </div>
    </>
  );
};
