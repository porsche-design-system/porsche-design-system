import type { ComponentChildren } from 'preact';
import { Comment } from '../Comment.tsx';
import { tileComments } from './blocks/comments.ts';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TilePlacement } from './blocks/shared.ts';

/**
 * What the two arrangements of the tile differ in – spelled out, so Tailwind finds every class.
 *
 * `adaptive` puts the photograph beside the text once the tile is wide enough, `stacked` keeps it above the text
 * however wide the tile is, with a wider photograph and a larger heading for the room that leaves.
 */
const variants = {
  adaptive: {
    frame: '@lg:flex-row @lg:gap-0',
    photograph: '@lg:w-1/2 @2xl:w-2/3',
    ratio: 'aspect-5/4',
    headingSize: 'sm',
    textSize: undefined,
  },
  stacked: {
    frame: undefined,
    photograph: undefined,
    ratio: 'aspect-9/4',
    headingSize: 'lg',
    textSize: 'sm',
  },
} as const;

type EquipmentTileProps = TilePlacement & {
  /** How the two panels are arranged – beside one another where the tile is wide enough, or always stacked. */
  variant?: keyof typeof variants;
  /** The option, which names the tile. */
  heading: string;
  tag?: TileHeadingTag;
  text: string;
  /** The label of the one action the option has, if it has one. */
  action?: string;
  /** What qualifies the heading or the text, e.g. the note a marker refers to. */
  note?: string;
  /** A photograph of the option – decorative, since the heading names it. */
  image: TileImageSource;
};

/**
 * An equipment option of a vehicle: a photograph in one panel, its name and its description in the other, with one
 * action or a note where the option has one.
 *
 * Both equipment patterns render it, each in one `variant`. The tile is sized by its content, so it takes no aspect
 * ratio. In its `adaptive` variant the placement goes to a wrapper around the tile, which is the container its
 * arrangement follows.
 */
export const EquipmentTile = ({
  as: Root = 'div',
  class: placement,
  variant = 'adaptive',
  heading,
  tag = 'h2',
  text,
  action,
  note,
  image,
}: EquipmentTileProps) => {
  const isAdaptive = variant === 'adaptive';
  const { frame, photograph, ratio, headingSize, textSize } = variants[variant];
  const frameClass = joinClasses('flex flex-col gap-static-sm rounded-3xl bg-surface p-static-sm', frame);

  const frameComments = (
    <>
      <Comment>
        {joinClasses(
          'The radius of the panel plus the padding around it make the radius of the tile, so the two curves stay parallel.',
          !action && 'Nothing in the tile is interactive, so no focus indicator has to stay outside the frame.'
        )}
      </Comment>
      {isAdaptive && (
        <Comment>
          The photograph sets the height of the tile, and a description longer than it makes the tile taller still
          rather than running out of it.
        </Comment>
      )}
    </>
  );

  const panels: ComponentChildren = (
    <>
      <Comment>The photograph is cropped to the panel, so it follows its corners.</Comment>
      {isAdaptive && (
        <>
          <Comment>
            The ratio sits on the photograph rather than on the panel, so it gives the row its height while a longer
            description can still make the panel taller. On the panel it would set the height once and leave empty space
            under the photograph.
          </Comment>
          <Comment>Nothing separates the two panels but the padding of the text, as in the design.</Comment>
        </>
      )}
      <div class={joinClasses('shrink-0 overflow-clip rounded-2xl', photograph)}>
        <Comment>{tileComments.optionImage}</Comment>
        <img
          class={joinClasses(ratio, 'size-full object-cover')}
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
        />
      </div>
      {isAdaptive && (
        <Comment>
          The text follows the photograph in a narrow column. From a column of 32rem on it shares the tile with the
          photograph in halves, and from one of 42rem on it takes the third of the design, which would leave a few words
          per line before.
        </Comment>
      )}
      <div class="flex grow flex-col gap-fluid-md p-fluid-md">
        <div class="grid gap-static-md">
          <p-heading tag={tag} size={headingSize}>
            {heading}
          </p-heading>
          <p-text size={textSize} color="contrast-medium">
            {text}
          </p-text>
        </div>
        {note && (
          <>
            <Comment>The marker ties the note to the claim it qualifies, so it is read in context.</Comment>
            <p-text size="2xs" color="contrast-medium">
              {note}
            </p-text>
          </>
        )}
        {action && (
          <>
            <Comment>
              The one action of the option, and the only interactive element of the tile – which is why nothing spans
              the tile the way a covering link would.
            </Comment>
            <Comment>Pushed to the lower edge of the panel, however short the description is.</Comment>
            <p-button class="self-start mt-auto" type="button" variant="secondary" compact={true}>
              {action}
            </p-button>
          </>
        )}
      </div>
    </>
  );

  // The container of the adaptive tile has to be an element around it: the tile itself is what changes its direction.
  return isAdaptive ? (
    <>
      <Comment>
        The tile takes its arrangement from the width of this wrapper rather than of the window, so it fits the column
        it is placed in.
      </Comment>
      <Root class={joinClasses(placement, '@container')}>
        {frameComments}
        <div class={frameClass}>{panels}</div>
      </Root>
    </>
  ) : (
    <>
      {frameComments}
      <Root class={joinClasses(placement, frameClass)}>{panels}</Root>
    </>
  );
};
