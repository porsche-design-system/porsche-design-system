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
      <style children={style} />

      <div className="playground light" title="should show different background colors on light background">
        <PTag>Default</PTag>
        <PTag color="background-default">Color background-default</PTag>
        <PTag color="background-surface">Color background-surface</PTag>
        <PTag color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag color="notification-neutral">Color notification-neutral</PTag>
        <PTag color="notification-success">Color notification-success</PTag>
        <PTag color="notification-error">Color notification-error</PTag>
        <PTag color="notification-warning">Color notification-warning</PTag>
      </div>

      <div className="playground light surface" title="should show different background colors on light surface background">
        <PTag>Default</PTag>
        <PTag color="background-default">Color background-default</PTag>
        <PTag color="background-surface">Color background-surface</PTag>
        <PTag color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag color="notification-neutral">Color notification-neutral</PTag>
        <PTag color="notification-success">Color notification-success</PTag>
        <PTag color="notification-error">Color notification-error</PTag>
        <PTag color="notification-warning">Color notification-warning</PTag>
      </div>

      <div className="playground dark" title="should show different background colors on dark background">
        <PTag theme="dark">Default</PTag>
        <PTag theme="dark" color="background-default">Color background-default</PTag>
        <PTag theme="dark" color="background-surface">Color background-surface</PTag>
        <PTag theme="dark" color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag theme="dark" color="notification-neutral">Color notification-neutral</PTag>
        <PTag theme="dark" color="notification-success">Color notification-success</PTag>
        <PTag theme="dark" color="notification-error">Color notification-error</PTag>
        <PTag theme="dark" color="notification-warning">Color notification-warning</PTag>
      </div>

      <div className="playground dark surface" title="should show different background colors on dark surface background">
        <PTag theme="dark">Default</PTag>
        <PTag theme="dark" color="background-default">Color background-default</PTag>
        <PTag theme="dark" color="background-surface">Color background-surface</PTag>
        <PTag theme="dark" color="neutral-contrast-high">Color neutral-contrast-high</PTag>
        <PTag theme="dark" color="notification-neutral">Color notification-neutral</PTag>
        <PTag theme="dark" color="notification-success">Color notification-success</PTag>
        <PTag theme="dark" color="notification-error">Color notification-error</PTag>
        <PTag theme="dark" color="notification-warning">Color notification-warning</PTag>
      </div>

      <div className="playground light" title="should show different background colors and icons on light background">
        <PTag icon="car" color="background-default">Color background-default</PTag>
        <PTag icon="highway" color="background-surface">Color background-surface</PTag>
        <PTag iconSource="./assets/icon-custom-kaixin.svg" color="background-surface"> Color background-surface </PTag>
      </div>

      <div className="playground dark" title="should show different background colors and icons on dark background">
        <PTag theme="dark" icon="car" color="background-default">Color background-default</PTag>
        <PTag theme="dark" icon="highway" color="background-surface">Color background-surface</PTag>
        <PTag theme="dark" iconSource="./assets/icon-custom-kaixin.svg" color="background-surface">
          Color background-surface
        </PTag>
      </div>

      <div className="playground light" title="should show different background colors with link on light background">
        <PTag color="background-default"><a href="#">Color background-default link</a></PTag>
        <PTag color="background-surface"><a href="#">Color background-surface link</a></PTag>
        <PTag icon="car" color="background-default"><a href="#">Color background-default link</a></PTag>
        <PTag icon="highway" color="background-surface"><a href="#">Color background-surface link</a></PTag>
        <PTag iconSource="./assets/icon-custom-kaixin.svg" color="background-default">
          <a href="#">Color background-default link</a>
        </PTag>
      </div>

      <div className="playground dark" title="should show different background colors with link on dark background">
        <PTag theme="dark" color="background-default"><a href="#">Color background-default link</a></PTag>
        <PTag theme="dark" color="background-surface"><a href="#">Color background-surface link</a></PTag>
        <PTag theme="dark" icon="car" color="background-default"><a href="#">Color background-default link</a></PTag>
        <PTag theme="dark" icon="highway" color="background-surface">
          <a href="#">Color background-surface link</a>
        </PTag>
        <PTag theme="dark" iconSource="./assets/icon-custom-kaixin.svg" color="background-default">
          <a href="#">Color background-default link</a>
        </PTag>
      </div>

      <div className="playground light" title="should show different background colors with button on light background">
        <PTag color="background-default"><button>Color background-default button</button></PTag>
        <PTag color="background-surface"><button>Color background-surface button</button></PTag>
        <PTag icon="car" color="background-default"><button>Color background-default button</button></PTag>
        <PTag icon="highway" color="background-surface">
          <button>Color background-surface button</button>
        </PTag>
        <PTag iconSource="./assets/icon-custom-kaixin.svg" color="background-default">
          <button>Color background-default button</button>
        </PTag>
      </div>

      <div className="playground dark" title="should show different background colors with button on dark background">
        <PTag theme="dark" color="background-default"><button>Color background-default button</button></PTag>
        <PTag theme="dark" color="background-surface"><button>Color background-surface button</button></PTag>
        <PTag theme="dark" icon="car" color="background-default"><button>Color background-default button</button></PTag>
        <PTag theme="dark" icon="highway" color="background-surface">
          <button>Color background-surface button</button>
        </PTag>
        <PTag theme="dark" iconSource="./assets/icon-custom-kaixin.svg" color="background-default">
          <button>Color background-default button</button>
        </PTag>
      </div>

      <div className="playground light" title="should apply custom styles for dedicated slotted content on light background">
        <PTag> Some <b>bold</b>, <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text </PTag>
        <PTag>
          Default <br />
          with line break
        </PTag>
      </div>

      <div className="playground light" title="should show different multiline tags on light background">
        <div style={{ width: '100px', overflow: 'auto', border: '1px solid deeppink' }}>
          <PTag color="neutral-contrast-high">Text that is very long</PTag>
          <PTag color="neutral-contrast-high" icon="car">Text with icon that is very long</PTag>
          <PTag color="notification-success" icon="car">
            <a href="#">Link with icon that is very long</a>
          </PTag>
          <PTag color="notification-success" icon="car">
            <button>Button with icon that is very long</button>
          </PTag>
        </div>
      </div>
    </>
  );
};
