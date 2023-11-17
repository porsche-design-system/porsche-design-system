import { setScrollLock } from './setScrollLock';

it('should add correct body styles on iOS Safari for parameter isOpen: true', () => {
  jest.spyOn(window, 'navigator', 'get').mockImplementation(
    () =>
      ({
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      } as any)
  );
  expect(document.body.getAttribute('style')).toBe(null);
  setScrollLock(true);

  expect(document.body.style.top).toBe('0px');
  expect(document.body.style.overflowY).toBe('scroll');
  expect(document.body.style.position).toBe('fixed');
});

it('should only remove previously added body styles on iOS Safari for parameter isOpen: false', () => {
  jest.spyOn(window, 'navigator', 'get').mockImplementation(
    () =>
      ({
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      } as any)
  );

  document.body.style.display = 'flex';
  setScrollLock(true);
  setScrollLock(false);

  expect(document.body.style.top).toBe('');
  expect(document.body.style.overflowY).toBe('');
  expect(document.body.style.position).toBe('');
  expect(document.body.getAttribute('style')).toBe('display: flex;');
});

it('should add correct body styles on Desktop Safari for parameter isOpen: true', () => {
  jest.spyOn(window, 'navigator', 'get').mockImplementation(
    () =>
      ({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      } as any)
  );
  setScrollLock(true);

  expect(document.body.style.overflow).toBe('hidden');
});

it('should add correct body styles on Desktop Chrome for parameter isOpen: true', () => {
  jest.spyOn(window, 'navigator', 'get').mockImplementation(
    () =>
      ({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      } as any)
  );
  setScrollLock(true);

  expect(document.body.style.overflow).toBe('hidden');
});

it('should add correct body styles on Desktop Firefox for parameter isOpen: true', () => {
  jest.spyOn(window, 'navigator', 'get').mockImplementation(
    () =>
      ({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/114.0',
      } as any)
  );
  setScrollLock(true);

  expect(document.body.style.overflow).toBe('hidden');
});

it('should only remove previously added body styles on Desktop Safari for parameter isOpen: false', () => {
  jest.spyOn(window, 'navigator', 'get').mockImplementation(
    () =>
      ({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      } as any)
  );

  document.body.style.display = 'flex';
  document.body.style.top = '0px';
  setScrollLock(true);
  setScrollLock(false);

  expect(document.body.style.overflow).toBe('');
  expect(document.body.getAttribute('style')).toBe('display: flex; top: 0px;');
});
