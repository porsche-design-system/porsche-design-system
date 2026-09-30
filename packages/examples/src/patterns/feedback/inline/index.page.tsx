import { ids } from '../../../_ids.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { FeedbackForm } from '../../../_partials/feedback/FeedbackForm.tsx';
import { Script } from '../../../_partials/Script.tsx';

/**
 * Feedback pattern – the flow shown in the page it asks about.
 *
 * Nothing is disclosed: the question is part of the content, and the answer replaces it in place. The scale reveals
 * the optional comment and the submit button only once it has been used, so the page asks one thing at a time – see
 * `FeedbackForm`. The script at the end of the page adds starting over.
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
      // Behaviour of the inline feedback pattern: starting the flow over from its confirmation. The flow itself is the
      // script of "FeedbackForm".

      const restart = document.getElementById('feedback-restart');

      restart.addEventListener('click', () => {
        document.getElementById('${ids.feedbackForm}').reset();
        // Return focus to the question so the flow is re-announced and can be repeated from the start.
        document.getElementById('${ids.feedbackQuestion}').focus();
      });
    `}</Script>
  </PatternPage>
);

export default Page;
