/* Auto Generated File */
import { PLink } from '@porsche-design-system/components-react';
import { useEffect } from 'react';
import { pollComponentsReady } from '../pollComponentsReady';

export const LinkSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    pollComponentsReady().then(() => {
      document.querySelectorAll('p-link').forEach((link) => {
        link.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render link skeleton with label">
        <PLink variant="primary" href="https://www.porsche.com">Some label</PLink>
      </div>
      <div className="playground dark" title="should render link skeleton with label on dark theme">
        <PLink variant="primary" href="https://www.porsche.com" theme="dark">Some label</PLink>
      </div>

      <div className="playground light" title="should render link skeleton without label">
        <PLink variant="primary" href="https://www.porsche.com" hideLabel={true}>Some label</PLink>
      </div>
      <div className="playground dark" title="should render link skeleton without label on dark theme">
        <PLink variant="primary" href="https://www.porsche.com" hideLabel={true} theme="dark">Some label</PLink>
      </div>

      <div className="playground light" title="should render link skeleton with multiline label">
        <PLink style={{ width: '240px' }} href="https://www.porsche.com">Lorem ipsum dolor sit amet, consetetur sadipscing</PLink>
      </div>
    </>
  );
};
