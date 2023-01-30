/* Auto Generated File */
import { PHeading } from '@porsche-design-system/components-react';

export const HeadingPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show headings with different style variants">
        <PHeading variant="large-title">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading variant="heading-1">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading variant="heading-2">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading variant="heading-3">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading variant="heading-4">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading variant="heading-5">The quick brown fox jumps over the lazy dog</PHeading>
      </div>

      <div className="playground light" title="should show headings with different style variants if tags are set as slots">
        <PHeading variant="large-title"><h1>The quick brown fox jumps over the lazy dog</h1></PHeading>
        <PHeading variant="heading-1"><h1>The quick brown fox jumps over the lazy dog</h1></PHeading>
        <PHeading variant="heading-2"><h2>The quick brown fox jumps over the lazy dog</h2></PHeading>
        <PHeading variant="heading-3"><h3>The quick brown fox jumps over the lazy dog</h3></PHeading>
        <PHeading variant="heading-4"><h4>The quick brown fox jumps over the lazy dog</h4></PHeading>
        <PHeading variant="heading-5"><h5>The quick brown fox jumps over the lazy dog</h5></PHeading>
        <PHeading variant="heading-5"><h6>The quick brown fox jumps over the lazy dog</h6></PHeading>
      </div>

      <div className="playground light" title="should show heading with different color variants on light background">
        <PHeading color="default" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading color="inherit" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PHeading>
      </div>

      <div className="playground dark" title="should show heading with different color variants on dark background">
        <PHeading theme="dark" color="default" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PHeading>
        <PHeading theme="dark" color="inherit" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PHeading>
      </div>

      <div className="playground light" title="should show headings with different alignments">
        <PHeading align="left">Left</PHeading>
        <PHeading align="center">Center</PHeading>
        <PHeading align="right">Right</PHeading>

        <PHeading align="left" variant="inherit">Left</PHeading>
        <PHeading align="center" variant="inherit">Center</PHeading>
        <PHeading align="right" variant="inherit">Right</PHeading>
      </div>

      <div className="playground light" title="should cut off too long text">
        <PHeading ellipsis={true}>
          Heading ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
          ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PHeading>

        <PHeading ellipsis={true} variant="inherit">
          Heading ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
          ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PHeading>
      </div>

      <div className="playground" title="should apply custom styles for dedicated slotted content">
        <PHeading>
          <span>
            Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text
          </span>
        </PHeading>
      </div>

      <div className="playground" title="should show heading for variant customizable">
        <PHeading variant={{ base: 'large', l: 'x-large' }}>Lorem ipsum dolor sit amet et.</PHeading>
      </div>

      <div className="playground" title="should not automatically break words/strings by default">
        <PHeading variant={{base: 'inherit', m: 'large'}} style={{ width: '15rem', background: 'deeppink' }}>
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </PHeading>
        <PHeading variant={{base: 'inherit', m: 'large'}} style={{ width: '15rem', background: 'deepskyblue' }}>
          <h3>This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.</h3>
        </PHeading>
      </div>

      <div
        className="playground"
        title="should be possible to overwrite hyphenation/break words behavior"
        style={{ hyphens: 'auto', overflowWrap: 'break-word' }}
      >
        <PHeading variant={{base: 'inherit', m: 'large'}} style={{ width: '15rem', background: 'deeppink' }}>
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </PHeading>
        <PHeading variant={{base: 'inherit', m: 'large'}} style={{ width: '15rem', background: 'deepskyblue' }}>
          <h3>This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.</h3>
        </PHeading>
      </div>

      <div className="playground" title="should consider only font-size definition on host element for variant inherit">
        <div style={{ height: '72px', borderLeft: '10px solid deeppink' }}>
          <PHeading
            variant="inherit"
            style={{ fontSize: '60px', lineHeight: 10, fontFamily: 'serif', fontWeight: 100, color: 'deeppink', textAlign: 'right', borderLeft: '10px solid deepskyblue' }}
          >
            ABC
          </PHeading>
        </div>
        <br />
        <div style={{ height: '72px', borderLeft: '10px solid deeppink' }}>
          <PHeading
            variant="inherit"
            style={{ fontSize: '60px', lineHeight: 10, fontFamily: 'serif', fontWeight: 100, color: 'deeppink', textAlign: 'right', borderLeft: '10px solid deepskyblue' }}
          >
            <h3
              style={{ margin: '100px', padding: '100px', fontSize: '200px', lineHeight: 5, fontFamily: 'serif', fontWeight: 100, color: 'deeppink', textAlign: 'right' }}
            >
              ABC
            </h3>
          </PHeading>
        </div>
      </div>
    </>
  );
};
