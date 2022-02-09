/* Auto Generated File */
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
        <PButton variant="primary" disabled={true}>Some label</PButton>
        <PButton variant="primary" loading={true}>Some label</PButton>
      </div>
      <div className="playground dark" title="should render button primary with label on dark theme">
        <PButton variant="primary" theme="dark">Some label</PButton>
        <PButton variant="primary" theme="dark" disabled={true}>Some label</PButton>
        <PButton variant="primary" theme="dark" loading={true}>Some label</PButton>
      </div>

      <div className="playground light" title="should render button primary without label">
        <PButton variant="primary" hideLabel={true}>Some label</PButton>
        <PButton variant="primary" hideLabel={true} disabled={true}>Some label</PButton>
        <PButton variant="primary" hideLabel={true} loading={true}>Some label</PButton>
      </div>
      <div className="playground dark" title="should render button primary without label on dark theme">
        <PButton variant="primary" hideLabel={true} theme="dark">Some label</PButton>
        <PButton variant="primary" hideLabel={true} theme="dark" disabled={true}>Some label</PButton>
        <PButton variant="primary" hideLabel={true} theme="dark" loading={true}>Some label</PButton>
      </div>

      <div className="playground light" title="should render button secondary with label">
        <PButton>Some label</PButton>
        <PButton disabled={true}>Some label</PButton>
        <PButton loading={true}>Some label</PButton>
      </div>
      <div className="playground dark" title="should render button secondary with label on dark theme">
        <PButton theme="dark">Some label</PButton>
        <PButton theme="dark" disabled={true}>Some label</PButton>
        <PButton theme="dark" loading={true}>Some label</PButton>
      </div>

      <div className="playground light" title="should render button secondary without label">
        <PButton hideLabel={true}>Some label</PButton>
        <PButton hideLabel={true} disabled={true}>Some label</PButton>
        <PButton hideLabel={true} loading={true}>Some label</PButton>
      </div>
      <div className="playground dark" title="should render button secondary without label on dark theme">
        <PButton hideLabel={true} theme="dark">Some label</PButton>
        <PButton hideLabel={true} theme="dark" disabled={true}>Some label</PButton>
        <PButton hideLabel={true} theme="dark" loading={true}>Some label</PButton>
      </div>

      <div className="playground light" title="should render button tertiary with label">
        <PButton variant="tertiary">Some label</PButton>
        <PButton variant="tertiary" disabled={true}>Some label</PButton>
        <PButton variant="tertiary" loading={true}>Some label</PButton>
      </div>
      <div className="playground dark" title="should render button tertiary with label on dark theme">
        <PButton variant="tertiary" theme="dark">Some label</PButton>
        <PButton variant="tertiary" theme="dark" disabled={true}>Some label</PButton>
        <PButton variant="tertiary" theme="dark" loading={true}>Some label</PButton>
      </div>

      <div className="playground light" title="should render button tertiary without label">
        <PButton variant="tertiary" hideLabel={true}>Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} disabled={true}>Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} loading={true}>Some label</PButton>
      </div>
      <div className="playground dark" title="should render button tertiary without label on dark theme">
        <PButton variant="tertiary" hideLabel={true} theme="dark">Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} theme="dark" disabled={true}>Some label</PButton>
        <PButton variant="tertiary" hideLabel={true} theme="dark" loading={true}>Some label</PButton>
      </div>

      <div className="playground light" title="should render button secondary with responsive label">
        <PButton hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}>Some label</PButton>
      </div>

      <div className="playground light" title="should render button secondary with specific icon">
        <PButton icon="delete">Some label</PButton>
        <PButton iconSource="./assets/icon-custom-kaixin.svg">Some label</PButton>
      </div>

      <div className="playground light" title="should render button with multiline label">
        <PButton style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
      </div>
    </>
  );
};
