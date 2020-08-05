import { PLink as Link } from '@porsche-design-system/components-react';
import React from 'react';

export const LinkPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render primary with label">
        <Link variant="primary" href="https://www.porsche.com">
          Some label
        </Link>
        <Link variant="primary">
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>
      <div className="playground dark" title="should render primary with label on dark theme">
        <Link variant="primary" href="https://www.porsche.com" theme="dark">
          Some label
        </Link>
        <Link variant="primary" theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>

      <div className="playground light" title="should render primary without label">
        <Link variant="primary" href="https://www.porsche.com" hideLabel={true}>
          Some label
        </Link>
        <Link variant="primary" hideLabel={true}>
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>
      <div className="playground dark" title="should render primary without label on dark theme">
        <Link variant="primary" href="https://www.porsche.com" hideLabel={true} theme="dark">
          Some label
        </Link>
        <Link variant="primary" hideLabel={true} theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>

      <div className="playground light" title="should render secondary with label">
        <Link href="https://www.porsche.com">Some label</Link>
        <Link>
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>
      <div className="playground dark" title="should render secondary with label on dark theme">
        <Link theme="dark" href="https://www.porsche.com">
          Some label
        </Link>
        <Link theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>

      <div className="playground light" title="should render secondary without label">
        <Link href="https://www.porsche.com" hideLabel={true}>
          Some label
        </Link>
        <Link hideLabel={true}>
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>
      <div className="playground dark" title="should render secondary without label on dark theme">
        <Link theme="dark" href="https://www.porsche.com" hideLabel={true}>
          Some label
        </Link>
        <Link hideLabel={true} theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>

      <div className="playground light" title="should render tertiary with label">
        <Link variant="tertiary" href="https://www.porsche.com">
          Some label
        </Link>
        <Link variant="tertiary">
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>
      <div className="playground dark" title="should render tertiary with label on dark theme">
        <Link variant="tertiary" href="https://www.porsche.com" theme="dark">
          Some label
        </Link>
        <Link variant="tertiary" theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>

      <div className="playground light" title="should render tertiary without label">
        <Link variant="tertiary" href="https://www.porsche.com" hideLabel={true}>
          Some label
        </Link>
        <Link variant="tertiary" hideLabel={true}>
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>
      <div className="playground dark" title="should render tertiary without label on dark theme">
        <Link variant="tertiary" href="https://www.porsche.com" hideLabel={true} theme="dark">
          Some label
        </Link>
        <Link variant="tertiary" hideLabel={true} theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </Link>
      </div>

      <div className="playground light" title="should render secondary with responsive label">
        <Link
          hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
          href="https://www.porsche.com"
        >
          Some label
        </Link>
      </div>

      <div className="playground light" title="should render secondary with specific icon">
        <Link icon="phone" href="https://www.porsche.com">
          Some label
        </Link>
        <Link icon-source="./assets/icon-custom-kaixin.svg" href="https://www.porsche.com">
          Some label
        </Link>
      </div>

      <div className="playground light" title="should render with multiline label">
        <Link style={{ width: 240 }} href="https://www.porsche.com">
          Lorem ipsum dolor sit amet, consetetur sadipscing
        </Link>
        <Link style={{ width: 240 }}>
          <a href="https://www.porsche.com">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
        </Link>
      </div>

      <div className="playground light" title="should render with explicit anchor tag">
        <Link>
          <a href="https://www.porsche.com" id="test-focus-state">
            Some label
          </a>
        </Link>
      </div>
    </>
  );
};
