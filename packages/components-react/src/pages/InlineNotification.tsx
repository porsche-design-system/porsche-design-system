/* Auto Generated File */
import { PInlineNotification } from '@porsche-design-system/components-react';

export const InlineNotificationPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show inline-notification info">
        <PInlineNotification heading="Heading (state=info)" description="Description" />
      </div>

      <div className="playground light" title="should show inline-notification info with slotted and deeply nested anchor">
        <PInlineNotification>
          <span slot="heading">Slotted heading (state=info)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground light" title="should show inline-notification info with state neutral">
        <PInlineNotification
          state="neutral"
          heading="Heading (state=neutral)"
          description="Description"
         />
      </div>

      <div className="playground light" title="should show inline-notification warning with slotted and deeply nested anchor">
        <PInlineNotification state="warning">
          <span slot="heading">Slotted heading (state=warning)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground light" title="should show inline-notification success">
        <PInlineNotification
          heading="Heading (state=success)"
          description="Description"
          state="success"
         />
      </div>

      <div className="playground light" title="should show inline-notification success with slotted and deeply nested anchor">
        <PInlineNotification state="success">
          <span slot="heading">Slotted heading (state=success)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground light" title="should show inline-notification error">
        <PInlineNotification
          heading="Heading (state=error)"
          description="Description"
          state="error"
         />
      </div>

      <div className="playground light" title="should show inline-notification error with slotted and deeply nested anchor">
        <PInlineNotification state="error">
          <span slot="heading">Slotted heading (state=error)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground light" title="should show inline-notification with action button">
        <PInlineNotification
          heading="Some heading with action button"
          description="Some description"
          actionLabel="Some action label"
         />
      </div>

      <div className="playground light" title="should show inline-notification with loading action button">
        <PInlineNotification
          heading="Some heading with action button"
          description="Some description"
          actionLabel="Some loading action label"
          actionLoading={true}
         />
      </div>

      <div className="playground light" title="should show inline-notification in persistent mode">
        <PInlineNotification
          heading="Some persistent heading"
          description="Some description"
          persistent={true}
         />
      </div>

      <div className="playground light" title="should show inline-notification without dismiss button">
        <PInlineNotification
          heading="Heading with dismissButton=false"
          description="Some description"
          dismissButton={false}
         />
      </div>

      <div className="playground light" title="should show inline-notification in persistent mode with action button">
        <PInlineNotification
          heading="Some persistent heading with action button"
          description="Some description"
          persistent={true}
          actionLabel="Some action label with custom icon"
          actionIcon="refresh"
         />
      </div>

      <div className="playground light" title="should show inline-notification with multiline heading and description">
        <PInlineNotification
          style={{ maxWidth: '15rem' }}
          heading="Some heading with a very long text across multiple lines"
          description="Some description with a very long text across multiple lines"
          actionLabel="Some action label with custom icon"
         />
      </div>
    </>
  );
};
