/* Auto Generated File */
import { PInlineNotification } from '@porsche-design-system/components-react';

export const InlineNotificationPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show inline-notification neutral on light background">
        <PInlineNotification heading="Some neutral heading" description="Some description" />
      </div>

      <div className="playground dark" title="should show inline-notification neutral on dark background">
        <PInlineNotification
          heading="Some neutral heading"
          description="Some description"
          theme="dark"
         />
      </div>

      <div className="playground light" title="should show inline-notification warning on light background">
        <PInlineNotification
          heading="Some warning heading"
          description="Some description"
          state="warning"
         />
      </div>

      <div className="playground dark" title="should show inline-notification warning on dark background">
        <PInlineNotification
          heading="Some warning heading"
          description="Some description"
          state="warning"
          theme="dark"
         />
      </div>

      <div className="playground light" title="should show inline-notification success on light background">
        <PInlineNotification
          heading="Some success heading"
          description="Some description"
          state="success"
         />
      </div>

      <div className="playground dark" title="should show inline-notification success on dark background">
        <PInlineNotification
          heading="Some success heading"
          description="Some description"
          state="success"
          theme="dark"
         />
      </div>

      <div className="playground light" title="should show inline-notification error on light background">
        <PInlineNotification
          heading="Some error heading"
          description="Some description"
          state="error"
         />
      </div>

      <div className="playground dark" title="should show inline-notification error on dark background">
        <PInlineNotification
          heading="Some error heading"
          description="Some description"
          state="error"
          theme="dark"
         />
      </div>

      <div className="playground light" title="should show inline-notification with slotted content on light background">
        <PInlineNotification>
          <span slot="heading">Some slotted heading</span>
          Some slotted description with a <a href="https://www.porsche.com/">LINK</a> element.
        </PInlineNotification>
      </div>

      <div className="playground dark" title="should show inline-notification with slotted content on dark background">
        <PInlineNotification theme="dark">
          <span slot="heading">Some slotted heading</span>
          Some slotted description with a <a href="https://www.porsche.com/">LINK</a> element.
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
          style={{ width: '240px' }}
          heading="Some heading with a very long text across multiple lines"
          description="Some description with a very long text across multiple lines"
          actionLabel="Some action label with custom icon"
         />
      </div>
    </>
  );
};
