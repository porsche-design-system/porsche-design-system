import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, type JSX, type MutableRefObject, useRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import * as hooks from '../../../src/hooks';
import { PButton } from '../../../src/public-api';
import { getMergedClassName, skipPorscheDesignSystemCDNRequestsDuringTests, syncRef } from '../../../src/utils';

describe('getMergedClassName()', () => {
  test.each`
    domClasses | oldClassName   | newClassName        | expected
    ${''}      | ${undefined}   | ${''}               | ${''}
    ${''}      | ${''}          | ${undefined}        | ${''}
    ${''}      | ${undefined}   | ${undefined}        | ${''}
    ${''}      | ${''}          | ${''}               | ${''}
    ${''}      | ${''}          | ${'old1'}           | ${'old1'}
    ${''}      | ${'old1'}      | ${''}               | ${''}
    ${''}      | ${'old1'}      | ${'old1'}           | ${'old1'}
    ${''}      | ${'old1 old2'} | ${'old1'}           | ${'old1'}
    ${''}      | ${'old1 old2'} | ${'old1 old2'}      | ${'old1 old2'}
    ${''}      | ${'old1 old2'} | ${'old1 new1'}      | ${'old1 new1'}
    ${''}      | ${'old1 old2'} | ${'old1 old2 new1'} | ${'old1 old2 new1'}
    ${'dom1'}  | ${''}          | ${'new1'}           | ${'new1 dom1'}
    ${'dom1'}  | ${'old1'}      | ${'old1'}           | ${'old1 dom1'}
    ${'dom1'}  | ${'old1'}      | ${'old1 new1'}      | ${'old1 new1 dom1'}
    ${'dom1'}  | ${'old1 old2'} | ${'old1'}           | ${'old1 dom1'}
    ${'dom1'}  | ${'old1 old2'} | ${'old1 new1'}      | ${'old1 new1 dom1'}
  `(
    "should be called with ('$domClasses', '$oldClassName', '$newClassName') and return '$expected'",
    ({ domClasses, oldClassName, newClassName, expected }) => {
      const result = getMergedClassName(domClasses, oldClassName, newClassName);
      expect(result).toBe(expected);
    }
  );
});

const INITIAL_CLASS_NAME = 'initialClass';
const CLASS_NAME = 'someClass1 hydrated';

type Props = { isRefCallback?: boolean };
const Sample = ({ isRefCallback }: Props): JSX.Element => {
  const buttonRef = useRef<HTMLElement | null>(null);

  return (
    <PButton
      className={INITIAL_CLASS_NAME}
      data-testid="button"
      ref={
        isRefCallback
          ? (el) => {
              buttonRef.current = el;
            }
          : buttonRef
      }
      onClick={() => {
        buttonRef.current!.className = CLASS_NAME;
      }}
    >
      Some Button
    </PButton>
  );
};

afterEach(() => {
  cleanup();
});

describe('syncRefs()', () => {
  beforeEach(() => {
    // mocked usePrefix so we don't have to use PorscheDesignSystemProvider
    vi.spyOn(hooks, 'usePrefix').mockImplementation((tagName) => tagName);
  });

  it('should sync refs if ref is set directly', async () => {
    const { getByTestId } = render(<Sample />);
    const button = getByTestId('button');

    expect(button.className).toBe(INITIAL_CLASS_NAME);

    await userEvent.click(button);

    expect(button.className).toBe(CLASS_NAME);
  });

  it('should sync refs if ref is set as callback', async () => {
    const { getByTestId } = render(<Sample isRefCallback />);
    const button = getByTestId('button');

    expect(button.className).toBe(INITIAL_CLASS_NAME);

    await userEvent.click(button);

    expect(button.className).toBe(CLASS_NAME);
  });

  it('should preserve the element type and clear object refs on detach', () => {
    const element = document.createElement('input');
    const elementRef: MutableRefObject<HTMLInputElement | undefined> = { current: undefined };
    const forwardedRef = createRef<HTMLInputElement>();
    const callback = syncRef(elementRef, forwardedRef);

    callback(element);
    expect(elementRef.current).toBe(element);
    expect(forwardedRef.current).toBe(element);

    callback(null);
    expect(elementRef.current).toBeUndefined();
    expect(forwardedRef.current).toBeNull();
  });

  it('should forward the element and null to callback refs', () => {
    const element = document.createElement('input');
    const elementRef: MutableRefObject<HTMLInputElement | undefined> = { current: undefined };
    const forwardedRef = vi.fn<(element: HTMLInputElement | null) => void>();
    const callback = syncRef(elementRef, forwardedRef);

    callback(element);
    callback(null);

    expect(forwardedRef.mock.calls).toEqual([[element], [null]]);
    expect(elementRef.current).toBeUndefined();
  });

  it('should synchronize the internal ref without a forwarded ref', () => {
    const element = document.createElement('input');
    const elementRef: MutableRefObject<HTMLInputElement | undefined> = { current: undefined };
    const callback = syncRef(elementRef, null);

    callback(element);
    expect(elementRef.current).toBe(element);
    callback(null);
    expect(elementRef.current).toBeUndefined();
  });
});

describe('skipPorscheDesignSystemCDNRequestsDuringTests()', () => {
  it('should set window variable PDS_SKIP_FETCH true', () => {
    const getPDS_SKIP_FETCH = () => (window as any).PDS_SKIP_FETCH;

    expect(getPDS_SKIP_FETCH()).toBeUndefined();

    skipPorscheDesignSystemCDNRequestsDuringTests();

    expect(getPDS_SKIP_FETCH()).toBe(true);
  });
});
