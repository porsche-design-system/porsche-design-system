import { PDivider as Divider } from '@porsche-design-system/components-react';
import React from 'react';

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
        <Divider />
      </div>

      <div className="playground light" title="should show vertical divider">
        <div className="divider-vertical-container-example">
          <Divider orientation="vertical" />
        </div>
      </div>

      <div className="playground light" title="should show responsive vertical divider">
        <div className="divider-vertical-responsive-container-example">
          <Divider orientation="{base: 'horizontal', xs: 'vertical', s: 'horizontal', m: 'vertical', l: 'horizontal', xl: 'vertical'}" />
        </div>
      </div>

      <div className="playground light" title="should show different colors of divider with light theme">
        <Divider />
        <br />
        <br />
        <Divider color="neutral-contrast-medium" />
        <br />
        <br />
        <Divider color="neutral-contrast-high" />
      </div>

      <div className="playground dark" title="should show different colors of divider with dark theme">
        <Divider theme="dark" />
        <br />
        <br />
        <Divider theme="dark" color="neutral-contrast-medium" />
        <br />
        <br />
        <Divider theme="dark" color="neutral-contrast-high" />
      </div>
    </>
  );
};
