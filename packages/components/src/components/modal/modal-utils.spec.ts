import { clickStartedInScrollbarTrack } from './modal-utils';

describe('clickStartedInScrollbarTrack()', () => {
  const ev = new MouseEvent('click', { clientX: 100 });

  it('should return false if scrollHeight > offsetHeight', () => {
    const host = document.createElement('div');
    Object.defineProperty(host, 'offsetHeight', { value: 600 });
    Object.defineProperty(host, 'scrollHeight', { value: 400 });

    expect(clickStartedInScrollbarTrack(host, ev)).toBe(false);
  });

  it('should return true if scrollWidth === offsetWidth and clientX > clientWidth', () => {
    const host = document.createElement('div');
    Object.defineProperty(host, 'offsetHeight', { value: 400 });
    Object.defineProperty(host, 'clientWidth', { value: 116 });
    Object.defineProperty(host, 'scrollHeight', { value: 600 });

    expect(clickStartedInScrollbarTrack(host, ev)).toBe(true);
  });

  it('should return false if scrollWidth !== offsetWidth and clientX < clientWidth', () => {
    const host = document.createElement('div');
    Object.defineProperty(host, 'offsetHeight', { value: 400 });
    Object.defineProperty(host, 'clientWidth', { value: 100 });
    Object.defineProperty(host, 'scrollHeight', { value: 600 });
    Object.defineProperty(host, 'scrollWidth', { value: 100 });
    Object.defineProperty(host, 'offsetWidth', { value: 90 });

    expect(clickStartedInScrollbarTrack(host, ev)).toBe(false);
  });
});
