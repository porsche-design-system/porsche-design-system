import { PHeadline as Headline } from '@porsche-design-system/components-react';
import React from 'react';

export const HeadlinePage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show headlines with different style variants">
        <Headline variant="large-title">The quick brown fox jumps over the lazy dog</Headline>
        <Headline variant="headline-1">The quick brown fox jumps over the lazy dog</Headline>
        <Headline variant="headline-2">The quick brown fox jumps over the lazy dog</Headline>
        <Headline variant="headline-3">The quick brown fox jumps over the lazy dog</Headline>
        <Headline variant="headline-4">The quick brown fox jumps over the lazy dog</Headline>
        <Headline variant="headline-5">The quick brown fox jumps over the lazy dog</Headline>
      </div>

      <div
        className="playground light"
        title="should show headlines with different style variants if tags are set as slots"
      >
        <Headline variant="large-title">
          <h1>The quick brown fox jumps over the lazy dog</h1>
        </Headline>
        <Headline variant="headline-1">
          <h1>The quick brown fox jumps over the lazy dog</h1>
        </Headline>
        <Headline variant="headline-2">
          <h2>The quick brown fox jumps over the lazy dog</h2>
        </Headline>
        <Headline variant="headline-3">
          <h3>The quick brown fox jumps over the lazy dog</h3>
        </Headline>
        <Headline variant="headline-4">
          <h4>The quick brown fox jumps over the lazy dog</h4>
        </Headline>
        <Headline variant="headline-5">
          <h5>The quick brown fox jumps over the lazy dog</h5>
        </Headline>
        <Headline variant="headline-5">
          <h6>The quick brown fox jumps over the lazy dog</h6>
        </Headline>
      </div>

      <div className="playground light" title="should show headline with different color variants on light background">
        <Headline color="default" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Headline>
        <Headline color="inherit" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Headline>
      </div>

      <div className="playground dark" title="should show headline with different color variants on dark background">
        <Headline theme="dark" color="default" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Headline>
        <Headline theme="dark" color="inherit" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Headline>
      </div>

      <div className="playground light" title="should show headlines with different alignments">
        <Headline align="left">Left</Headline>
        <Headline align="center">Center</Headline>
        <Headline align="right">Right</Headline>
      </div>

      <div className="playground light" title="should cut off too long text">
        <Headline ellipsis={true}>
          Headline ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
          dolores et ea rebum.
        </Headline>
      </div>

      <div className="playground" title="should show headline with a link">
        <Headline>
          <span>
            Lorem ipsum dolor sit amet <a href="#">linked text</a> et.
          </span>
        </Headline>
      </div>
    </>
  );
};
