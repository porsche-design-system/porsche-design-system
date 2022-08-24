import { PButton, PScroller } from '@porsche-design-system/components-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export const ScrollerExamplePage = (): JSX.Element => {
  const style = `
    p-scroller > span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      width: 300px;
      border: 1px solid deeppink;
    }

    p-scroller > span:not(:last-child) {
      margin-right: 1rem;
    }

    p-button {
      padding: 1rem 1rem 1rem 0;
    }
  `;

  const ref = useRef(null);

  const [scrollPosition, setScrollPosition] = useState<number>(400);

  const clickHandler = useCallback((scrollPosition: number) => {
    setScrollPosition(scrollPosition);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <PButton onClick={() => clickHandler(0)}>Scroll to start</PButton>
      <PButton onClick={() => clickHandler(290)}>Scroll to middle</PButton>
      <PButton onClick={() => clickHandler(900)}>Scroll to end</PButton>
      <div style={{ maxWidth: '600px' }}>
        <PScroller isFocusable scrollToPosition={{ scrollPosition }}>
          <span>Start</span>
          <span>Middle</span>
          <span>End</span>
        </PScroller>
      </div>
    </>
  );
};
