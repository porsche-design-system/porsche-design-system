/* Auto Generated File */
import type { NextPage } from 'next';
import { PTagDismissible } from '@porsche-design-system/components-react/ssr';

const TagDismissiblePage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light auto-layout" title="should show different background colors">
        <PTagDismissible>Default</PTagDismissible>
        <PTagDismissible color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div className="playground light surface auto-layout" title="should show different background colors on surface background">
        <PTagDismissible>Default</PTagDismissible>
        <PTagDismissible color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div className="playground light auto-layout" title="should show different background colors and label">
        <PTagDismissible label="Some label">Default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div
        className="playground light surface auto-layout"
        title="should show different background colors and label on surface background"
      >
        <PTagDismissible label="Some label">Default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-default">Color background-default</PTagDismissible>
        <PTagDismissible label="Some label" color="background-surface">Color background-surface</PTagDismissible>
      </div>

      <div className="playground light auto-layout" title="should apply custom styles for dedicated slotted content">
        <PTagDismissible>
          Some <b>bold</b>, <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text
        </PTagDismissible>
      </div>

      <div className="playground light auto-layout" title="should show different multiline tags" style={{ maxWidth: '300px' }}>
        <PTagDismissible>Text that is very long and will break into the next line</PTagDismissible>
        <PTagDismissible label="Some label">Text that is very long and will break into the next line</PTagDismissible>
        <PTagDismissible label="Label that is very long and will break into the next line">Short Text</PTagDismissible>
      </div>
    </>
  );
};

export default TagDismissiblePage;
