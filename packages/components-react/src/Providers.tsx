import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <PorscheDesignSystemProvider cdn="auto">
      <ThemeProvider>{children}</ThemeProvider>
    </PorscheDesignSystemProvider>
  );
};
