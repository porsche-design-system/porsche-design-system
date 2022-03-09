/* Auto Generated File */
import { componentsReady, PLinkPure } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const LinkPureSkeletonPage = (): JSX.Element => {
  useEffect(() => {
    componentsReady().then(() => {
      document.querySelectorAll('p-link-pure').forEach((link) => {
        link.classList.remove('hydrated');
      });
    });
  }, []);

  const style = `
    h4 {
      color: deeppink;
    }
    p-link-pure:not(:last-child) {
      margin-right: 0.5rem;
    }
    .stretched-links p-link-pure {
      margin-right: 0;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render link pure skeleton with label">
        <h4>With label</h4>
        <PLinkPure href="https://www.porsche.com">Some Label</PLinkPure>
      </div>

      <div className="playground dark" title="should render link pure skeleton with label on dark background">
        <h4>With label dark</h4>
        <PLinkPure href="https://www.porsche.com" theme="dark">Some Label</PLinkPure>
      </div>

      <div className="playground light" title="should render link pure skeleton without label">
        <h4>Hidden label</h4>
        <PLinkPure href="https://www.porsche.com" hideLabel={true}>Some label</PLinkPure>
      </div>
      <div className="playground dark" title="should render link pure skeleton without label on dark background">
        <h4>Hidden label dark</h4>
        <PLinkPure href="https://www.porsche.com" hideLabel={true} theme="dark">Some label</PLinkPure>
      </div>

      <div className="playground light" title="should render link pure skeleton with multiline label">
        <h4>Multiline label</h4>
        <PLinkPure href="https://www.porsche.com" style={{ width: '240px' }}>
          Label multiline lorem ipsum dolor sit amet, consetetur sadipscing
        </PLinkPure>
      </div>

      <div className="playground light" title="should render link pure skeleton with no icon">
        <h4>No icon</h4>
        <PLinkPure href="https://www.porsche.com" icon="none">Some Label</PLinkPure>
      </div>

      <div className="playground light" title="should render link pure skeleton icon if hide-label and icon none is set">
        <h4>No icon and hidden label</h4>
        <PLinkPure href="https://www.porsche.com" hideLabel={true} icon="none">Some Label</PLinkPure>
      </div>

      <div className="playground light stretched-links" title="should render link pure skeleton with stretched label">
        <h4>Stretch</h4>
        <PLinkPure href="https://www.porsche.com" stretch={true}>Some Label</PLinkPure>
      </div>

      <div className="playground light stretched-links" title="should render with stretched label depending on viewport">
        <h4>Stretch BreakpointCustomizable</h4>
        <PLinkPure href="https://www.porsche.com" stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
          >Some Label</PLinkPure
        >
      </div>
    </>
  );
};
