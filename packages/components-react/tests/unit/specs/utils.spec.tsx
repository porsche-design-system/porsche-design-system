import { useRef } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PButton, PorscheDesignSystemProvider } from '../../../projects/components-wrapper/src';
import { getMergedClassName } from '../../../projects/components-wrapper/src/utils';

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
  const INITIAL_CLASS_NAME = 'initialClass';
  const CLASS_NAME = 'someClass1 hydrated';

  type Props = { isRefCallback?: boolean };
  const Sample = ({ isRefCallback }: Props): JSX.Element => {
    const buttonRef = useRef(undefined);

    // TODO: mock PorscheDesignSystemProvider
    return (
      <PorscheDesignSystemProvider>
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
            buttonRef.current.className = CLASS_NAME;
          }}
        >
          Some Button
        </PButton>
      </PorscheDesignSystemProvider>
    );
  };

  it('should sync refs if ref is set directly', () => {
    const { getByTestId } = render(<Sample />);
    const button = getByTestId('button');

    expect(button.className).toBe(INITIAL_CLASS_NAME);

    userEvent.click(button);

    expect(button.className).toBe(CLASS_NAME);
  });

  it('should sync refs if ref is set as callback', () => {
    const { getByTestId } = render(<Sample isRefCallback />);
    const button = getByTestId('button');

    expect(button.className).toBe(INITIAL_CLASS_NAME);

    userEvent.click(button);

    expect(button.className).toBe(CLASS_NAME);
  });
});
