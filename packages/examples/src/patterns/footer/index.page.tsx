import type { ExampleMeta } from '../../../lib/meta.ts';
import { PatternPage } from '../../_layouts/PatternPage.tsx';
import { Footer } from '../../_partials/footer/Footer.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Footer',
  description:
    'The footer serves as a universal navigation and information hub located at the bottom of every page. It provides essential links, copyright information, legal disclaimers, and contact details, ensuring users can easily access key information regardless of their location on the site.',
};

/**
 * Footer pattern – the page level footer, shown at the bottom of the content it belongs to.
 *
 * The `main` landmark stays, but it is empty and carries no spacing: the pattern is the footer, so the page shows it
 * on its own rather than below a placeholder heading. Consequently this page has no first level heading, which the
 * header patterns – whose content below them is part of what they demonstrate – still have.
 */
const Page = () => (
  <PatternPage meta={meta} afterMain={<Footer />}>
    <main id="main" />
  </PatternPage>
);

export default Page;
