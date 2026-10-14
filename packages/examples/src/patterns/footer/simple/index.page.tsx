import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { SimpleFooter } from '../../../_partials/footer/Footer.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Footer: Simple',
  description:
    'A reduced footer with nothing but the legal information: consumption and emission disclaimers, the wordmark, the copyright and the legal links. It suits a page that stands on its own, such as a campaign or a personalized landing page, where the site navigation would lead away from it.',
};

/**
 * Footer pattern – the `simple` layout, for a page that is a destination of its own.
 *
 * Like the `extended` layout it is shown on its own: the `main` landmark stays but is empty and carries no spacing, so
 * this page has no first level heading either.
 */
const Page = () => (
  <PatternPage meta={meta} afterMain={<SimpleFooter />}>
    <main id="main" />
  </PatternPage>
);

export default Page;
