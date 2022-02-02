/* Auto Generated File */
import { PHeadline } from '@porsche-design-system/components-react';

export const HeadlinePage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show headlines with different style variants">
        <PHeadline variant="large-title">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-1">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-2">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-3">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-4">The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline variant="headline-5">The quick brown fox jumps over the lazy dog</PHeadline>
      </div>

      <div className="playground light" title="should show headlines with different style variants if tags are set as slots">
        <PHeadline variant="large-title"><h1>The quick brown fox jumps over the lazy dog</h1></PHeadline>
        <PHeadline variant="headline-1"><h1>The quick brown fox jumps over the lazy dog</h1></PHeadline>
        <PHeadline variant="headline-2"><h2>The quick brown fox jumps over the lazy dog</h2></PHeadline>
        <PHeadline variant="headline-3"><h3>The quick brown fox jumps over the lazy dog</h3></PHeadline>
        <PHeadline variant="headline-4"><h4>The quick brown fox jumps over the lazy dog</h4></PHeadline>
        <PHeadline variant="headline-5"><h5>The quick brown fox jumps over the lazy dog</h5></PHeadline>
        <PHeadline variant="headline-5"><h6>The quick brown fox jumps over the lazy dog</h6></PHeadline>
      </div>

      <div className="playground light" title="should show headline with different color variants on light background">
        <PHeadline color="default" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PHeadline>
        <PHeadline color="inherit" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PHeadline>
      </div>

      <div className="playground dark" title="should show headline with different color variants on dark background">
        <PHeadline theme="dark" color="default" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PHeadline>
        <PHeadline theme="dark" color="inherit" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PHeadline>
      </div>

      <div className="playground light" title="should show headlines with different alignments">
        <PHeadline align="left">Left</PHeadline>
        <PHeadline align="center">Center</PHeadline>
        <PHeadline align="right">Right</PHeadline>

        <PHeadline align="left" variant="inherit">Left</PHeadline>
        <PHeadline align="center" variant="inherit">Center</PHeadline>
        <PHeadline align="right" variant="inherit">Right</PHeadline>
      </div>

      <div className="playground light" title="should cut off too long text">
        <PHeadline ellipsis={true}>
          Headline ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
          ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PHeadline>

        <PHeadline ellipsis={true} variant="inherit">
          Headline ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
          ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PHeadline>
      </div>

      <div className="playground" title="should apply custom styles for dedicated slotted content">
        <PHeadline>
          <span>
            Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text
          </span>
        </PHeadline>
      </div>

      <div className="playground" title="should show headline for variant customizable">
        <PHeadline variant={{ base: 'large', l: 'x-large' }}>Lorem ipsum dolor sit amet et.</PHeadline>
      </div>

      <div className="playground" title="should consider only font-size definition on host element for variant inherit">
        <div style={{ height: '72px', borderLeft: '10px solid deeppink' }}>
          <PHeadline
            variant="inherit"
            style={{ fontSize: '60px', lineHeight: '10', fontFamily: 'serif', fontWeight: '100', color: 'deeppink', textAlign: 'right', borderLeft: '10px solid deepskyblue' }}
          >
            ABC
          </PHeadline>
        </div>
        <br />
        <div style={{ height: '72px', borderLeft: '10px solid deeppink' }}>
          <PHeadline
            variant="inherit"
            style={{ fontSize: '60px', lineHeight: '10', fontFamily: 'serif', fontWeight: '100', color: 'deeppink', textAlign: 'right', borderLeft: '10px solid deepskyblue' }}
          >
            <h3
              style={{ margin: '100px', padding: '100px', fontSize: '200px', lineHeight: '5', fontFamily: 'serif', fontWeight: '100', color: 'deeppink', textAlign: 'right' }}
            >
              ABC
            </h3>
          </PHeadline>
        </div>
      </div>

      <div
        className="playground"
        title="should automatically break words/strings into new line being too long to fit inside their container"
      >
        <PHeadline variant="headline-3" style={{ width: '240px', background: 'deeppink' }}>
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </PHeadline>
        <PHeadline variant="headline-3" style={{ width: '240px', background: 'deepskyblue' }}>
          <h3 style={{ overflowWrap: 'normal', wordWrap: 'normal', hyphens: 'manual' }}>
            This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
          </h3>
        </PHeadline>
      </div>
    </>
  );
};
