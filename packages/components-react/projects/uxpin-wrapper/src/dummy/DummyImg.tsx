
enum ObjectFit {
  fill='fill',
  contain = 'contain',
  cover = 'cover',
  'scale-down' = 'scale-down',
  none = 'none',
}

export type DummyImgProps = {
  /**
   * @uxpincontroltype image
   */
  src?: string;
  objectFit: ObjectFit;
  alt?: string;
  /**
   * @uxpinignoreprop
   */
  style?: object;
  /**
   * uxpin props which indicates that given component is root or nested
   * @uxpinignoreprop
   */
  isRootComponent: boolean;
};

export const DummyImg = ({
  src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=',
  alt = 'Some image text',
  objectFit = ObjectFit.fill,
  ...rest
}: DummyImgProps): JSX.Element => {

  const style = {
    width: rest.isRootComponent ? '100%' : undefined,
    height: rest.isRootComponent ? '100%' : undefined,
    objectFit,
    ...(rest.style)
  }

  return <img src={src} alt={alt} {...rest} style={style} />;
};
