import { MouseEvent, PropsWithChildren, useEffect, useRef } from 'react';

type Props = {
  onClick?: (e: MouseEvent) => void;
  /**
   * @uxpincontroltype textfield(4)
   */
  inlineStyle?: string;
};

export const DummyDiv = ({ children = 'DummyDiv', inlineStyle, ...rest }: PropsWithChildren<Props>): JSX.Element => {
  const elementRef = useRef<HTMLDivElement>();

  useEffect(() => {
    // fighting the framework
    elementRef.current.setAttribute('style', inlineStyle);
  }, [inlineStyle]);

  const props = { ...rest, children };

  return <div ref={elementRef} {...props} />;
};
