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
    'p-checkbox-wrapper': [
      () => (
        <fromComponents.PCheckboxWrapper label="Some label" loading={true}>
          <input type="checkbox" />
        </fromComponents.PCheckboxWrapper>
      ),
      () => (
        <fromComponents.PCheckboxWrapper label="Some label" loading={true}>
          <input type="checkbox" defaultChecked={true} />
        </fromComponents.PCheckboxWrapper>
      ),
    ],
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
    'p-link-tile-model-signature': [
      () => (
        <fromComponents.PLinkTileModelSignature heading="Some heading">
          <fromComponents.PLink slot="primary" href="#primary">
            Primary
          </fromComponents.PLink>
          <fromComponents.PLink slot="secondary" href="#secondary">
            Secondary
          </fromComponents.PLink>
        </fromComponents.PLinkTileModelSignature>
      ),
      () => (
        <fromComponents.PLinkTileModelSignature heading="Some heading">
          <fromComponents.PLink slot="primary">
            <a href="#primary-slotted">Primary slotted</a>
          </fromComponents.PLink>
          <fromComponents.PLink slot="secondary">
            <a href="#secondary-slotted">Secondary slotted</a>
          </fromComponents.PLink>
        </fromComponents.PLinkTileModelSignature>
      ),
      () => (
        <fromComponents.PLinkTileModelSignature heading="Some heading">
          <fromComponents.PLink slot="primary">
            <Link href="#primary-framework">Primary Framework</Link>
          </fromComponents.PLink>
          <fromComponents.PLink slot="secondary">
            <Link href="#secondary-framework">Secondary Framework</Link>
          </fromComponents.PLink>
        </fromComponents.PLinkTileModelSignature>
      ),
      () => (
        <fromComponents.PLinkTileModelSignature heading="Some heading">
          <fromComponents.PLink slot="primary">
            <a href="#primary-slotted">Primary slotted with span</a>
            <span>Something else</span>
          </fromComponents.PLink>
          <fromComponents.PLink slot="secondary">
            <a href="#secondary-slotted">Secondary slotted</a>
          </fromComponents.PLink>
        </fromComponents.PLinkTileModelSignature>
      ),
    ],
    'p-pin-code': [() => <fromComponents.PPinCode value="1234"></fromComponents.PPinCode>],
    'p-radio-button-wrapper': [
      () => (
        <fromComponents.PRadioButtonWrapper label="Some label" loading={true}>
          <input type="radio" />
        </fromComponents.PRadioButtonWrapper>
      ),
      () => (
        <fromComponents.PRadioButtonWrapper label="Some label" loading={true}>
          <input type="radio" defaultChecked={true} />
        </fromComponents.PRadioButtonWrapper>
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
    'p-multi-select-option': [
      () => (
        <fromComponents.PMultiSelect name="name" theme="dark">
          <fromComponents.PMultiSelectOption value="a">Option A</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="b">Option B</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="c">Option C</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="d">Option D</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="e">Option E</fromComponents.PMultiSelectOption>
          <fromComponents.PMultiSelectOption value="f">Option F</fromComponents.PMultiSelectOption>
        </fromComponents.PMultiSelect>
      ),
    ],
    'p-select-wrapper': [
      () => (
        <fromComponents.PSelectWrapper filter={true} label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
            <option value="d">Option D</option>
            <option value="e">Option E</option>
            <option value="f">Option F</option>
          </select>
        </fromComponents.PSelectWrapper>
      ),
      () => (
        <fromComponents.PSelectWrapper native={true} label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
            <option value="d">Option D</option>
            <option value="e">Option E</option>
            <option value="f">Option F</option>
          </select>
        </fromComponents.PSelectWrapper>
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
