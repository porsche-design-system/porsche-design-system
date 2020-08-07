import { PText as Text } from '@porsche-design-system/components-react';
import React from 'react';

export const TextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground" title="should show text in different sizes">
        <Text size="x-small">The quick brown fox jumps over the lazy dog</Text>
        <Text>The quick brown fox jumps over the lazy dog</Text>
        <Text size="medium">The quick brown fox jumps over the lazy dog</Text>
        <Text size="large">The quick brown fox jumps over the lazy dog</Text>
        <Text size="x-large">The quick brown fox jumps over the lazy dog</Text>
        <Text size="inherit" style={{ fontSize: 48 }}>
          The quick brown fox jumps over the lazy dog
        </Text>
      </div>

      <div className="playground" title="should show text in different sizes on different viewports">
        <Text size="{ base: 'small', m: 'inherit', l: 'medium' }" style={{ fontSize: 80 }}>
          The quick brown fox jumps over the lazy dog
        </Text>
      </div>

      <div className="playground" title="should show whole text in thin and bold">
        <Text weight="thin">The quick brown fox jumps over the lazy dog</Text>
        <Text weight="regular">The quick brown fox jumps over the lazy dog</Text>
        <Text weight="semibold">The quick brown fox jumps over the lazy dog</Text>
        <Text weight="bold">The quick brown fox jumps over the lazy dog</Text>
      </div>

      <div className="playground light" title="should show text with different color variants on light background">
        <Text color="default" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color="brand" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color="neutral-contrast-high" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color="neutral-contrast-medium" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color="neutral-contrast-low" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color="notification-success" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color="notification-warning" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color="notification-error" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color="notification-neutral" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text color="inherit" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
      </div>

      <div className="playground dark" title="should show text with different color variants on dark background">
        <Text theme="dark" color="default" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text theme="dark" color="brand" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text theme="dark" color="neutral-contrast-high" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text theme="dark" color="neutral-contrast-medium" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text theme="dark" color="neutral-contrast-low" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text theme="dark" color="notification-success" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text theme="dark" color="notification-warning" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text theme="dark" color="notification-error" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text theme="dark" color="notification-neutral" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
        <Text theme="dark" color="inherit" style={{ color: 'deeppink' }}>
          The quick brown fox jumps over the lazy dog
        </Text>
      </div>

      <div className="playground" title="should show text with different alignments">
        <Text align="left">Left</Text>
        <Text align="center">Center</Text>
        <Text align="right">Right</Text>
      </div>

      <div className="playground" title="should cut off too long text">
        <Text ellipsis={true}>
          Text ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
          dolores et ea rebum.
        </Text>
      </div>

      <div className="playground" title="should show text with a link and bold text as children">
        <Text>
          <span>
            Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp;{' '}
            <strong>strong text</strong>
          </span>
        </Text>
      </div>

      <div className="playground" title="should show text with different slotted tags in same layout as default">
        <Text>
          <p>The quick brown fox jumps over the lazy dog</p>
        </Text>
        <Text>
          <address>The quick brown fox jumps over the lazy dog</address>
        </Text>
        <Text>
          <blockquote>The quick brown fox jumps over the lazy dog</blockquote>
        </Text>
        <Text>
          <figcaption>The quick brown fox jumps over the lazy dog</figcaption>
        </Text>
        <Text>
          <cite>The quick brown fox jumps over the lazy dog</cite>
        </Text>
        <Text>
          <time>The quick brown fox jumps over the lazy dog</time>
        </Text>
        <Text>
          <legend>The quick brown fox jumps over the lazy dog</legend>
        </Text>
      </div>
    </>
  );
};
