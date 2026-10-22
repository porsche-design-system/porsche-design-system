import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Header } from '../../../_partials/header/Header.tsx';
import { navItems } from '../../../_partials/header/MainNav.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Header: Stacked',
  description:
    'The header sits above the content instead of lying on top of it: a note on top, the bar with brand, navigation and meta actions in the middle, and a row of category navigation below. The menu opens a drilldown with the site navigation.',
};

/** Header pattern – the `stacked` layout, sitting above the content with a note and a category row. */
const Page = () => (
  <PatternPage
    meta={meta}
    beforeMain={
      <Header
        currentPage="features"
        navItems={[...navItems, { id: 'stories', href: '#', label: 'Stories' }]}
        showSearch
        variant="stacked"
      />
    }
  >
    <main id="main" class="grid-template">
      <section class="scheme-dark col-full grid grid-cols-subgrid items-end h-[clamp(480px,80vh,1000px)]">
        <img
          class="col-span-full row-span-full min-w-full w-full min-h-full h-full object-cover object-center"
          src="/examples/media/trolley.webp"
          alt=""
        />
        <div class="col-extended row-span-full mb-fluid-lg">
          <p-heading tag="h1" size="3xl">
            <span class="text-md block">Pattern</span>
            Header
          </p-heading>
        </div>
      </section>
    </main>
  </PatternPage>
);

export default Page;
