import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { FeedbackForm } from '../../../_partials/feedback/FeedbackForm.tsx';
import { Script } from '../../../_partials/Script.tsx';

/**
 * Feedback pattern – the same flow, asked for rather than shown.
 *
 * The page offers a button and keeps the flow in a modal, which is why the trigger announces what it opens
 * (`aria-haspopup="dialog"`) and the dialog carries its own label. The modal is the last element of the body, like
 * every dialog: it is opened from the content but is not part of it.
 *
 * `p-modal` is used in *controlled* mode – the script owns `open`, so it can reset the flow after the closing
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
    <Script>{`
      // Behaviour of the feedback dialog pattern: whether the modal is open, and which of its two steps is showing.
      //
      // No data is sent anywhere: the submission is simulated, so the flow can be reviewed end to end.
      //
      // "p-modal" is used in *controlled* mode – "open" is set from here, which is what allows the reset to wait for
      // the closing animation instead of running while the dialog is still visible.

      const trigger = document.getElementById('feedback-trigger');
      const modal = document.getElementById('feedback-modal');
      const closeButton = document.getElementById('feedback-close');
      const question = document.getElementById('feedback-question');
      const form = document.getElementById('feedback-form');
      const rating = document.getElementById('feedback-rating');
      const comment = document.getElementById('feedback-comment');
      const submit = document.getElementById('feedback-submit');
      const thanks = document.getElementById('feedback-thanks');
      const thanksHeading = document.getElementById('feedback-thanks-heading');

      // Handle of the simulated request, so dismissing the modal mid-submission can cancel it before the confirmation
      // shows.
      let pendingSubmission;

      const cancelSubmission = () => {
        window.clearTimeout(pendingSubmission);
        pendingSubmission = undefined;
      };

      const openModal = () => {
        modal.open = true;
      };

      const closeModal = () => {
        cancelSubmission();
        modal.open = false;
      };

      // Resetting the flow so the next open starts fresh is deferred until the modal
      // is fully hidden. The "motionHiddenEnd" event fires once the close animation has
      // finished, preventing the content from visibly snapping back mid-transition.
      const resetFeedback = () => {
        rating.value = '';
        comment.value = '';
        thanks.hidden = true;
        question.hidden = false;
        comment.hidden = true;
        form.hidden = false;
        submit.loading = false;
        submit.hidden = true;
        closeButton.hidden = true;
      };

      // Choosing a rating reveals the optional free-text field and the submit button.
      const revealCommentAndSubmit = () => {
        comment.hidden = false;
        submit.hidden = false;
      };

      // Reveal the confirmation once the "submission" has completed.
      const showConfirmation = () => {
        pendingSubmission = undefined;
        submit.loading = false;
        form.hidden = true;
        question.hidden = true;
        thanks.hidden = false;
        closeButton.hidden = false;
        // Move focus to the confirmation so keyboard and screen reader users are informed.
        thanksHeading.focus();
      };

      trigger.addEventListener('click', openModal);
      closeButton.addEventListener('click', closeModal);
      modal.addEventListener('dismiss', closeModal);
      modal.addEventListener('motionHiddenEnd', resetFeedback);
      rating.addEventListener('change', revealCommentAndSubmit);
      submit.addEventListener('click', () => {
        // Simulate a short server round-trip: show a loading spinner while "submitting",
        // then reveal the confirmation. In a real integration the request would happen here.
        submit.loading = true;
        pendingSubmission = window.setTimeout(showConfirmation, 1200);
      });
    `}</Script>
  </PatternPage>
);

export default Page;
