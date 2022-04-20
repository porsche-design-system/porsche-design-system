/* Auto Generated File */
import { PLinkSocial } from '@porsche-design-system/components-react';
import { useEffect } from 'react';
import { pollComponentsReady } from '../pollComponentsReady'

export const LinkSocialSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    pollComponentsReady().then(() => {
      document.querySelectorAll('p-link-social').forEach((link) => {
        link.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render link social skeleton with label">
        <PLinkSocial href="https://www.facebook.com" icon="logo-facebook">Some label</PLinkSocial>
      </div>
      <div className="playground dark" title="should render link social skeleton on dark theme">
        <PLinkSocial href="https://www.facebook.com" icon="logo-facebook" theme="dark">Some label</PLinkSocial>
      </div>

      <div className="playground light" title="should render link social skeleton without label">
        <PLinkSocial href="https://www.facebook.com" icon="logo-facebook" hideLabel={true}>Some label</PLinkSocial>
      </div>
      <div className="playground dark" title="should render link social skeleton without label on dark theme">
        <PLinkSocial href="https://www.facebook.com" icon="logo-facebook" hideLabel={true} theme="dark">
          Some label
        </PLinkSocial>
      </div>

      <div className="playground light" title="should render link social skeleton with specific icon">
        <PLinkSocial icon="logo-delicious" href="https://www.delicious.com">Some label</PLinkSocial>
      </div>

      <div className="playground light" title="should render link social skeleton with multiline label">
        <PLinkSocial style={{ width: '240px' }} icon="logo-facebook" href="https://www.facebook.com">
          Lorem ipsum dolor sit amet, consetetur sadipscing
        </PLinkSocial>
      </div>
    </>
  );
};
