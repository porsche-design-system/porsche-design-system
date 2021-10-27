import { PInlineNotification } from '@porsche-design-system/components-react';

export const InlineNotificationPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show inline-notification neutral on light background">
        <PInlineNotification
          heading="Some inline-notification heading"
          description="Some inline-notification description."
        />
      </div>

      <div className="playground dark" title="should show inline-notification neutral on dark background">
        <PInlineNotification
          heading="Some inline-notification heading"
          description="Some inline-notification description."
          theme="dark"
        />
      </div>

      <div className="playground light" title="should show inline-notification warning on light background">
        <PInlineNotification
          heading="Some warning inline-notification heading"
          description="Some inline-notification description."
          state="warning"
        />
      </div>

      <div className="playground dark" title="should show inline-notification warning on dark background">
        <PInlineNotification
          heading="Some warning inline-notification heading"
          description="Some inline-notification description."
          state="warning"
          theme="dark"
        />
      </div>

      <div className="playground light" title="should show inline-notification success on light background">
        <PInlineNotification
          heading="Some success inline-notification heading"
          description="Some inline-notification description."
          state="success"
        />
      </div>

      <div className="playground dark" title="should show inline-notification success on dark background">
        <PInlineNotification
          heading="Some success inline-notification heading"
          description="Some inline-notification description."
          state="success"
          theme="dark"
        />
      </div>

      <div className="playground light" title="should show inline-notification error on light background">
        <PInlineNotification
          heading="Some error inline-notification heading"
          description="Some inline-notification description."
          state="error"
        />
      </div>

      <div className="playground dark" title="should show inline-notification error on dark background">
        <PInlineNotification
          heading="Some error inline-notification heading"
          description="Some inline-notification description."
          state="error"
          theme="dark"
        />
      </div>

      <div
        className="playground light"
        title="should show inline-notification with slotted content on light background"
      >
        <PInlineNotification>
          <span slot="heading">Some slotted inline-notification heading</span>
          Some slotted inline-notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
        </PInlineNotification>
      </div>

      <div className="playground dark" title="should show inline-notification with slotted content on dark background">
        <PInlineNotification theme="dark">
          <span slot="heading">Some slotted inline-notification heading</span>
          Some slotted inline-notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
        </PInlineNotification>
      </div>

      <div className="playground light" title="should show inline-notification with action button">
        <PInlineNotification
          heading="Some action button inline-notification heading"
          description="Some inline-notification description."
          actionLabel="Some action"
          actionIcon="arrow-double-right"
        />
      </div>

      <div className="playground light" title="should show inline-notification with loading action button">
        <PInlineNotification
          heading="Some action button inline-notification heading"
          description="Some inline-notification description."
          actionLabel="Some loading action"
          actionLoading
        />
      </div>

      <div className="playground light" title="should show inline-notification in persistent mode">
        <PInlineNotification
          heading="Some persistent inline-notification heading"
          description="Some inline-notification description."
          persistent
        />
      </div>

      <div className="playground light" title="should show inline-notification in persistent mode with action button">
        <PInlineNotification
          heading="Some persistent inline-notification heading"
          description="Some inline-notification description."
          persistent
          actionLabel="Some action"
        />
      </div>
    </>
  );
};
