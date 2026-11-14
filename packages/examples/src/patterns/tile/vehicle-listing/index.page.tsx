import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { Comment } from '../../../_partials/Comment.tsx';
import { tileComments } from '../../../_partials/tile/comments.ts';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Vehicle Listing',
  description:
    'A vehicle listing presents a single vehicle in a search result, e.g. of the Porsche Finder, with the vehicle cut out above its details. The tile adapts its height to the content. It carries several controls of its own – a popover explaining the price, a link to the technical data and the two actions, one below the other – so it is no link as a whole: a link covering the tile would lie over all of them. On hover the vehicle zooms in, unless the user prefers reduced motion.',
  colorSchemes: ['light', 'dark'],
};

/** A figure of the vehicle, with the term it belongs to. */
const Figure = ({ value, children }: { value: string; children: string }) => (
  // Reversed, so that the term still comes first in the markup. Packed to the end of that axis, which is the top, so
  // that the figures of a row align however long their terms are.
  <div class="flex flex-col-reverse justify-end gap-static-xs">
    <dt class="text-xs text-contrast-medium">{children}</dt>
    <dd class="m-0 text-md font-semibold">{value}</dd>
  </div>
);

/**
 * Tile pattern – a vehicle of a search result, built with HTML and Tailwind CSS.
 *
 * The comments in the markup say why it is built the way it is, since they reach the code a consumer copies.
 */
const Page = () => (
  <PatternPage meta={meta} background="surface" centered>
    <main id="main" class="grid-template py-fluid-lg">
      <Comment>
        The tile is no link of its own. It carries four controls – the popover, the technical data and the two actions –
        and a link covering the tile would lie over all of them. The heading names the vehicle, the actions open it.
      </Comment>
      <div class="col-basic justify-self-center w-full max-w-[400px] group flex flex-col gap-fluid-md rounded-3xl bg-canvas p-fluid-md">
        <Comment>Cut out against the tile, so no box has to be clipped around it.</Comment>
        <Comment>{tileComments.zoom}</Comment>
        <img
          class="w-full motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
          src="/examples/media/718-side-view.webp"
          alt=""
          width="776"
          height="276"
        />
        <div class="flex flex-col gap-fluid-sm">
          <div class="flex flex-col gap-static-xs">
            <p-heading tag="h2" size="lg">
              718 Cayman GTS 4.0
            </p-heading>
            <Comment>
              The popover sits in the line it explains, so that it is reached right after the price rather than at the
              end of the tile.
            </Comment>
            <p class="m-0 text-xs text-contrast-medium">
              From €103,500.00 incl. VAT or e.g. €1,256.94 /{' '}
              <span class="whitespace-nowrap">
                month{' '}
                <p-popover
                  class="inline-block align-middle"
                  aria="{ 'aria-label': 'More information about the price' }"
                >
                  The price includes VAT and country-specific equipment. The rate is an example and depends on the term,
                  the deposit and the final instalment.
                </p-popover>
              </span>
            </p>
          </div>

          <Comment>
            A list, so that how many properties describe the vehicle is announced before the first of them is read.
          </Comment>
          <ul class="flex flex-wrap gap-static-xs list-none m-0 p-0">
            <li>
              <p-tag variant="primary">2027</p-tag>
            </li>
            <li>
              <p-tag>Petrol</p-tag>
            </li>
            <li>
              <p-tag>Rear-wheel drive</p-tag>
            </li>
            <li>
              <p-tag>Manual</p-tag>
            </li>
          </ul>
        </div>

        <Comment>
          A description list, so that each figure stays tied to the term it belongs to rather than being read as a loose
          number.
        </Comment>
        <dl class="grid grid-cols-2 gap-fluid-md m-0">
          <Figure value="4.5 s">Acceleration 0 - 100 km/h with Launch Control</Figure>
          <Figure value="294 kW / 400 PS">Power up to (kW) / Power up to (PS)</Figure>
          <Figure value="293 km/h">Top speed</Figure>
          <Figure value="10.9 l/100 km">Fuel consumption combined (WLTP)</Figure>
        </dl>

        <Comment>
          The three links each name the vehicle for screen readers, since a result list repeats these labels on every
          tile.
        </Comment>
        <Comment>
          One action below the other, whatever the width: they are of equal weight to the reader, and a row would make
          the first look like the lesser half of the second.
        </Comment>
        <div class="flex flex-col gap-static-md">
          <p-link-pure class="self-center" icon="none" underline={true}>
            <a href="#" aria-label="Technical data and standard equipment of the 718 Cayman GTS 4.0">
              Technical data and standard equipment
            </a>
          </p-link-pure>
          <p-link class="block" variant="primary">
            <a href="#" aria-label="Discover the 718 Cayman GTS 4.0">
              Discover
            </a>
          </p-link>
          <p-link class="block" variant="secondary">
            <a href="#" aria-label="Configure the 718 Cayman GTS 4.0">
              Configure
            </a>
          </p-link>
        </div>

        <p-text size="2xs" color="contrast-medium" align="center">
          Fuel consumption combined (WLTP): 10.9 l/100 km, CO₂ emissions combined (WLTP): 247 g/km, CO₂ class: G
        </p-text>
      </div>
    </main>
  </PatternPage>
);

export default Page;
