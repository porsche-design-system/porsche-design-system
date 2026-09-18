import { templateItems } from '../_data.ts';
import { OverviewPage } from '../_layouts/OverviewPage.tsx';
import { ExampleList } from '../_partials/ExampleList.tsx';

/** Overview of the `templates` project – its `index.html`. */
const Page = () => (
  <OverviewPage
    title="Templates"
    description="Overview of the templates by the Porsche Design System."
    heading="Templates"
    intro="A template is a complete application page, from the header to the footer. Links inside a template are placeholders."
  >
    <section>
      <ExampleList basePath="./" items={templateItems} label="Templates" />
    </section>
  </OverviewPage>
);

export default Page;
