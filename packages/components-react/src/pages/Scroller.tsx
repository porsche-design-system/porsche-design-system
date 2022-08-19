/* Auto Generated File */
import { PScroller } from '@porsche-design-system/components-react';

export const ScrollerPage = (): JSX.Element => {
  const style = `
    p-scroller > * {
      padding: 40px;
      border: 1px solid deeppink;
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
        <PScroller>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
        </PScroller>
        <PScroller>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
        </PScroller>
      </div>

      <div className="playground dark" title="should render scroller on dark theme">
        <PScroller theme="dark">
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
        <PScroller theme="dark">
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
        </PScroller>
        <PScroller theme="dark">
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
          <p>Paragraph</p>
        </PScroller>
      </div>

      <div className="playground light surface" title="should render scroller gradientColorScheme surface on light background">
        <PScroller gradientColorScheme="surface">
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground dark surface" title="should render scroller gradientColorScheme surface on dark background">
        <PScroller theme="dark" gradientColorScheme="surface">
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground" title="should render scroller with 500 px scrolled to position">
        <PScroller scrollToPosition={{ scrollPosition: 500 }}>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground dark" title="should render scroller with 500 px scrolled to position on dark background">
        <PScroller theme="dark" scrollToPosition={{ scrollPosition: 500 }}>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground" title="should render scroller with scroll indicator position top">
        <PScroller scrollIndicatorPosition="top">
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>

      <div className="playground dark" title="should render scroller with scroll indicator position top on dark background">
        <PScroller theme="dark" scrollIndicatorPosition="top">
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </PScroller>
      </div>
    </>
  );
};
