import { PPopover } from '@porsche-design-system/components-react';

export const PopoverPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render multiple popovers" style={{ height: '500px' }}>
        <span style={{ position: 'absolute', top: '20%', left: '50vw', transform: 'translate(-50%)' }}>
          <PPopover>
            <span>
              Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,{' '}
              <em>emphasized</em> and <i>italic</i> text
            </span>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', top: '55%', left: '50vw', transform: 'translate(-50%)' }}>
          <PPopover direction="top">Top Direction</PPopover>
        </span>
        <span style={{ position: 'absolute', top: '60%', left: '50vw', transform: 'translate(-50%)' }}>
          <PPopover description="Some description via prop"></PPopover>
        </span>
      </div>
    </>
  );
};
