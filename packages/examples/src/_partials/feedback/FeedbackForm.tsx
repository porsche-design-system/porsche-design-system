/**
 * The feedback flow shared by the two feedback patterns.
 *
 * The variants differ in *where* the flow is shown – in the page or in a modal – not in what it asks, so the question,
 * the scale, the comment and the confirmation live here once and each page passes only what differs. It sits next to
 * the pages instead of in `src/_partials/`, which holds the chrome every example can use; the leading underscore keeps
 * it a build input either way.
 *
 * The ids are the contract with the `main.js` of each page and stay literals: `src/_ids.ts` single-sources the ids of
 * the shared snippets in `assets/`, and every id registered there has to be owned by exactly one of them.
 *
 * - `feedback-question` – the heading focus returns to when the flow starts over;
 * - `feedback-form` – scale, comment and submit, hidden as a whole once the answer is in;
 * - `feedback-rating` / `feedback-comment` / `feedback-submit` – the three controls of the flow;
 * - `feedback-thanks` / `feedback-thanks-heading` – the confirmation, and the heading focus is moved to.
 */

import type { ComponentChildren } from 'preact';

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
  /** The action offered next to the confirmation – the only part the two variants differ in. */
  confirmationAction: ComponentChildren;
};

/** Question, rating scale with its optional comment, and the confirmation that replaces them. */
export const FeedbackForm = ({ confirmationAction }: FeedbackFormProps) => (
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
      {confirmationAction}
    </div>
  </>
);
