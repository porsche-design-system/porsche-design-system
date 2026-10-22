import { PButton, PHeading, PLink, PTile } from '@porsche-design-system/components-react';
import { useRef, useState } from 'react';

export const TileExampleVideoPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // a video is paused until it plays, since its autoplay can be prevented, e.g. by the tile if the user prefers reduced
  // motion
  const [isPaused, setIsPaused] = useState(true);

  const onClick = () => {
    const video = videoRef.current;
    if (video?.paused) {
      video.play();
    } else {
      video?.pause();
    }
  };

  return (
    <PTile className="scheme-dark" gradient="bottom" hoverEffect="zoom">
      <video
        ref={videoRef}
        slot="background"
        src="http://localhost:3002/mood-porsche-gts.mp4"
        poster="http://localhost:3002/mood-porsche-gts.webp"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
      />
      <PHeading slot="bottom" tag="h3" size="md" weight="semibold">
        GTS models
      </PHeading>
      <PButton
        slot="bottom"
        className="ms-auto relative z-2"
        type="button"
        variant="secondary"
        icon={isPaused ? 'play' : 'pause'}
        hideLabel={true}
        compact={true}
        onClick={onClick}
      >
        {isPaused ? 'Play video' : 'Pause video'}
      </PButton>
      <PLink slot="bottom" variant="secondary" icon="arrow-right" hideLabel={true} compact={true} cover={true}>
        <a href="#">GTS models</a>
      </PLink>
    </PTile>
  );
};
