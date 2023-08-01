import { type JSX } from 'react';
import { render } from '@testing-library/react';
import * as fromComponents from '../../../src/lib/components';
import { PorscheDesignSystemProvider } from '../../../src/provider';
import * as minifyCssUtils from '../../../src/minifyCss';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { paramCase, pascalCase } from 'change-case';
import Link from 'next/link';

it.each(Object.keys(fromComponents))('should render dsr component for %s', (componentName) => {
  const Component = fromComponents[componentName];
  const tagName = paramCase(componentName) as TagName;
  const componentMeta = getComponentMeta(tagName);

  // skip minifyCss for snapshots
  jest.spyOn(minifyCssUtils, 'minifyCss').mockImplementation((css) => css);

  // default children
  const { requiredChild, hasSlot, requiredNamedSlots } =
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
        ) : requiredNamedSlots ? (
          requiredNamedSlots.map(({ slotName, tagName }) => {
            const Component = fromComponents[pascalCase(tagName)];
            return (
              <Component key={slotName} slot={slotName} href={tagName.includes('link') ? '#' : undefined}>
                Some label
              </Component>
            );
          })
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
