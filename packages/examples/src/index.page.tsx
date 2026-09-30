import { patternItems, templateItems } from './_data.ts';
import { OverviewPage } from './_layouts/OverviewPage.tsx';
import { ExampleList } from './_partials/ExampleList.tsx';

/**
 * Overview of the source tree – the entry point of the dev server.
 *
 * It is **not** emitted: the build writes one project per example, and the storefront's own navigation is what links
 * them there. This page exists so every example can be reached from one place while developing, and it is the only
 * page that navigates at all.
 */
const Page = () => (
  <OverviewPage
    title="Overview"
    description="Overview of the dummy templates and patterns."
    heading="Dummy examples"
    intro="Templates are complete application pages. Patterns show a single section of a page, so variations of the same partial can be compared. Links inside an example are placeholders – only this overview navigates."
  >
    <section>
      <h2 class="mb-2 text-3xl font-semibold">Templates</h2>
      <p class="mb-6 text-contrast-medium">Whole pages, from the header to the footer.</p>
      <ExampleList basePath="./templates/" items={templateItems} label="Templates" />
    </section>

    <section>
      <h2 class="mb-2 text-3xl font-semibold">Patterns</h2>
      <p class="mb-6 text-contrast-medium">Single sections, shown in the place they occupy on a real page.</p>
      <ExampleList basePath="./patterns/" items={patternItems} label="Patterns" />
    </section>
  </OverviewPage>
);

export default Page;
