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
        [{ scrollTop: 0, scrollHeight: 1, offsetHeight: 2 }, 1],
        [{ scrollTop: 1, scrollHeight: 2, offsetHeight: 1 }, 0],
        [{ scrollTop: 1, scrollHeight: 3, offsetHeight: 1 }, 1],
      ])('should for array %s return %s', (hostElement, result) => {
        handleHostTouchMove(hostElement as HTMLElement, undefined);
        expect(hostElement.scrollTop).toEqual(result);
      });

      it('should prevent default', () => {
        const event = { preventDefault: () => {} };
        jest.spyOn(event, 'preventDefault');

        handleHostTouchMove({ scrollTop: 0, scrollHeight: 1, offsetHeight: 1 } as HTMLElement, event as TouchEvent);
        expect(event.preventDefault).toBeCalledTimes(1);
      });
    });
    describe('getFirstAndLastElement', () => {
      it.each([
        [
          [{ id: 'first' }, { id: 'middle' }, { id: 'last' }],
          [{ id: 'first' }, { id: 'last' }],
        ],
        [
          [{ id: 'first' }, { id: 'last' }],
          [{ id: 'first' }, { id: 'last' }],
        ],
        [
          [{ id: 'first' }, { id: 'middle' }, { id: 'middle' }, { id: 'last' }],
          [{ id: 'first' }, { id: 'last' }],
        ],
        [[{ id: 'first' }], [{ id: 'first' }, { id: 'first' }]],
        [[], [undefined, undefined]],
      ])('should for array %j return %j', (initArray, resultArray) => {
        expect(getFirstAndLastElement(initArray as HTMLElement[])).toEqual(resultArray as HTMLElement[]);
      });
    });
  });
});
