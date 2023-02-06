/* Auto Generated File */
import type { NextPage } from 'next';
import { PTagDismissible } from '@porsche-design-system/components-react/ssr';

const TagDismissiblePage: NextPage = (): JSX.Element => {
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
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should show different background colors on light background">
        <PTagDismissible>Default</PTagDismissible>
        <PTagDismissible color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div className="playground dark" title="should show different background colors on dark background">
        <PTagDismissible>Default</PTagDismissible>
        <PTagDismissible theme="dark" color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible theme="dark" color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div className="playground light surface" title="should show different background colors on light surface background">
        <PTagDismissible>Default</PTagDismissible>
        <PTagDismissible color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div className="playground dark surface" title="should show different background colors on dark surface background">
        <PTagDismissible theme="dark">Default</PTagDismissible>
        <PTagDismissible theme="dark" color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible theme="dark" color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div className="playground light" title="should show different background colors and label on light background">
        <PTagDismissible label="Some label">Default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div className="playground dark" title="should show different background colors and label on dark background">
        <PTagDismissible theme="dark" label="Some label">Default</PTagDismissible>
        <PTagDismissible theme="dark" label="Some label" color="background-default"
          >Color background-default</PTagDismissible
        >
        <PTagDismissible theme="dark" label="Some label" color="background-surface"
          >Color background-surface</PTagDismissible
        >
      </div>

      <div
        className="playground light surface"
        title="should show different background colors and label on light surface background"
      >
        <PTagDismissible label="Some label">Default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div
        className="playground dark surface"
        title="should show different background colors and label on dark surface background"
      >
        <PTagDismissible theme="dark" label="Some label">Default</PTagDismissible>
        <PTagDismissible theme="dark" label="Some label" color="background-default"
          >Color background-default</PTagDismissible
        >
        <PTagDismissible theme="dark" label="Some label" color="background-surface"
          >Color background-surface</PTagDismissible
        >
      </div>

      <div className="playground light" title="should apply custom styles for dedicated slotted content on light background">
        <PTagDismissible>
          Some <b>bold</b>, <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text
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

export default TagDismissiblePage;
