import { patternItems, templateItems } from './_data.ts';
import { OverviewPage } from './_layouts/OverviewPage.tsx';
import { ExampleList } from './_partials/ExampleList.tsx';

/**
 * Overview of the source tree – the entry point of the dev server.
 *
 * It is **not** emitted: the build writes one project per category, each with its own overview at its root. This page
 * exists so both categories can be reached from one place while developing, and it is the only page linking across
 * categories.
 */
const Page = () => (
  <OverviewPage
    title="Overview"
    description="Overview of the dummy templates and patterns."
    heading="Dummy examples"
    intro="Templates are complete application pages. Patterns show a single section of a page, so variations of the same partial can be compared. Links inside an example are placeholders – only the overview pages navigate."
  >
    <section>
      <h2 class="mb-2 text-3xl font-semibold">Templates</h2>
      <p class="mb-6 text-fg-muted">Whole pages, from the skip link to the footer.</p>
      <ExampleList basePath="./templates/" items={templateItems} label="Templates" />
    </section>

    <section>
      <h2 class="mb-2 text-3xl font-semibold">Patterns</h2>
      <p class="mb-6 text-fg-muted">Single sections, shown in the place they occupy on a real page.</p>
      <ExampleList basePath="./patterns/" items={patternItems} label="Patterns" />
    </section>
  </OverviewPage>
);

export default Page;
