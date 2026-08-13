import { navItems } from '../../_data.ts';
import { PatternPage } from '../../_layouts/PatternPage.tsx';
import { Header } from '../../_partials/header/Header.tsx';

/** Header pattern – the `overlay` layout, lying on top of the hero it is shown with. */
const Page = () => (
  <PatternPage
    basePath="../../"
    title="Header 1"
    description="Brand, navigation and meta actions on a single row, lying on top of the content."
    beforeMain={<Header currentPage="home" navItems={navItems} showSearch />}
    pageScript={['../../assets/header.js', 'main.js']}
  >
    <main id="main" class="grid-template">
      <section class="scheme-dark z-0 col-full grid grid-cols-subgrid items-end h-[clamp(480px,80vh,1000px)]">
        <video
          class="z-0 col-span-full row-span-full min-w-full w-full min-h-full h-full object-cover object-center"
          poster="https://porsche-design-system.github.io/examples/v4/patterns/assets/mood-porsche-gts.webp"
          loop
          muted
          autoplay
          playsinline
        >
          <source
            src="https://porsche-design-system.github.io/examples/v4/patterns/assets/mood-porsche-gts.mp4"
            type="video/mp4"
          />
          <source
            src="https://porsche-design-system.github.io/examples/v4/patterns/assets/mood-porsche-gts.webm"
            type="video/webm"
          />
        </video>
        <div class="z-1 col-extended row-span-full mb-fluid-lg">
          <p-heading tag="h1" size="3xl">
            <span class="text-md block">Pattern</span>
            Header
          </p-heading>
        </div>
        <p-button
          class="z-2 col-wide place-self-end row-span-full mb-fluid-lg"
          variant="secondary"
          compact="true"
          hide-label="true"
          icon="pause"
          id="pause-button"
        >
          Pause Video
        </p-button>
      </section>
    </main>
  </PatternPage>
);

export default Page;
