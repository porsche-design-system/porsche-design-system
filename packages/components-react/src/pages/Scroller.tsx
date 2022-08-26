/* Auto Generated File */
import { PScroller } from '@porsche-design-system/components-react';

export const ScrollerPage = (): JSX.Element => {
  const style = `
    p-scroller {
      white-space: nowrap;
      max-width: 600px;
    }
    p-scroller > *:not(:last-child) {
      margin-right: 0.5rem;
    }
    p-scroller > button {
      line-height: 1.5;
      font-size: 16px;
    }

    .scroller > span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      width: 300px;
      border: 1px solid deeppink;
    }

    .scroller > span:not(:last-child) {
      margin-right: 1rem;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render scroller">
        <PScroller>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
          <button>Default Light</button>
        </PScroller>
      </div>

      <div className="playground dark" title="should render scroller on dark theme">
        <PScroller theme="dark">
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
          <button>Default dark</button>
        </PScroller>
      </div>

      <div className="playground light-electric" title="should render scroller light-electric">
        <PScroller theme="light-electric">
          <button>Light electric</button>
          <button>Light electric</button>
          <button>Light electric</button>
          <button>Light electric</button>
          <button>Light electric</button>
          <button>Light electric</button>
          <button>Light electric</button>
        </PScroller>
      </div>

      <div className="playground light surface" title="should render scroller gradientColorScheme surface on light background">
        <PScroller gradientColorScheme="surface">
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
        </PScroller>
      </div>

      <div className="playground dark surface" title="should render scroller gradientColorScheme surface on dark background">
        <PScroller theme="dark" gradientColorScheme="surface">
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
        </PScroller>
      </div>

      <div className="playground" title="should render scroller with scroll indicator position center">
        <div style={{ height: '50px', border: '1px solid deeppink', maxWidth: '600px' }}>
          <PScroller scrollIndicatorPosition="center">
            <button>Scroll indicator position center</button>
            <button>Scroll indicator position center</button>
            <button>Scroll indicator position center</button>
            <button>Scroll indicator position center</button>
            <button>Scroll indicator position center</button>
            <button>Scroll indicator position center</button>
            <button>Scroll indicator position center</button>
          </PScroller>
        </div>
      </div>

      <div className="playground" title="should render scroller with scroll indicator position top">
        <div style={{ height: '50px', border: '1px solid deeppink', maxWidth: '600px' }}>
          <PScroller scrollIndicatorPosition="top">
            <button>Scroll indicator position top</button>
            <button>Scroll indicator position top</button>
            <button>Scroll indicator position top</button>
            <button>Scroll indicator position top</button>
            <button>Scroll indicator position top</button>
            <button>Scroll indicator position top</button>
            <button>Scroll indicator position top</button>
          </PScroller>
        </div>
      </div>

      <div className="playground light" title="should render scroller with scroll indicator size according to fontsize large">
        <PScroller style={{ fontSize: '2.25rem', lineHeight: 1.3333333333 }}>
          <a href="#">Large font</a>
          <a href="#">Large font</a>
          <a href="#">Large font</a>
          <a href="#">Large font</a>
          <a href="#">Large font</a>
          <a href="#">Large font</a>
          <a href="#">Large font</a>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller with scroll indicator size according to inherit size">
        <div style={{ fontSize: '2.25rem', lineHeight: 1.3333333333 }}>
          <PScroller style={{ fontSize: 'inherit' }}>
            <a href="#">Size inherit</a>
            <a href="#">Size inherit</a>
            <a href="#">Size inherit</a>
            <a href="#">Size inherit</a>
            <a href="#">Size inherit</a>
            <a href="#">Size inherit</a>
            <a href="#">Size inherit</a>
          </PScroller>
        </div>
      </div>

      <div className="playground light" title="should render scroller only on screen size too small to show 8 buttons">
        <PScroller style={{ maxWidth: 'none' }}>
          <button>Without max width</button>
          <button>Without max width</button>
          <button>Without max width</button>
          <button>Without max width</button>
          <button>Without max width</button>
          <button>Without max width</button>
          <button>Without max width</button>
          <button>Without max width</button>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller items with linebreaks">
        <PScroller style={{ whiteSpace: 'normal' }}>
          <button>Button text that breaks line</button>
          <button>Button text that breaks line</button>
          <button>Button text that breaks line</button>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller with initial scroll position">
        <div style={{ maxWidth: '600px' }}>
          <PScroller className="scroller" scrollToPosition={{scrollPosition: 290}}>
            <span>Start</span>
            <span>Middle</span>
            <span>End</span>
          </PScroller>
        </div>
      </div>
    </>
  );
};
