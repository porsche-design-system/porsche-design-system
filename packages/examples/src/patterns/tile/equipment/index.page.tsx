import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Equipment',
  description:
    'An equipment tile describes a single option of a vehicle, e.g. within a configurator of porsche.com. A photograph of the option fills one half of the tile, its name and description the other, and a button at the bottom offers the one action the option has. The tile is not a link: unlike the other tiles of this collection it carries an action of its own rather than opening a page of its own.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – an equipment option of a vehicle, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        The radius of the panel plus the padding around it make the radius of the tile, so the two curves stay parallel.
      </Comment>
      <Comment>
        The height comes from the text rather than from a ratio of the tile, so a description longer than the photograph
        is tall makes the tile taller instead of running out of it.
      </Comment>
      <div class="col-basic flex flex-col gap-static-sm rounded-3xl bg-surface p-static-sm sm:flex-row">
        <Comment>The photograph is cropped to the panel, so it follows its corners.</Comment>
        <Comment>
          Its ratio holds only while it is stacked, where nothing else gives it a height. Beside the text the row is as
          tall as the text, and a ratio would make the panel compute its width from that height and push the text out of
          the tile.
        </Comment>
        <div class="aspect-[800/643] grow overflow-clip rounded-2xl sm:aspect-auto sm:min-w-0">
          <Comment>Decorative, since the heading beside it names the option.</Comment>
          <img
            class="size-full object-cover"
            src="/examples/media/anniversary-leather-seat.webp"
            alt=""
            width="950"
            height="643"
          />
        </div>

        <Comment>
          The text stacks above the photograph on a phone, takes half the tile from the medium breakpoint and the share
          of the design from the large one – at half the tile a share that small would leave a few words per line. Its
          action sits at the lower edge, however short the description is.
        </Comment>
        <div class="flex shrink-0 flex-col justify-between gap-fluid-md p-fluid-md sm:w-1/2 lg:w-[32%]">
          <div class="flex flex-col gap-static-md">
            <p-heading tag="h2" size="sm">
              Perforated Nappa Leather
            </p-heading>
            <p-text color="contrast-medium">
              The seats combine luxurious comfort with sporty precision. Designed for long-distance relaxation and
              dynamic driving support, they feature ergonomic contours, premium materials, and meticulous craftsmanship.
            </p-text>
          </div>
          <Comment>
            The one action of the option, and the only interactive element of the tile – which is why nothing spans the
            tile the way a covering link would.
          </Comment>
          <p-button class="self-start" type="button" variant="secondary" compact={true}>
            Available as Update
          </p-button>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
