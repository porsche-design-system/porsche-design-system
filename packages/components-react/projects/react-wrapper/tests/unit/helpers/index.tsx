import { render } from '@testing-library/react';
import { ReactElement } from 'react';

export const testSnapshot = (component: ReactElement) => {
  const { container } = render(component);

  expect(container).toMatchSnapshot();
};
