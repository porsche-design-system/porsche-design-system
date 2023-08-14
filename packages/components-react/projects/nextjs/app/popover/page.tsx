/* Auto Generated File */
import type { NextPage } from 'next';
import { PPopover } from '@porsche-design-system/components-react/ssr';

const PopoverPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div
        className="playground light"
        title="should render multiple popovers on light background"
        style={{ position: 'relative', height: '500px' }}
      >
        <span style={{ position: 'absolute', top: '15%', left: '50vw', transform: 'translate(-50%)' }}>
          <PPopover>
            <span>
              Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </PPopover>
        </span>
        <span style={{ position: 'absolute', top: '55%', left: '50vw', transform: 'translate(-50%)' }}>
          <PPopover direction="top">Top direction</PPopover>
        </span>
        <span style={{ position: 'absolute', top: '60%', left: '50vw', transform: 'translate(-50%)' }}>
          <PPopover description="Some description via prop" />
        </span>
      </div>

      <div className="playground dark" title="should render popover on dark background" style={{ position: 'relative', height: '200px' }}>
        <span style={{ position: 'absolute', top: '60%', left: '50vw', transform: 'translate(-50%)' }}>
          <PPopover theme="dark" direction="top">
            <span>
              Some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>, <strong>strong</strong>,
              {' '}<em>emphasized</em> and <i>italic</i> text.
            </span>
          </PPopover>
        </span>
      </div>
    </>
  );
};

export default PopoverPage;
