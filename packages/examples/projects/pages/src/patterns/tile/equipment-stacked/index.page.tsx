import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { EquipmentTile } from '../../../_partials/tile/EquipmentTile.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Equipment Stacked',
  description:
    'The equipment tile with its two panels stacked rather than beside one another, e.g. within a column too narrow for the two halves. The photograph takes the upper panel and the text the lower one, and this version carries no action: it describes an equipment option a reader cannot act on here. Like the tile it varies, it frames both panels rather than letting the photograph reach the edges.',
  colorSchemes: ['light', 'dark'],
};

/**
 * Tile pattern – an equipment option with its panels stacked, built with HTML and Tailwind CSS.
 *
 * The page places the tile and gives it its content. Its markup comes from the partial, with the comments on why it
 * is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <EquipmentTile
        variant="stacked"
        class="col-basic justify-self-center w-full max-w-[560px]"
        heading="Burmester® High-End Surround Sound.¹"
        text="Twenty-one loudspeakers, each driven by its own amplifier channel, are placed and tuned to the acoustics of this interior. The result is a sound image that stays precise at every speed, from the first row to the last."
        note="¹Optionally available at extra cost."
        image={{
          src: '/examples/media/burmester-speaker.webp',
          alt: 'Perforated metal cover of a Burmester loudspeaker in a door panel trimmed in brown leather',
          width: 1696,
          height: 754,
        }}
      />
    </main>
  </PatternPage>
);

export default Page;
