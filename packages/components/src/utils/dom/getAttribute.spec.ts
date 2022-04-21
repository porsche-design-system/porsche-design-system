import { getAttribute } from './getAttribute';

it('should return attribute value', () => {
  const element = document.createElement('div');
  const title = 'Some title';
  element.setAttribute('title', title);

  expect(getAttribute(element, 'title')).toBe(title);
});
