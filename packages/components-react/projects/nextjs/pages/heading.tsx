/* Auto Generated File */
import type { NextPage } from 'next';
import { PHeading } from '@porsche-design-system/components-react/ssr';

const HeadingPage: NextPage = (): JSX.Element => {
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

      <div className="playground light" title="should show heading with different color variants on light background">
        <PHeading color="primary" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading color="inherit" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PHeading>
      </div>

      <div className="playground dark" title="should show heading with different color variants on dark background">
        <PHeading theme="dark" color="primary" style={{ color: 'deeppink' }}
          >The quick brown fox jumps over the lazy dog</PHeading
        >
        <PHeading theme="dark" color="inherit" style={{ color: 'deeppink' }}
          >The quick brown fox jumps over the lazy dog</PHeading
        >
      </div>

      <div className="playground" title="should show heading with different alignments">
        <PHeading align="left">Left</PHeading>
        <PHeading align="center">Center</PHeading>
        <PHeading align="right">Right</PHeading>
      </div>

      <div className="playground dark" title="should show heading with different alignments">
        <PHeading theme="dark" align="left">Left</PHeading>
        <PHeading theme="dark" align="center">Center</PHeading>
        <PHeading theme="dark" align="right">Right</PHeading>
      </div>

      <div className="playground" title="should cut off too long text">
        <PHeading ellipsis={true}>
          Text ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PHeading>
      </div>

      <div className="playground dark" title="should cut off too long text">
        <PHeading theme="dark" ellipsis={true}>
          Text ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PHeading>
      </div>

      <div className="playground" title="should apply custom styles for dedicated slotted content">
        <PHeading size="medium">
          <span>
            Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PHeading>
      </div>

      <div className="playground dark" title="should apply custom styles for dedicated slotted content">
        <PHeading theme="dark" size="medium">
          <span>
            Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PHeading>
      </div>

      <div className="playground" title="should show heading with different slotted tags in same layout">
        <PHeading size="inherit" style={{ fontSize: '1rem' }}><h1>The quick brown fox jumps over the lazy dog</h1></PHeading>
        <PHeading size="inherit" style={{ fontSize: '1rem' }}><h2>The quick brown fox jumps over the lazy dog</h2></PHeading>
        <PHeading size="inherit" style={{ fontSize: '1rem' }}><h3>The quick brown fox jumps over the lazy dog</h3></PHeading>
        <PHeading size="inherit" style={{ fontSize: '1rem' }}><h4>The quick brown fox jumps over the lazy dog</h4></PHeading>
        <PHeading size="inherit" style={{ fontSize: '1rem' }}><h5>The quick brown fox jumps over the lazy dog</h5></PHeading>
        <PHeading size="inherit" style={{ fontSize: '1rem' }}><h6>The quick brown fox jumps over the lazy dog</h6></PHeading>
      </div>

      <div className="playground dark" title="should show heading with different slotted tags in same layout">
        <PHeading theme="dark" size="inherit" style={{ fontSize: '1rem' }}
          ><h1>The quick brown fox jumps over the lazy dog</h1></PHeading
        >
        <PHeading theme="dark" size="inherit" style={{ fontSize: '1rem' }}
          ><h2>The quick brown fox jumps over the lazy dog</h2></PHeading
        >
        <PHeading theme="dark" size="inherit" style={{ fontSize: '1rem' }}
          ><h3>The quick brown fox jumps over the lazy dog</h3></PHeading
        >
        <PHeading theme="dark" size="inherit" style={{ fontSize: '1rem' }}
          ><h4>The quick brown fox jumps over the lazy dog</h4></PHeading
        >
        <PHeading theme="dark" size="inherit" style={{ fontSize: '1rem' }}
          ><h5>The quick brown fox jumps over the lazy dog</h5></PHeading
        >
        <PHeading theme="dark" size="inherit" style={{ fontSize: '1rem' }}
          ><h6>The quick brown fox jumps over the lazy dog</h6></PHeading
        >
      </div>

      <div className="playground" title="should show heading in different sizes">
        <PHeading size="small">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading size="medium">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading size="large">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading size="x-large">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading size="xx-large">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading size="inherit" style={{ fontSize: '5rem' }}>The quick brown fox jumps over the lazy dog</PHeading>
      </div>

      <div className="playground dark" title="should show heading in different sizes">
        <PHeading theme="dark" size="small">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading theme="dark" size="medium">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading theme="dark" size="large">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading theme="dark" size="x-large">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading theme="dark" size="xx-large">The quick brown fox jumps over the lazy dog</PHeading>
        <PHeading theme="dark" size="inherit" style={{ fontSize: '5rem' }}>The quick brown fox jumps over the lazy dog</PHeading>
      </div>

      <div className="playground" title="should show heading in different sizes on different viewports">
        <PHeading size={{ base: 'small', xs: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }} style={{ fontSize: '1rem' }}>
          The quick brown fox jumps over the lazy dog
        </PHeading>
      </div>

      <div className="playground dark" title="should show heading in different sizes on different viewports">
        <PHeading
          theme="dark"
          size={{ base: 'small', xs: 'medium', m: 'large', l: 'x-large', xl: 'inherit' }}
          style={{ fontSize: '1rem' }}
        >
          The quick brown fox jumps over the lazy dog
        </PHeading>
      </div>
    </>
  );
};

export default HeadingPage;
