import type { ExampleMeta } from '../../../lib/meta.ts';
import { TemplatePage } from '../../_layouts/TemplatePage.tsx';
import { Footer } from '../../_partials/footer/Footer.tsx';
import { HeroVideo } from '../../_partials/HeroVideo.tsx';
import { Header } from '../../_partials/header/Header.tsx';
import { navItems } from '../../_partials/header/MainNav.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Landing page',
  description:
    "The template is designed for campaigns that require a high-impact, conversion-focused experience. It's built to capture user attention and guide them toward a singular goal, whether that's signing up for a newsletter, exploring a new model, or registering for an event.",
};

/** Landing page – demonstrates overriding the shared navigation with a page level list. */
const Page = () => (
  <TemplatePage meta={meta}>
    <Header
      currentPage="home"
      showSearch
      navItems={[...navItems, { id: 'landing-features', href: '#features', label: 'Jump to features' }]}
    />
    <main id="main" class="grid-template gap-y-fluid-xl pb-fluid-2xl">
      <section
        class="scheme-dark z-0 col-full grid grid-cols-subgrid items-end h-[clamp(480px,80vh,1000px)] relative before:absolute before:inset-[50%_0_0_0] before:z-1 before:pointer-events-none before:bg-linear-to-t before:from-canvas before:to-transparent"
        aria-labelledby="heading-section-1"
      >
        <HeroVideo>
          <div class="z-1 col-extended row-span-full mb-fluid-lg">
            <p-heading id="heading-section-1" class="pb-fluid-md" tag="h1" size="3xl">
              <span class="text-md block">Template</span>
              Landing Page
            </p-heading>
            <p-button variant="secondary">Some label</p-button>
          </div>
        </HeroVideo>
      </section>

      <section
        id="features"
        class="scheme-dark col-full grid grid-cols-subgrid gap-y-fluid-md bg-canvas p-fluid-xl -mt-fluid-xl -mb-fluid-xl"
        aria-label="Some section 2 label"
      >
        <div class="col-basic grid grid-cols-subgrid gap-y-fluid-md">
          <p-link-tile
            class="col-span-full sm:col-span-one-half"
            href="#"
            label="Tickets 2026"
            description="Teaser Headline"
            compact="true"
            weight="regular"
            aspect-ratio="{base: '4/3', xs: '16/9', s: '3/4', m: '1/1'}"
          >
            <img
              src="/examples/media/chrono-car.webp"
              alt="Some alternative text for screen readers describing the media element"
            />
          </p-link-tile>
          <p-link-tile
            class="col-span-full sm:col-span-one-half"
            href="#"
            label="Results"
            description="Teaser Headline"
            compact="true"
            weight="regular"
            aspect-ratio="{base: '4/3', xs: '16/9', s: '3/4', m: '1/1'}"
          >
            <img
              src="/examples/media/addon.webp"
              alt="Some alternative text for screen readers describing the media element"
            />
          </p-link-tile>
        </div>
      </section>

      <section class="col-full grid grid-cols-subgrid py-fluid-xl" aria-label="Some section 3 label">
        <p-carousel
          class="col-span-full"
          slides-per-page="{ base: 1, xs: 1, m: 1 }"
          align-header="center"
          width="extended"
          heading="Carousel"
        >
          <p-link-tile
            gradient={true}
            href="#"
            label="Timeless Enthusiast"
            description="Teaser Heading"
            compact="true"
            aspect-ratio="{base: '1/1', xs: '16/9'}"
            weight="regular"
          >
            <img
              src="/examples/media/interieur-1.webp"
              alt="Some alternative text for screen readers describing the media element"
            />
          </p-link-tile>
          <p-link-tile
            gradient={true}
            href="#"
            label="The Loyalist"
            description="Teaser Heading"
            compact="true"
            aspect-ratio="{base: '1/1', xs: '16/9'}"
            weight="regular"
          >
            <img
              src="/examples/media/interieur-2.webp"
              alt="Some alternative text for screen readers describing the media element"
            />
          </p-link-tile>
          <p-link-tile
            gradient={true}
            href="#"
            label="Urbanist"
            description="Teaser Heading"
            compact="true"
            aspect-ratio="{base: '1/1', xs: '16/9'}"
            weight="regular"
          >
            <img
              src="/examples/media/interieur-3.webp"
              alt="Some alternative text for screen readers describing the media element"
            />
          </p-link-tile>
          <p-link-tile
            gradient={true}
            href="#"
            label="Urbanist"
            description="Teaser Heading"
            compact="true"
            aspect-ratio="{base: '1/1', xs: '16/9'}"
            weight="regular"
          >
            <img
              src="/examples/media/interieur-4.webp"
              alt="Some alternative text for screen readers describing the media element"
            />
          </p-link-tile>
        </p-carousel>
      </section>

      <section class="col-basic grid grid-cols-subgrid gap-y-fluid-xl" aria-label="Some section 4 label">
        <div class="col-span-full grid grid-cols-subgrid gap-y-fluid-lg">
          <img
            class="col-span-full md:col-start-1 md:col-end-7 md:row-start-1 w-full aspect-4/3 md:aspect-3/4 object-cover rounded-3xl"
            src="/examples/media/cockpit.webp"
            alt="Some alternative text for screen readers describing the media element"
          />
          <div class="col-span-full md:col-start-8 md:col-end-13 md:row-start-1 flex flex-col justify-center items-start">
            <p-heading tag="h3" size="md">
              Some Title
            </p-heading>
            <p-text class="mt-fluid-sm">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum
            </p-text>
            <p-text class="mt-fluid-sm" size="xs" color="contrast-medium">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
            </p-text>
            <p-link class="mt-fluid-lg">
              <a href="#">Some label</a>
            </p-link>
          </div>
        </div>
        <div class="col-span-full grid grid-cols-subgrid gap-y-fluid-lg">
          <img
            class="col-span-full md:col-start-7 md:col-end-13 md:row-start-1 w-full aspect-4/3 md:aspect-3/4 object-cover rounded-3xl"
            src="/examples/media/chrono.webp"
            alt="Some alternative text for screen readers describing the media element"
          />
          <div class="col-span-full md:col-start-1 md:col-end-6 md:row-start-1 flex flex-col justify-center items-start">
            <p-heading tag="h3" size="md">
              Some Title
            </p-heading>
            <p-text class="mt-fluid-sm">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum
            </p-text>
            <p-text class="mt-fluid-sm" size="xs" color="contrast-medium">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
            </p-text>
            <p-link class="mt-fluid-lg">
              <a href="#">Some label</a>
            </p-link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </TemplatePage>
);

export default Page;
