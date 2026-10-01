import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { FeedbackForm } from '../../../_partials/feedback/FeedbackForm.tsx';
import { Script } from '../../../_partials/Script.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Feedback: Dialog',
  description:
    'A trigger button opens the same rating-and-comment flow inside a dialog, keeping the page uncluttered. It can be launched from any action on the page, which makes it ideal for task-focused or space-constrained contexts where feedback should stay available but out of the way.',
};

/**
 * Feedback pattern – the same flow, asked for rather than shown.
 *
 * The page offers a button and keeps the flow in a modal, which is why the trigger announces what it opens
 * (`aria-haspopup="dialog"`) and the dialog carries its own label. The modal is the last element of the body, like
 * every dialog: it is opened from the content but is not part of it.
 *
 * `p-modal` is used in *controlled* mode – the script owns `open`, and `FeedbackForm` resets the flow once the closing
 * animation has finished instead of letting the content snap back while the dialog is still visible.
 */
const Page = () => (
  <PatternPage
    meta={meta}
    afterMain={
      <p-modal id="feedback-modal" aria="{ 'aria-label': 'Feedback' }">
        <div class="grid gap-fluid-md">
          <FeedbackForm
            confirmationAction={
              <p-button id="feedback-close" type="button" variant="secondary">
                Close
              </p-button>
            }
          />
        </div>
      </p-modal>
    }
  >
    <main id="main" class="grid-template gap-y-fluid-xl py-fluid-lg">
      <section class="col-wide grid gap-fluid-md">
        <p-heading tag="h1" size="xl">
          Feedback in a dialog
        </p-heading>
        <p-text>
          The page asks for permission first: the flow opens in a modal, and closing it returns focus to the button it
          was opened from. The next visit starts fresh, because the reset waits for the closing animation.
        </p-text>
      </section>

      <section
        class="col-extended justify-self-center w-full max-w-prose grid gap-fluid-md justify-items-center"
        aria-label="Feedback"
      >
        <div class="grid gap-static-xs justify-items-center">
          <p-heading tag="h2" size="md" align="center">
            Your opinion matters
          </p-heading>
          <p-text color="contrast-medium" align="center">
            Help us improve this page.
          </p-text>
        </div>
        <p-button
          id="feedback-trigger"
          type="button"
          variant="secondary"
          icon="none"
          aria="{ 'aria-haspopup': 'dialog' }"
        >
          Give feedback
        </p-button>
      </section>
    </main>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the feedback dialog pattern: whether the modal is open. The flow inside it is the script of
      // "FeedbackForm", which also cancels a pending submission and starts over when the modal closes.
      //
      // "p-modal" is used in *controlled* mode – "open" is set from here, which is what lets the flow wait for the
      // closing animation before it resets, instead of snapping back while the dialog is still visible.

      const trigger = document.getElementById('feedback-trigger');
      const modal = document.getElementById('feedback-modal');
      const closeButton = document.getElementById('feedback-close');

      const closeModal = () => {
        modal.open = false;
      };

      trigger.addEventListener('click', () => {
        modal.open = true;
      });
      closeButton.addEventListener('click', closeModal);
      modal.addEventListener('dismiss', closeModal);
    `
    }</Script>
  </PatternPage>
);

export default Page;
