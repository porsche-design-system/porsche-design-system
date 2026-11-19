import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Category Grid',
  description:
    'Three category tiles under one heading, with a link to the whole range below them. The first tile is as tall as the other two together, which gives the arrangement a focus without making any of the three a different kind of tile. Each tile is the category tile of this collection, unchanged: a heading, an icon-only link covering the tile, and the product image filling the rest.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – three categories under one heading, built with HTML and Tailwind CSS.
 *
 * The tile itself is the category tile of this collection, repeated. What this example adds is the arrangement
 * around it, which is why the tiles are written out rather than generated: the three differ in how their image is
 * fitted and in how much room they take, and each difference belongs where it applies.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        The size sits on the element rather than on the component, so the character limit below is measured in the size
        the heading is actually set in and keeps it on two lines at every width. The limit decides that there are two
        lines, the balanced wrap decides where they break.
      </Comment>
      <p-heading
        class="col-basic justify-self-center max-w-[18ch] text-3xl text-balance"
        tag="h2"
        size="inherit"
        align="center"
      >
        Highlights of the Porsche Shop
      </p-heading>

      <Comment>
        A list, so that how many categories there are is announced before the first of them is read, and so that they
        can be stepped through as a set.
      </Comment>
      <Comment>
        One per row on a phone. From the medium breakpoint there are two of them side by side, and the first tile is as
        tall as the other two together.
      </Comment>
      <ul class="col-basic mt-fluid-xl grid grid-cols-1 gap-fluid-md sm:grid-cols-2">
        <Comment>{tileComments.coverTile}</Comment>
        <Comment>{tileComments.ownHeight}</Comment>
        <Comment>Beside the other two it has no ratio of its own and is stretched to their height instead.</Comment>
        <li class="self-start group relative isolate flex flex-col aspect-3/4 rounded-3xl bg-surface pt-fluid-md sm:row-span-2 sm:self-stretch sm:aspect-auto [--p-link-cover-radius:var(--radius-3xl)]">
          <div class="flex flex-wrap items-center gap-fluid-sm px-fluid-md">
            <p-heading tag="h3" size="md">
              Accessories
            </p-heading>
            <Comment>{tileComments.coverLink}</Comment>
            <p-link
              class="ms-auto"
              variant="secondary"
              icon="arrow-up-right"
              hide-label="true"
              compact="true"
              cover={true}
            >
              <a href="#">Accessories</a>
            </p-link>
          </div>
          <Comment>{tileComments.fill}</Comment>
          <Comment>{tileComments.clip}</Comment>
          <div class="flex-1 min-h-0 overflow-clip rounded-b-[inherit]">
            <Comment>A cut out product, so all of it stays in view and the surface of the tile surrounds it.</Comment>
            <Comment>
              Centered in the room the heading leaves rather than in the whole tile, and never taller than that room.
            </Comment>
            <Comment>Its width is a share of the tile, so the product keeps its scale at every size.</Comment>
            <Comment>{tileComments.zoom}</Comment>
            <img
              class="mx-auto h-full w-1/2 object-contain motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
              src="/examples/media/chronograph.webp"
              alt="A Porsche Design chronograph"
              width="800"
              height="1282"
            />
          </div>
        </li>

        <Comment>{tileComments.coverTile}</Comment>
        <Comment>{tileComments.ownHeight}</Comment>
        <li class="self-start group relative isolate flex flex-col aspect-3/2 rounded-3xl bg-surface pt-fluid-md [--p-link-cover-radius:var(--radius-3xl)]">
          <div class="flex flex-wrap items-center gap-fluid-sm px-fluid-md">
            <p-heading tag="h3" size="md">
              Tequipment
            </p-heading>
            <Comment>{tileComments.coverLink}</Comment>
            <p-link
              class="ms-auto"
              variant="secondary"
              icon="arrow-up-right"
              hide-label="true"
              compact="true"
              cover={true}
            >
              <a href="#">Tequipment</a>
            </p-link>
          </div>
          <Comment>{tileComments.fill}</Comment>
          <Comment>{tileComments.clip}</Comment>
          <div class="flex-1 min-h-0 overflow-clip rounded-b-[inherit]">
            <Comment>A cut out product, so all of it stays in view and the surface of the tile surrounds it.</Comment>
            <Comment>
              Centered in the room the heading leaves rather than in the whole tile, and never taller than that room.
            </Comment>
            <Comment>Its width is a share of the tile, so the product keeps its scale at every size.</Comment>
            <Comment>{tileComments.zoom}</Comment>
            <img
              class="mx-auto h-full w-3/4 object-contain motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
              src="/examples/media/roof-box.webp"
              alt="A roof box"
              width="1000"
              height="255"
            />
          </div>
        </li>

        <Comment>{tileComments.coverTile}</Comment>
        <Comment>{tileComments.ownHeight}</Comment>
        <li class="self-start group relative isolate flex flex-col aspect-3/2 rounded-3xl bg-surface pt-fluid-md [--p-link-cover-radius:var(--radius-3xl)]">
          <div class="flex flex-wrap items-center gap-fluid-sm px-fluid-md">
            <p-heading tag="h3" size="md">
              Clothing
            </p-heading>
            <Comment>{tileComments.coverLink}</Comment>
            <p-link
              class="ms-auto"
              variant="secondary"
              icon="arrow-up-right"
              hide-label="true"
              compact="true"
              cover={true}
            >
              <a href="#">Clothing</a>
            </p-link>
          </div>
          <Comment>{tileComments.fill}</Comment>
          <Comment>{tileComments.clip}</Comment>
          <div class="flex-1 min-h-0 overflow-clip rounded-b-[inherit]">
            <Comment>
              Set against the lower edge, where the image is cropped, so the garment is cut there. It is never taller
              than the room the heading leaves.
            </Comment>
            <Comment>Its width is a share of the tile, so the product keeps its scale at every size.</Comment>
            <Comment>{tileComments.zoom}</Comment>
            <img
              class="mx-auto h-full w-2/3 object-contain object-bottom motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
              src="/examples/media/jacket.webp"
              alt="A Porsche Motorsport jacket"
              width="900"
              height="629"
            />
          </div>
        </li>
      </ul>

      <Comment>The way out of the arrangement, for a reader none of the three categories has caught.</Comment>
      <p-link class="col-basic mt-fluid-lg justify-self-center" variant="primary">
        <a href="#">Discover all products</a>
      </p-link>
    </main>
  </PatternPage>
);

export default Page;
