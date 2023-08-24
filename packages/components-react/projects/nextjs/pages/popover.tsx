/* Auto Generated File */
import type { NextPage } from 'next';
import { PPopover } from '@porsche-design-system/components-react/ssr';
import { useEffect, useState } from 'react';
import { componentsReady } from '@porsche-design-system/components-react/ssr';

/**
 * Since React 18, using componentsReady() within useEffect() constantly resolves with `0` in headless Chrome.
 * Therefore, we make it poll and check that more than `0` components are ready.
 */
export const pollComponentsReady = async (): Promise<number> => {
  const amount = await componentsReady();
  if (amount === 0) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return pollComponentsReady();
  } else {
    return amount;
  }
};


const PopoverPage: NextPage = (): JSX.Element => {
  const [allReady, setAllReady] = useState(false);
  useEffect(() => {
    pollComponentsReady().then(() => {
      setAllReady(true);
    });
  }, []);

  return (
    <>
      <div className="playground light" title="should render multiple popovers" style={{ position: 'relative', height: '500px' }}>
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
    </>
  );
};

export default PopoverPage;
