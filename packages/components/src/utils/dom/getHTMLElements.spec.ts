import { getHTMLElements } from './getHTMLElements';

it('should call querySelectorAll on element with selector parameter', () => {
  const element = document.createElement('div');
  const spy = jest.spyOn(element, 'querySelectorAll');

  getHTMLElements(element, 'span');
  expect(spy).toBeCalledWith('span');

  getHTMLElements(element, 'div');
  expect(spy).toBeCalledWith('div');
});

it('should return result of querySelectorAll', () => {
  const element = document.createElement('div');
  const spanElement = document.createElement('span');
  const slotNodeList = document
    .createElement('div')
    .appendChild(spanElement)
    .appendChild(spanElement)
    .querySelectorAll('slot');
  jest.spyOn(element, 'querySelectorAll').mockReturnValue(slotNodeList);

  expect(getHTMLElements(element, 'span')).toStrictEqual(slotNodeList);
});
