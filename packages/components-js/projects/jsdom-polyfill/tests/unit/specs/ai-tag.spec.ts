import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-ai-tag');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its variant text to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-ai-tag');
  await componentsReady();

  expect(screen.queryAllByText('AI-generated')).toHaveLength(0);
  expect(screen.getAllByShadowText('AI-generated')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-ai-tag');
  expect(screen.getByShadowText('AI-generated')).toBe(shadowRoot.querySelector('div'));
});

it('should expose the abbreviation title to shadow queries', async () => {
  // the abbreviation variant is the only place in the component library that renders a `title` attribute
  document.body.innerHTML = '<p-ai-tag variant="abbreviation"></p-ai-tag>';
  await componentsReady();

  // the translation is lowercase, so the matcher has to be too
  expect(screen.queryAllByTitle('artificial intelligence')).toHaveLength(0);
  expect(screen.getAllByShadowTitle('artificial intelligence')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-ai-tag');
  expect(screen.getByShadowTitle('artificial intelligence')).toBe(shadowRoot.querySelector('abbr'));
});
