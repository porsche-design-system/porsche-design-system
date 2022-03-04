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
        <PLinkPure href="https://www.porsche.com">Label default</PLinkPure>
      </div>
      <div className="playground dark" title="should render link pure skeleton with label on dark background">
        <PLinkPure href="https://www.porsche.com" theme="dark">Label default</PLinkPure>
      </div>

      <div className="playground light" title="should render link pure skeleton without label">
        <PLinkPure href="https://www.porsche.com" hideLabel={true}>Some label</PLinkPure>
      </div>
      <div className="playground dark" title="should render link pure skeleton without label on dark background">
        <PLinkPure href="https://www.porsche.com" hideLabel={true} theme="dark">Some label</PLinkPure>
      </div>

      <div className="playground light" title="should render link pure skeleton with specific icon">
        <PLinkPure href="https://www.porsche.com" icon="phone">Label with specific icon</PLinkPure>
      </div>

      <div className="playground dark" title="should render link pure skeleton with specific icon on dark background">
        <PLinkPure href="https://www.porsche.com" icon="phone" theme="dark">Label with specific icon</PLinkPure>
      </div>

      <div className="playground light" title="should render link pure skeleton with multiline label">
        <PLinkPure href="https://www.porsche.com" style={{ width: '240px' }}>
          Label multiline lorem ipsum dolor sit amet, consetetur sadipscing
        </PLinkPure>
      </div>

      <div className="playground light" title="should render link pure skeleton with no icon">
        <PLinkPure href="https://www.porsche.com" icon="none">Label icon none</PLinkPure>
      </div>

      <div className="playground light" title="should render link pure skeleton icon if hide-label and icon none is set">
        <PLinkPure href="https://www.porsche.com" hideLabel={true} icon="none">Label hide-label icon none</PLinkPure>
      </div>

      <div className="playground light stretched-links" title="should render link pure skeleton with stretched label">
        <PLinkPure href="https://www.porsche.com" stretch={true}>Label stretch</PLinkPure>
      </div>

      <div className="playground light stretched-links" title="should render with stretched label depending on viewport">
        <PLinkPure
          href="https://www.porsche.com"
          stretch={{ base: true, xs: false, s: true, m: false, l: true, xl: false }}
        >
          Label stretch responsive
        </PLinkPure>
      </div>
    </>
  );
};
