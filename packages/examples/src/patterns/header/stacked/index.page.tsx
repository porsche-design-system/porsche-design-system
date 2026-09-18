import { navItems, placeholderHref } from '../../../_data.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Header } from '../../../_partials/header/Header.tsx';

/** Header pattern – the `stacked` layout, sitting above the content with a note and a category row. */
const Page = () => (
  <PatternPage
    title="Header 2"
    description="Note, header bar and category navigation stacked above the content."
    beforeMain={
      <Header
        currentPage="features"
        navItems={[...navItems, { id: 'stories', href: placeholderHref, label: 'Stories' }]}
        showSearch
        variant="stacked"
      />
    }
  >
    <main id="main" class="grid-template">
      <section class="scheme-dark col-full grid grid-cols-subgrid items-end h-[clamp(480px,80vh,1000px)]">
        <img
          class="col-span-full row-span-full min-w-full w-full min-h-full h-full object-cover object-center"
          src="/trolley.webp"
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
