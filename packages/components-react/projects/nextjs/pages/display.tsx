/* Auto Generated File */
import type { NextPage } from 'next';
import { PDisplay } from '@porsche-design-system/components-react/ssr';

const DisplayPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render with different color variants">
        <PDisplay color="primary" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PDisplay>
        <PDisplay color="inherit" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PDisplay>
      </div>

      <div className="playground" title="should render with different alignments">
        <PDisplay align="left">Left</PDisplay>
        <PDisplay align="center">Center</PDisplay>
        <PDisplay align="right">Right</PDisplay>
      </div>

      <div className="playground" title="should cut off too long text">
        <PDisplay ellipsis={true}>
          Text ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PDisplay>
      </div>

      <div className="playground" title="should apply custom styles for dedicated slotted content">
        <PDisplay size="medium">
          <span>
            Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
            {' '}<em>emphasized</em> and <i>italic</i> text.
          </span>
        </PDisplay>
      </div>

      <div className="playground" title="should render with different slotted tags in same layout as default">
        <PDisplay size="inherit" style={{ fontSize: '1rem' }}><h1>The quick brown fox jumps over the lazy dog</h1></PDisplay>
        <PDisplay size="inherit" style={{ fontSize: '1rem' }}><h2>The quick brown fox jumps over the lazy dog</h2></PDisplay>
        <PDisplay size="inherit" style={{ fontSize: '1rem' }}><h3>The quick brown fox jumps over the lazy dog</h3></PDisplay>
        <PDisplay size="inherit" style={{ fontSize: '1rem' }}><h4>The quick brown fox jumps over the lazy dog</h4></PDisplay>
        <PDisplay size="inherit" style={{ fontSize: '1rem' }}><h5>The quick brown fox jumps over the lazy dog</h5></PDisplay>
        <PDisplay size="inherit" style={{ fontSize: '1rem' }}><h6>The quick brown fox jumps over the lazy dog</h6></PDisplay>
      </div>

      <div className="playground" title="should render in different sizes">
        <PDisplay size="small">The quick brown fox jumps over the lazy dog</PDisplay>
        <PDisplay size="medium">The quick brown fox jumps over the lazy dog</PDisplay>
        <PDisplay size="large">The quick brown fox jumps over the lazy dog</PDisplay>
        <PDisplay size="inherit" style={{ fontSize: '5rem' }}>The quick brown fox jumps over the lazy dog</PDisplay>
      </div>

      <div className="playground" title="should render in different sizes on different viewports">
        <PDisplay size={{ base: 'medium', m: 'inherit', l: 'large' }} style={{ fontSize: '5rem' }}>
          The quick brown fox jumps over the lazy dog
        </PDisplay>
      </div>
    </>
  );
};

export default DisplayPage;
