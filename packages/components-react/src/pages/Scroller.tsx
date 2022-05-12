/* Auto Generated File */
import { PScroller } from '@porsche-design-system/components-react';
import { useEffect } from 'react';
import { pollComponentsReady } from '../pollComponentsReady';

export const ScrollerPage = (): JSX.Element => {
  useEffect(() => {
    // Use alias for function to bypass setAllReady in generateAngularReactVRTPages.ts
    const PDSReady = pollComponentsReady;
    PDSReady().then(() => {
      document.querySelectorAll(`p-scroller[data-id^='prev']`).forEach((scroller) => {
        scroller.shadowRoot.querySelector('.action--next p-button-pure').click();
      });
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render scroller on light background">
        <PScroller>
          <a href="#">Anchor 1</a>
          <a href="#">Anchor 2</a>
          <a href="#">Anchor 3</a>
          <a href="#">Anchor 4</a>
          <a href="#">Anchor 5</a>
          <a href="#">Anchor 6</a>
          <a href="#">Anchor 7</a>
        </PScroller>
      </div>

      <div className="playground dark" title="should render scroller on dark background">
        <PScroller theme="dark">
          <a href="#">Anchor 1</a>
          <a href="#">Anchor 2</a>
          <a href="#">Anchor 3</a>
          <a href="#">Anchor 4</a>
          <a href="#">Anchor 5</a>
          <a href="#">Anchor 6</a>
          <a href="#">Anchor 7</a>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller with prev button on light background">
        <PScroller dataId="prev-light">
          <a href="#">Anchor 1</a>
          <a href="#">Anchor 2</a>
          <a href="#">Anchor 3</a>
          <a href="#">Anchor 4</a>
          <a href="#">Anchor 5</a>
          <a href="#">Anchor 6</a>
          <a href="#">Anchor 7</a>
        </PScroller>
      </div>

      <div className="playground dark" title="should render scroller with prev button on dark background">
        <PScroller dataId="prev-dark" theme="dark">
          <a href="#">Anchor 1</a>
          <a href="#">Anchor 2</a>
          <a href="#">Anchor 3</a>
          <a href="#">Anchor 4</a>
          <a href="#">Anchor 5</a>
          <a href="#">Anchor 6</a>
          <a href="#">Anchor 7</a>
        </PScroller>
      </div>

      <div className="playground light surface" title="should render scroller gradientColorScheme surface on light background">
        <PScroller gradientColorScheme="surface">
          <a href="#">Anchor 1</a>
          <a href="#">Anchor 2</a>
          <a href="#">Anchor 3</a>
          <a href="#">Anchor 4</a>
          <a href="#">Anchor 5</a>
          <a href="#">Anchor 6</a>
          <a href="#">Anchor 7</a>
        </PScroller>
      </div>

      <div className="playground dark surface" title="should render scroller gradientColorScheme surface on dark background">
        <PScroller theme="dark" gradientColorScheme="surface">
          <a href="#">Anchor 1</a>
          <a href="#">Anchor 2</a>
          <a href="#">Anchor 3</a>
          <a href="#">Anchor 4</a>
          <a href="#">Anchor 5</a>
          <a href="#">Anchor 6</a>
          <a href="#">Anchor 7</a>
        </PScroller>
      </div>

      <div
        className="playground light surface"
        title="should render scroller with prev button and gradientColorScheme surface on light background"
      >
        <PScroller dataId="prev-surface-light" gradientColorScheme="surface">
          <a href="#">Anchor 1</a>
          <a href="#">Anchor 2</a>
          <a href="#">Anchor 3</a>
          <a href="#">Anchor 4</a>
          <a href="#">Anchor 5</a>
          <a href="#">Anchor 6</a>
          <a href="#">Anchor 7</a>
        </PScroller>
      </div>

      <div
        className="playground dark surface"
        title="should render scroller with prev button and gradientColorScheme surface on dark background"
      >
        <PScroller dataId="prev-surface-dark" theme="dark" gradientColorScheme="surface">
          <a href="#">Anchor 1</a>
          <a href="#">Anchor 2</a>
          <a href="#">Anchor 3</a>
          <a href="#">Anchor 4</a>
          <a href="#">Anchor 5</a>
          <a href="#">Anchor 6</a>
          <a href="#">Anchor 7</a>
        </PScroller>
      </div>
    </>
  );
};
