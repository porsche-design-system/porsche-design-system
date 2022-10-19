import { render } from '@testing-library/react';
import * as fromComponents from '../../../projects/react-ssr-wrapper/src/lib/components';
import { PorscheDesignSystemProvider } from '../../../projects/react-ssr-wrapper/src/provider';

it.each(Object.keys(fromComponents))('should render dsr component for %s', async (componentName) => {
  // @ts-ignore
  const Component = fromComponents[componentName];

  const { container } = render(
    <PorscheDesignSystemProvider>
      <Component />
    </PorscheDesignSystemProvider>
  );

  expect(container.firstElementChild).toMatchSnapshot();
});
