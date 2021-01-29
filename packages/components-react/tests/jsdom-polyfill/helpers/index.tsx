import { render } from '@testing-library/react';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

export const renderWithProvider = (component: JSX.Element) => {
  return render(<PorscheDesignSystemProvider>{component}</PorscheDesignSystemProvider>);
};
