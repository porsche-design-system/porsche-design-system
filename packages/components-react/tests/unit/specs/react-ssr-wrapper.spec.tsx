import { render } from '@testing-library/react';
import * as fromComponents from '../../../projects/react-ssr-wrapper/src/lib/components';
import { PorscheDesignSystemProvider } from '../../../projects/react-ssr-wrapper/src/provider';
import * as minifyCssUtils from '../../../projects/react-ssr-wrapper/src/minifyCss';
import { getComponentMeta } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import { paramCase } from 'change-case';

it.each(Object.keys(fromComponents))('should render dsr component for %s', async (componentName) => {
  // @ts-ignore
  const Component = fromComponents[componentName];

  // skip minifyCss for snapshots
  jest.spyOn(minifyCssUtils, 'minifyCss').mockImplementation((css) => css);

  // default children
  const { requiredChild } = getComponentMeta(paramCase(componentName) as TagName);
  const [RequiredChildTag, requiredChildAttrs] = requiredChild?.split(' ') || [];
  const requiredChildProps = requiredChildAttrs
    ? requiredChildAttrs
        .split(' ')
        .map((pair) => pair.split('='))
        .reduce((res, [key, val]) => ({ ...res, [key]: val }), {})
    : null;
  const props = {
    children: requiredChild ? <RequiredChildTag {...requiredChildProps} /> : 'Some child',
    // dangerouslySetInnerHTML: {
    //   __html: requiredChild
    //     ? requiredChild.startsWith('input')
    //       ? `<${requiredChild} />`
    //       : `<${requiredChild}></${requiredChild}>`
    //     : 'Some child',
    // },
  };

  const { container } = render(
    <PorscheDesignSystemProvider>
      <Component {...props} />
    </PorscheDesignSystemProvider>
  );

  expect(container.firstElementChild).toMatchSnapshot();
});
