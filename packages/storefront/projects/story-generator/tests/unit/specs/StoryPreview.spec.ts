import * as components from '@porsche-design-system/components-react/ssr';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { pascalCase } from 'change-case';
import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { HTMLTagOrComponent, Story } from '../../../src';
import { StoryPreview } from '../../../src/react';

const story: Story<HTMLTagOrComponent> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => [
    { tag: 'p-button', properties: { type: 'button' }, children: ['Open'] },
    {
      tag: 'div',
      properties: { className: 'wrapper' },
      children: [{ tag: 'p-modal', properties }, (properties as { open?: boolean })?.open ? 'is open' : 'is closed'],
    },
  ],
};

const render = (children: ReactNode): string =>
  renderToStaticMarkup(createElement(components.PorscheDesignSystemProvider, null, children));

describe('StoryPreview', () => {
  it.each(TAG_NAMES.filter((tag) => !INTERNAL_TAG_NAMES.includes(tag)))(
    'should find the React component for %s',
    (tag) => {
      expect(components).toHaveProperty(pascalCase(tag));
    }
  );

  it('should render a story with its own state', () => {
    const markup = render(createElement(StoryPreview, { story }));

    expect(markup).toContain('<p-button');
    expect(markup).toContain('<div class="wrapper"><p-modal');
    expect(markup).toContain('is closed</div>');
  });

  it('should render a story in the given state', () => {
    const markup = render(
      createElement(StoryPreview, { story, state: { properties: { open: true } }, onStateChange: () => {} })
    );

    expect(markup).toContain('is open</div>');
  });
});
