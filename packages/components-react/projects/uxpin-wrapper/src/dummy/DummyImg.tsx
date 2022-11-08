import { useEffect, useRef } from 'react';

export type DummyImgProps = {
  src?: string;
  alt?: string;
  /**
   * @uxpincontroltype textfield(4)
   */
  inlineStyle?: string;
};

export const DummyImg = ({
  src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=',
  alt = 'Some image text',
  inlineStyle,
}: DummyImgProps): JSX.Element => {
  const elementRef = useRef<HTMLImageElement>();

  useEffect(() => {
    // fighting the framework
    elementRef.current.setAttribute('style', inlineStyle);
  }, [inlineStyle]);

  return <img src={src} alt={alt} ref={elementRef} />;
};
