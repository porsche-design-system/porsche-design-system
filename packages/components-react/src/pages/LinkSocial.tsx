import { PLinkSocial as LinkSocial } from '@porsche-design-system/components-react';
import React from 'react';

export const LinkSocialPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with label">
        <LinkSocial href="https://www.facebook.com" icon="logo-facebook">
          Some label
        </LinkSocial>
        <LinkSocial icon="logo-facebook">
          <a href="https://www.facebook.com">Some label</a>
        </LinkSocial>
      </div>
      <div className="playground dark" title="should render on dark theme">
        <LinkSocial href="https://www.facebook.com" icon="logo-facebook" theme="dark">
          Some label
        </LinkSocial>
        <LinkSocial icon="logo-facebook" theme="dark">
          <a href="https://www.facebook.com">Some label</a>
        </LinkSocial>
      </div>

      <div className="playground light" title="should render without label">
        <LinkSocial href="https://www.facebook.com" icon="logo-facebook" hideLabel={true}>
          Some label
        </LinkSocial>
        <LinkSocial icon="logo-facebook" hideLabel={true}>
          <a href="https://www.facebook.com">Some label</a>
        </LinkSocial>
      </div>
      <div className="playground dark" title="should render without label on dark theme">
        <LinkSocial href="https://www.facebook.com" icon="logo-facebook" hideLabel={true} theme="dark">
          Some label
        </LinkSocial>
        <LinkSocial icon="logo-facebook" hideLabel={true} theme="dark">
          <a href="https://www.facebook.com">Some label</a>
        </LinkSocial>
      </div>

      <div className="playground light" title="should render with responsive label">
        <LinkSocial
          hideLabel="{'base': true, 'xs': false, 's': true, 'm': false, 'l': true, 'xl': false}"
          href="https://www.facebook.com"
          icon="logo-facebook"
        >
          Some label
        </LinkSocial>
      </div>

      <div className="playground light" title="should render with specific icon">
        <LinkSocial icon="logo-delicious" href="https://www.delicious.com">
          Some label
        </LinkSocial>
        <LinkSocial icon-source="./assets/icon-custom-kaixin.svg" href="https://www.kaixin.com">
          Some label
        </LinkSocial>
      </div>

      <div className="playground light" title="should render with multiline label">
        <LinkSocial style={{ width: 240 }} icon="logo-facebook" href="https://www.facebook.com">
          Lorem ipsum dolor sit amet, consetetur sadipscing
        </LinkSocial>
        <LinkSocial style={{ width: 240 }} icon="logo-facebook">
          <a href="https://www.facebook.com">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
        </LinkSocial>
      </div>

      <div className="playground light" title="should render with explicit anchor tag">
        <LinkSocial icon="logo-facebook">
          <a href="https://www.facebook.com" id="test-focus-state">
            Some label
          </a>
        </LinkSocial>
      </div>
    </>
  );
};
