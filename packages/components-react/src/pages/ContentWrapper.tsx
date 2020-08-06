import { PContentWrapper as ContentWrapper } from '@porsche-design-system/components-react';
import React from 'react';

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
        <ContentWrapper>
          <p>Some content</p>
        </ContentWrapper>
      </div>

      <div className="playground" title="should render with width 'extended'">
        <ContentWrapper width="extended">
          <p>Some content</p>
        </ContentWrapper>
      </div>

      <div className="playground" title="should render with width 'fluid'">
        <ContentWrapper width="fluid">
          <p>Some content</p>
        </ContentWrapper>
      </div>

      <div className="playground" title="should color full width although width 'basic' is enabled">
        <ContentWrapper width="basic" style={{ background: 'deeppink' }}>
          <p>Some content</p>
        </ContentWrapper>
      </div>

      <div className="playground" title="should not cut off to wide content">
        <ContentWrapper width="basic">
          <p style={{ margin: '0 -2000px' }}>Some content</p>
        </ContentWrapper>
      </div>
    </>
  );
};
