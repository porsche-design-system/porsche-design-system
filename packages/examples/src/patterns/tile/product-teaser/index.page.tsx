import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

const label = 'Weekender';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Product Teaser',
  description:
    'A product teaser links to a product with a branded background color, e.g. within a product category of porsche.com. The product image takes up half of the tile, heading and text the other half, and a compact icon-only link sits at the top. The link stretches its clickable area over the tile, and on hover the image zooms in, unless the user prefers reduced motion. Make sure a custom background color provides sufficient contrast for the content.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – a product with a branded background color, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <Comment>{tileComments.coverTile}</Comment>
      <Comment>Light content on the brand color, independent of the color scheme of the page.</Comment>
      <div class="col-basic justify-self-center w-full max-w-[560px] group relative isolate grid grid-cols-2 grid-rows-[auto_1fr] gap-fluid-sm aspect-video rounded-3xl bg-[#341f2e] p-fluid-md scheme-only-dark [--p-link-cover-radius:var(--radius-3xl)]">
        <Comment>{tileComments.coverLink}</Comment>
        <p-link
          class="col-span-2 justify-self-end"
          variant="secondary"
          icon="arrow-up-right"
          hide-label="true"
          compact="true"
          cover={true}
        >
          <a href="#">{label}</a>
        </p-link>
        <div class="flex flex-col">
          <Comment>{tileComments.fill}</Comment>
          <Comment>{tileComments.zoom}</Comment>
          <img
            class="grow basis-0 min-h-0 w-full object-contain motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
            src="/examples/media/weekender.webp"
            alt=""
            width="960"
            height="1080"
          />
        </div>
        <div class="self-center flex flex-col gap-static-sm">
          <p-heading tag="h2" size="lg" hyphens="auto">
            {label}
          </p-heading>
          <p-text color="contrast-high">A timeless companion for short trips</p-text>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
