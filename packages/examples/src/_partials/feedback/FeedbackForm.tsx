/**
 * The feedback flow shared by the two feedback patterns.
 *
 * The variants differ in *where* the flow is shown – in the page or in a modal – not in what it asks, so the question,
 * the scale, the comment and the confirmation live here once and each page passes only what differs. It sits next to
 * the pages instead of in `src/_partials/`, which holds the chrome every example can use; the leading underscore keeps
 * it a build input either way.
 *
 * The flow brings its own behaviour, so both variants share it as well: a rating reveals the comment and the submit
 * button, submitting shows the confirmation, and starting over resets it. Everything the script looks up is rendered
 * here, so the pages never address an element of the flow – a page only wires up what it renders itself, like the
 * modal of the dialog variant. The flow follows that modal on its own: it cancels a pending submission when the modal
 * is dismissed and starts over once it is fully hidden.
 */

import type { ComponentChildren } from 'preact';
import { Script } from '../Script.tsx';

/** One step of the satisfaction scale: the number shown, and what it means. */
type Rating = {
  value: string;
  /**
   * Read out together with the number, so every option carries its own name. It is only hidden visually from `s`
   * upwards, where the scale is wide enough to be labelled at its two ends instead.
   */
  meaning: string;
};

const ratings: Rating[] = [
  { value: '1', meaning: 'very dissatisfied' },
  { value: '2', meaning: 'dissatisfied' },
  { value: '3', meaning: 'neutral' },
  { value: '4', meaning: 'satisfied' },
  { value: '5', meaning: 'very satisfied' },
];

type FeedbackFormProps = {
  /** Offers to start over from the confirmation – for a flow shown in the page, which stays there once answered. */
  restartable?: boolean;
  /** A further action next to the confirmation, wired up by the page – the close button of the dialog variant. */
  confirmationAction?: ComponentChildren;
};

/** Question, rating scale with its optional comment, and the confirmation that replaces them. */
export const FeedbackForm = ({ restartable, confirmationAction }: FeedbackFormProps) => (
  <>
    {/* Focusable without being a tab stop: the flow moves focus here when it starts over, so the question is
        announced again instead of leaving focus on a control that is no longer there. */}
    <p-heading
      id="feedback-question"
      class="focus-visible:outline outline-focus outline-offset-2 rounded-md"
      tag="h2"
      size="md"
      align="center"
      tabindex={-1}
    >
      How satisfied are you with the information shown on this page?
    </p-heading>

    {/* The submit button is a `button`, not a `submit`: nothing is sent anywhere, so the form never navigates. */}
    <form id="feedback-form" class="grid gap-fluid-md justify-items-center">
      <div class="w-full grid md:grid-cols-[auto_minmax(320px,1fr)_auto] items-center gap-static-md">
        <p-text
          class="max-sm:hidden row-2 md:row-auto col-1 md:col-auto justify-self-start"
          size="sm"
          align="start"
          color="contrast-medium"
        >
          Very dissatisfied
        </p-text>
        <p-segmented-control
          id="feedback-rating"
          class="row-1 md:row-auto col-span-2 md:col-auto"
          columns="{ base: 1, s: 5 }"
          label="Select your satisfaction from the scale 1 (very dissatisfied) to 5 (very satisfied)"
          hide-label="true"
        >
          {ratings.map(({ value, meaning }) => (
            <p-segmented-control-item key={value} value={value}>
              {value}
              {/* A non-breaking space, because JSX drops the whitespace between elements on separate lines. */}
              {'\u00a0'}
              <span class="sm:sr-only">({meaning})</span>
            </p-segmented-control-item>
          ))}
        </p-segmented-control>
        <p-text
          class="max-sm:hidden row-2 md:row-auto col-2 md:col-auto justify-self-end"
          size="sm"
          align="end"
          color="contrast-medium"
        >
          Very satisfied
        </p-text>
      </div>
      {/* Both are revealed by the rating, so nothing is asked before there is something to comment on. */}
      <p-textarea
        id="feedback-comment"
        class="w-full"
        name="comment"
        label="What two things could we do to make this page better?"
        rows={4}
        hidden
      />
      <p-button id="feedback-submit" type="button" hidden>
        Submit feedback
      </p-button>
    </form>

    {/* The confirmation replaces the form in place. `aria-live` covers the case where focus cannot be moved – the
        heading is focused as well, so the change is announced either way. */}
    <div
      id="feedback-thanks"
      class="grid gap-fluid-md justify-items-center"
      aria-live="polite"
      aria-atomic="true"
      hidden
    >
      <p-heading
        id="feedback-thanks-heading"
        class="focus-visible:outline outline-focus outline-offset-2 rounded-md"
        tag="h2"
        size="md"
        align="center"
        tabindex={-1}
      >
        Thank you for your feedback
      </p-heading>
      <p-text align="center">Your feedback helps us continuously improve our page.</p-text>
      {restartable && (
        <p-button id="feedback-restart" type="button" variant="secondary" icon="refresh">
          Give new feedback
        </p-button>
      )}
      {confirmationAction}
    </div>
    <Script>{`
      // Behaviour of the feedback flow: which of its two steps – the question or the confirmation – is shown.
      //
      // No data is sent anywhere: the submission is simulated, so the flow can be reviewed end to end.

      const question = document.getElementById('feedback-question');
      const form = document.getElementById('feedback-form');
      const rating = document.getElementById('feedback-rating');
      const comment = document.getElementById('feedback-comment');
      const submit = document.getElementById('feedback-submit');
      const thanks = document.getElementById('feedback-thanks');
      const thanksHeading = document.getElementById('feedback-thanks-heading');

      // Handle of the simulated request, so dismissing the modal mid-submission can cancel it.
      let pendingSubmission;

      const cancelSubmission = () => {
        window.clearTimeout(pendingSubmission);
      };

      // Choosing a rating reveals the optional free-text field and the submit button.
      rating.addEventListener('change', () => {
        comment.hidden = false;
        submit.hidden = false;
      });

      // Reveal the confirmation once the "submission" has completed.
      const showConfirmation = () => {
        form.hidden = true;
        question.hidden = true;
        thanks.hidden = false;
        submit.loading = false;
        // Move focus to the confirmation so keyboard and screen reader users are informed.
        thanksHeading.focus();
      };

      submit.addEventListener('click', () => {
        // Simulate a short server round-trip: show a loading spinner while "submitting", then reveal the
        // confirmation. In a real integration the request would happen here.
        submit.loading = true;
        pendingSubmission = window.setTimeout(showConfirmation, 1200);
      });

      const startOver = () => {
        cancelSubmission();
        rating.value = '';
        comment.value = '';
        comment.hidden = true;
        submit.loading = false;
        submit.hidden = true;
        thanks.hidden = true;
        question.hidden = false;
        form.hidden = false;
      };

      // Offered by the flow shown in the page: starting over from the confirmation.
      document.getElementById('feedback-restart')?.addEventListener('click', () => {
        startOver();
        // Return focus to the question so the flow is re-announced and can be repeated from the start.
        question.focus();
      });

      // Shown in a modal, the flow follows it: a submission still pending when the modal is dismissed is cancelled, and
      // the next open starts fresh. The reset waits for "motionHiddenEnd", which fires once the close animation has
      // finished, so the content does not visibly snap back while the dialog is still on screen.
      const enclosingModal = form.closest('p-modal');
      enclosingModal?.addEventListener('dismiss', cancelSubmission);
      enclosingModal?.addEventListener('motionHiddenEnd', startOver);
    `}</Script>
  </>
);
