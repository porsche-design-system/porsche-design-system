import { Fragment } from 'preact';
import { Comment } from '../Comment.tsx';
import { CoverImage } from './blocks/CoverImage.tsx';
import { Gradient } from './blocks/Gradient.tsx';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TileProps } from './blocks/shared.ts';
import { tileComments } from './comments.ts';

type SupportWay = {
  /** The way to reach a person, which names its tile and its link. */
  heading: string;
  text: string;
  href: string;
};

type SupportTileProps = TileProps & {
  heading: string;
  tag?: TileHeadingTag;
  text: string;
  /** The mood image, decorative. */
  image: TileImageSource;
  /** The ways to reach a person, each a smaller tile of its own – three of them share a row. */
  ways: SupportWay[];
  /** The level of the headings of the smaller tiles, one below the heading of the tile. */
  wayTag?: TileHeadingTag;
};

/**
 * A tile holding smaller ones: a mood image covers it, and in front of it each smaller tile opens one way to reach a
 * person. The tile itself is no link, since a link may not contain another.
 */
export const SupportTile = ({
  as: Root = 'div',
  class: placement,
  aspect = 'aspect-16/9',
  heading,
  tag = 'h2',
  text,
  image,
  ways,
  wayTag = 'h3',
}: SupportTileProps) => (
  <>
    <Comment>
      The tile is no link of its own: it holds three, and a link may not contain another. Its heading introduces them
      rather than naming a destination.
    </Comment>
    <Comment>{tileComments.darkScheme}</Comment>
    <Comment>
      The tile does not clip, so the focus indicators of the links inside it stay whole. The image and the gradient
      follow its corners themselves.
    </Comment>
    <Comment>{tileComments.ownHeight}</Comment>
    <Root
      class={joinClasses(
        placement,
        'self-start @container relative isolate grid',
        aspect,
        'rounded-3xl scheme-only-dark'
      )}
    >
      <CoverImage {...image} />
      <Gradient class="grid justify-items-center gap-fluid-md px-fluid-lg pt-fluid-2xl pb-fluid-lg">
        <div class="grid justify-items-center gap-static-sm">
          <p-heading tag={tag} size="xl" align="center">
            {heading}
          </p-heading>
          <p-text align="center" color="contrast-medium">
            {text}
          </p-text>
        </div>
        <Comment>
          A list, so that how many ways there are is announced before the first of them is read, and so that they can be
          stepped through as a set.
        </Comment>
        <Comment>
          One below the other until the tile is 64rem wide, where three of them still leave each one room for a line of
          text. What decides is the width of the tile rather than the one of the window, so it fits the column it is
          placed in.
        </Comment>
        <ul class="grid w-full grid-cols-1 gap-fluid-md @5xl:grid-cols-3">
          {ways.map((way, index) => (
            <Fragment key={way.heading}>
              <Comment>{tileComments.coverTile}</Comment>
              {index === 0 && (
                <>
                  <Comment>
                    The frosted background lets the image through and blurs what lies behind it, which keeps the text
                    legible without hiding the photograph.
                  </Comment>
                  <Comment>
                    Beside the text while the tile is wide enough for both, and above it once that would leave a few
                    words per line. What decides is the width of the tile rather than the one of the window, since three
                    of them share a row.
                  </Comment>
                </>
              )}
              <li class="@container relative isolate rounded-2xl bg-frosted backdrop-blur-frosted p-fluid-md motion-safe:transition-colors duration-sm ease-in-out hover:bg-frosted-soft [--p-link-cover-radius:var(--radius-2xl)]">
                <div class="flex flex-col gap-static-md @2xs:flex-row-reverse @2xs:items-center">
                  <Comment>{tileComments.coverLink}</Comment>
                  <p-link
                    class="self-end @2xs:self-auto"
                    variant="secondary"
                    icon="arrow-up-right"
                    hide-label="true"
                    compact="true"
                    cover={true}
                  >
                    <a href={way.href}>{way.heading}</a>
                  </p-link>
                  <div class="grid grow gap-static-xs">
                    <p-heading tag={wayTag} size="sm">
                      {way.heading}
                    </p-heading>
                    <p-text size="xs" color="contrast-medium">
                      {way.text}
                    </p-text>
                  </div>
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      </Gradient>
    </Root>
  </>
);
