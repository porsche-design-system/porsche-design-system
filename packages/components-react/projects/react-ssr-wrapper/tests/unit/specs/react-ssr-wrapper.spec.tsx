import { getComponentMeta, type SlotMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { render } from '@testing-library/react';
import { kebabCase, pascalCase } from 'change-case';
import Link from 'next/link';
import { type JSX } from 'react';
import { renderToString } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as fromComponents from '../../../src/lib/components';
import * as minifyCssUtils from '../../../src/minifyCss';
import { PorscheDesignSystemProvider } from '../../../src/provider';

beforeEach(() => {
  // skip minifyCss for snapshots
  vi.spyOn(minifyCssUtils, 'minifyCss').mockImplementation((css) => css);
});

it.each(Object.keys(fromComponents))('should render dsr component for %s', (componentName) => {
  // @ts-expect-error: ok because of dynamic access
  const Component = fromComponents[componentName];
  const tagName = kebabCase(componentName) as TagName;
  const componentMeta = getComponentMeta(tagName);

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

  // a shadow root created by the html parser takes its clonable flag from the template and cannot be
  // changed afterwards, so ssr rendered components stay unclonable without this attribute
  for (const template of container.querySelectorAll('template[shadowrootmode]')) {
    expect(template.getAttribute('shadowrootclonable')).toBe('true');
  }

  // the web component only starts once this marker is in its shadow root, so every host that is marked as server
  // rendered needs a declarative shadow root that ends with it
  const serverRenderedHosts = container.querySelectorAll('[data-dsr]');
  expect(serverRenderedHosts.length).toBeGreaterThan(0);
  for (const host of serverRenderedHosts) {
    const template = host.querySelector(':scope > template[shadowrootmode]');
    expect(template?.lastElementChild?.getAttribute('data-dsr-end'), host.tagName).toBe('');
  }

  expect(container.firstElementChild).toMatchSnapshot();
  expect(consoleSpy).not.toHaveBeenCalled(); // detect react jsx errors/warnings
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

describe('ssr props', () => {
  const getSsrProps = (jsx: JSX.Element): string | null => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<PorscheDesignSystemProvider>{jsx}</PorscheDesignSystemProvider>);
    return container.querySelector('p-button')!.getAttribute('data-ssr-props');
  };

  it('should serialize props that differ from their default on the server', () => {
    const ssrProps = getSsrProps(
      <fromComponents.PButton
        variant="secondary"
        compact={{ base: true, m: false }}
        aria={{ 'aria-label': 'Some label' }}
      >
        Some label
      </fromComponents.PButton>
    );

    expect(JSON.parse(ssrProps!)).toEqual({
      variant: 'secondary',
      compact: { base: true, m: false },
      aria: { 'aria-label': 'Some label' },
    });
  });

  it('should not render data-ssr-props on the server when every prop has its default', () => {
    expect(getSsrProps(<fromComponents.PButton variant="primary">Some label</fromComponents.PButton>)).toBe(null);
  });

  it('should remove data-ssr-props once the props are synced on the client', () => {
    const { container } = render(
      <PorscheDesignSystemProvider>
        <fromComponents.PButton variant="secondary">Some label</fromComponents.PButton>
      </PorscheDesignSystemProvider>
    );

    expect(container.querySelector('p-button')!.hasAttribute('data-ssr-props')).toBe(false);
  });
});

describe('server marker', () => {
  const renderOnServer = (jsx: JSX.Element): HTMLElement => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<PorscheDesignSystemProvider>{jsx}</PorscheDesignSystemProvider>);
    return container;
  };

  it('should mark a component as server rendered on the server', () => {
    const container = renderOnServer(<fromComponents.PButton variant="secondary">Some label</fromComponents.PButton>);

    expect(container.querySelector('p-button')!.getAttribute('data-dsr')).toBe('');
  });

  it('should mark a component as server rendered when every prop has its default', () => {
    const container = renderOnServer(<fromComponents.PButton>Some label</fromComponents.PButton>);
    const host = container.querySelector('p-button')!;

    expect(host.hasAttribute('data-ssr-props')).toBe(false);
    expect(host.getAttribute('data-dsr')).toBe('');
  });

  it('should mark the components within the declarative shadow root as server rendered', () => {
    const container = renderOnServer(<fromComponents.PButton loading={true}>Some label</fromComponents.PButton>);
    const template = container.querySelector('p-button > template') as HTMLTemplateElement;

    expect(template.content.querySelector('p-spinner')!.getAttribute('data-dsr')).toBe('');
  });

  it('should end the declarative shadow root with a marker, also the one of a component within it', () => {
    const container = renderOnServer(<fromComponents.PButton loading={true}>Some label</fromComponents.PButton>);
    const template = container.querySelector('p-button > template') as HTMLTemplateElement;
    const spinnerTemplate = template.content.querySelector('p-spinner > template') as HTMLTemplateElement;

    expect(template.content.lastElementChild!.outerHTML).toBe('<template data-dsr-end=""></template>');
    expect(spinnerTemplate.content.lastElementChild!.outerHTML).toBe('<template data-dsr-end=""></template>');
  });

  it('should not render the marker in the light DOM', () => {
    const container = renderOnServer(<fromComponents.PButton>Some label</fromComponents.PButton>);

    expect(container.querySelector('p-button')!.querySelector(':scope > [data-dsr-end]')).toBe(null);
  });
});
