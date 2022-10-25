export type DummyImgProps = {
  src?: string;
  alt?: string;
};

export const DummyImg = (props: DummyImgProps): JSX.Element => {
  const {
    src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=',
    alt = 'Some image text',
  } = props;

  return <img src={src} alt={alt} />;
};
