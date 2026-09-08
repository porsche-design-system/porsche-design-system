import { vi } from 'vitest';
import { createTopLayerController, type TopLayerOptions } from './createTopLayerController';

const mockOverlaySupport = (supported: boolean): void => {
  vi.stubGlobal('CSS', { supports: vi.fn().mockReturnValue(supported) });
};

type SetupResult = {
  controller: ReturnType<typeof createTopLayerController>;
  show: ReturnType<typeof vi.fn>;
  hide: ReturnType<typeof vi.fn>;
  element: HTMLElement;
  setShown: (shown: boolean) => void;
};

const setup = (overrides: Partial<TopLayerOptions> = {}): SetupResult => {
  const element = document.createElement('div');
  let shown = true;
  const show = vi.fn(() => {
    shown = true;
  });
  const hide = vi.fn(() => {
    shown = false;
  });
  const controller = createTopLayerController({
    getElement: () => element,
    isShown: () => shown,
    show,
    hide,
    ...overrides,
  });
  return { controller, show, hide, element, setShown: (value: boolean) => (shown = value) };
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('requestShow()', () => {
  it('should call show() when the element is not shown', () => {
    mockOverlaySupport(true);
    const { controller, show } = setup({ isShown: () => false });

    controller.requestShow();

    expect(show).toHaveBeenCalledTimes(1);
  });

  it('should be a no-op when the element is already shown (idempotent)', () => {
    mockOverlaySupport(true);
    const { controller, show } = setup({ isShown: () => true });

    controller.requestShow();

    expect(show).not.toHaveBeenCalled();
  });

  it('should cancel a pending deferred hide and not hide afterwards (re-open during fade-out)', () => {
    vi.useFakeTimers();
    mockOverlaySupport(false);
    const { controller, hide, show } = setup(); // starts shown

    controller.requestHide(); // deferred hide scheduled, element still shown
    controller.requestShow(); // re-opened: cancels the pending hide; show() skipped since still shown

    vi.advanceTimersByTime(1000);
    expect(hide).not.toHaveBeenCalled();
    expect(show).not.toHaveBeenCalled();
  });
});

describe('requestHide()', () => {
  it('should hide immediately when overlay transition is supported (Chromium)', () => {
    mockOverlaySupport(true);
    const { controller, hide } = setup();

    controller.requestHide();

    expect(hide).toHaveBeenCalledTimes(1);
  });

  it('should NOT hide immediately when overlay transition is unsupported (Safari/Firefox)', () => {
    mockOverlaySupport(false);
    const { controller, hide } = setup();

    controller.requestHide();

    expect(hide).not.toHaveBeenCalled();
  });

  it('should hide via timeout after the transition duration when overlay transition is unsupported', () => {
    vi.useFakeTimers();
    mockOverlaySupport(false);
    const { controller, hide } = setup();

    controller.requestHide();
    expect(hide).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(hide).toHaveBeenCalledTimes(1);
  });

  it('should not hide if the element was hidden by other means before the timeout fires', () => {
    vi.useFakeTimers();
    mockOverlaySupport(false);
    const { controller, hide, setShown } = setup();

    controller.requestHide();
    setShown(false);

    vi.advanceTimersByTime(1000);
    expect(hide).not.toHaveBeenCalled();
  });

  it('should be a no-op when the element is not shown', () => {
    mockOverlaySupport(true);
    const { controller, hide } = setup({ isShown: () => false });

    controller.requestHide();

    expect(hide).not.toHaveBeenCalled();
  });

  it('should reschedule (not stack) when called again before the timeout fires', () => {
    vi.useFakeTimers();
    mockOverlaySupport(false);
    const { controller, hide } = setup();

    controller.requestHide();
    controller.requestHide();

    vi.advanceTimersByTime(1000);
    expect(hide).toHaveBeenCalledTimes(1);
  });
});

describe('cancel()', () => {
  it('should prevent the scheduled hide (e.g. re-open during fade-out)', () => {
    vi.useFakeTimers();
    mockOverlaySupport(false);
    const { controller, hide } = setup();

    controller.requestHide();
    controller.cancel();

    vi.advanceTimersByTime(1000);

    expect(hide).not.toHaveBeenCalled();
  });
});
