import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';

const label = 'Weekender – Porsche Design Travel Collection';

/** A color of the product, as a native radio button – selectable by mouse and keyboard without any script. */
const Swatch = ({ color, swatchClass, checked = false }: { color: string; swatchClass: string; checked?: boolean }) => (
  <input
    class={`${swatchClass} appearance-none size-6 p-static-xs bg-clip-content rounded-full border border-transparent cursor-pointer motion-safe:transition-colors duration-sm ease-in-out hover:not-checked:border-contrast-medium checked:border-primary forced-colors:checked:bg-[SelectedItem] outline-1 outline-contrast-low -outline-offset-5 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2`}
    type="radio"
    name="product-color"
    value={color.toLowerCase()}
    aria-label={color}
    checked={checked}
  />
);

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Tile: Product',
  description:
    'A product tile links to the detail page of a product, e.g. within a product list of the Porsche Shop. It shows a tag and a button to add the product to the wishlist, the product image, the available colors, the name and the price. A link stretched over the tile, labelled with the product name for screen readers, makes it clickable as a whole, while the wishlist button and the color swatches stay independent actions above it. On hover, the image zooms in, unless the user prefers reduced motion.',
};

/**
 * Tile pattern – a product of a list, built with HTML and Tailwind CSS instead of `p-tile`.
 *
 * The anchor spans the tile via `absolute inset-0` and lies above the content via `z-1`; the wishlist button and the
 * color swatches are placed above it via `relative z-2`, so they stay clickable. `p-static-xs -m-static-xs` enlarges
 * the target size of the button without changing its position. The image takes the height that is left via
 * `grow basis-0 min-h-0` and `object-contain`, without increasing the height of the tile.
 *
 * The swatches are styled via `appearance-none` and the `checked:`, `hover:` and `focus-visible:` variants. A
 * transparent border and padding together with `bg-clip-content` provide a target size of 24px while showing a 14px
 * swatch. A contour directly around the color – an outline drawn inwards by border and padding, `-outline-offset-5` –
 * keeps a dark color distinguishable from a dark surface. High contrast mode replaces the colors of the swatches, so
 * `forced-colors:checked:` fills the chosen one with the system color of a selection instead.
 *
 * The page follows the color scheme of the user via `scheme-light-dark`, and so does the tile: its media are photos
 * filling their area or cut-outs on a transparent background, which work on a light and a dark surface alike.
 */
const Page = () => (
  <PatternPage meta={meta} class="scheme-light-dark">
    <main id="main" class="grid-template content-center min-h-dvh py-fluid-lg">
      <div class="col-basic justify-self-center w-full max-w-[400px] group relative isolate flex flex-col gap-fluid-sm aspect-3/4 rounded-3xl bg-surface p-fluid-md">
        <a href="#" class="absolute inset-0 z-1 rounded-[inherit] focus-visible:outline outline-focus outline-offset-2">
          <span class="sr-only">{label}</span>
        </a>
        <div class="flex flex-wrap items-center gap-fluid-sm">
          <p-tag variant="secondary">New</p-tag>
          <p-button-pure
            class="ms-auto relative z-2 p-static-xs -m-static-xs"
            type="button"
            icon="heart"
            hide-label="true"
          >
            Add to wishlist
          </p-button-pure>
        </div>
        <img
          class="grow basis-0 min-h-0 w-full object-contain motion-safe:transition-[scale] duration-md ease-in-out motion-safe:group-hover:scale-105"
          src="/examples/media/weekender.webp"
          alt=""
          width="960"
          height="1080"
        />
        <div class="flex flex-col items-center gap-static-xs text-center">
          <div class="relative z-2 flex gap-static-2xs" role="radiogroup" aria-label="Color">
            <Swatch color="Grey" swatchClass="bg-[#4b4b4d]" checked />
            <Swatch color="Cognac" swatchClass="bg-[#9a6a44]" />
          </div>
          <p-text class="line-clamp-2" align="center">
            {label}
          </p-text>
          <p-text color="contrast-medium" align="center">
            1.100,00 €
          </p-text>
        </div>
      </div>
    </main>
  </PatternPage>
);

export default Page;
