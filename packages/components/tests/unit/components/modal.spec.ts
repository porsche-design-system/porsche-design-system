import {
  getFirstAndLastElement,
  handleHostTouchMove,
  getFocusableElements,
  setScrollLock,
} from '../../../src/components/content/modal/modal-utils';

describe('modal', () => {
  describe('modal-utils', () => {
    describe('setScrollLock', () => {
      it('should add body style overflow hidden', () => {
        setScrollLock({} as HTMLElement, true);

        expect(document.body.style.overflow).toBe('hidden');
      });

      it('should remove body style overflow hidden', () => {
        setScrollLock({} as HTMLElement, true);
        setScrollLock({} as HTMLElement, false);

        expect(document.body.style.overflow).toBe('');
      });

      describe('eventListener', () => {
        let windowSpy;
        let documentEvents: string[] = [];
        let hostEvents: string[] = [];
        const host = document.createElement('div');

        const defaultAddEventListener = document.addEventListener;
        const defaultHostAddEventListener = host.addEventListener;

        const defaultRemoveEventListener = document.removeEventListener;
        const defaultHostRemoveEventListener = host.removeEventListener;

        beforeEach(() => {
          windowSpy = jest.spyOn(window, 'window', 'get');
          windowSpy.mockImplementation(() => ({
            navigator: {
              platform: 'iPhone',
            },
          }));

          document.addEventListener = jest.fn((eventName) => documentEvents.push(eventName));
          host.addEventListener = jest.fn((eventName) => hostEvents.push(eventName));

          document.removeEventListener = jest.fn(
            (event) => (documentEvents = documentEvents.filter((x) => x !== event))
          );
          host.removeEventListener = jest.fn((event) => (hostEvents = hostEvents.filter((x) => x !== event)));
        });

        afterEach(() => {
          documentEvents = [];
          hostEvents = [];

          document.addEventListener = defaultAddEventListener;
          host.addEventListener = defaultHostAddEventListener;

          document.removeEventListener = defaultRemoveEventListener;
          host.removeEventListener = defaultHostRemoveEventListener;

          windowSpy.mockRestore();
        });

        it('should add touchmove eventListener', () => {
          setScrollLock(host, true);

          expect(documentEvents).toEqual(['touchmove']);
          expect(hostEvents).toEqual(['touchmove']);
        });

        it('should remove touchmove eventListener', () => {
          setScrollLock(host, true);
          setScrollLock(host, false);

          expect(documentEvents).toEqual([]);
          expect(hostEvents).toEqual([]);
        });
      });
    });

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
      ])('should for array %s return %s', (hostElement: HTMLElement, expected) => {
        const result = handleHostTouchMove(hostElement, undefined);
        expect(result).toEqual(expected);
      });

      it('should prevent default', () => {
        const event: TouchEvent = { preventDefault: () => {} } as TouchEvent;
        jest.spyOn(event, 'preventDefault');

        handleHostTouchMove({ scrollTop: 0, scrollHeight: 1, offsetHeight: 1 } as HTMLElement, event);
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
      ])('should for array %j return %j', (initArray: HTMLElement[], resultArray: HTMLElement[]) => {
        expect(getFirstAndLastElement(initArray)).toEqual(resultArray);
      });
    });
  });
});
