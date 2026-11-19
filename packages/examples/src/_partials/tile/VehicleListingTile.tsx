import { Comment } from '../Comment.tsx';
import { tileComments } from './blocks/comments.ts';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TilePlacement } from './blocks/shared.ts';

type VehicleFigure = { value: string; term: string };

/** A figure of the vehicle, with the term it belongs to. */
const Figure = ({ value, term }: VehicleFigure) => (
  // Reversed, so that the term still comes first in the markup. Packed to the end of that axis, which is the top, so
  // that the figures of a row align however long their terms are.
  <div class="flex flex-col-reverse justify-end gap-static-xs">
    <p-text size="xs" color="contrast-medium">
      {term}
    </p-text>
    <p-text size="md" weight="semibold">
      {value}
    </p-text>
  </div>
);

type VehicleListingTileProps = TilePlacement & {
  /** The vehicle, which heads the tile and names its links for screen readers. */
  model: string;
  tag?: TileHeadingTag;
  /** The line below the heading, which the popover explains. */
  price: string;
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
      The tile is no link of its own. It carries four controls – the popover, the technical data and the two actions –
      and a link covering the tile would lie over all of them. The heading names the vehicle, the actions open it.
    </Comment>
    <Root class={joinClasses(placement, 'grid gap-fluid-md rounded-3xl bg-canvas p-fluid-md')}>
      <Comment>{tileComments.modelImage}</Comment>
      <Comment>Cut out against the tile, so no box has to be clipped around it.</Comment>
      <Comment>Its width is a share of the tile, so the vehicle keeps its scale at every size.</Comment>
      <img class="justify-self-center w-4/5" src={image.src} alt="" width={image.width} height={image.height} />
      <div class="grid gap-fluid-sm">
        <div class="grid gap-static-xs">
          <p-heading tag={tag} size="lg">
            {model}
          </p-heading>
          <Comment>
            The popover sits in the line it explains, so that it is reached right after the price rather than at the end
            of the tile.
          </Comment>
          <p-text color="contrast-medium">
            {price}
            {'\u00a0'}
            <p-popover aria="{ 'aria-label': 'More information about the price' }">{priceInfo}</p-popover>
          </p-text>
        </div>
        <Comment>
          A list, so that how many properties describe the vehicle is announced before the first of them is read.
        </Comment>
        <ul class="flex flex-wrap gap-static-xs">
          <li>
            <p-tag variant="primary">{year}</p-tag>
          </li>
          {properties.map((property) => (
            <li key={property}>
              <p-tag>{property}</p-tag>
            </li>
          ))}
        </ul>
      </div>
      <div class="grid grid-cols-2 gap-fluid-md">
        {figures.map((figure) => (
          <Figure key={figure.term} {...figure} />
        ))}
      </div>
      <Comment>
        The three links each name the vehicle for screen readers, since a result list repeats these labels on every
        tile.
      </Comment>
      <Comment>
        One action below the other, whatever the width: they are of equal weight to the reader, and a row would make the
        first look like the lesser half of the second.
      </Comment>
      <div class="grid gap-static-md">
        <p-link-pure class="justify-self-center" icon="none" underline={true}>
          <a href={links.technicalData} aria-label={`Technical data and standard equipment of the ${model}`}>
            Technical data and standard equipment
          </a>
        </p-link-pure>
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
      <p-text size="2xs" color="contrast-medium" align="center">
        {consumption}
      </p-text>
    </Root>
  </>
);
