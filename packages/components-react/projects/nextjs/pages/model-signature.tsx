/* Auto Generated File */
import type { NextPage } from 'next';
import { PModelSignature } from '@porsche-design-system/components-react/ssr';

const ModelSignaturePage: NextPage = (): JSX.Element => {
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

      <div className="playground light" title="should render for model 718 on light background">
        <PModelSignature model="718" />
      </div>
      <div className="playground dark" title="should render for model 718 on dark background">
        <PModelSignature model="718" theme="dark" />
      </div>

      <div className="playground light" title="should render for model 911 on light background">
        <PModelSignature model="911" />
      </div>
      <div className="playground dark" title="should render for model 911 on dark background">
        <PModelSignature model="911" theme="dark" />
      </div>

      <div className="playground light" title="should render for model boxster on light background">
        <PModelSignature model="boxster" />
      </div>
      <div className="playground dark" title="should render for model boxster on dark background">
        <PModelSignature model="boxster" theme="dark" />
      </div>

      <div className="playground light" title="should render for model cayenne on light background">
        <PModelSignature model="cayenne" />
      </div>
      <div className="playground dark" title="should render for model cayenne on dark background">
        <PModelSignature model="cayenne" theme="dark" />
      </div>

      <div className="playground light" title="should render for model cayman on light background">
        <PModelSignature model="cayman" />
      </div>
      <div className="playground dark" title="should render for model cayman on dark background">
        <PModelSignature model="cayman" theme="dark" />
      </div>

      <div className="playground light" title="should render for model macan on light background">
        <PModelSignature model="macan" />
      </div>
      <div className="playground dark" title="should render for model macan on dark background">
        <PModelSignature model="macan" theme="dark" />
      </div>

      <div className="playground light" title="should render for model panamera on light background">
        <PModelSignature model="panamera" />
      </div>
      <div className="playground dark" title="should render for model panamera on dark background">
        <PModelSignature model="panamera" theme="dark" />
      </div>

      <div className="playground light" title="should render for model taycan on light background">
        <PModelSignature model="taycan" />
      </div>
      <div className="playground dark" title="should render for model taycan on dark background">
        <PModelSignature model="taycan" theme="dark" />
      </div>

      <div className="playground light" title="should render for model turbo on light background">
        <PModelSignature model="turbo" />
      </div>
      <div className="playground dark" title="should render for model turbo on dark background">
        <PModelSignature model="turbo" theme="dark" />
      </div>

      <div className="playground light" title="should render for color primary on light background">
        <PModelSignature model="911" color="primary" />
      </div>
      <div className="playground dark" title="should render for color primary on dark background">
        <PModelSignature model="911" color="primary" theme="dark" />
      </div>

      <div className="playground light" title="should render for color contrast-low on light background">
        <PModelSignature model="911" color="contrast-low" />
      </div>
      <div className="playground dark" title="should render for color contrast-low on dark background">
        <PModelSignature model="911" color="contrast-low" theme="dark" />
      </div>

      <div className="playground light" title="should render for color contrast-medium on light background">
        <PModelSignature model="911" color="contrast-medium" />
      </div>
      <div className="playground dark" title="should render for color contrast-medium on dark background">
        <PModelSignature model="911" color="contrast-medium" theme="dark" />
      </div>

      <div className="playground light" title="should render for color contrast-high on light background">
        <PModelSignature model="911" color="contrast-high" />
      </div>
      <div className="playground dark" title="should render for color contrast-high on dark background">
        <PModelSignature model="911" color="contrast-high" theme="dark" />
      </div>

      <div className="playground light" title="should render for color inherit on light background">
        <PModelSignature
          model="911"
          color="inherit"
          style={{ filter: 'invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)' }}
         />
      </div>
      <div className="playground dark" title="should render for color inherit on dark background">
        <PModelSignature
          model="911"
          color="inherit"
          style={{ filter: 'invert(24%) sepia(70%) saturate(5969%) hue-rotate(316deg) brightness(102%) contrast(102%)' }}
          theme="dark"
         />
      </div>

      <div className="playground light" title="should render for size small on light background">
        <PModelSignature model="911" size="small" />
      </div>
      <div className="playground dark" title="should render for size small on dark background">
        <PModelSignature model="911" size="small" theme="dark" />
      </div>

      <div className="playground light" title="should render for size inherit on light background">
        <PModelSignature model="911" size="inherit" style={{ height: '100px' }} />
      </div>
      <div className="playground dark" title="should render for size inherit on dark background">
        <PModelSignature model="911" size="inherit" style={{ height: '100px' }} theme="dark" />
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

export default ModelSignaturePage;
