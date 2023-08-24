/* Auto Generated File */
import type { NextPage } from 'next';
import { PScroller } from '@porsche-design-system/components-react/ssr';

const ScrollerPage: NextPage = (): JSX.Element => {
  const style = `
    p-scroller {
      max-width: 600px;
    }

    .playground > div {
      height: 3rem;
      border: 1px solid deeppink;
      max-width: 600px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render scroller">
        <PScroller>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground light surface" title="should render scroller gradientColorScheme surface on surface background">
        <PScroller gradientColorScheme="surface">
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground light surface" title="should render scroller gradientColor surface on surface background">
        <PScroller gradientColor="background-surface">
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller with scrollIndicatorPosition center">
        <div>
          <PScroller scrollIndicatorPosition="center">
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
          </PScroller>
        </div>
      </div>

      <div className="playground light" title="should render scroller with scrollIndicatorPosition top">
        <div>
          <PScroller scrollIndicatorPosition="top">
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
          </PScroller>
        </div>
      </div>

      <div className="playground light" title="should render scroller with alignScrollIndicator center">
        <div>
          <PScroller alignScrollIndicator="center">
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
          </PScroller>
        </div>
      </div>

      <div className="playground light" title="should render scroller with alignScrollIndicator top">
        <div>
          <PScroller alignScrollIndicator="top">
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
          </PScroller>
        </div>
      </div>

      <div className="playground light" title="should render scroller only on screen size too small to show all buttons at once">
        <PScroller style={{ maxWidth: 'none' }}>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller items with linebreaks">
        <PScroller>
          <button>Button with line break</button>
          <button>Button with line break</button>
          <button>Button with line break</button>
          <button>Button with line break</button>
          <button>Button with line break</button>
          <button>Button with line break</button>
          <button>Button with line break</button>
          <button>Button with line break</button>
          <button>Button with line break</button>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller with initial scroll position">
        <PScroller className="scroller" scrollToPosition={{scrollPosition: 100}}>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller with scrollbar">
        <div>
          <PScroller scrollbar={true}>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
            <button>Button</button>
          </PScroller>
        </div>
      </div>
    </>
  );
};

export default ScrollerPage;
