/* Auto Generated File */
import { PText } from '@porsche-design-system/components-react';

export const TextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground" title="should show text in different sizes">
        <PText size="x-small">The quick brown fox jumps over the lazy dog</PText>
        <PText>The quick brown fox jumps over the lazy dog</PText>
        <PText size="medium">The quick brown fox jumps over the lazy dog</PText>
        <PText size="large">The quick brown fox jumps over the lazy dog</PText>
        <PText size="x-large">The quick brown fox jumps over the lazy dog</PText>
        <PText size="inherit" style={{ fontSize: '48px' }}>The quick brown fox jumps over the lazy dog</PText>
      </div>

      <div className="playground" title="should show text in different sizes on different viewports">
        <PText size={{ base: 'small', m: 'inherit', l: 'medium' }} style={{ fontSize: '80px' }}>
          The quick brown fox jumps over the lazy dog
        </PText>
      </div>

      <div className="playground" title="should show whole text in thin and bold">
        <PText weight="thin">The quick brown fox jumps over the lazy dog</PText>
        <PText weight="regular">The quick brown fox jumps over the lazy dog</PText>
        <PText weight="semibold">The quick brown fox jumps over the lazy dog</PText>
        <PText weight="bold">The quick brown fox jumps over the lazy dog</PText>
      </div>

      <div className="playground light" title="should show text with different color variants on light background">
        <PText color="default" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText color="brand" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText color="neutral-contrast-high" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText color="neutral-contrast-medium" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText color="neutral-contrast-low" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText color="notification-success" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText color="notification-warning" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText color="notification-error" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText color="notification-neutral" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText color="inherit" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
      </div>

      <div className="playground dark" title="should show text with different color variants on dark background">
        <PText theme="dark" color="default" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText theme="dark" color="brand" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
        <PText theme="dark" color="neutral-contrast-high" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PText>
        <PText theme="dark" color="neutral-contrast-medium" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PText>
        <PText theme="dark" color="neutral-contrast-low" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PText>
        <PText theme="dark" color="notification-success" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PText>
        <PText theme="dark" color="notification-warning" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PText>
        <PText theme="dark" color="notification-error" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PText>
        <PText theme="dark" color="notification-neutral" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </PText>
        <PText theme="dark" color="inherit" style={{ color: 'deeppink' }}>The quick brown fox jumps over the lazy dog</PText>
      </div>

      <div className="playground" title="should show text with different alignments">
        <PText align="left">Left</PText>
        <PText align="center">Center</PText>
        <PText align="right">Right</PText>
      </div>

      <div className="playground" title="should cut off too long text">
        <PText ellipsis={true}>
          Text ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PText>
      </div>

      <div className="playground" title="should apply custom styles for dedicated slotted content">
        <PText>
          <span>
            Some slotted and deeply nested <a href="#">link</a> and <button>button</button>, <b>bold</b>,
            <strong>strong</strong>, {' '}<em>emphasized</em> and <i>italic</i> text
          </span>
        </PText>
      </div>

      <div className="playground" title="should show text with different slotted tags in same layout as default">
        <PText><p>The quick brown fox jumps over the lazy dog</p></PText>
        <PText><address>The quick brown fox jumps over the lazy dog</address></PText>
        <PText><blockquote>The quick brown fox jumps over the lazy dog</blockquote></PText>
        <PText><figcaption>The quick brown fox jumps over the lazy dog</figcaption></PText>
        <PText><cite>The quick brown fox jumps over the lazy dog</cite></PText>
        <PText><time>The quick brown fox jumps over the lazy dog</time></PText>
        <PText><legend>The quick brown fox jumps over the lazy dog</legend></PText>
      </div>

      <div
        className="playground"
        title="should automatically break words/strings into new line being too long to fit inside their container"
      >
        <PText style={{ width: '240px', background: 'deeppink' }}>
          This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
        </PText>
        <PText style={{ width: '240px', background: 'deepskyblue' }}>
          <p style={{ overflowWrap: 'normal', wordWrap: 'normal', hyphens: 'manual' }}>
            This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
          </p>
        </PText>
      </div>
    </>
  );
};
