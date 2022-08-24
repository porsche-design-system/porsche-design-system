import { PButton, PScroller } from '@porsche-design-system/components-react';
import { useRef } from 'react';

export const ScrollerExamplePage = (): JSX.Element => {
  const style = `
    p-scroller > span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 300px;
      border: 1px solid deeppink;
    }

    p-scroller > span:not(:last-child) {
      margin-right: 1rem;
    }
  `;

  const ref = useRef(null);

  const clickHandler = () => {
    (ref as any).scrollToPosition = { scrollPosition: 0 };
    console.log(ref, 'ref');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <PButton onClick={() => clickHandler()}>Scroll to start</PButton>
      <PButton>Scroll to middle</PButton>
      <PButton>Scroll to end</PButton>
      <div style={{ maxWidth: '600px' }}>
        <PScroller isFocusable ref={ref}>
          <span>Start</span>
          <span>Middle</span>
          <span>End</span>
        </PScroller>
      </div>
    </>
  );
};
