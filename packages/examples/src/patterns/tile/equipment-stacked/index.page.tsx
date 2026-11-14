import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';

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
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        The radius of the panel plus the padding around it make the radius of the tile, so the two curves stay parallel.
        Nothing in the tile is interactive, so no focus indicator has to stay outside the frame.
      </Comment>
      <div class="col-basic justify-self-center w-full max-w-[560px] flex flex-col gap-static-sm rounded-3xl bg-surface p-static-sm">
        <Comment>The photograph is cropped to the panel, so it follows its corners.</Comment>
        <div class="aspect-[848/382] overflow-clip rounded-2xl">
          <img
            class="size-full object-cover"
            src="/examples/media/burmester-speaker.webp"
            alt="A Burmester speaker in the door panel of a Porsche"
            width="1696"
            height="764"
          />
        </div>

        <div class="flex flex-col gap-static-md p-fluid-md">
          <p-heading tag="h2" size="lg">
            Burmester® High-End Surround Sound.¹
          </p-heading>
          <p-text size="sm" color="contrast-medium">
            Twenty-one loudspeakers, each driven by its own amplifier channel, are placed and tuned to the acoustics of
            this interior. The result is a sound image that stays precise at every speed, from the first row to the
            last.
          </p-text>
          <Comment>The marker ties the note to the claim it qualifies, so it is read in context.</Comment>
          <p-text class="mt-fluid-sm" size="2xs" color="contrast-medium">
            ¹Optionally available at extra cost.
          </p-text>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
