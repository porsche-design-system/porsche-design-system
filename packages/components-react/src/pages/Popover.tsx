import { PPopover } from '@porsche-design-system/components-react';

export const PopoverPage = (): JSX.Element => {
  return (
    <>
      <div
        className="playground light"
        title="should render multiple popovers"
        style={{ height: '800px', width: '100%' }}
      >
        <span style={{ position: 'absolute', top: '20vh', left: '20vw' }}>
          <PPopover>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna
          </PPopover>
        </span>

        <span style={{ position: 'absolute', top: '50vh', left: '50vw' }}>
          <PPopover>
            <span>
              Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,
              <em> emphasized</em> and <i>italic</i> text
            </span>
          </PPopover>
        </span>

        <span style={{ position: 'absolute', bottom: '20vh', right: '20vw' }}>
          <PPopover>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna
          </PPopover>
        </span>
      </div>
    </>
  );
};
