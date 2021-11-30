import { PPopover } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const PopoverOverviewPage = (): JSX.Element => {
  useEffect(() => {
    // remove selection from screenshot
    document.querySelector('select').remove();
    // Enable multiple open popovers
    document.addEventListener(
      'mousedown',
      (e) => {
        e.stopPropagation();
      },
      true
    );
  }, []);

  return (
    <>
      <div title="should render multiple popovers on edge" style={{ height: '800px', width: '100%' }}>
        <span
          style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '1rem', background: 'rgba(0, 0, 255, 0.1)' }}
        ></span>
        <span
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1rem',
            background: 'rgba(0, 0, 255, 0.1)',
          }}
        ></span>
        <span
          style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '1rem', background: 'rgba(0, 0, 255, 0.1)' }}
        ></span>
        <span
          style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '1rem', background: 'rgba(0, 0, 255, 0.1)' }}
        ></span>
        {/*Top Left to right  */}
        <span style={{ position: 'absolute', top: '1.5rem', left: '1rem' }}>
          <PPopover direction="right">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', top: '2rem', left: '13rem' }}>
          <PPopover direction="right">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', top: '3rem', left: '25rem' }}>
          <PPopover direction="right">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        {/*Bottom Left to right   */}
        <span style={{ position: 'absolute', bottom: '1.5rem', left: '1rem' }}>
          <PPopover direction="right">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', bottom: '2rem', left: '13rem' }}>
          <PPopover direction="right">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', bottom: '3rem', left: '25rem' }}>
          <PPopover direction="right">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        {/*Top  Right to left  */}
        <span style={{ position: 'absolute', top: '1.5rem', right: '1rem' }}>
          <PPopover direction="left">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', top: '2rem', right: '13rem' }}>
          <PPopover direction="left">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', top: '3rem', right: '25rem' }}>
          <PPopover direction="left">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        {/*Bottom  Right to left   */}
        <span style={{ position: 'absolute', bottom: '1.5rem', right: '1rem' }}>
          <PPopover direction="left">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', bottom: '2rem', right: '13rem' }}>
          <PPopover direction="left">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', bottom: '3rem', right: '25rem' }}>
          <PPopover direction="left">
            <div>Some popover</div>
            <div>Some popover</div>
            <div>Some popover</div>
          </PPopover>
        </span>
        {/*Top Center*/}
        <span style={{ position: 'absolute', top: '4.5rem', right: '50rem' }}>
          <PPopover direction="top">
            <div>Direction Top</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', top: '4rem', right: '65rem' }}>
          <PPopover direction="top">
            <div>Direction Top</div>
          </PPopover>
        </span>
        {/*Bottom Center*/}
        <span style={{ position: 'absolute', bottom: '4.5rem', right: '50rem' }}>
          <PPopover direction="bottom">
            <div>Direction Bottom</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', bottom: '4rem', right: '65rem' }}>
          <PPopover direction="bottom">
            <div>Direction Bottom</div>
          </PPopover>
        </span>
        {/*Left Center*/}
        <span style={{ position: 'absolute', top: '10rem', left: '10rem' }}>
          <PPopover direction="left">
            <div>Direction Left</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', top: '15rem', left: '9rem' }}>
          <PPopover direction="left">
            <div>Direction Left</div>
          </PPopover>
        </span>
        {/*Right Center*/}
        <span style={{ position: 'absolute', top: '10rem', right: '10.5rem' }}>
          <PPopover direction="right">
            <div>Direction Right</div>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', top: '15rem', right: '9rem' }}>
          <PPopover direction="right">
            <div>Direction Right</div>
          </PPopover>
        </span>
      </div>
    </>
  );
};
