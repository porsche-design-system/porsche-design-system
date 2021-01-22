import React, { useState } from 'react';
import { componentsReady, PButton, PButtonProps } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';
import userEvent from '@testing-library/user-event';

const HYDRATED_CLASS = 'hydrated';
const SOME_CLASS_1 = 'someClass1';
const SOME_CLASS_2 = 'someClass2';

type Props = {
  testId?: string;
};

const Sample = ({ testId = 'host' }: Props): JSX.Element => {
  const [counter, setCounter] = useState(0);

  const props: PButtonProps = {
    className: counter % 2 === 0 ? SOME_CLASS_1 + ' ' + SOME_CLASS_2 : SOME_CLASS_1,
    onClick: () => {
      setCounter((prevState) => prevState + 1);
    },
  };

  return (
    <PButton data-testid={testId} {...props}>
      Some label {counter}
    </PButton>
  );
};

describe('PButton', () => {
  it('should map className to class initially', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    const host = getByTestId('host');
    expect(host.classList).toContain(SOME_CLASS_1);
  });

  it('should keep hydrated class on rerender with className change', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    const host = getByTestId('host');
    expect(host.classList).toContain(HYDRATED_CLASS);

    userEvent.click(host);
    expect(host.classList).toContain(HYDRATED_CLASS);
  });

  it('should keep added class on rerender with className change', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    const host = getByTestId('host');
    const addedClass = 'xyClass';

    host.classList.add(addedClass);
    userEvent.click(host);
    expect(host.classList).toContain(addedClass);

    host.classList.remove(addedClass);
    userEvent.click(host);
    expect(host.classList).not.toContain(addedClass);
  });

  it('should keep other classes if one is removed', async () => {
    const { getByTestId } = renderWithProvider(<Sample />);
    await componentsReady();

    const host = getByTestId('host');

    expect(host.classList).toContain(SOME_CLASS_1);
    expect(host.classList).toContain(SOME_CLASS_2);

    userEvent.click(host);

    expect(host.classList).toContain(HYDRATED_CLASS);
    expect(host.classList).toContain(SOME_CLASS_1);
    expect(host.classList).not.toContain(SOME_CLASS_2);
  });

  it('should not interfere with classNames of another PButton', async () => {
    const { getByTestId } = renderWithProvider(
      <>
        <Sample testId="host1" />
        <Sample testId="host2" />
      </>
    );
    await componentsReady();
    const host1 = getByTestId('host1');
    const host2 = getByTestId('host2');

    userEvent.click(host1);
    expect(host1.classList).toContain(HYDRATED_CLASS);
    expect(host1.classList).toContain(SOME_CLASS_1);
    expect(host1.classList).not.toContain(SOME_CLASS_2);

    userEvent.click(host2);
    expect(host2.classList).toContain(HYDRATED_CLASS);
    expect(host2.classList).toContain(SOME_CLASS_1);
    expect(host2.classList).not.toContain(SOME_CLASS_2);
  });
});
