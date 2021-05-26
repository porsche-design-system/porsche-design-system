import { PropsWithChildren } from 'react';
import { PorscheDesignSystemProvider } from './provider';

export default (props: PropsWithChildren<{}>): JSX.Element => {
  return <PorscheDesignSystemProvider {...props} />;
};
