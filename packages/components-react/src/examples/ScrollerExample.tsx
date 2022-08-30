import { PScroller, PTagDismissible } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const ScrollerExamplePage = (): JSX.Element => {
  const style = `
      .scroller > *:not(:last-child) {
        margin-right: 1rem;
      }

      button {
        margin: 0 1rem 1rem 0;
      }
  `;

  const [scrollPosition, setScrollPosition] = useState<number>(220);
  const [isSmooth, setIsSmooth] = useState<boolean>(false);

  const onClick = (scrollPosition: number) => {
    setIsSmooth(true);
    setScrollPosition(scrollPosition);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <button type={'button'} onClick={() => onClick(0)}>
        Scroll to start
      </button>
      <button type={'button'} onClick={() => onClick(220)}>
        Scroll to middle
      </button>
      <button type={'button'} onClick={() => onClick(720)}>
        Scroll to end
      </button>

      <div style={{ maxWidth: '400px', whiteSpace: 'nowrap' }}>
        <PScroller className="scroller" scrollToPosition={{ scrollPosition, isSmooth }}>
          <PTagDismissible>START - some tag content</PTagDismissible>
          <PTagDismissible>MIDDLE - some tag content</PTagDismissible>
          <PTagDismissible>END - some tag content</PTagDismissible>
        </PScroller>
      </div>
    </>
  );
};
