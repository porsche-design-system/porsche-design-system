/* Auto Generated File */
import type { NextPage } from 'next';
import { PInlineNotification } from '@porsche-design-system/components-react/ssr';

const InlineNotificationPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show inline-notification info on light background">
        <PInlineNotification heading="Heading (state=info)" description="Description" />
      </div>

      <div
        className="playground light"
        title="should show inline-notification info with slotted and deeply nested anchor on light background"
      >
        <PInlineNotification>
          <span slot="heading">Slotted heading (state=info)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground light" title="should show inline-notification info with state neutral on light background">
        <PInlineNotification
          state="neutral"
          heading="Heading (state=neutral)"
          description="Description"
         />
      </div>

      <div className="playground dark" title="should show inline-notification info on dark background">
        <PInlineNotification theme="dark" heading="Heading (state=info)" description="Description" />
      </div>

      <div
        className="playground dark"
        title="should show inline-notification info with slotted and deeply nested anchor on dark background"
      >
        <PInlineNotification theme="dark">
          <span slot="heading">Slotted heading (state=info)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground dark" title="should show inline-notification info with state neutral on dark background">
        <PInlineNotification
          theme="dark"
          state="neutral"
          heading="Heading (state=neutral)"
          description="Description"
         />
      </div>

      <div className="playground light" title="should show inline-notification warning on light background">
        <PInlineNotification
          heading="Heading (state=warning)"
          description="Description"
          state="warning"
         />
      </div>

      <div
        className="playground light"
        title="should show inline-notification warning with slotted and deeply nested anchor on light background"
      >
        <PInlineNotification state="warning">
          <span slot="heading">Slotted heading (state=warning)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground dark" title="should show inline-notification warning on dark background">
        <PInlineNotification
          heading="Heading (state=warning)"
          description="Description"
          state="warning"
          theme="dark"
         />
      </div>

      <div
        className="playground dark"
        title="should show inline-notification warning with slotted and deeply nested anchor on dark background"
      >
        <PInlineNotification theme="dark" state="warning">
          <span slot="heading">Slotted heading (state=warning)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground light" title="should show inline-notification success on light background">
        <PInlineNotification
          heading="Heading (state=success)"
          description="Description"
          state="success"
         />
      </div>

      <div
        className="playground light"
        title="should show inline-notification success with slotted and deeply nested anchor on light background"
      >
        <PInlineNotification state="success">
          <span slot="heading">Slotted heading (state=success)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground dark" title="should show inline-notification success on dark background">
        <PInlineNotification
          heading="Heading (state=success)"
          description="Description"
          state="success"
          theme="dark"
         />
      </div>

      <div
        className="playground dark"
        title="should show inline-notification success with slotted and deeply nested anchor on dark background"
      >
        <PInlineNotification theme="dark" state="success">
          <span slot="heading">Slotted heading (state=success)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground light" title="should show inline-notification error on light background">
        <PInlineNotification
          heading="Heading (state=error)"
          description="Description"
          state="error"
         />
      </div>

      <div
        className="playground light"
        title="should show inline-notification error with slotted and deeply nested anchor on light background"
      >
        <PInlineNotification state="error">
          <span slot="heading">Slotted heading (state=error)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground dark" title="should show inline-notification error on dark background">
        <PInlineNotification
          heading="Heading (state=error)"
          description="Description"
          state="error"
          theme="dark"
         />
      </div>

      <div
        className="playground dark"
        title="should show inline-notification error with slotted and deeply nested anchor on dark background"
      >
        <PInlineNotification theme="dark" state="error">
          <span slot="heading">Slotted heading (state=error)</span>
          <span>
            Slotted description. And some slotted and deeply nested <a href="#">anchor</a>, <b>bold</b>,
            {' '}<strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
          </span>
        </PInlineNotification>
      </div>

      <div className="playground light" title="should show inline-notification with action button on light background">
        <PInlineNotification
          heading="Some heading with action button"
          description="Some description"
          actionLabel="Some action label"
         />
      </div>

      <div className="playground dark" title="should show inline-notification with action button on dark background">
        <PInlineNotification
          heading="Some heading with action button"
          description="Some description"
          actionLabel="Some action label"
          theme="dark"
         />
      </div>

      <div className="playground light" title="should show inline-notification with loading action button on light background">
        <PInlineNotification
          heading="Some heading with action button"
          description="Some description"
          actionLabel="Some loading action label"
          actionLoading={true}
         />
      </div>

      <div className="playground dark" title="should show inline-notification with loading action button on dark background">
        <PInlineNotification
          heading="Some heading with action button"
          description="Some description"
          actionLabel="Some loading action label"
          actionLoading={true}
          theme="dark"
         />
      </div>

      <div className="playground light" title="should show inline-notification in persistent mode on light background">
        <PInlineNotification
          heading="Some persistent heading"
          description="Some description"
          persistent={true}
         />
      </div>

      <div className="playground dark" title="should show inline-notification in persistent mode on dark background">
        <PInlineNotification
          heading="Some persistent heading"
          description="Some description"
          persistent={true}
          theme="dark"
         />
      </div>

      <div className="playground light" title="should show inline-notification without dismiss button on light background">
        <PInlineNotification
          heading="Heading with dismissButton=false"
          description="Some description"
          dismissButton={false}
         />
      </div>

      <div className="playground dark" title="should show inline-notification without dismiss button on dark background">
        <PInlineNotification
          heading="Heading with dismissButton=false"
          description="Some description"
          dismissButton={false}
          theme="dark"
         />
      </div>

      <div
        className="playground light"
        title="should show inline-notification in persistent mode with action button on light background"
      >
        <PInlineNotification
          heading="Some persistent heading with action button"
          description="Some description"
          persistent={true}
          actionLabel="Some action label with custom icon"
          actionIcon="refresh"
         />
      </div>

      <div
        className="playground dark"
        title="should show inline-notification in persistent mode with action button on dark background"
      >
        <PInlineNotification
          heading="Some persistent heading with action button"
          description="Some description"
          persistent={true}
          actionLabel="Some action label with custom icon"
          actionIcon="refresh"
          theme="dark"
         />
      </div>

      <div
        className="playground light"
        title="should show inline-notification with multiline heading and description on light background"
      >
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

export default InlineNotificationPage;
