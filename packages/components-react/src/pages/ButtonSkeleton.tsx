/* Auto Generated File */
import { PButton } from '@porsche-design-system/components-react';
import { useEffect } from 'react';
import { pollComponentsReady } from '../pollComponentsReady';

export const ButtonSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    pollComponentsReady().then(() => {
      document.querySelectorAll('p-button').forEach((button) => {
        button.classList.remove('hydrated');
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render button skeleton">
        <PButton>Some label</PButton>
      </div>
      <div className="playground dark" title="should render button skeleton on dark theme">
        <PButton theme="dark">Some label</PButton>
      </div>

      <div className="playground light" title="should render button skeleton without label">
        <PButton hideLabel={true}>Some label</PButton>
      </div>
      <div className="playground dark" title="should render button skeleton without label on dark theme">
        <PButton hideLabel={true} theme="dark">Some label</PButton>
      </div>

      <div className="playground light" title="should render button skeleton with multiline label">
        <PButton style={{ width: '240px' }}>Lorem ipsum dolor sit amet, consetetur sadipscing</PButton>
      </div>
    </>
  );
};
