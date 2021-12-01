import { PPopover } from '@porsche-design-system/components-react';

export const PopoverPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should render multiple popovers" style={{ height: '500px' }}>
        <PPopover style={{ top: '50%', left: '50%', margin: '-12px 0 0 -12px' }}>
          <span>
            Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,
            <em> emphasized</em> and <i>italic</i> text
          </span>
        </PPopover>
      </div>
    </>
  );
};
