import { PropsWithChildren } from 'react';

export const DummySpan = ({ children = 'DummySpan', ...rest }: PropsWithChildren<{}>): JSX.Element => {
  const props = { ...rest, children };

  return <span {...props} />;
};
