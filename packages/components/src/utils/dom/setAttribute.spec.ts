import { setAttribute } from './setAttribute';

it('should set attribute value', () => {
  const element = document.createElement('div');
  const title = 'Some title';
  setAttribute(element, 'title', title);

  expect(element.getAttribute('title')).toBe(title);
});
