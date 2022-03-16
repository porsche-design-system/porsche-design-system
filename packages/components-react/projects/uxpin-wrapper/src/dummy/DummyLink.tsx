import { MouseEvent, PropsWithChildren } from 'react';

type Props = {
  onClick?: (e: MouseEvent) => void;
};

export const DummyLink = ({ children = 'DummyLink', ...rest }: PropsWithChildren<Props>): JSX.Element => {
  const props = { ...rest, children };

  return <a {...props} />;
};
