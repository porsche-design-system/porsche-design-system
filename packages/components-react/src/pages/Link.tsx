import { PLink } from '@porsche-design-system/components-react';

export const LinkPage = (): JSX.Element => {
  const style = `
    p-link:not(:last-child) {
      margin-right: 8px;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render primary with label">
        <PLink variant="primary" href="https://www.porsche.com">
          Some label
        </PLink>
        <PLink variant="primary">
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>
      <div className="playground dark" title="should render primary with label on dark theme">
        <PLink variant="primary" href="https://www.porsche.com" theme="dark">
          Some label
        </PLink>
        <PLink variant="primary" theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>

      <div className="playground light" title="should render primary without label">
        <PLink variant="primary" href="https://www.porsche.com" hideLabel>
          Some label
        </PLink>
        <PLink variant="primary" hideLabel>
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>
      <div className="playground dark" title="should render primary without label on dark theme">
        <PLink variant="primary" href="https://www.porsche.com" hideLabel theme="dark">
          Some label
        </PLink>
        <PLink variant="primary" hideLabel theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>

      <div className="playground light" title="should render secondary with label">
        <PLink href="https://www.porsche.com">Some label</PLink>
        <PLink>
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>
      <div className="playground dark" title="should render secondary with label on dark theme">
        <PLink theme="dark" href="https://www.porsche.com">
          Some label
        </PLink>
        <PLink theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>

      <div className="playground light" title="should render secondary without label">
        <PLink href="https://www.porsche.com" hideLabel>
          Some label
        </PLink>
        <PLink hideLabel>
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>
      <div className="playground dark" title="should render secondary without label on dark theme">
        <PLink theme="dark" href="https://www.porsche.com" hideLabel>
          Some label
        </PLink>
        <PLink hideLabel theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>

      <div className="playground light" title="should render tertiary with label">
        <PLink variant="tertiary" href="https://www.porsche.com">
          Some label
        </PLink>
        <PLink variant="tertiary">
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>
      <div className="playground dark" title="should render tertiary with label on dark theme">
        <PLink variant="tertiary" href="https://www.porsche.com" theme="dark">
          Some label
        </PLink>
        <PLink variant="tertiary" theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>

      <div className="playground light" title="should render tertiary without label">
        <PLink variant="tertiary" href="https://www.porsche.com" hideLabel>
          Some label
        </PLink>
        <PLink variant="tertiary" hideLabel>
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>
      <div className="playground dark" title="should render tertiary without label on dark theme">
        <PLink variant="tertiary" href="https://www.porsche.com" hideLabel theme="dark">
          Some label
        </PLink>
        <PLink variant="tertiary" hideLabel theme="dark">
          <a href="https://www.porsche.com">Some label</a>
        </PLink>
      </div>

      <div className="playground light" title="should render secondary with responsive label">
        <PLink
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
          href="https://www.porsche.com"
        >
          Some label
        </PLink>
      </div>

      <div className="playground light" title="should render secondary with specific icon">
        <PLink icon="phone" href="https://www.porsche.com">
          Some label
        </PLink>
        <PLink icon-source="./assets/icon-custom-kaixin.svg" href="https://www.porsche.com">
          Some label
        </PLink>
      </div>

      <div className="playground light" title="should render with multiline label">
        <PLink style={{ width: 240 }} href="https://www.porsche.com">
          Lorem ipsum dolor sit amet, consetetur sadipscing
        </PLink>
        <PLink style={{ width: 240 }}>
          <a href="https://www.porsche.com">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
        </PLink>
      </div>
    </>
  );
};
