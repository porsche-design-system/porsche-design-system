/* Auto Generated File */
import { PTagStatus } from '@porsche-design-system/components-react';

export const TagStatusPage = (): JSX.Element => {
  const style = `
    p-tag-status:not(:last-child) {
      margin-right: 0.5rem;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should show different background colors on light background">
        <PTagStatus>Tag with default props</PTagStatus>
        <PTagStatus color="default">Tag default</PTagStatus>
        <PTagStatus color="background-surface">Tag background-surface</PTagStatus>
        <PTagStatus color="neutral-contrast-high">Tag neutral-contrast-high</PTagStatus>
        <PTagStatus color="notification-neutral">Tag notification-neutral</PTagStatus>
        <PTagStatus color="notification-success">Tag notification-success</PTagStatus>
        <PTagStatus color="notification-error">Tag notification-error</PTagStatus>
        <PTagStatus color="notification-warning">Tag notification-warning</PTagStatus>
      </div>

      <div className="playground dark" title="should show different background colors on dark background">
        <PTagStatus theme="dark">Tag with default props</PTagStatus>
        <PTagStatus theme="dark" color="default">Tag default</PTagStatus>
        <PTagStatus theme="dark" color="background-surface">Tag background-surface</PTagStatus>
        <PTagStatus theme="dark" color="neutral-contrast-high">Tag neutral-contrast-high</PTagStatus>
        <PTagStatus theme="dark" color="notification-neutral">Tag notification-neutral</PTagStatus>
        <PTagStatus theme="dark" color="notification-success">Tag notification-success</PTagStatus>
        <PTagStatus theme="dark" color="notification-error">Tag notification-error</PTagStatus>
        <PTagStatus theme="dark" color="notification-warning">Tag notification-warning</PTagStatus>
      </div>

      <div className="playground light" title="should show different background colors and icons on light background">
        <PTagStatus icon="car" color="default">Tag default</PTagStatus>
        <PTagStatus icon="highway" color="background-surface">Tag background-surface</PTagStatus>
        <PTagStatus iconSource="./assets/icon-custom-kaixin.svg">Tag custom icon</PTagStatus>
      </div>

      <div className="playground dark" title="should show different background colors and icons on dark background">
        <PTagStatus theme="dark" icon="car" color="default">Tag default</PTagStatus>
        <PTagStatus theme="dark" icon="highway" color="background-surface">Tag background-surface</PTagStatus>
        <PTagStatus theme="dark" iconSource="./assets/icon-custom-kaixin.svg">Tag custom icon</PTagStatus>
      </div>

      <div className="playground light" title="should show different background colors with link on light background">
        <PTagStatus color="default"><a href="#">Tag default with link</a></PTagStatus>
        <PTagStatus color="background-surface"><a href="#">Tag background-surface with link</a></PTagStatus>
      </div>

      <div className="playground dark" title="should show different background colors with link on dark background">
        <PTagStatus theme="dark" color="default"><a href="#">Tag default with link</a></PTagStatus>
        <PTagStatus theme="dark" color="background-surface"><a href="#">Tag background-surface with link</a></PTagStatus>
      </div>

      <div className="playground light" title="should show different background colors with link and icon on light background">
        <PTagStatus icon="car" color="default"><a href="#">Tag default with link</a></PTagStatus>
        <PTagStatus icon="highway" color="background-surface"
          ><a href="#">Tag background-surface with link</a></PTagStatus
        >
      </div>

      <div className="playground dark" title="should show different background colors with link and icon on dark background">
        <PTagStatus theme="dark" icon="car" color="default"><a href="#">Tag default with link</a></PTagStatus>
        <PTagStatus theme="dark" icon="highway" color="background-surface"
          ><a href="#">Tag background-surface with link</a></PTagStatus
        >
      </div>

      <div className="playground light" title="should show different background colors with button on light background">
        <PTagStatus color="default"><button>Tag default with button</button></PTagStatus>
        <PTagStatus color="background-surface"><button>Tag background-surface with button</button></PTagStatus>
      </div>

      <div className="playground dark" title="should show different background colors with button on dark background">
        <PTagStatus theme="dark" color="default"><button>Tag default with button</button></PTagStatus>
        <PTagStatus theme="dark" color="background-surface"
          ><button>Tag background-surface with button</button></PTagStatus
        >
      </div>

      <div className="playground light" title="should show different background colors with button and icon on light background">
        <PTagStatus icon="car" color="default"><button>Tag default with button</button></PTagStatus>
        <PTagStatus icon="highway" color="background-surface"
          ><button>Tag background-surface with button</button></PTagStatus
        >
      </div>

      <div className="playground dark" title="should show different background colors with button and icon on dark background">
        <PTagStatus theme="dark" icon="car" color="default"><button>Tag default with button</button></PTagStatus>
        <PTagStatus theme="dark" icon="highway" color="background-surface"
          ><button>Tag background-surface with button</button></PTagStatus
        >
      </div>

      <div className="playground light" title="should show different multiline tags on light background">
        <div style={{ width: '100px' }}>
          <PTagStatus color="neutral-contrast-high">Some multiline tag</PTagStatus>
          <PTagStatus color="neutral-contrast-high" icon="car">Some multiline tag</PTagStatus>
          <PTagStatus color="notification-success"><a href="#">Some multiline Link</a></PTagStatus>
          <PTagStatus color="notification-success" icon="car"><button>Some multiline button</button></PTagStatus>
        </div>
      </div>
    </>
  );
};
