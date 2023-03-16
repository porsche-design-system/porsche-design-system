/* Auto Generated File */
import type { NextPage } from 'next';
import { PScroller } from '@porsche-design-system/components-react/ssr';

const ScrollerPage: NextPage = (): JSX.Element => {
  const style = `
    p-scroller {
      white-space: nowrap;
      max-width: 600px;
    }
    p-scroller > *:not(:last-child) {
      margin-right: 0.5rem;
    }
    p-scroller > button {
      border: 0;
      line-height: 1.5;
      font-size: 16px;
    }

    span {
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

    .light button {
      background: black;
      color: white;
    }

    .dark button {
      background: white;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render scroller on light background">
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

      <div className="playground dark" title="should render scroller on dark background">
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

      <div
        className="playground light surface"
        title="should render scroller gradientColorScheme surface on light surface background"
      >
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

      <div className="playground light surface" title="should render scroller gradientColor surface on light surface background">
        <PScroller gradientColor="background-surface">
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
          <button>Light surface</button>
        </PScroller>
      </div>

      <div className="playground dark surface" title="should render scroller gradientColor surface on dark background">
        <PScroller theme="dark" gradientColor="background-surface">
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
          <button>Dark surface</button>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller with scrollIndicatorPosition center on light background">
        <div style={{ height: '3rem', border: '1px solid deeppink', maxWidth: '600px' }}>
          <PScroller scrollIndicatorPosition="center">
            <button>scrollIndicatorPosition center</button>
            <button>scrollIndicatorPosition center</button>
            <button>scrollIndicatorPosition center</button>
            <button>scrollIndicatorPosition center</button>
            <button>scrollIndicatorPosition center</button>
            <button>scrollIndicatorPosition center</button>
            <button>scrollIndicatorPosition center</button>
          </PScroller>
        </div>
      </div>

      <div className="playground light" title="should render scroller with scrollIndicatorPosition top on light background">
        <div style={{ height: '3rem', border: '1px solid deeppink', maxWidth: '600px' }}>
          <PScroller scrollIndicatorPosition="top">
            <button>scrollIndicatorPosition top</button>
            <button>scrollIndicatorPosition top</button>
            <button>scrollIndicatorPosition top</button>
            <button>scrollIndicatorPosition top</button>
            <button>scrollIndicatorPosition top</button>
            <button>scrollIndicatorPosition top</button>
            <button>scrollIndicatorPosition top</button>
          </PScroller>
        </div>
      </div>

      <div className="playground light" title="should render scroller with alignScrollIndicator center on light background">
        <div style={{ height: '3rem', border: '1px solid deeppink', maxWidth: '600px' }}>
          <PScroller alignScrollIndicator="center">
            <button>alignScrollIndicator center</button>
            <button>alignScrollIndicator center</button>
            <button>alignScrollIndicator center</button>
            <button>alignScrollIndicator center</button>
            <button>alignScrollIndicator center</button>
            <button>alignScrollIndicator center</button>
            <button>alignScrollIndicator center</button>
          </PScroller>
        </div>
      </div>

      <div className="playground light" title="should render scroller with alignScrollIndicator top on light background">
        <div style={{ height: '3rem', border: '1px solid deeppink', maxWidth: '600px' }}>
          <PScroller alignScrollIndicator="top">
            <button>alignScrollIndicator top</button>
            <button>alignScrollIndicator top</button>
            <button>alignScrollIndicator top</button>
            <button>alignScrollIndicator top</button>
            <button>alignScrollIndicator top</button>
            <button>alignScrollIndicator top</button>
            <button>alignScrollIndicator top</button>
          </PScroller>
        </div>
      </div>

      <div
        className="playground light"
        title="should render scroller only on screen size too small to show 8 buttons on light background"
      >
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

      <div className="playground light" title="should render scroller items with linebreaks on light background">
        <PScroller style={{ whiteSpace: 'normal' }}>
          <button>Button text that breaks line</button>
          <button>Button text that breaks line</button>
          <button>Button text that breaks line</button>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller with initial scroll position on light background">
        <div style={{ maxWidth: '600px' }}>
          <PScroller className="scroller" scrollToPosition={{scrollPosition: 280}}>
            <span>Start</span>
            <span>Middle</span>
            <span>End</span>
          </PScroller>
        </div>
      </div>

      <div
        className="playground light"
        title="should render scroller with scroll indicator size according to fontsize large on light background"
      >
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

      <div
        className="playground light"
        title="should render scroller with scroll indicator size according to inherit size on light background"
      >
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

      <div className="playground light" title="should render scroller with scrollbar on light background">
        <PScroller scrollbar={true}>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
              dolore magna aliquyam erat, sed diam voluptua. <br />At vero eos et accusam et justo duo dolores et ea rebum.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
              dolore magna aliquyam erat, sed diam voluptua. <br />At vero eos et accusam et justo duo dolores et ea rebum.
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                  dolore magna aliquyam erat, sed diam voluptua. <br />At vero eos et accusam et justo duo dolores et ea
                  rebum.
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                  dolore magna aliquyam erat, sed diam voluptua. <br />At vero eos et accusam et justo duo dolores et ea
                  rebum.
                </li>
              </ul>
            </li>
          </ul>
        </PScroller>
      </div>
    </>
  );
};

export default ScrollerPage;
