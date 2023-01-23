/* Auto Generated File */
import type { NextPage } from 'next';
import { PLinkSocial } from '@porsche-design-system/components-react/ssr';

const LinkSocialPage: NextPage = (): JSX.Element => {
  const style = `
    p-link-social:not(:last-child) {
      margin-right: 0.5rem;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render with label">
        <PLinkSocial href="https://www.facebook.com" icon="logo-facebook">Some label</PLinkSocial>
        <PLinkSocial icon="logo-facebook"><a href="https://www.facebook.com">Some label</a></PLinkSocial>
      </div>
      <div className="playground dark" title="should render on dark theme">
        <PLinkSocial href="https://www.facebook.com" icon="logo-facebook" theme="dark">Some label</PLinkSocial>
        <PLinkSocial icon="logo-facebook" theme="dark"><a href="https://www.facebook.com">Some label</a></PLinkSocial>
      </div>

      <div className="playground light" title="should render without label">
        <PLinkSocial href="https://www.facebook.com" icon="logo-facebook" hideLabel={true}>Some label</PLinkSocial>
        <PLinkSocial icon="logo-facebook" hideLabel={true}>
          <a href="https://www.facebook.com">Some label</a>
        </PLinkSocial>
      </div>
      <div className="playground dark" title="should render without label on dark theme">
        <PLinkSocial href="https://www.facebook.com" icon="logo-facebook" hideLabel={true} theme="dark">
          Some label
        </PLinkSocial>
        <PLinkSocial icon="logo-facebook" hideLabel={true} theme="dark">
          <a href="https://www.facebook.com">Some label</a>
        </PLinkSocial>
      </div>

      <div className="playground light" title="should render with responsive label">
        <PLinkSocial
          hideLabel={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
          href="https://www.facebook.com"
          icon="logo-facebook"
        >
          Some label
        </PLinkSocial>
      </div>

      <div className="playground light" title="should render with specific icon">
        <PLinkSocial icon="logo-delicious" href="https://www.delicious.com">Some label</PLinkSocial>
        <PLinkSocial iconSource="./assets/icon-custom-kaixin.svg" href="https://www.kaixin.com">Some label</PLinkSocial>
      </div>

      <div className="playground dark" title="should render with specific icon on dark theme">
        <PLinkSocial theme="dark" icon="logo-delicious" href="https://www.delicious.com">Some label</PLinkSocial>
        <PLinkSocial theme="dark" iconSource="./assets/icon-custom-kaixin.svg" href="https://www.kaixin.com"
          >Some label</PLinkSocial
        >
      </div>

      <div className="playground light" title="should render with multiline label">
        <PLinkSocial style={{ width: '15rem' }} icon="logo-facebook" href="https://www.facebook.com">
          Lorem ipsum dolor sit amet, consetetur sadipscing
        </PLinkSocial>
        <PLinkSocial style={{ width: '15rem' }} icon="logo-facebook">
          <a href="https://www.facebook.com">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
        </PLinkSocial>
      </div>
    </>
  );
};

export default LinkSocialPage;
