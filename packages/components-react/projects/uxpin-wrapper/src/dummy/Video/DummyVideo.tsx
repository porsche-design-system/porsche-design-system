type Props = {
  videoUrl: string;
  fallbackUrl: string;
  posterUrl: string;
  width: string; // CSS pixels or % seem to work
  // Optional attributes
  controls?: boolean;
  loop?: boolean;
  playsInline?: boolean;
};

export default function Video({ videoUrl, fallbackUrl, posterUrl, width, controls, loop, playsInline }: Props) {
  return (
    <video loop={loop} controls={controls} poster={posterUrl} playsInline={playsInline} width={width}>
      <source src={fallbackUrl} />
      <source src={videoUrl} />
    </video>
  );
}
