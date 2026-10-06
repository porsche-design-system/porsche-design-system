import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { FeedbackForm } from '../../../_partials/feedback/FeedbackForm.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Feedback: Inline',
  description:
    'The rating sits directly in the page flow, typically at the end of the content, and stays visible at all times. Once feedback is submitted, it shows a confirmation and offers the option to start over and give new feedback.',
};

/**
 * Feedback pattern – the flow shown in the page it asks about.
 *
 * Nothing is disclosed: the question is part of the content, and the answer replaces it in place. The scale reveals
 * the optional comment and the submit button only once it has been used, so the page asks one thing at a time – see
 * `FeedbackForm`, which also offers to start over here.
 */
const Page = () => (
  <PatternPage meta={meta}>
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
        <FeedbackForm restartable />
      </section>
    </main>
  </PatternPage>
);

export default Page;
