import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { HeroVideo } from '../../../_partials/HeroVideo.tsx';
import { Header } from '../../../_partials/header/Header.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Header: Overlay',
  description:
    'The header lies on top of the content, typically a full-bleed hero image or video, and is reduced to a single row with brand, navigation and meta actions. The menu opens a drilldown with the site navigation.',
};

/** Header pattern – the `overlay` layout, lying on top of the hero it is shown with. */
const Page = () => (
  <PatternPage meta={meta} beforeMain={<Header currentPage="home" showSearch />}>
    <main id="main" class="grid-template">
      <section class="scheme-dark z-0 col-full grid grid-cols-subgrid items-end h-[clamp(480px,80vh,1000px)]">
        <HeroVideo>
          <div class="z-1 col-extended row-span-full mb-fluid-lg">
            <p-heading tag="h1" size="3xl">
              <span class="text-md block">Pattern</span>
              Header
            </p-heading>
          </div>
        </HeroVideo>
      </section>
    </main>
  </PatternPage>
);

export default Page;
