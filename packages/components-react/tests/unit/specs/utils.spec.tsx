import { useRef } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PButton } from '../../../projects/components-wrapper/src/public-api';
import {
  getMergedClassName,
  skipPorscheDesignSystemCDNRequestsDuringTests,
} from '../../../projects/components-wrapper/src/utils';
import * as hooks from '../../../projects/components-wrapper/src/hooks';
import { PDS_SKELETON_CLASS_PREFIX } from '@porsche-design-system/components/src/styles/skeletons';

describe('getMergedClassName', () => {
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

describe('syncRefs', () => {
  beforeEach(() => {
    // mocked usePrefix so we don't have to use PorscheDesignSystemProvider
    jest.spyOn(hooks, 'usePrefix').mockImplementation((tagName: string) => tagName);
    jest.spyOn(hooks, 'usesSkeletons');
  });
  const SKELETON_CLASSES = `${PDS_SKELETON_CLASS_PREFIX}theme-light ${PDS_SKELETON_CLASS_PREFIX}variant-secondary`;
  const INITIAL_CLASS_NAME = 'initialClass';
  const CLASS_NAME = 'someClass1 hydrated';

  type Props = { isRefCallback?: boolean };
  const Sample = ({ isRefCallback }: Props): JSX.Element => {
    const buttonRef = useRef(undefined);

    return (
      <PButton
        className={INITIAL_CLASS_NAME}
        data-testid="button"
        ref={isRefCallback ? (el) => (buttonRef.current = el) : buttonRef}
        onClick={() => {
          buttonRef.current.className = CLASS_NAME;
        }}
      >
        Some Button
      </PButton>
    );
  };

  it('should sync refs if ref is set directly', () => {
    const { getByTestId } = render(<Sample />);
    const button = getByTestId('button');

    expect(button.className).toBe(`${INITIAL_CLASS_NAME} ${SKELETON_CLASSES}`);

    userEvent.click(button);

    expect(button.className).toBe(CLASS_NAME);
  });

  it('should sync refs if ref is set as callback', () => {
    const { getByTestId } = render(<Sample isRefCallback />);
    const button = getByTestId('button');

    expect(button.className).toBe(`${INITIAL_CLASS_NAME} ${SKELETON_CLASSES}`);

    userEvent.click(button);

    expect(button.className).toBe(CLASS_NAME);
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
