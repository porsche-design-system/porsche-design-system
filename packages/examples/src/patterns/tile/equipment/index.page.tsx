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
        The photograph sets the height of the tile, and a description longer than it makes the tile taller still rather
        than running out of it.
      </Comment>
      <div class="col-basic flex flex-col gap-static-sm rounded-3xl bg-surface p-static-sm sm:flex-row sm:gap-0">
        <Comment>The photograph is cropped to the panel, so it follows its corners.</Comment>
        <Comment>
          The ratio sits on the photograph rather than on the panel, so it gives the row its height while a longer
          description can still make the panel taller. On the panel it would set the height once and leave empty space
          under the photograph.
        </Comment>
        <Comment>Nothing separates the two panels but the padding of the text, as in the design.</Comment>
        <div class="shrink-0 overflow-clip rounded-2xl sm:w-1/2 md:w-[67.6%]">
          <Comment>Decorative, since the heading beside it names the option.</Comment>
          <img
            class="aspect-[800/643] size-full object-cover"
            src="/examples/media/anniversary-leather-seat.webp"
            alt=""
            width="950"
            height="643"
          />
        </div>

        <Comment>
          The text stacks above the photograph on a phone, halves the tile with it from the medium breakpoint and takes
          the third of the design from the one above – at half the tile a third would leave a few words per line. Its
          action sits at the lower edge, however short the description is.
        </Comment>
        <div class="flex grow flex-col justify-between gap-fluid-md p-fluid-md">
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
