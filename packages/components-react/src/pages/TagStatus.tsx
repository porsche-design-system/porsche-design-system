/* Auto Generated File */
import { PTagStatus } from '@porsche-design-system/components-react';

export const TagStatusPage = (): JSX.Element => {
  const style = `
    .playground {
      margin-bottom: -0.5rem;
    }

    p-tag-status {
      margin-bottom: 0.5rem;
    }

    p-tag-status:not(:last-child) {
      margin-right: 0.5rem;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should show different background colors on light background">
        <PTagStatus>Default</PTagStatus>
        <PTagStatus color="default">Color default</PTagStatus>
        <PTagStatus color="background-surface">Color background-surface</PTagStatus>
        <PTagStatus color="neutral-contrast-high">Color neutral-contrast-high</PTagStatus>
        <PTagStatus color="notification-neutral">Color notification-neutral</PTagStatus>
        <PTagStatus color="notification-success">Color notification-success</PTagStatus>
        <PTagStatus color="notification-error">Color notification-error</PTagStatus>
        <PTagStatus color="notification-warning">Color notification-warning</PTagStatus>
      </div>

      <div className="playground light surface" title="should show different background colors on light surface background">
        <PTagStatus>Default</PTagStatus>
        <PTagStatus color="default">Color default</PTagStatus>
        <PTagStatus color="background-surface">Color background-surface</PTagStatus>
        <PTagStatus color="neutral-contrast-high">Color neutral-contrast-high</PTagStatus>
        <PTagStatus color="notification-neutral">Color notification-neutral</PTagStatus>
        <PTagStatus color="notification-success">Color notification-success</PTagStatus>
        <PTagStatus color="notification-error">Color notification-error</PTagStatus>
        <PTagStatus color="notification-warning">Color notification-warning</PTagStatus>
      </div>

      <div className="playground dark" title="should show different background colors on dark background">
        <PTagStatus theme="dark">Default</PTagStatus>
        <PTagStatus theme="dark" color="default">Color default</PTagStatus>
        <PTagStatus theme="dark" color="background-surface">Color background-surface</PTagStatus>
        <PTagStatus theme="dark" color="neutral-contrast-high">Color neutral-contrast-high</PTagStatus>
        <PTagStatus theme="dark" color="notification-neutral">Color notification-neutral</PTagStatus>
        <PTagStatus theme="dark" color="notification-success">Color notification-success</PTagStatus>
        <PTagStatus theme="dark" color="notification-error">Color notification-error</PTagStatus>
        <PTagStatus theme="dark" color="notification-warning">Color notification-warning</PTagStatus>
      </div>

      <div className="playground dark surface" title="should show different background colors on dark surface background">
        <PTagStatus theme="dark">Default</PTagStatus>
        <PTagStatus theme="dark" color="default">Color default</PTagStatus>
        <PTagStatus theme="dark" color="background-surface">Color background-surface</PTagStatus>
        <PTagStatus theme="dark" color="neutral-contrast-high">Color neutral-contrast-high</PTagStatus>
        <PTagStatus theme="dark" color="notification-neutral">Color notification-neutral</PTagStatus>
        <PTagStatus theme="dark" color="notification-success">Color notification-success</PTagStatus>
        <PTagStatus theme="dark" color="notification-error">Color notification-error</PTagStatus>
        <PTagStatus theme="dark" color="notification-warning">Color notification-warning</PTagStatus>
      </div>

      <div className="playground light" title="should show different background colors and icons on light background">
        <PTagStatus icon="car" color="default">Color default</PTagStatus>
        <PTagStatus icon="highway" color="background-surface">Color background-surface</PTagStatus>
        <PTagStatus iconSource="./assets/icon-custom-kaixin.svg" color="background-surface">
          Color background-surface
        </PTagStatus>
      </div>

      <div className="playground dark" title="should show different background colors and icons on dark background">
        <PTagStatus theme="dark" icon="car" color="default">Color default</PTagStatus>
        <PTagStatus theme="dark" icon="highway" color="background-surface">Color background-surface</PTagStatus>
        <PTagStatus theme="dark" iconSource="./assets/icon-custom-kaixin.svg" color="background-surface">
          Color background-surface
        </PTagStatus>
      </div>

      <div className="playground light" title="should show different background colors with link on light background">
        <PTagStatus color="default"><a href="#">Color default link</a></PTagStatus>
        <PTagStatus color="background-surface"><a href="#">Color background-surface link</a></PTagStatus>
        <PTagStatus icon="car" color="default"><a href="#">Color default link</a></PTagStatus>
        <PTagStatus icon="highway" color="background-surface"><a href="#">Color background-surface link</a></PTagStatus>
        <PTagStatus iconSource="./assets/icon-custom-kaixin.svg" color="default">
          <a href="#">Color default link</a>
        </PTagStatus>
      </div>

      <div className="playground dark" title="should show different background colors with link on dark background">
        <PTagStatus theme="dark" color="default"><a href="#">Color default link</a></PTagStatus>
        <PTagStatus theme="dark" color="background-surface"><a href="#">Color background-surface link</a></PTagStatus>
        <PTagStatus theme="dark" icon="car" color="default"><a href="#">Color default link</a></PTagStatus>
        <PTagStatus theme="dark" icon="highway" color="background-surface">
          <a href="#">Color background-surface link</a>
        </PTagStatus>
        <PTagStatus theme="dark" iconSource="./assets/icon-custom-kaixin.svg" color="default">
          <a href="#">Color default link</a>
        </PTagStatus>
      </div>

      <div className="playground light" title="should show different background colors with button on light background">
        <PTagStatus color="default"><button>Color default button</button></PTagStatus>
        <PTagStatus color="background-surface"><button>Color background-surface button</button></PTagStatus>
        <PTagStatus icon="car" color="default"><button>Color default button</button></PTagStatus>
        <PTagStatus icon="highway" color="background-surface">
          <button>Color background-surface button</button>
        </PTagStatus>
        <PTagStatus iconSource="./assets/icon-custom-kaixin.svg" color="default">
          <button>Color default button</button>
        </PTagStatus>
      </div>

      <div className="playground dark" title="should show different background colors with button on dark background">
        <PTagStatus theme="dark" color="default"><button>Color default button</button></PTagStatus>
        <PTagStatus theme="dark" color="background-surface"><button>Color background-surface button</button></PTagStatus>
        <PTagStatus theme="dark" icon="car" color="default"><button>Color default button</button></PTagStatus>
        <PTagStatus theme="dark" icon="highway" color="background-surface">
          <button>Color background-surface button</button>
        </PTagStatus>
        <PTagStatus theme="dark" iconSource="./assets/icon-custom-kaixin.svg" color="default">
          <button>Color default button</button>
        </PTagStatus>
      </div>

      <div className="playground light" title="should show different multiline tags on light background">
        <div style={{ width: '100px', overflow: 'hidden' }}>
          <PTagStatus color="neutral-contrast-high">Text that is very long</PTagStatus>
          <PTagStatus color="neutral-contrast-high" icon="car">Text with icon that is very long</PTagStatus>
          <PTagStatus color="notification-success" icon="car">
            <a href="#">Link with icon that is very long</a>
          </PTagStatus>
          <PTagStatus color="notification-success" icon="car">
            <button>Button with icon that is very long</button>
          </PTagStatus>
        </div>
      </div>
    </>
  );
};
