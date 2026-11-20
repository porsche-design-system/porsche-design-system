import { Comment } from '../Comment.tsx';
import { Script } from '../Script.tsx';
import { tileComments } from './blocks/comments.ts';
import { GradientMedia } from './blocks/GradientMedia.tsx';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TileProps } from './blocks/shared.ts';

type DisclosureTileProps = TileProps & {
  /** The subject of the tile, which is the summary of its accordion. */
  heading: string;
  tag?: TileHeadingTag;
  /** The details the tile reveals on demand. */
  text: string;
  /** What qualifies the heading or the text, e.g. the note a marker refers to. */
  note?: string;
  /** The mood image, decorative. */
  image: TileImageSource;
};

/**
 * A subject with details on demand: a mood image covers the tile, the heading is the summary of an accordion – with
 * the script that keeps the accordion and the tile in the state it asks for.
 *
 * The tile opens nothing, so it is no link. The ids the script looks up stay in this file, and make it one disclosure
 * tile per page.
 */
export const DisclosureTile = ({
  as: Root = 'div',
  class: placement,
  aspect = 'aspect-4/3',
  heading,
  tag = 'h2',
  text,
  note,
  image,
}: DisclosureTileProps) => (
  <>
    <Comment>The aspect ratio is a preferred size only: expanded details extend the tile beyond it.</Comment>
    <Comment>{tileComments.darkScheme}</Comment>
    <Comment>{tileComments.ownHeight}</Comment>
    <Root
      id="disclosure-tile"
      class={joinClasses(
        placement,
        'self-start group relative isolate grid grid-rows-[minmax(0,1fr)_auto]',
        aspect,
        'rounded-3xl scheme-only-dark'
      )}
    >
      <GradientMedia clip="Clips the image and its gradient to the corners. The tile itself does not clip, since that would keep expanded details from extending it.">
        <Comment>{tileComments.moodImage}</Comment>
        <Comment>
          Dimmed while the details are expanded, so the attention rests on them rather than on the mood of the tile.
        </Comment>
        <img
          class="absolute inset-0 size-full object-cover motion-safe:transition-[filter] duration-md ease-in-out group-data-[open]:brightness-50"
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
        />
      </GradientMedia>
      <div class="col-start-1 row-start-2 p-fluid-md">
        <Comment>
          The heading is the summary itself, so that the subject and the control over its details are one thing rather
          than two, and so that the accordion carries a semantic heading as it should.
        </Comment>
        <p-accordion id="disclosure-accordion" align-marker="start" compact={true}>
          <p-heading slot="summary" tag={tag} size="lg">
            {heading}
          </p-heading>
          <div class="grid gap-static-sm">
            <p-text>{text}</p-text>
            {note && (
              <p-text size="2xs" color="contrast-medium">
                {note}
              </p-text>
            )}
          </div>
        </p-accordion>
      </div>
    </Root>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the disclosure tile: the accordion is controlled, so the page writes back the state it asks for.

      const disclosureAccordion = document.getElementById('disclosure-accordion');
      const disclosureTile = document.getElementById('disclosure-tile');

      disclosureAccordion.addEventListener('update', (e) => {
        disclosureAccordion.open = e.detail.open;
        // The accordion keeps its state as a property rather than an attribute, so the tile carries one for the styles.
        disclosureTile.toggleAttribute('data-open', e.detail.open);
      });
    `
    }</Script>
  </>
);
