import { Comment } from '../Comment.tsx';
import { Anchor } from './blocks/Anchor.tsx';
import { tileComments } from './blocks/comments.ts';
import { joinClasses, type TileImageSource, type TileProps } from './blocks/shared.ts';
import { ZoomImage } from './blocks/ZoomImage.tsx';

type ProductColor = {
  /** The name of the color, its accessible name. */
  label: string;
  /** The background utility of the swatch, written out so Tailwind finds it. */
  class: string;
};

type SwatchProps = ProductColor & { group: string; checked: boolean };

/** A color of the product, as a native radio button – selectable by mouse and keyboard without any script. */
const Swatch = ({ label, class: color, group, checked }: SwatchProps) => (
  <input
    class={`${color} appearance-none size-6 p-static-xs bg-clip-content rounded-full border border-transparent cursor-pointer motion-safe:transition-colors duration-sm ease-in-out hover:not-checked:border-contrast-medium checked:border-primary forced-colors:checked:bg-[SelectedItem] outline-1 outline-contrast-low -outline-offset-5 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2`}
    type="radio"
    name={group}
    value={label.toLowerCase()}
    aria-label={label}
    checked={checked}
  />
);

type ProductTileProps = TileProps & {
  /** The name of the product, shown below its image and naming the link of the tile. */
  name: string;
  href: string;
  price: string;
  /** What sets the product apart in its list, e.g. that it is new. */
  tagLabel?: string;
  /** The product, cut out – decorative, since the tile names it. */
  image: TileImageSource;
  /** The colors the product comes in, the first of them chosen. */
  colors: ProductColor[];
  /** The name of the radio buttons of the colors. It groups them, so it has to differ for every product of a page. */
  colorGroup: string;
};

/**
 * A product of a list: a tag and the wishlist button, the product, its colors, its name and its price.
 *
 * A link spanning the tile opens the product, while the wishlist button and the colors stay actions of their own.
 */
export const ProductTile = ({
  as: Root = 'div',
  class: placement,
  aspect = 'aspect-3/4',
  name,
  href,
  price,
  tagLabel,
  image,
  colors,
  colorGroup,
}: ProductTileProps) => (
  <>
    <Comment>{tileComments.anchorTile}</Comment>
    <Comment>{tileComments.ownHeight}</Comment>
    <Root
      class={joinClasses(
        placement,
        'self-start group relative isolate flex flex-col gap-fluid-sm',
        aspect,
        'rounded-3xl bg-surface p-fluid-md'
      )}
    >
      <Anchor href={href} label={name} />
      <div class="flex flex-wrap items-center gap-fluid-sm">
        {tagLabel && <p-tag variant="secondary">{tagLabel}</p-tag>}
        <Comment>{tileComments.action}</Comment>
        <Comment>
          Its padding enlarges the target size, and makes it as tall as a tag, so it sits at the same height in a list
          whether a product has a tag or not. The negative margin keeps the icon on the edge of the content.
        </Comment>
        <p-button-pure
          class="ms-auto relative z-2 p-static-xs -me-static-xs"
          type="button"
          icon="heart"
          hide-label="true"
        >
          Add to wishlist
        </p-button-pure>
      </div>
      <Comment>Decorative, since the link spanning the tile and the text below it already name the product.</Comment>
      <Comment>{tileComments.fill}</Comment>
      <ZoomImage class="flex-1 min-h-0 object-contain" alt="" {...image} />
      <div class="grid justify-items-center gap-static-xs">
        <Comment>
          Like the wishlist button, the colors stay actions of their own above the link spanning the tile. They are
          native radio buttons, selectable by mouse and keyboard without any script. Each provides a target size of 24
          pixels around its swatch and a contour that keeps a dark color apart from a dark surface. High contrast mode
          replaces the colors, so the chosen swatch is filled with the system color of a selection.
        </Comment>
        <div class="relative z-2 flex gap-static-2xs" role="radiogroup" aria-label="Color">
          {colors.map((color, index) => (
            <Swatch key={color.label} {...color} group={colorGroup} checked={index === 0} />
          ))}
        </div>
        <p-text class="line-clamp-2" align="center">
          {name}
        </p-text>
        <p-text color="contrast-medium" align="center">
          {price}
        </p-text>
      </div>
    </Root>
  </>
);
