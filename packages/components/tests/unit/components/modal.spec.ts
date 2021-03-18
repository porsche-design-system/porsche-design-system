import {
  getFirstAndLastElement,
  handleHostTouchMove,
  getFocusableElements,
} from '../../../src/components/content/modal/modal-utils';

describe('modal', () => {
  describe('modal-utils', () => {
    describe('getFocusableElements', () => {
      it('should return focusable elements', () => {
        const host = document.createElement('div');
        const closeButton = document.createElement('button');

        const anchor = document.createElement('a');
        anchor.href = 'abc';

        const input = document.createElement('input');

        const textarea = document.createElement('textarea');
        textarea.disabled = true;

        host.appendChild(anchor);
        host.appendChild(input);
        host.appendChild(textarea);

        expect(getFocusableElements(host, closeButton)).toEqual([closeButton, anchor, input]);
      });
    });

    describe('handleHostTouchMove', () => {
      it.each([
        [{ scrollTop: 0, scrollHeight: 1, offsetHeight: 2 } as HTMLElement, 1],
        [{ scrollTop: 1, scrollHeight: 2, offsetHeight: 1 } as HTMLElement, 0],
        [{ scrollTop: 1, scrollHeight: 3, offsetHeight: 1 } as HTMLElement, 1],
      ])('should for array %s return %s', (hostElement, result) => {
        handleHostTouchMove(undefined, hostElement);
        expect(hostElement.scrollTop).toEqual(result);
      });

      it('should prevent default', () => {
        const event = { preventDefault: () => {} };
        jest.spyOn(event, 'preventDefault');

        handleHostTouchMove(event as TouchEvent, { scrollTop: 0, scrollHeight: 1, offsetHeight: 1 } as HTMLElement);
        expect(event.preventDefault).toBeCalledTimes(1);
      });
    });
    describe('getFirstAndLastElement', () => {
      it.each([
        [
          [{ id: 'first' } as HTMLElement, { id: 'middle' } as HTMLElement, { id: 'last' } as HTMLElement],
          [{ id: 'first' } as HTMLElement, { id: 'last' } as HTMLElement],
        ],
        [
          [{ id: 'first' } as HTMLElement, { id: 'last' } as HTMLElement],
          [{ id: 'first' } as HTMLElement, { id: 'last' } as HTMLElement],
        ],
        [
          [
            { id: 'first' } as HTMLElement,
            { id: 'middle' } as HTMLElement,
            { id: 'middle' } as HTMLElement,
            { id: 'last' } as HTMLElement,
          ],
          [{ id: 'first' } as HTMLElement, { id: 'last' } as HTMLElement],
        ],
        [[{ id: 'first' } as HTMLElement], [{ id: 'first' } as HTMLElement, { id: 'first' } as HTMLElement]],
        [[], [undefined, undefined]],
      ])('should for array %j return %j', (initArray, resultArray) => {
        expect(getFirstAndLastElement(initArray)).toEqual(resultArray);
      });
    });
  });
});
