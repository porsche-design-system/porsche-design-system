import { setScrollLock } from './scrollLock';

describe('setFocusTrap()', () => {
  it('should add body style overflow: hidden', () => {
    setScrollLock(true);

    expect(document.body.style.overflow).toBe('hidden');
  });
  it('should remove body style overflow: hidden', () => {
    setScrollLock(true);
    setScrollLock(false);

    expect(document.body.style.overflow).toBe('');
  });
});
