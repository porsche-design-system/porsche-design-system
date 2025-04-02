import {
  PButton,
  PScroller,
  PTagDismissible,
  type ScrollerScrollToPosition,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const ScrollerExamplePage = (): JSX.Element => {
  const style = `
      p-scroller > *:not(:last-child) {
        margin-right: 1rem;
      }

      button {
        margin: 0 1rem 1rem 0;
      }
  `;

  const [scrollToPosition, setScrollToPosition] = useState<ScrollerScrollToPosition>({
    scrollPosition: 220,
    isSmooth: false,
  });

  const onClick = useCallback(
    (scrollPosition: number) => () => {
      setScrollToPosition({ scrollPosition: scrollPosition, isSmooth: true });
    },
    []
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <PButton type="button" onClick={onClick(0)} compact={true}>
        Scroll to start
      </PButton>
      <PButton type="button" onClick={onClick(220)} compact={true}>
        Scroll to middle
      </PButton>
      <PButton type="button" onClick={onClick(720)} compact={true}>
        Scroll to end
      </PButton>

      <div style={{ maxWidth: '400px', whiteSpace: 'nowrap' }}>
        <PScroller scrollToPosition={scrollToPosition}>
          <PTagDismissible>START - some tag content</PTagDismissible>
          <PTagDismissible>MIDDLE - some tag content</PTagDismissible>
          <PTagDismissible>END - some tag content</PTagDismissible>
        </PScroller>
      </div>
    </>
  );
};
