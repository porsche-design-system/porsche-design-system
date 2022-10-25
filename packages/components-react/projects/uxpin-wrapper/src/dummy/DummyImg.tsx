export type DummyImgProps = {
  src?: string;
  alt?: string;
};

export const DummyImg = (props: DummyImgProps): JSX.Element => {
  return <img {...props} />;
};
