import { Comment } from '../Comment.tsx';
import { tileComments } from './blocks/comments.ts';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TilePlacement } from './blocks/shared.ts';

type VehicleFigure = { value: string; term: string };

/** A figure of the vehicle, with the term it belongs to. */
const Figure = ({ value, term }: VehicleFigure) => (
  // Reversed, so that the term still comes first in the markup. Packed to the end of that axis, which is the top, so
  // that the figures of a row align however long their terms are.
  <div class="flex flex-col-reverse justify-end">
    <dt>
      <p-text tag="span" size="xs" color="contrast-medium">
        {term}
      </p-text>
    </dt>
    <dd>
      <p-text tag="span" size="md">
        {value}
      </p-text>
    </dd>
  </div>
);

type VehicleListingTileProps = TilePlacement & {
  /** The vehicle, which heads the tile and names its links for screen readers. */
  model: string;
  tag?: TileHeadingTag;
  /** The line below the heading, which the popover explains. */
  price: string;
  /** The financing example next to the price, kept together with the popover so neither strands alone when the line wraps. */
  financing: string;
  /** What the popover says about the price. */
  priceInfo: string;
  /** The model year, set apart from the other properties. */
  year: string;
  /** What else describes the vehicle at a glance, e.g. its drive. */
  properties: string[];
  /** The figures of the vehicle, two in a row. */
  figures: VehicleFigure[];
  /** The legal information on consumption and emissions the tile closes with. */
  consumption: string;
  /** The vehicle in side view, cut out – decorative, since the tile names the model. */
  image: TileImageSource;
  /** Where the three links of the tile lead. */
  links: { technicalData: string; discover: string; configure: string };
};

/**
 * A vehicle of a search result: the vehicle above its name, its price, its properties, its figures and its actions.
 *
 * The tile carries several controls of its own, so it is no link as a whole. It is sized by its content, so it takes
 * no aspect ratio, and it has the canvas color, so it belongs on a page or a section with the surface color.
 */
export const VehicleListingTile = ({
  as: Root = 'div',
  class: placement,
  model,
  tag = 'h2',
  price,
  financing,
  priceInfo,
  year,
  properties,
  figures,
  consumption,
  image,
  links,
}: VehicleListingTileProps) => (
  <>
    <Comment>
      No link covers the tile: it would lie over its four controls. The heading names the vehicle, the actions open it.
    </Comment>
    <Root class={joinClasses(placement, 'grid gap-fluid-md rounded-3xl bg-canvas p-fluid-md')}>
      <Comment>
        The image and the model block share a fixed gap of their own, independent of the fluid gap between the rows
        below – the viewport-driven range of that gap would otherwise read as either too tight or too loose here.
      </Comment>
      <div class="grid gap-static-lg">
        <Comment>{tileComments.modelImage}</Comment>
        <Comment>Cut out against the tile, so no box has to be clipped around it.</Comment>
        <Comment>{tileComments.vehicleWidth}</Comment>
        <img
          class="justify-self-center w-11/12 mt-static-md"
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
        />
        <div class="grid gap-fluid-sm">
          <div class="grid gap-static-xs">
            <p-heading tag={tag} size="lg">
              {model}
            </p-heading>
            <Comment>The popover sits in the line it explains, so it is reached right after the price.</Comment>
            <Comment>
              Two groups rather than one run of text: each stays whole, so the line only ever wraps between them – never
              inside the financing example, and never between it and the popover that belongs to it.
            </Comment>
            <p-text color="contrast-low">
              <span class="whitespace-nowrap">{price} |</span>{' '}
              <span class="inline-flex items-center gap-static-xs whitespace-nowrap">
                {financing}
                <p-popover aria="{ 'aria-label': 'More information about the price' }">{priceInfo}</p-popover>
              </span>
            </p-text>
          </div>
          <Comment>A list, so the number of properties is announced before the first is read.</Comment>
          <ul class="flex flex-wrap gap-static-xs">
            <li>
              <p-tag variant="primary" compact={true}>
                {year}
              </p-tag>
            </li>
            {properties.map((property) => (
              <li key={property}>
                <p-tag compact={true}>{property}</p-tag>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Comment>
        A description list, so that every value is read with its term. The term comes first in the markup and is shown
        below its value.
      </Comment>
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-static-md">
        {figures.map((figure) => (
          <Figure key={figure.term} {...figure} />
        ))}
      </dl>
      <Comment>
        The three links each name the vehicle for screen readers, since a result list repeats these labels on every
        tile.
      </Comment>
      <Comment>
        One below the other at any width: side by side, the first would look like the lesser half of the second.
      </Comment>
      <div class="grid gap-static-md">
        <p-link-pure class="justify-self-center" icon="none" underline={true}>
          <a href={links.technicalData} aria-label={`Technical data and standard equipment of the ${model}`}>
            Technical data and standard equipment
          </a>
        </p-link-pure>
        <Comment>The two actions share a tighter gap of their own, apart from the link above them.</Comment>
        <div class="grid gap-static-sm">
          <p-link variant="primary">
            <a href={links.discover} aria-label={`Discover the ${model}`}>
              Discover
            </a>
          </p-link>
          <p-link variant="secondary">
            <a href={links.configure} aria-label={`Configure the ${model}`}>
              Configure
            </a>
          </p-link>
        </div>
      </div>
      <p-text size="2xs" color="contrast-medium" align="center">
        {consumption}
      </p-text>
    </Root>
  </>
);
