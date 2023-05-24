/* Auto Generated File */
import type { NextPage } from 'next';
import { PWordmark } from '@porsche-design-system/components-react/ssr';

const WordmarkPage: NextPage = (): JSX.Element => {
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
        <PWordmark href="#" style={{ padding: '1.5rem' }} />
      </div>

      <div className="playground dark" title="should render default with custom clickarea on dark background">
        <PWordmark href="#" theme="dark" style={{ padding: '1.5rem' }} />
      </div>

      <div className="playground light" title="should not exceed parents width">
        <div style={{ width: '180px', background: 'lightsalmon' }}>
          <PWordmark style={{ background: 'lightblue' }} />
        </div>
        <br />
        <div style={{ width: '180px', background: 'lightsalmon' }}>
          <PWordmark size="inherit" style={{ background: 'lightblue', height: '17px' }} />
        </div>
        <br />
        <div style={{ width: '180px', background: 'lightsalmon' }}>
          <PWordmark href="#" style={{ background: 'lightblue' }} />
        </div>
      </div>

      <div
        className="playground light"
        title="should not exceed max-width of wordmark itself, although parent provides more width"
      >
        <div style={{ width: '272px', background: 'lightsalmon' }}>
          <PWordmark style={{ background: 'lightblue' }} />
        </div>
        <br />
        <div style={{ width: '272px', background: 'lightsalmon' }}>
          <PWordmark size="inherit" style={{ background: 'lightblue', height: '17px' }} />
        </div>
        <br />
        <div style={{ width: '272px', background: 'lightsalmon' }}>
          <PWordmark href="#" style={{ background: 'lightblue' }} />
        </div>
      </div>

      <div className="playground light" title="should not exceed parents height">
        <div style={{ height: '5px', background: 'lightsalmon' }}>
          <PWordmark style={{ background: 'lightblue' }} />
        </div>
        <br />
        <div style={{ height: '5px', background: 'lightsalmon' }}>
          <PWordmark size="inherit" style={{ background: 'lightblue', height: '17px' }} />
        </div>
        <br />
        <div style={{ height: '5px', background: 'lightsalmon' }}>
          <PWordmark href="#" style={{ background: 'lightblue' }} />
        </div>
      </div>

      <div
        className="playground light"
        title="should not exceed max-height of wordmark itself, although parent provides more height"
      >
        <div style={{ height: '80px', background: 'lightsalmon' }}>
          <PWordmark style={{ background: 'lightblue' }} />
        </div>
        <br />
        <div style={{ height: '80px', background: 'lightsalmon' }}>
          <PWordmark size="inherit" style={{ background: 'lightblue', height: '17px' }} />
        </div>
        <br />
        <div style={{ height: '80px', background: 'lightsalmon' }}>
          <PWordmark href="#" style={{ background: 'lightblue' }} />
        </div>
      </div>
    </>
  );
};

export default WordmarkPage;
