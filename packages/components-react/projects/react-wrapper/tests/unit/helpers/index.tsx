import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { expect } from 'vitest';

export const testSnapshot = (component: ReactElement): void => {
  const { container } = render(component);

  expect(container).toMatchSnapshot();
};
