import { patternItems } from '../_data.ts';
import { OverviewPage } from '../_layouts/OverviewPage.tsx';
import { ExampleList } from '../_partials/ExampleList.tsx';

/** Overview of the `patterns` project – its `index.html`, and the page every pattern links back to. */
const Page = () => (
  <OverviewPage
    title="Patterns"
    description="Overview of the patterns by the Porsche Design System."
    heading="Patterns"
    intro="A pattern shows a single section of a page – a header or a footer – in the place it occupies on a real page, so variations can be compared. Links inside a pattern are placeholders."
  >
    <section>
      <ExampleList basePath="./" items={patternItems} label="Patterns" />
    </section>
  </OverviewPage>
);

export default Page;
