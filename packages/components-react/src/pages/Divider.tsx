/* Auto Generated File */
import { PDivider } from '@porsche-design-system/components-react';

export const DividerPage = (): JSX.Element => {
  const style = `
    .divider-vertical-container-example {
      display: flex;
      height: 100px;
    }

    @media (min-width: 480px) and (max-width: 759px), (min-width: 1000px) and (max-width: 1299px), (min-width: 1760px) {
      .divider-vertical-responsive-container-example {
        display: flex;
        height: 100px;
      }
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should show a divider">
        <PDivider />
      </div>

      <div className="playground light" title="should show vertical divider">
        <div className="divider-vertical-container-example">
          <PDivider orientation="vertical" />
        </div>
      </div>

      <div className="playground light" title="should show responsive vertical divider">
        <div className="divider-vertical-responsive-container-example">
          <PDivider
            orientation={{ base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical' }}
           />
        </div>
      </div>

      <div className="playground light" title="should show different colors of divider with light theme">
        <PDivider />
        <br />
        <br />
        <PDivider color="neutral-contrast-medium" />
        <br />
        <br />
        <PDivider color="neutral-contrast-high" />
      </div>

      <div className="playground dark" title="should show different colors of divider with dark theme">
        <PDivider theme="dark" />
        <br />
        <br />
        <PDivider theme="dark" color="neutral-contrast-medium" />
        <br />
        <br />
        <PDivider theme="dark" color="neutral-contrast-high" />
      </div>
    </>
  );
};
