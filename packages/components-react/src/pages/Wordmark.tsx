/* Auto Generated File */
import { PWordmark } from '@porsche-design-system/components-react';

export const WordmarkPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render default">
        <PWordmark />
      </div>

      <div className="playground light" title="should render size inherit">
        <PWordmark size="inherit" style={{ height: '20px' }} />
      </div>

      <div className="playground light" title="should render default with custom click area">
        <PWordmark href="#" style={{ padding: '1.5rem' }} />
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
