import { Comment } from '../Comment.tsx';
import { Script } from '../Script.tsx';
import { tileComments } from './blocks/comments.ts';
import { Gradient } from './blocks/Gradient.tsx';
import { Media } from './blocks/Media.tsx';
import { joinClasses, type TileHeadingTag, type TileProps, tileZoom } from './blocks/shared.ts';

type VideoTileProps = TileProps & {
  /** What the tile leads to, which names the tile and its link. */
  heading: string;
  tag?: TileHeadingTag;
  href: string;
  /** The still shown until the video plays, and instead of it when the user prefers reduced motion. */
  poster: string;
  /** The encodings of the video, in the order the browser tries them. */
  sources: { src: string; type: string }[];
};

/**
 * A category with a mood video: the video covers the tile, the heading, the pause button and an icon-only link lie on
 * it – with the script operating the video and its button.
 *
 * WCAG 2.2 asks for every animation that starts on its own to be stoppable, so the video and its button are one
 * component, and the ids the script looks up stay in this file. Those ids make it one video tile per page.
 */
export const VideoTile = ({
  as: Root = 'div',
  class: placement,
  aspect = 'aspect-4/3',
  heading,
  tag = 'h2',
  href,
  poster,
  sources,
}: VideoTileProps) => (
  <>
    <Comment>{tileComments.coverTile}</Comment>
    <Comment>{tileComments.darkScheme}</Comment>
    <Comment>{tileComments.ownHeight}</Comment>
    <Root
      class={joinClasses(
        placement,
        'self-start group relative isolate grid',
        aspect,
        'rounded-3xl scheme-only-dark [--p-link-cover-radius:var(--radius-3xl)]'
      )}
    >
      <Media>
        <Comment>
          Decorative, muted and looped. It does not start if the user prefers reduced motion, see the script.
        </Comment>
        <Comment>{tileComments.zoom}</Comment>
        {/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: without `controls`, the video is not focusable – it is decorative */}
        <video
          id="tile-video"
          class={joinClasses('size-full object-cover', tileZoom)}
          poster={poster}
          aria-hidden="true"
          loop
          muted
          autoplay
          playsinline
        >
          {sources.map(({ src, type }) => (
            <source key={src} src={src} type={type} />
          ))}
        </video>
      </Media>
      <Gradient class="flex flex-wrap items-center gap-fluid-sm px-fluid-md pt-fluid-lg pb-fluid-md">
        <p-heading tag={tag} size="md">
          {heading}
        </p-heading>
        <Comment>
          Moving content that starts on its own has to be pausable. The button follows the actual state of the video,
          see the script.
        </Comment>
        <Comment>{tileComments.action}</Comment>
        <p-button
          id="tile-video-button"
          class="ms-auto relative z-2"
          type="button"
          variant="secondary"
          icon="play"
          hide-label="true"
          compact="true"
        >
          Play video
        </p-button>
        <Comment>{tileComments.coverLink}</Comment>
        <p-link variant="secondary" icon="arrow-up-right" hide-label="true" compact="true" cover={true}>
          <a href={href}>{heading}</a>
        </p-link>
      </Gradient>
    </Root>
    <Script>{
      /* language=JavaScript */ `
      // Behaviour of the video tile: a pause button that follows the actual state of the video.

      const tileVideo = document.getElementById('tile-video');
      const tileVideoButton = document.getElementById('tile-video-button');

      // Derived from the media events rather than the last click, since the autoplay can be refused by the browser.
      // A video is paused until it plays, so the button starts in its paused state.
      const syncTileVideoButton = () => {
        tileVideoButton.textContent = tileVideo.paused ? 'Play video' : 'Pause video';
        tileVideoButton.icon = tileVideo.paused ? 'play' : 'pause';
      };

      tileVideo.addEventListener('play', syncTileVideoButton);
      tileVideo.addEventListener('pause', syncTileVideoButton);

      tileVideoButton.addEventListener('click', () => {
        tileVideo[tileVideo.paused ? 'play' : 'pause']();
      });

      // An animation that starts on its own must not start at all when the user prefers reduced motion.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        tileVideo.autoplay = false;
        tileVideo.pause();
      }

      syncTileVideoButton();
    `
    }</Script>
  </>
);
