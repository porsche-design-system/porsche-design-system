import { patternItems } from '../_data.ts';
import { BasePage } from '../_layouts/BasePage.tsx';
import { ExampleList } from '../_partials/ExampleList.tsx';

/** Category overview – every pattern, i.e. every example that shows a single section of a page. */
const Page = () => (
  <BasePage
    basePath="../"
    title="Patterns"
    description="Single sections of a page, shown in isolation so variations can be compared."
    currentPage="patterns"
    mainClass="max-w-2xl"
  >
    <h1 class="mb-6 text-4xl font-bold">Patterns</h1>
    <p class="mb-12">
      A pattern is one section rather than one page. Each pattern page renders the section in the place it occupies on a
      real page, so its landmarks and focus order stay meaningful.
    </p>
    <ExampleList basePath="../" items={patternItems} />
  </BasePage>
);

export default Page;
