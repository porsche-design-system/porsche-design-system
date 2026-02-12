import { getComponentMeta, type SlotMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { render } from '@testing-library/react';
import { kebabCase, pascalCase } from 'change-case';
import Link from 'next/link';
import { type JSX } from 'react';
import { vi } from 'vitest';
import * as fromComponents from '../../../src/lib/components';
import * as minifyCssUtils from '../../../src/minifyCss';
import { PorscheDesignSystemProvider } from '../../../src/provider';

it.each(Object.keys(fromComponents))('should render dsr component for %s', (componentName) => {
  // @ts-expect-error: ok because of dynamic access
  const Component = fromComponents[componentName];
  const tagName = kebabCase(componentName) as TagName;
  const componentMeta = getComponentMeta(tagName);

  // skip minifyCss for snapshots
  vi.spyOn(minifyCssUtils, 'minifyCss').mockImplementation((css) => css);

  // default children
  const { requiredChild, hasSlot, slotsMeta } =
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

  const requiredNamedSlots =
    slotsMeta &&
    Object.entries(slotsMeta)
      .filter(([, value]) => value.isRequired)
      .map(([key, value]) => ({ slotName: key, tagName: value.allowedTagNames[0] }));

  const renderNamedSlots = (slots: { slotName: string; tagName: SlotMeta['allowedTagNames'][number] }[]) =>
    slots.map(({ slotName, tagName }) => {
      // @ts-expect-error: ok because of dynamic access
      const Component = fromComponents[pascalCase(tagName)];
      return (
        <Component key={slotName} slot={slotName} href={tagName.includes('link') ? '#' : undefined}>
          Some label
        </Component>
      );
    });

  const renderChildren = () => {
    if (requiredChild) {
      return <RequiredChildTag {...requiredChildProps} />;
    } else if (tagName === 'p-carousel') {
      return <div>Some child</div>;
    } else if (requiredNamedSlots && requiredNamedSlots.length > 0) {
      return renderNamedSlots(requiredNamedSlots);
    } else {
      return 'Some child';
    }
  };

  // dangerouslySetInnerHTML would be easier than converting to jsx,
  // but this has not worked since our wrappers internally set children on the server side.
  // together with `...rest` which would contain dangerouslySetInnerHTML, we would have both
  // and these are not allowed and throw an exception
  let props: any = hasSlot ? { children: renderChildren() } : null;

  if (tagName === 'p-checkbox') {
    props = {
      ...props,
      checked: null,
    };
  }

  const consoleSpy = vi.spyOn(console, 'error');
  const { container } = render(
    <PorscheDesignSystemProvider>
      <Component {...props} />
    </PorscheDesignSystemProvider>
  );

  expect(container.firstElementChild).toMatchSnapshot();
  if (tagName === 'p-canvas') {
    expect(consoleSpy).toHaveBeenCalledTimes(1); // jsdom isn't able to parse @container queries
  } else {
    expect(consoleSpy).not.toHaveBeenCalled(); // detect react jsx errors/warnings
  }
});

describe('manual test cases', () => {
  const testCases: Partial<Record<TagName, (() => JSX.Element)[]>> = {
    'p-pin-code': [() => <fromComponents.PPinCode value="1234"></fromComponents.PPinCode>],
    'p-tabs-item': [
      () => (
        <fromComponents.PTabs>
          <fromComponents.PTabsItem label="Tab 1" />
          <fromComponents.PTabsItem label="Tab 2" />
        </fromComponents.PTabs>
      ),
    ],
    'p-tabs-bar': [
      () => (
        <fromComponents.PTabsBar activeTabIndex={1}>
          <a href="#">Item 1</a>
          <a href="#">Item 2</a>
        </fromComponents.PTabsBar>
      ),
    ],
    'p-text-list-item': [
      () => (
        <fromComponents.PTextList type="numbered">
          <fromComponents.PTextListItem>Item 1</fromComponents.PTextListItem>
          <fromComponents.PTextListItem>Item 2</fromComponents.PTextListItem>
        </fromComponents.PTextList>
      ),
    ],
    'p-stepper-horizontal-item': [
      () => (
        <fromComponents.PStepperHorizontal>
          <fromComponents.PStepperHorizontalItem>Item 1</fromComponents.PStepperHorizontalItem>
          <fromComponents.PStepperHorizontalItem>Item 2</fromComponents.PStepperHorizontalItem>
        </fromComponents.PStepperHorizontal>
      ),
    ],
    'p-segmented-control-item': [
      () => (
        <fromComponents.PSegmentedControl value={1}>
          <fromComponents.PSegmentedControlItem value={1}>Item 1</fromComponents.PSegmentedControlItem>
          <fromComponents.PSegmentedControlItem value={2}>Item 2</fromComponents.PSegmentedControlItem>
        </fromComponents.PSegmentedControl>
      ),
    ],
    'p-multi-select-option': [
      () => (
        <fromComponents.PMultiSelect name="name">
          <fromComponents.PMultiSelectOption value="a">Option A</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="b">Option B</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="c">Option C</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="d">Option D</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="e">Option E</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="f">Option F</fromComponents.PMultiSelectOption>
        </fromComponents.PMultiSelect>
      ),
    ],
  };

  it.each<[TagName, () => JSX.Element]>(
    Object.entries(testCases)
      .map(([tagName, jsxSnippets]) => jsxSnippets.map((jsxSnippet) => [tagName, jsxSnippet]))
      .flat() as [TagName, () => JSX.Element][]
  )('should pass internal props correctly to %s', (_, jsxSnippet) => {
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
});
