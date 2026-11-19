import type { ComponentChildren } from 'preact';
import { Comment } from '../Comment.tsx';
import { tileComments } from './comments.ts';
import { joinClasses, type TileHeadingTag, type TileProps } from './tile.ts';

type CategoryTileProps = TileProps & {
  /** The category, which names the tile and its link. */
  heading: string;
  tag?: TileHeadingTag;
  href: string;
  /** The distance between the heading and the image, as padding of the room the image is clipped to. */
  mediaPadding?: string;
  /** The image of the category with the comments on how it is fitted – a `TileImage`, so it zooms on hover. */
  children: ComponentChildren;
};

/**
 * A category of a shop: the heading and an icon-only link covering the tile at the top, the product below them.
 *
 * How the product is fitted differs with the product and the room the tile has, so the image is passed in rather than
 * described by props.
 */
export const CategoryTile = ({
  as: Root = 'div',
  class: placement,
  aspect = 'aspect-3/4',
  heading,
  tag = 'h2',
  href,
  mediaPadding,
  children,
}: CategoryTileProps) => (
  <>
    <Comment>{tileComments.coverTile}</Comment>
    <Comment>{tileComments.ownHeight}</Comment>
    <Root
      class={joinClasses(
        placement,
        'self-start group relative isolate flex flex-col',
        aspect,
        'rounded-3xl bg-surface pt-fluid-md [--p-link-cover-radius:var(--radius-3xl)]'
      )}
    >
      <div class="flex flex-wrap items-center gap-fluid-sm px-fluid-md">
        <p-heading tag={tag} size="md">
          {heading}
        </p-heading>
        <Comment>{tileComments.coverLink}</Comment>
        <p-link class="ms-auto" variant="secondary" icon="arrow-up-right" hide-label="true" compact="true" cover={true}>
          <a href={href}>{heading}</a>
        </p-link>
      </div>
      <Comment>{tileComments.fill}</Comment>
      <Comment>{tileComments.clip}</Comment>
      {mediaPadding && <Comment>{tileComments.mediaPadding}</Comment>}
      <div class={joinClasses('flex-1 min-h-0 overflow-clip rounded-b-[inherit]', mediaPadding)}>{children}</div>
    </Root>
  </>
);
