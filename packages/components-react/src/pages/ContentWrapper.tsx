import { PContentWrapper } from '@porsche-design-system/components-react';

export const ContentWrapperPage = (): JSX.Element => {
  const style = `
    p-content-wrapper p {
      margin: 0;
      padding: 4px 0;
      text-align: center;
      color: #fff;
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

      <div className="playground" title="should render with 'white' background" style={{ background: 'deeppink' }}>
        <PContentWrapper background="white">
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
          <p style={{ margin: '0 -2000px' }}>Some content</p>
        </PContentWrapper>
      </div>
    </>
  );
};
