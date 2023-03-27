type Props = {
  videoUrl: string;
  fallbackUrl: string;
  posterUrl: string;
  controls?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  objectFit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
};

export default function Video({
  videoUrl,
  fallbackUrl,
  posterUrl,
  controls,
  loop,
  playsInline,
  objectFit = 'cover',
}: Props) {
  const style = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    objectFit,
    zIndex: -1,
  };
  return (
    <video loop={loop} controls={controls} poster={posterUrl} playsInline={playsInline} style={style}>
      <source src={fallbackUrl} />
      <source src={videoUrl} />
    </video>
  );
}
