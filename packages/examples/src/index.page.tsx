import { patternItems, templateItems } from './_data.ts';
import { ExampleList } from './_partials/ExampleList.tsx';
import { Head } from './_partials/Head.tsx';

/**
 * Overview page – the index of the package and the only page whose links go anywhere.
 *
 * It deliberately renders no header and no footer: that chrome is the subject of the examples, so repeating it here
 * would demonstrate nothing and would need URLs kept in sync for no benefit. What is left is a link list.
 */
const Page = () => (
  <html lang="en">
    <head>
      <Head basePath="./" title="Overview" description="Overview of the dummy JSX templates and patterns." />
    </head>
    <body>
      <main id="main" class="flex max-w-2xl flex-col gap-12">
        <section>
          <h1 class="mb-6 text-4xl font-bold">Dummy examples</h1>
          <p>
            Templates are complete application pages. Patterns show a single section of a page, so variations of the
            same partial can be compared. Links inside an example are placeholders – only this page navigates.
          </p>
        </section>

        <section>
          <h2 class="mb-2 text-3xl font-semibold">Templates</h2>
          <p class="mb-6 text-fg-muted">Whole pages, from the skip link to the footer.</p>
          <ExampleList basePath="./" items={templateItems} label="Templates" />
        </section>

        <section>
          <h2 class="mb-2 text-3xl font-semibold">Patterns</h2>
          <p class="mb-6 text-fg-muted">Single sections, shown in the place they occupy on a real page.</p>
          <ExampleList basePath="./" items={patternItems} label="Patterns" />
        </section>
      </main>
    </body>
  </html>
);

export default Page;
