import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { FeedbackForm } from '../../../_partials/feedback/FeedbackForm.tsx';
import { Script } from '../../../_partials/Script.tsx';

/**
 * Feedback pattern – the flow shown in the page it asks about.
 *
 * Nothing is disclosed: the question is part of the content, and the answer replaces it in place. The scale reveals
 * the optional comment and the submit button only once it has been used, so the page asks one thing at a time – see
 * the script at the end of the page.
 */
const Page = () => (
  <PatternPage
    title="Feedback 1"
    description="Rating scale and optional comment shown in the page, confirming in place once submitted."
  >
    <main id="main" class="grid-template gap-y-fluid-xl py-fluid-lg">
      <section class="col-wide grid gap-fluid-md">
        <p-heading tag="h1" size="xl">
          Inline feedback
        </p-heading>
        <p-text>
          The feedback sits in the page, below the content it asks about. Choosing a rating reveals the optional
          comment; submitting replaces the form with the confirmation, which offers to start over.
        </p-text>
      </section>

      {/* Labelled, because the flow is a section of its own the moment it is not the only thing on the page. */}
      <section
        class="col-extended justify-self-center w-full max-w-prose grid gap-fluid-md justify-items-center"
        aria-label="Feedback"
      >
        <FeedbackForm
          confirmationAction={
            <p-button id="feedback-restart" type="button" variant="secondary" icon="refresh">
              Give new feedback
            </p-button>
          }
        />
      </section>
    </main>
    <Script>{`
      // Behaviour of the inline feedback pattern: which of the two steps – the question or the confirmation – is shown.
      //
      // No data is sent anywhere: the submission is simulated, so the flow can be reviewed end to end.

      const question = document.getElementById('feedback-question');
      const form = document.getElementById('feedback-form');
      const rating = document.getElementById('feedback-rating');
      const comment = document.getElementById('feedback-comment');
      const submit = document.getElementById('feedback-submit');
      const thanks = document.getElementById('feedback-thanks');
      const thanksHeading = document.getElementById('feedback-thanks-heading');
      const restart = document.getElementById('feedback-restart');

      // Choosing a rating reveals the optional free-text field and the submit button.
      const revealCommentAndSubmit = () => {
        comment.hidden = false;
        submit.hidden = false;
      };

      // Reveal the confirmation once the "submission" has completed.
      const showConfirmation = () => {
        submit.loading = false;
        form.hidden = true;
        question.hidden = true;
        thanks.hidden = false;
        // Move focus to the confirmation so keyboard and screen reader users are informed.
        thanksHeading.focus();
      };

      const restartFeedback = () => {
        rating.value = '';
        comment.value = '';
        submit.loading = false;
        submit.hidden = true;
        comment.hidden = true;
        thanks.hidden = true;
        question.hidden = false;
        form.hidden = false;
        // Return focus to the question so the flow is re-announced and can be repeated from the start.
        question.focus();
      };

      rating.addEventListener('change', revealCommentAndSubmit);
      submit.addEventListener('click', () => {
        // Simulate a short server round-trip: show a loading spinner while "submitting",
        // then reveal the confirmation. In a real integration the request would happen here.
        submit.loading = true;
        window.setTimeout(showConfirmation, 1200);
      });
      restart.addEventListener('click', restartFeedback);
    `}</Script>
  </PatternPage>
);

export default Page;
