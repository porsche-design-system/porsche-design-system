/* Auto Generated File */
import { PModelSignature } from '@porsche-design-system/components-react';

export const ModelSignaturePage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render for model 718">
        <PModelSignature model="718" />
      </div>

      <div className="playground light" title="should render for model 911">
        <PModelSignature model="911" />
      </div>

      <div className="playground light" title="should render for model boxster">
        <PModelSignature model="boxster" />
      </div>

      <div className="playground light" title="should render for model cayenne">
        <PModelSignature model="cayenne" />
      </div>

      <div className="playground light" title="should render for model cayman">
        <PModelSignature model="cayman" />
      </div>

      <div className="playground light" title="should render for model macan">
        <PModelSignature model="macan" />
      </div>

      <div className="playground light" title="should render for model panamera">
        <PModelSignature model="panamera" />
      </div>

      <div className="playground light" title="should render for model taycan">
        <PModelSignature model="taycan" />
      </div>

      <div className="playground light" title="should render for model turbo">
        <PModelSignature model="turbo" />
      </div>

      <div className="playground light" title="should render for color primary">
        <PModelSignature model="911" color="primary" />
      </div>

      <div className="playground light" title="should render for color contrast-low">
        <PModelSignature model="911" color="contrast-low" />
      </div>

      <div className="playground light" title="should render for color contrast-medium">
        <PModelSignature model="911" color="contrast-medium" />
      </div>

      <div className="playground light" title="should render for color contrast-high">
        <PModelSignature model="911" color="contrast-high" />
      </div>

      <div className="playground light" title="should render for color inherit">
        <PModelSignature
          model="911"
          color="inherit"
          style={{ filter: 'invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)' }}
         />
      </div>

      <div className="playground light" title="should render for size small">
        <PModelSignature model="911" size="small" />
      </div>

      <div className="playground light" title="should render for size inherit">
        <PModelSignature model="911" size="inherit" style={{ height: '100px' }} />
      </div>

      <div className="playground light" title="should not exceed parents width">
        <div style={{ width: '180px', background: 'lightsalmon' }}>
          <PModelSignature model="cayenne" style={{ background: 'lightblue' }} />
        </div>
        <br />
        <div style={{ width: '180px', background: 'lightsalmon' }}>
          <PModelSignature model="cayenne" size="inherit" style={{ background: 'lightblue', height: '40px' }} />
        </div>
      </div>

      <div
        className="playground light"
        title="should not exceed max-width of model-signature itself, although parent provides more width"
      >
        <div style={{ width: '272px', background: 'lightsalmon' }}>
          <PModelSignature model="cayenne" style={{ background: 'lightblue' }} />
        </div>
        <br />
        <div style={{ width: '272px', background: 'lightsalmon' }}>
          <PModelSignature model="cayenne" size="inherit" style={{ background: 'lightblue', height: '40px' }} />
        </div>
      </div>

      <div className="playground light" title="should not exceed parents height">
        <div style={{ height: '10px', background: 'lightsalmon' }}>
          <PModelSignature model="cayenne" style={{ background: 'lightblue' }} />
        </div>
        <br />
        <div style={{ height: '10px', background: 'lightsalmon' }}>
          <PModelSignature model="cayenne" size="inherit" style={{ background: 'lightblue', height: '40px' }} />
        </div>
      </div>

      <div
        className="playground light"
        title="should not exceed max-height of model-signature itself, although parent provides more height"
      >
        <div style={{ height: '100px', background: 'lightsalmon' }}>
          <PModelSignature model="cayenne" style={{ background: 'lightblue' }} />
        </div>
        <br />
        <div style={{ height: '100px', background: 'lightsalmon' }}>
          <PModelSignature model="cayenne" size="inherit" style={{ background: 'lightblue', height: '40px' }} />
        </div>
      </div>
    </>
  );
};
