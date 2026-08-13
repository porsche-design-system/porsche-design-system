import { patternItems, templateItems } from './_data.ts';
import { BasePage } from './_layouts/BasePage.tsx';
import { ExampleList } from './_partials/ExampleList.tsx';

/** Overview page – links to every template and every pattern. */
const Page = () => (
  <BasePage
    basePath="./"
    title="Overview"
    description="Overview of the dummy JSX templates and patterns."
    currentPage="overview"
    mainClass="flex max-w-2xl flex-col gap-12"
  >
    <section>
      <h1 class="mb-6 text-4xl font-bold">Dummy examples</h1>
      <p>
        Templates are complete application pages. Patterns show a single section of a page, so variations of the same
        partial can be compared. Both are rendered from the same components and share one layout.
      </p>
    </section>

    <section>
      <h2 class="mb-2 text-3xl font-semibold">
        <a class="underline underline-offset-4" href="./templates/">
          Templates
        </a>
      </h2>
      <p class="mb-6 text-fg-muted">Whole pages, from the skip link to the footer.</p>
      <ExampleList basePath="./" items={templateItems} />
    </section>

    <section>
      <h2 class="mb-2 text-3xl font-semibold">
        <a class="underline underline-offset-4" href="./patterns/">
          Patterns
        </a>
      </h2>
      <p class="mb-6 text-fg-muted">Single sections, shown in isolation and in their real place on the page.</p>
      <ExampleList basePath="./" items={patternItems} />
    </section>
  </BasePage>
);

export default Page;
