import { PButton } from '@porsche-design-system/components-react';

export const ButtonPage = (): JSX.Element => {
  const style = `
    p-button:not(:last-child) {
      margin-right: 0.5rem;
    }
  `;
  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render button primary with label">
        <PButton variant="primary">Some label</PButton>
        <PButton variant="primary" disabled>
          Some label
        </PButton>
        <PButton variant="primary" loading>
          Some label
        </PButton>
      </div>
      <div className="playground dark" title="should render button primary with label on dark theme">
        <PButton variant="primary" theme="dark">
          Some label
        </PButton>
        <PButton variant="primary" theme="dark" disabled>
          Some label
        </PButton>
        <PButton variant="primary" theme="dark" loading>
          Some label
        </PButton>
      </div>

      <div className="playground light" title="should render button primary without label">
        <PButton variant="primary" hideLabel>
          Some label
        </PButton>
        <PButton variant="primary" hideLabel disabled>
          Some label
        </PButton>
        <PButton variant="primary" hideLabel loading>
          Some label
        </PButton>
      </div>
      <div className="playground dark" title="should render button primary without label on dark theme">
        <PButton variant="primary" hideLabel theme="dark">
          Some label
        </PButton>
        <PButton variant="primary" hideLabel theme="dark" disabled>
          Some label
        </PButton>
        <PButton variant="primary" hideLabel theme="dark" loading>
          Some label
        </PButton>
      </div>

      <div className="playground light" title="should render button secondary with label">
        <PButton>Some label</PButton>
        <PButton disabled>Some label</PButton>
        <PButton loading>Some label</PButton>
      </div>
      <div className="playground dark" title="should render button secondary with label on dark theme">
        <PButton theme="dark">Some label</PButton>
        <PButton theme="dark" disabled>
          Some label
        </PButton>
        <PButton theme="dark" loading>
          Some label
        </PButton>
      </div>

      <div className="playground light" title="should render button secondary without label">
        <PButton hideLabel>Some label</PButton>
        <PButton hideLabel disabled>
          Some label
        </PButton>
        <PButton hideLabel loading>
          Some label
        </PButton>
      </div>
      <div className="playground dark" title="should render button secondary without label on dark theme">
        <PButton hideLabel theme="dark">
          Some label
        </PButton>
        <PButton hideLabel theme="dark" disabled>
          Some label
        </PButton>
        <PButton hideLabel theme="dark" loading>
          Some label
        </PButton>
      </div>

      <div className="playground light" title="should render button tertiary with label">
        <PButton variant="tertiary">Some label</PButton>
        <PButton variant="tertiary" disabled>
          Some label
        </PButton>
        <PButton variant="tertiary" loading>
          Some label
        </PButton>
      </div>
      <div className="playground dark" title="should render button tertiary with label on dark theme">
        <PButton variant="tertiary" theme="dark">
          Some label
        </PButton>
        <PButton variant="tertiary" theme="dark" disabled>
          Some label
        </PButton>
        <PButton variant="tertiary" theme="dark" loading>
          Some label
        </PButton>
      </div>

      <div className="playground light" title="should render button tertiary without label">
        <PButton variant="tertiary" hideLabel>
          Some label
        </PButton>
        <PButton variant="tertiary" hideLabel disabled>
          Some label
        </PButton>
        <PButton variant="tertiary" hideLabel loading>
          Some label
        </PButton>
      </div>
      <div className="playground dark" title="should render button tertiary without label on dark theme">
        <PButton variant="tertiary" hideLabel theme="dark">
          Some label
        </PButton>
        <PButton variant="tertiary" hideLabel theme="dark" disabled>
          Some label
        </PButton>
        <PButton variant="tertiary" hideLabel theme="dark" loading>
          Some label
        </PButton>
      </div>

      <div className="playground light" title="should render button secondary with responsive label">
        <PButton hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>Some label</PButton>
      </div>

      <div className="playground light" title="should render button secondary with specific icon">
        <PButton icon="delete">Some label</PButton>
        <PButton iconSource="./assets/icon-custom-kaixin.svg">Some label</PButton>
      </div>

      <div className="playground light" title="should render button with multiline label">
        <PButton style={{ width: 240 }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
      </div>
    </>
  );
};
