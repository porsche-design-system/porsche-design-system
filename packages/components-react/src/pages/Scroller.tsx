/* Auto Generated File */
import { PScroller } from '@porsche-design-system/components-react';

export const ScrollerPage = (): JSX.Element => {
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

      <div className="playground light" title="should render scroller gradientColorScheme surface on light background">
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

      <div className="playground dark" title="should render scroller gradientColorScheme surface on dark background">
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

      </div>
    </>
  );
};
