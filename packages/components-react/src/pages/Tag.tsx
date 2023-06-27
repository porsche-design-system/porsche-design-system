/* Auto Generated File */
import { PTag } from '@porsche-design-system/components-react';

export const TagPage = (): JSX.Element => {
  const style = `
    .playground {
      margin-bottom: -0.5rem;
    }

    p-tag {
      margin-bottom: 0.5rem;
    }

    p-tag:not(:last-child) {
      margin-right: 0.5rem;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should show default tag on light background">
        <PTag>Default</PTag>
      </div>

      <div className="playground light" title="should show different background colors on light background">
        <PTag color="background-default">Color background-default</PTag>
        <PTag color="background-base">Color background-base</PTag>
        <PTag color="background-surface">Color background-surface</PTag>
        <PTag color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag color="primary">Color primary</PTag>
        <PTag color="notification-neutral">Color notification-neutral</PTag>
        <PTag color="notification-info-soft">Color notification-info-soft</PTag>
        <PTag color="notification-success-soft">Color notification-success-soft</PTag>
        <PTag color="notification-error-soft">Color notification-error-soft</PTag>
        <PTag color="notification-warning-soft">Color notification-warning-soft</PTag>
      </div>

      <div className="playground light surface" title="should show different background colors on light surface background">
        <PTag color="background-default">Color background-default</PTag>
        <PTag color="background-base">Color background-base</PTag>
        <PTag color="background-surface">Color background-surface</PTag>
        <PTag color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag color="primary">Color primary</PTag>
        <PTag color="notification-neutral">Color notification-neutral</PTag>
        <PTag color="notification-info-soft">Color notification-info-soft</PTag>
        <PTag color="notification-success-soft">Color notification-success-soft</PTag>
        <PTag color="notification-error-soft">Color notification-error-soft</PTag>
        <PTag color="notification-warning-soft">Color notification-warning-soft</PTag>
      </div>

      <div className="playground dark" title="should show different background colors on dark background">
        <PTag theme="dark" color="background-default">Color background-default</PTag>
        <PTag theme="dark" color="background-base">Color background-base</PTag>
        <PTag theme="dark" color="background-surface">Color background-surface</PTag>
        <PTag theme="dark" color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag theme="dark" color="primary">Color primary</PTag>
        <PTag theme="dark" color="notification-neutral">Color notification-neutral</PTag>
        <PTag theme="dark" color="notification-info-soft">Color notification-info-soft</PTag>
        <PTag theme="dark" color="notification-success-soft">Color notification-success-soft</PTag>
        <PTag theme="dark" color="notification-error-soft">Color notification-error-soft</PTag>
        <PTag theme="dark" color="notification-warning-soft">Color notification-warning-soft</PTag>
      </div>

      <div className="playground dark surface" title="should show different background colors on dark surface background">
        <PTag theme="dark" color="background-default">Color background-default</PTag>
        <PTag theme="dark" color="background-base">Color background-base</PTag>
        <PTag theme="dark" color="background-surface">Color background-surface</PTag>
        <PTag theme="dark" color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag theme="dark" color="primary">Color primary</PTag>
        <PTag theme="dark" color="notification-neutral">Color notification-neutral</PTag>
        <PTag theme="dark" color="notification-info-soft">Color notification-info-soft</PTag>
        <PTag theme="dark" color="notification-success-soft">Color notification-success-soft</PTag>
        <PTag theme="dark" color="notification-error-soft">Color notification-error-soft</PTag>
        <PTag theme="dark" color="notification-warning-soft">Color notification-warning-soft</PTag>
      </div>

      <div className="playground light" title="should show different background colors and icons on light background">
        <PTag icon="car" color="background-default">Color background-default</PTag>
        <PTag icon="car" color="background-base">Color background-base</PTag>
        <PTag icon="car" color="background-surface">Color background-surface</PTag>
        <PTag icon="car" color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag icon="car" color="primary">Color primary</PTag>
        <PTag icon="car" color="notification-neutral">Color notification-neutral</PTag>
        <PTag icon="car" color="notification-info-soft">Color notification-info-soft</PTag>
        <PTag icon="car" color="notification-success-soft">Color notification-success-soft</PTag>
        <PTag icon="car" color="notification-error-soft">Color notification-error-soft</PTag>
        <PTag icon="car" color="notification-warning-soft">Color notification-warning-soft</PTag>
        <PTag iconSource="./assets/icon-custom-kaixin.svg" color="background-surface"> Color background-surface</PTag>
      </div>

      <div className="playground dark" title="should show different background colors and icons on dark background">
        <PTag theme="dark" icon="car" color="background-default">Color background-default</PTag>
        <PTag theme="dark" icon="car" color="background-base">Color background-base</PTag>
        <PTag theme="dark" icon="car" color="background-surface">Color background-surface</PTag>
        <PTag theme="dark" icon="car" color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag theme="dark" icon="car" color="primary">Color primary</PTag>
        <PTag theme="dark" icon="car" color="notification-neutral">Color notification-neutral</PTag>
        <PTag theme="dark" icon="car" color="notification-info-soft">Color notification-info-soft</PTag>
        <PTag theme="dark" icon="car" color="notification-success-soft">Color notification-success-soft</PTag>
        <PTag theme="dark" icon="car" color="notification-error-soft">Color notification-error-soft</PTag>
        <PTag theme="dark" icon="car" color="notification-warning-soft">Color notification-warning-soft</PTag>
        <PTag theme="dark" iconSource="./assets/icon-custom-kaixin.svg" color="background-surface">
          Color background-surface</PTag
        >
      </div>

      <div className="playground light" title="should show different background colors with link on light background">
        <PTag color="background-base"><a href="#">Color background-base link</a></PTag>
        <PTag color="background-surface"><a href="#">Color background-surface link</a></PTag>
        <PTag icon="car" color="background-base"><a href="#">Color background-base link</a></PTag>
        <PTag icon="highway" color="background-surface"><a href="#">Color background-surface link</a></PTag>
        <PTag iconSource="./assets/icon-custom-kaixin.svg" color="background-base">
          <a href="#">Color background-base link</a>
        </PTag>
      </div>

      <div className="playground dark" title="should show different background colors with link on dark background">
        <PTag theme="dark" color="background-base"><a href="#">Color background-base link</a></PTag>
        <PTag theme="dark" color="background-surface"><a href="#">Color background-surface link</a></PTag>
        <PTag theme="dark" icon="car" color="background-base"><a href="#">Color background-base link</a></PTag>
        <PTag theme="dark" icon="highway" color="background-surface">
          <a href="#">Color background-surface link</a>
        </PTag>
        <PTag theme="dark" iconSource="./assets/icon-custom-kaixin.svg" color="background-base">
          <a href="#">Color background-base link</a>
        </PTag>
      </div>

      <div className="playground light" title="should show different background colors with button on light background">
        <PTag color="background-base"><button>Color background-base button</button></PTag>
        <PTag color="background-surface"><button>Color background-surface button</button></PTag>
        <PTag icon="car" color="background-base"><button>Color background-base button</button></PTag>
        <PTag icon="highway" color="background-surface">
          <button>Color background-surface button</button>
        </PTag>
        <PTag iconSource="./assets/icon-custom-kaixin.svg" color="background-base">
          <button>Color background-base button</button>
        </PTag>
      </div>

      <div className="playground dark" title="should show different background colors with button on dark background">
        <PTag theme="dark" color="background-base"><button>Color background-base button</button></PTag>
        <PTag theme="dark" color="background-surface"><button>Color background-surface button</button></PTag>
        <PTag theme="dark" icon="car" color="background-base"><button>Color background-base button</button></PTag>
        <PTag theme="dark" icon="highway" color="background-surface">
          <button>Color background-surface button</button>
        </PTag>
        <PTag theme="dark" iconSource="./assets/icon-custom-kaixin.svg" color="background-base">
          <button>Color background-base button</button>
        </PTag>
      </div>

      <div className="playground light" title="should not render line break">
        <PTag>
          Default <br />
          with line break
        </PTag>
      </div>

      <div className="playground light" title="should not break into multiline although not enough space is given">
        <div style={{ width: '100px', overflow: 'auto', border: '1px solid deeppink' }}>
          <PTag color="primary">Text that is very long</PTag>
          <PTag color="primary" icon="car">Text with icon that is very long</PTag>
          <PTag color="notification-success-soft" icon="car">
            <a href="#">Link with icon that is very long</a>
          </PTag>
          <PTag color="notification-success-soft" icon="car">
            <button>Button with icon that is very long</button>
          </PTag>
        </div>
      </div>

      <div className="playground light" title="should break into multiline if not enough space is given">
        <div style={{ width: '100px', overflow: 'auto', border: '1px solid deeppink' }}>
          <PTag color="primary" style={{ whiteSpace: 'normal' }}>Text that is very long</PTag>
          <PTag color="primary" icon="car" style={{ whiteSpace: 'normal' }}>Text with icon that is very long</PTag>
          <PTag color="notification-success-soft" icon="car" style={{ whiteSpace: 'normal' }}>
            <a href="#">Link with icon that is very long</a>
          </PTag>
          <PTag color="notification-success-soft" icon="car" style={{ whiteSpace: 'normal' }}>
            <button>Button with icon that is very long</button>
          </PTag>
        </div>
      </div>
    </>
  );
};
