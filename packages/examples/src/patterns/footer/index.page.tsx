import { PatternPage } from '../../_layouts/PatternPage.tsx';
import { Footer } from '../../_partials/footer/Footer.tsx';

/**
 * Footer pattern – the page level footer, shown at the bottom of the content it belongs to.
 *
 * The `main` landmark stays, but it is empty and carries no spacing: the pattern is the footer, so the page shows it
 * on its own rather than below a placeholder heading. Consequently this page has no first level heading, which the
 * header patterns – whose content below them is part of what they demonstrate – still have.
 */
const Page = () => (
  <PatternPage
    title="Footer 1"
    description="Footer with a logo, navigation and legal links, shown at the bottom of a page."
    afterMain={<Footer />}
  >
    <main id="main" />
  </PatternPage>
);

export default Page;
