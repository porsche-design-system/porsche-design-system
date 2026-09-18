import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { FeedbackForm } from '../../../_partials/feedback/FeedbackForm.tsx';

/**
 * Feedback pattern – the same flow, asked for rather than shown.
 *
 * The page offers a button and keeps the flow in a modal, which is why the trigger announces what it opens
 * (`aria-haspopup="dialog"`) and the dialog carries its own label. The modal is the last element of the body, like
 * every dialog: it is opened from the content but is not part of it.
 *
 * `p-modal` is used in *controlled* mode – `main.js` owns `open`, so it can reset the flow after the closing
 * animation has finished instead of letting the content snap back while the dialog is still visible.
 */
const Page = () => (
  <PatternPage
    title="Feedback 2"
    description="The same feedback flow in a modal, opened from a button and reset once it has closed."
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
  </PatternPage>
);

export default Page;
