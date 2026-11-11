import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Footer } from '../../../_partials/footer/Footer.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Footer: Extended',
  description:
    'The footer of a site. Besides the legal information – consumption and emission disclaimers, the wordmark, the copyright and the legal links – it offers the delivery country, the site navigation in columns, social media and payment service providers, so users can reach key information from wherever they are on the site.',
};

/**
 * Footer pattern – the `extended` layout, the page level footer of a site, shown at the bottom of the content it belongs
 * to.
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
