import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { EquipmentTile } from '../../../_partials/tile/EquipmentTile.tsx';

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
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <EquipmentTile
        class="col-basic"
        heading="Perforated Nappa Leather"
        text="The seats combine luxurious comfort with sporty precision. Designed for long-distance relaxation and dynamic driving support, they feature ergonomic contours, premium materials, and meticulous craftsmanship."
        action="Available as Update"
        image={{
          src: '/examples/media/anniversary-leather-seat.webp',
          alt: 'Backrest of a seat in cream leather with brown bolsters and an embossed Porsche lettering',
          width: 800,
          height: 640,
        }}
      />
    </main>
  </PatternPage>
);

export default Page;
