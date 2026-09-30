import { navItems } from '../../../_data.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { HeroVideo } from '../../../_partials/HeroVideo.tsx';
import { Header } from '../../../_partials/header/Header.tsx';

/** Header pattern – the `overlay` layout, lying on top of the hero it is shown with. */
const Page = () => (
  <PatternPage
    title="Header 1"
    description="Brand, navigation and meta actions on a single row, lying on top of the content."
    beforeMain={<Header currentPage="home" navItems={navItems} showSearch />}
  >
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
