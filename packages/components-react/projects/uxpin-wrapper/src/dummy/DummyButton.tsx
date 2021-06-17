import { MouseEvent, PropsWithChildren } from 'react';

type Props = {
  onClick?: (e: MouseEvent) => void;
};

export const DummyButton = ({ children = 'DummyButton', ...rest }: PropsWithChildren<Props>): JSX.Element => {
  const props = { ...rest, children };

  return <button {...props} />;
};
