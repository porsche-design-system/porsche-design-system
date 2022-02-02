/* Auto Generated File */
import { PContentWrapper } from '@porsche-design-system/components-react';

export const ContentWrapperPage = (): JSX.Element => {
  const style = `
    p-content-wrapper > p {
      margin: 0;
      padding: 4px 2vw;
      text-align: center;
      color: white;
      background-color: lightskyblue;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground" title="should render with width 'basic'">
        <PContentWrapper>
          <p>Some content</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should render with width 'extended'">
        <PContentWrapper width="extended">
          <p>Some content</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should render with width 'fluid'">
        <PContentWrapper width="fluid">
          <p>Some content</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should render with 'default' background color" style={{ background: 'deeppink' }}>
        <PContentWrapper backgroundColor="default">
          <p>Some content</p>
        </PContentWrapper>
      </div>

      <div
        className="playground"
        title="should render with 'default' background color and dark theme"
        style={{ background: 'deeppink' }}
      >
        <PContentWrapper backgroundColor="default" theme="dark">
          <p>Some content</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should color full width although width 'basic' is enabled">
        <PContentWrapper width="basic" style={{ background: 'deeppink' }}>
          <p>Some content</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should not cut off to wide content">
        <PContentWrapper width="basic">
          <p style={{ marginLeft: '-2000px', marginRight: '-2000px' }}>Some content</p>
        </PContentWrapper>
      </div>

      <div className="playground" title="should render background for set height" style={{ background: 'deeppink' }}>
        <PContentWrapper backgroundColor="default" style={{ height: '100px' }}>
          <p>Some content</p>
        </PContentWrapper>
      </div>
    </>
  );
};
