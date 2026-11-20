import type { ComponentChildren } from 'preact';
import { Comment } from '../Comment.tsx';
import { tileComments } from './blocks/comments.ts';
import { joinClasses, type TileHeadingTag, type TileImageSource, type TilePlacement } from './blocks/shared.ts';

/**
 * What the two arrangements of the tile differ in – spelled out, so Tailwind finds every class.
 *
 * `adaptive` puts the photograph beside the text once the tile is wide enough, `stacked` keeps it above the text
 * however wide the tile is, with a wider photograph and a smaller text.
 */
const variants = {
  adaptive: {
    frame: '@lg:flex-row @lg:gap-0',
    photograph: '@lg:w-1/2 @2xl:w-2/3',
    ratio: 'aspect-5/4',
    textSize: undefined,
  },
  stacked: {
    frame: undefined,
    photograph: undefined,
    ratio: 'aspect-9/4',
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
  /** A photograph of the option. Its alternative text says what it shows of the option, beyond the name in the heading. */
  image: TileImageSource & { alt: string };
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
  const { frame, photograph, ratio, textSize } = variants[variant];
  const frameClass = joinClasses('flex flex-col gap-static-sm rounded-3xl bg-surface p-static-sm', frame);

  const frameComments = (
    <>
      <Comment>
        {joinClasses(
          'Panel radius plus padding equals the radius of the tile, so the two curves stay parallel.',
          !action && 'Nothing in the tile is interactive, so no focus indicator has to stay outside the frame.'
        )}
      </Comment>
      {isAdaptive && <Comment>The photograph sets the height of the tile, a longer description extends it.</Comment>}
    </>
  );

  const panels: ComponentChildren = (
    <>
      <Comment>The photograph is cropped to the panel, so it follows its corners.</Comment>
      {isAdaptive && (
        <>
          <Comment>
            The ratio sits on the photograph rather than on the panel, where a longer description would leave empty
            space under the photograph.
          </Comment>
          <Comment>Nothing separates the two panels but the padding of the text, as in the design.</Comment>
        </>
      )}
      <div class={joinClasses('shrink-0 overflow-clip rounded-2xl', photograph)}>
        <img
          class={joinClasses(ratio, 'size-full object-cover')}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      </div>
      {isAdaptive && (
        <Comment>
          Beside the photograph in halves from a column of 32rem on. The third of the design only from 42rem on, since
          it would leave a few words per line before.
        </Comment>
      )}
      <div class="flex grow flex-col gap-fluid-md p-fluid-md">
        <div class="grid gap-static-md">
          <p-heading tag={tag} size="lg">
            {heading}
          </p-heading>
          <p-text size={textSize} color="contrast-medium">
            {text}
          </p-text>
        </div>
        {note && (
          <>
            <Comment>The marker ties the note to the claim it qualifies.</Comment>
            <p-text size="2xs" color="contrast-medium">
              {note}
            </p-text>
          </>
        )}
        {action && (
          <>
            <Comment>The only interactive element of the tile, which is why no link covers the tile.</Comment>
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
      <Comment>{tileComments.container}</Comment>
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
