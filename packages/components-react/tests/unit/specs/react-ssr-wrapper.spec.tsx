import { render } from '@testing-library/react';
import * as fromComponents from '../../../projects/react-ssr-wrapper/src/lib/components';
import { PorscheDesignSystemProvider } from '../../../projects/react-ssr-wrapper/src/provider';
import * as minifyCssUtils from '../../../projects/react-ssr-wrapper/src/minifyCss';

it.each(Object.keys(fromComponents))('should render dsr component for %s', async (componentName) => {
  // @ts-ignore
  const Component = fromComponents[componentName];

  // skip minification for snapshots
  jest.spyOn(minifyCssUtils, 'minifyCss').mockImplementation((css) => css);

  const { container } = render(
    <PorscheDesignSystemProvider>
      <Component />
    </PorscheDesignSystemProvider>
  );

  expect(container.firstElementChild).toMatchSnapshot();
});
