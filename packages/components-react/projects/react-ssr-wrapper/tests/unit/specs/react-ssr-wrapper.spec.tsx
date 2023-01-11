import { render } from '@testing-library/react';
import * as fromComponents from '../../../src/lib/components';
import { DSRContentWrapper } from '../../../src/lib/dsr-components/content-wrapper';
import { PorscheDesignSystemProvider } from '../../../src/provider';
import * as minifyCssUtils from '../../../src/minifyCss';
import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
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

describe('manual test cases', () => {
  const testCases: Partial<Record<TagName, (() => JSX.Element)[]>> = {
    'p-grid-item': [
      () => (
        <fromComponents.PGrid gutter={16}>
          <fromComponents.PGridItem>Item 1</fromComponents.PGridItem>
          <fromComponents.PGridItem>Item 2</fromComponents.PGridItem>
        </fromComponents.PGrid>
      ),
      () => (
        <fromComponents.PGrid gutter={24}>
          <fromComponents.PGridItem>Item 1</fromComponents.PGridItem>
          <fromComponents.PGridItem>Item 2</fromComponents.PGridItem>
        </fromComponents.PGrid>
      ),
    ],
    'p-tabs-item': [
      () => (
        <fromComponents.PTabs theme="dark">
          <fromComponents.PTabsItem label="Tab 1" />
          <fromComponents.PTabsItem label="Tab 2" />
        </fromComponents.PTabs>
      ),
    ],
    'p-text-list-item': [
      () => (
        <fromComponents.PTextList listType="ordered" orderType="alphabetically">
          <fromComponents.PTextListItem>Item 1</fromComponents.PTextListItem>
          <fromComponents.PTextListItem>Item 2</fromComponents.PTextListItem>
        </fromComponents.PTextList>
      ),
    ],
    'p-stepper-horizontal-item': [
      () => (
        <fromComponents.PStepperHorizontal theme="dark">
          <fromComponents.PStepperHorizontalItem>Item 1</fromComponents.PStepperHorizontalItem>
          <fromComponents.PStepperHorizontalItem>Item 2</fromComponents.PStepperHorizontalItem>
        </fromComponents.PStepperHorizontal>
      ),
    ],
    'p-segmented-control-item': [
      () => (
        <fromComponents.PSegmentedControl value={1} backgroundColor="background-surface" theme="dark">
          <fromComponents.PSegmentedControlItem value={1}>Item 1</fromComponents.PSegmentedControlItem>
          <fromComponents.PSegmentedControlItem value={2}>Item 2</fromComponents.PSegmentedControlItem>
        </fromComponents.PSegmentedControl>
      ),
    ],
    'p-text-field-wrapper': [
      () => (
        <fromComponents.PTextFieldWrapper label="Counter">
          <input type="text" maxLength={20} defaultValue="Some value" />
        </fromComponents.PTextFieldWrapper>
      ),
      () => (
        <fromComponents.PTextFieldWrapper label="Counter hidden" showCharacterCount={false}>
          <input type="text" maxLength={20} defaultValue="Some value" />
        </fromComponents.PTextFieldWrapper>
      ),
      () => (
        <fromComponents.PTextFieldWrapper label="Type password">
          <input type="password" defaultValue="some password" />
        </fromComponents.PTextFieldWrapper>
      ),
      () => (
        <fromComponents.PTextFieldWrapper label="Search">
          <input type="search" />
        </fromComponents.PTextFieldWrapper>
      ),
    ],
  };

  it.each<[TagName, () => JSX.Element]>(
    Object.entries(testCases)
      .map(([tagName, jsxSnippets]) => jsxSnippets.map((jsxSnippet) => [tagName, jsxSnippet]))
      .flat() as [TagName, () => JSX.Element][]
  )('should pass internal props correctly to %s', (tagName, jsxSnippet) => {
    const { container } = render(<PorscheDesignSystemProvider>{jsxSnippet()}</PorscheDesignSystemProvider>);

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it('should have a manual test case for each component with an internalProp', () => {
    const tagNamesWithInternalProps = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).internalProps);
    const tagNamesWithTestCases = Object.keys(testCases);
    const hasTestCaseForEveryTagNameWithInternalProp = tagNamesWithInternalProps.every((tagName) =>
      tagNamesWithTestCases.includes(tagName as TagName)
    );

    if (!hasTestCaseForEveryTagNameWithInternalProp) {
      const missingTagNames = tagNamesWithInternalProps
        .filter((tagName) => !tagNamesWithTestCases.includes(tagName))
        .join(', ');
      console.error(`Missing test cases for: ${missingTagNames}`);
    }

    expect(hasTestCaseForEveryTagNameWithInternalProp).toBeTruthy();
  });

  it('should render PContentWrapper correctly with conditional child component', () => {
    const Component: React.FC<{ hasChild?: boolean | undefined }> = ({ hasChild }) => (
      <fromComponents.PContentWrapper>
        <p>Ensure conditional children do not cause Errors while SSG</p>
        {hasChild && <p>Some Text</p>}
      </fromComponents.PContentWrapper>
    );

    const { container } = render(
      <PorscheDesignSystemProvider>
        <Component />
      </PorscheDesignSystemProvider>
    );

    expect(container.firstElementChild).toBeDefined();
  });
});
