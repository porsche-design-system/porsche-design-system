import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { EquipmentTile } from '../../../_partials/tile/EquipmentTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Equipment',
  description:
    'An equipment tile describes a single option of a vehicle, shown here the way it occurs: as a list of options, e.g. within a configurator of porsche.com. It comes in two variants. In the first the photograph of the option stands beside its name and description once the tile is wide enough, and a button at the bottom offers the one action the option has. In the second the two panels stay stacked, for a column too narrow for the two halves, and a note can qualify the description. The tile is not a link: unlike the other tiles of this collection it carries an action of its own, or only describes, rather than opening a page of its own.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – the equipment options of a vehicle, built with HTML and Tailwind CSS.
 *
 * The page lists the tiles and gives them their content, one in each variant of the tile and one more to fill the
 * row. Their markup comes from the partial, with the comments on why it is built the way it is, since they reach the
 * code a consumer copies – once, where a reason first applies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        A list, so that how many options there are is announced before the first of them is read, and so that they can
        be stepped through as a set.
      </Comment>
      <Comment>
        One option per row in a narrow list, two from a list of 42rem on. What decides is the width of this wrapper
        rather than the one of the window, so the list fits the column it is placed in.
      </Comment>
      <div class="col-basic @container">
        <ul class="grid gap-fluid-md @2xl:grid-cols-2">
          <Comment>
            The first option takes a row of its own, which gives its photograph the room to stand beside its text.
          </Comment>
          <EquipmentTile
            as="li"
            class="col-span-full"
            heading="Perforated Nappa Leather"
            text="The seats combine luxurious comfort with sporty precision. Designed for long-distance relaxation and dynamic driving support, they feature ergonomic contours, premium materials, and meticulous craftsmanship."
            action="Available as Update"
            image={{ src: '/examples/media/anniversary-leather-seat.webp', width: 800, height: 640 }}
          />
          <EquipmentTile
            as="li"
            variant="stacked"
            heading="Burmester® High-End Surround Sound.¹"
            text="Twenty-one loudspeakers, each driven by its own amplifier channel, are placed and tuned to the acoustics of this interior. The result is a sound image that stays precise at every speed, from the first row to the last."
            note="¹Optionally available at extra cost."
            image={{ src: '/examples/media/burmester-speaker.webp', width: 1696, height: 754 }}
          />
          <EquipmentTile
            as="li"
            variant="stacked"
            heading="HD-Matrix LED main headlights."
            text="More than 32,000 pixels per headlight are controlled one by one. They light the road far ahead and leave out oncoming traffic, so the high beam can stay on."
            image={{ src: '/examples/media/pm-xsell-led.webp', width: 594, height: 456 }}
          />
        </ul>
      </div>
    </main>
  </PatternPage>
);

export default Page;
