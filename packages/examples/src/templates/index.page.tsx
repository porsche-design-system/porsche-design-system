import { templateItems } from '../_data.ts';
import { BasePage } from '../_layouts/BasePage.tsx';
import { ExampleList } from '../_partials/ExampleList.tsx';

/** Category overview – every template, i.e. every example that is a complete application page. */
const Page = () => (
  <BasePage
    basePath="../"
    title="Templates"
    description="Complete application pages built from the shared layout and partial components."
    currentPage="templates"
    mainClass="max-w-2xl"
  >
    <h1 class="mb-6 text-4xl font-bold">Templates</h1>
    <p class="mb-12">
      A template is a whole page: it owns the chrome, from the skip link down to the footer, and demonstrates how the
      partials work together in a real document.
    </p>
    <ExampleList basePath="../" items={templateItems} />
  </BasePage>
);

export default Page;
