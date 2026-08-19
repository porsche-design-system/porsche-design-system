import { PatternPage } from '../../_layouts/PatternPage.tsx';
import { Footer } from '../../_partials/footer/Footer.tsx';

/** Footer pattern – the page level footer, shown at the bottom of the content it belongs to. */
const Page = () => (
  <PatternPage
    basePath="../"
    title="Footer 1"
    description="Footer with a logo, navigation and legal links, shown at the bottom of a page."
    afterMain={<Footer />}
  >
    <main id="main" class="grid-template">
      <section class="col-basic py-fluid-xl">
        <p-heading tag="h1" size="3xl">
          <span class="text-md block">Pattern</span>
          Footer
        </p-heading>
      </section>
    </main>
  </PatternPage>
);

export default Page;
