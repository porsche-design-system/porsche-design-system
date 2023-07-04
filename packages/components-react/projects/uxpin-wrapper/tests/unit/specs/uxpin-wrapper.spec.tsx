import { render } from '@testing-library/react';
import * as fromComponents from '../../../src/lib/components';
import UXPinWrapper from '../../../src/UXPinWrapper';
import { paramCase } from 'change-case';

it.each(Object.keys(fromComponents))('should render web component for %s', async (componentName) => {
  // @ts-ignore
  const Component = fromComponents[componentName];

  const { container } = render(
    <UXPinWrapper>
      <Component />
    </UXPinWrapper>
  );

  expect(container.firstElementChild!.tagName.toLowerCase()).toBe('p-' + paramCase(componentName));
});
