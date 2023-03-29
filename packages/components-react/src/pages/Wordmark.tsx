/* Auto Generated File */
import { PWordmark } from '@porsche-design-system/components-react';

export const WordmarkPage = (): JSX.Element => {
  const style = `
    @media only screen and (min-width: 760px) {
      #app,
      :host {
        display: grid;
        grid-template-columns: repeat(2, 50%);
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render default on light background">
        <PWordmark />
      </div>

      <div className="playground dark" title="should render default on dark background">
        <PWordmark theme="dark" />
      </div>

      <div className="playground light" title="should render size inherit on light background">
        <PWordmark size="inherit" style={{ height: '20px' }} />
      </div>

      <div className="playground dark" title="should render size inherit on dark background">
        <PWordmark theme="dark" size="inherit" style={{ height: '20px' }} />
      </div>

      <div className="playground light" title="should render default with custom click area on light background">
        <PWordmark style={{ padding: '1.5rem' }} />
      </div>

      <div className="playground dark" title="should render default with custom clickarea on dark background">
        <PWordmark theme="dark" style={{ padding: '1.5rem' }} />
      </div>
    </>
  );
};
