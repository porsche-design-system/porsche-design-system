/* Auto Generated File */
import { PTag } from '@porsche-design-system/components-react';

export const TagPage = (): JSX.Element => {
  const style = `
    .playground > div {
      width: 100px;
      overflow: auto;
      border: 1px solid deeppink;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light auto-layout" title="should show default tag">
        <PTag>Default</PTag>
      </div>

      <div className="playground light auto-layout" title="should show different background colors">
        <PTag color="background-default">background-default</PTag>
        <PTag color="background-base">background-base</PTag>
        <PTag color="background-surface">background-surface</PTag>
        <PTag color="neutral-contrast-high">neutral-contrast-high</PTag>
        <PTag color="primary">primary</PTag>
        <PTag color="notification-neutral">notification-neutral</PTag>
        <PTag color="notification-info-soft">notification-info-soft</PTag>
        <PTag color="notification-success-soft">notification-success-soft</PTag>
        <PTag color="notification-error-soft">notification-error-soft</PTag>
        <PTag color="notification-warning-soft">notification-warning-soft</PTag>
      </div>

      <div className="playground light auto-layout surface" title="should show different background colors on surface background">
        <PTag color="background-default">background-default</PTag>
        <PTag color="background-base">background-base</PTag>
        <PTag color="background-surface">background-surface</PTag>
        <PTag color="neutral-contrast-high">neutral-contrast-high</PTag>
        <PTag color="primary">primary</PTag>
        <PTag color="notification-neutral">notification-neutral</PTag>
        <PTag color="notification-info-soft">notification-info-soft</PTag>
        <PTag color="notification-success-soft">notification-success-soft</PTag>
        <PTag color="notification-error-soft">notification-error-soft</PTag>
        <PTag color="notification-warning-soft">notification-warning-soft</PTag>
      </div>

      <div className="playground light auto-layout" title="should show different background colors and icons">
        <PTag icon="car" color="background-default">background-default</PTag>
        <PTag icon="car" color="background-base">background-base</PTag>
        <PTag icon="car" color="background-surface">background-surface</PTag>
        <PTag icon="car" color="neutral-contrast-high">neutral-contrast-high</PTag>
        <PTag icon="car" color="primary">primary</PTag>
        <PTag icon="car" color="notification-neutral">notification-neutral</PTag>
        <PTag icon="car" color="notification-info-soft">notification-info-soft</PTag>
        <PTag icon="car" color="notification-success-soft">notification-success-soft</PTag>
        <PTag icon="car" color="notification-error-soft">notification-error-soft</PTag>
        <PTag icon="car" color="notification-warning-soft">notification-warning-soft</PTag>
        <PTag iconSource="./assets/icon-custom-kaixin.svg" color="background-surface"> background-surface</PTag>
      </div>

      <div className="playground light auto-layout" title="should show different background colors with link">
        <PTag color="background-base"><a href="#">background-base link</a></PTag>
        <PTag color="background-surface"><a href="#">background-surface link</a></PTag>
        <PTag icon="car" color="background-base"><a href="#">background-base link</a></PTag>
        <PTag icon="highway" color="background-surface"><a href="#">background-surface link</a></PTag>
        <PTag iconSource="./assets/icon-custom-kaixin.svg" color="background-base">
          <a href="#">background-base link</a>
        </PTag>
      </div>

      <div className="playground light auto-layout" title="should show different background colors with button">
        <PTag color="background-base"><button>background-base button</button></PTag>
        <PTag color="background-surface"><button>background-surface button</button></PTag>
        <PTag icon="car" color="background-base"><button>background-base button</button></PTag>
        <PTag icon="highway" color="background-surface">
          <button>background-surface button</button>
        </PTag>
        <PTag iconSource="./assets/icon-custom-kaixin.svg" color="background-base">
          <button>background-base button</button>
        </PTag>
      </div>

      <div className="playground light auto-layout" title="should not render line break">
        <PTag>
          Default <br />
          with line break
        </PTag>
      </div>

      <div className="playground light" title="should not break into multiline although not enough space is given">
        <div>
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
        <div>
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
