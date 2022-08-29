import { PScroller, PTagDismissible } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const ScrollerExamplePage = (): JSX.Element => {
  const style = `
      .scroller > *:not(:last-child) {
        margin-right: 1rem;
      }

      #app > button {
        margin: 0 1rem 1rem 0;
      }
  `;

  const [scrollPosition, setScrollPosition] = useState<number>(220);
  const [isSmooth, setIsSmooth] = useState<boolean>(false);

  const clickHandler = (scrollPosition: number, isSmooth: boolean) => {
    setIsSmooth(isSmooth);
    setScrollPosition(scrollPosition);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <button onClick={() => clickHandler(0, true)}>Scroll to start</button>
      <button onClick={() => clickHandler(220, true)}>Scroll to middle</button>
      <button onClick={() => clickHandler(720, true)}>Scroll to end</button>

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
