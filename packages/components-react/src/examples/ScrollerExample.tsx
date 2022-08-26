import { PButton, PScroller } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const ScrollerExamplePage = (): JSX.Element => {
  const style = `
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

    p-button {
      margin: 0 1rem 1rem 0;
    }
  `;

  const [scrollPosition, setScrollPosition] = useState<number>(290);
  const [isSmooth, setIsSmooth] = useState<boolean>(false);

  const clickHandler = (scrollPosition: number, isSmooth: boolean) => {
    setIsSmooth(isSmooth);
    setScrollPosition(scrollPosition);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <button onClick={() => clickHandler(0, true)}>Scroll to start</button>
      <button onClick={() => clickHandler(290, true)}>Scroll to middle</button>
      <button onClick={() => clickHandler(900, true)}>Scroll to end</button>

      <div style={{ maxWidth: '600px' }}>
        <PScroller className="scroller" isFocusable scrollToPosition={{ scrollPosition, isSmooth }}>
          <span>Start</span>
          <span>Middle</span>
          <span>End</span>
        </PScroller>
      </div>
    </>
  );
};
