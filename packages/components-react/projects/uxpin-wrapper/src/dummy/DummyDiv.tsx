import { MouseEvent, PropsWithChildren, useEffect, useRef } from 'react';

type Props = {
  onClick?: (e: MouseEvent) => void;
};

export const DummyDiv = ({ children = 'DummyDiv', inlineStyle, ...rest }: PropsWithChildren<Props>): JSX.Element => {
  const elementRef = useRef<HTMLDivElement>();
  const props = { ...rest, children };

  return <div ref={elementRef} {...props} />;
};
