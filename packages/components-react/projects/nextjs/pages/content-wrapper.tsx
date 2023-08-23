/* Auto Generated File */
import type { NextPage } from 'next';
import { PContentWrapper } from '@porsche-design-system/components-react/ssr';

const ContentWrapperPage: NextPage = (): JSX.Element => {
  const style = `
    p-content-wrapper > p {
      margin: 0;
      padding: 4px 2vw;
      text-align: center;
      color: white;
      background-color: lightskyblue;
    }
    .playground {
      padding-left: 0;
      padding-right: 0;
    }
    .playground::before {
      padding: 16px 16px 0;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="visualize-grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="playground" title="should render with width 'fluid' (desktop: 16 columns)">
        <PContentWrapper width="fluid">
          <p>Fluid</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should render with width 'full' (desktop: 16 columns)">
        <PContentWrapper width="full">
          <p>Full</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should render with width 'extended' (desktop: 14 columns)">
        <PContentWrapper>
          <p>Extended</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should render with width 'basic' (desktop: 12 columns)">
        <PContentWrapper width="basic">
          <p>Basic</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should render with width 'narrow' (desktop: 8 columns)">
        <PContentWrapper width="narrow">
          <p>Narrow</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should color full width although width 'basic' is enabled">
        <PContentWrapper width="basic" style={{ background: 'deeppink' }}>
          <p>Full viewport is colored with custom color</p>
        </PContentWrapper>
      </div>
    </>
  );
};

export default ContentWrapperPage;
