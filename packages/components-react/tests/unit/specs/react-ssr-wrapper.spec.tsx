import { render } from '@testing-library/react';
import * as fromComponents from '../../../projects/react-ssr-wrapper/src/lib/components';
import { PorscheDesignSystemProvider } from '../../../projects/react-ssr-wrapper/src/provider';
import * as minifyCssUtils from '../../../projects/react-ssr-wrapper/src/minifyCss';
import { getComponentMeta } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import { paramCase } from 'change-case';

it.each(Object.keys(fromComponents))('should render dsr component for %s', (componentName) => {
  // @ts-ignore
  const Component = fromComponents[componentName];
  const tagName = paramCase(componentName) as TagName;
  const componentMeta = getComponentMeta(tagName);

  // skip minifyCss for snapshots
  jest.spyOn(minifyCssUtils, 'minifyCss').mockImplementation((css) => css);

  // default children
  const { requiredChild, hasSlot } =
    tagName === 'p-tabs'
      ? { ...componentMeta, requiredChild: 'p-tabs-item label=TabItem' } // TODO: validation for this is missing and therefore componentMeta doesn't contain it
      : componentMeta;
  const [RequiredChildTag, requiredChildAttrs] = requiredChild?.split(' ') || [];
  const requiredChildProps = requiredChildAttrs
    ? requiredChildAttrs
        .split(' ')
        .map((pair) => pair.split('='))
        .reduce((res, [key, val]) => ({ ...res, [key]: val }), {})
    : null;

  // dangerouslySetInnerHTML would obviously be easier than converting to jsx
  // but this does not work since our wrappers internally set children on the server side.
  // together with `...rest` which would contain dangerouslySetInnerHTML, we would have both
  // and this is not allowed and throws an exception
  const props = hasSlot
    ? {
        children: requiredChild ? (
          <RequiredChildTag {...requiredChildProps} />
        ) : tagName === 'p-carousel' ? ( // we need an actual DOM node here
          <div>Some child</div>
        ) : (
          'Some child'
        ),
      }
    : null;

  const { container } = render(
    <PorscheDesignSystemProvider>
      <Component {...props} />
    </PorscheDesignSystemProvider>
  );

  expect(container.firstElementChild).toMatchSnapshot();
});
