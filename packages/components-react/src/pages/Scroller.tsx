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

      <div className="playground light" title="should render scroller" style={{ maxWidth: '600px' }}>
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

      <div className="playground dark" title="should render scroller on dark theme" style={{ maxWidth: '600px' }}>
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

      <div
        className="playground light surface"
        title="should render scroller gradientColorScheme surface on light background"
        style={{ maxWidth: '600px' }}
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

      <div
        className="playground dark surface"
        title="should render scroller gradientColorScheme surface on dark background"
        style={{ maxWidth: '600px' }}
      >
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

      <div className="playground light-electric" title="should render scroller light-electric" style={{ maxWidth: '600px' }}>
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

      <div className="playground dark-electric" title="should render scroller dark-electric" style={{ maxWidth: '600px' }}>
        <PScroller theme="dark-electric">
          <button>Dark electric</button>
          <button>Dark electric</button>
          <button>Dark electric</button>
          <button>Dark electric</button>
          <button>Dark electric</button>
          <button>Dark electric</button>
          <button>Dark electric</button>
        </PScroller>
      </div>

      <div className="playground" title="should render scroller with 500px scrolled to position" style={{ maxWidth: '600px' }}>
        <PScroller scrollToPosition={{ scrollPosition: 500 }}>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
        </PScroller>
      </div>

      <div
        className="playground dark"
        title="should render scroller with 500px scrolled to position on dark background"
        style={{ maxWidth: '600px' }}
      >
        <PScroller theme="dark" scrollToPosition={{ scrollPosition: 500 }}>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
          <button>Scrolled to position x</button>
        </PScroller>
      </div>

      <div className="playground" title="should render scroller with scroll indicator position top" style={{ maxWidth: '600px' }}>
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

      <div
        className="playground dark"
        title="should render scroller with scroll indicator position top on dark background"
        style={{ maxWidth: '600px' }}
      >
        <PScroller theme="dark" scrollIndicatorPosition="top">
          <button>Scroll indicator position top</button>
          <button>Scroll indicator position top</button>
          <button>Scroll indicator position top</button>
          <button>Scroll indicator position top</button>
          <button>Scroll indicator position top</button>
          <button>Scroll indicator position top</button>
          <button>Scroll indicator position top</button>
        </PScroller>
      </div>

      <div
        className="playground light"
        title="should render scroller with scroll indicator size according to medium fontsize"
        style={{ maxWidth: '600px' }}
      >
        <PScroller>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
        </PScroller>
      </div>

      <div
        className="playground dark"
        title="should render scroller with scroll indicator size according to medium fontsize on dark background"
        style={{ maxWidth: '600px' }}
      >
        <PScroller theme="dark">
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
          <button style={{ fontSize: 'medium' }}>Medium font</button>
        </PScroller>
      </div>

      <div
        className="playground light"
        title="should render scroller with scroll indicator size according to large fontsize"
        style={{ maxWidth: '600px' }}
      >
        <PScroller>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
        </PScroller>
      </div>

      <div
        className="playground dark"
        title="should render scroller with scroll indicator size according to medium fontsize on dark background"
        style={{ maxWidth: '600px' }}
      >
        <PScroller theme="dark">
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
          <button style={{ fontSize: 'large' }}>Large font</button>
        </PScroller>
      </div>

      <div
        className="playground light"
        title="should render scroller with scroll indicator size according to inherit size"
        style={{ maxWidth: '600px' }}
      >
        <PScroller>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
        </PScroller>
      </div>

      <div
        className="playground dark"
        title="should render scroller with scroll indicator size according to inherit size on dark background"
        style={{ maxWidth: '600px' }}
      >
        <PScroller theme="dark">
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
          <button size="inherit">Size inherit</button>
        </PScroller>
      </div>

      <div className="playground light" title="should render scroller only on screen size too small to show 8 buttons">
        <PScroller>
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

      <div
        className="playground dark"
        style={{ maxWidth: 'none !important' }}
        title="should render scroller only on screen size too small to show 8 buttons on dark background"
      >
        <PScroller theme="dark">
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
    </>
  );
};
