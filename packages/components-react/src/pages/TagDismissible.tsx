/* Auto Generated File */
import { PTagDismissible } from '@porsche-design-system/components-react';

export const TagDismissiblePage = (): JSX.Element => {
  const style = `
    .playground {
      margin-bottom: -0.5rem;
    }

    p-tag-dismissible {
      margin-bottom: 0.5rem;
    }

    p-tag-dismissible:not(:last-child) {
      margin-right: 0.5rem;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground light" title="should show different background colors on light background">
        <PTagDismissible>Default</PTagDismissible>
        <PTagDismissible color="default">Color default</PTagDismissible>
        <PTagDismissible color="background-surface">Color background-surface</PTagDismissible>
        <PTagDismissible color="neutral-contrast-high">Color neutral-contrast-high</PTagDismissible>
      </div>

      <div className="playground light surface" title="should show different background colors on light surface background">
        <PTagDismissible>Default</PTagDismissible>
        <PTagDismissible color="default">Color default</PTagDismissible>
        <PTagDismissible color="background-surface">Color background-surface</PTagDismissible>
        <PTagDismissible color="neutral-contrast-high">Color neutral-contrast-high</PTagDismissible>
      </div>

      <div className="playground light" title="should show different background colors and label on light background">
        <PTagDismissible label="Some label">Default</PTagDismissible>
        <PTagDismissible label="Some label" color="default">Color default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-surface">Color background-surface</PTagDismissible>
        <PTagDismissible label="Some label" color="neutral-contrast-high">Color neutral-contrast-high</PTagDismissible>
      </div>

      <div
        className="playground light surface"
        title="should show different background colors and label on light surface background"
      >
        <PTagDismissible label="Some label">Default</PTagDismissible>
        <PTagDismissible label="Some label" color="default">Color default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-surface">Color background-surface</PTagDismissible>
        <PTagDismissible label="Some label" color="neutral-contrast-high">Color neutral-contrast-high</PTagDismissible>
      </div>

      <div className="playground light" title="should apply custom styles for dedicated slotted content on light background">
        <PTagDismissible>
          Color default <b>bold</b>, <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text
        </PTagDismissible>
      </div>

      <div className="playground light" title="should show different multiline tags on light background">
        <div style={{ width: '250px', overflow: 'auto' }}>
          <PTagDismissible>Text that is very long and will break into the next line</PTagDismissible>
          <PTagDismissible label="Some label">Text that is very long and will break into the next line</PTagDismissible>
          <PTagDismissible label="Label that is very long and will break into the next line">Short Text</PTagDismissible>
        </div>
      </div>
    </>
  );
};
