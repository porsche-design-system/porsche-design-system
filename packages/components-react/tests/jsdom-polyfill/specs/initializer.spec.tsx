import React from 'react';
import { componentsReady, PButton } from '@porsche-design-system/components-react';
import { renderWithProvider } from '../helpers';

const Sample = (multipleClassNames?: boolean): JSX.Element => {
  const className = multipleClassNames ? 'someClass anotherClass thirdClass' : 'someClass';
  return (
    <>
      <PButton data-testid="host" className={className}>
        Some label
      </PButton>
    </>
  );
};

describe('PButton', () => {
  it('should map className to class initially', () => {
    const { getByTestId } = renderWithProvider(Sample());

    expect(getByTestId('host').classList).toContain('someClass');
  });
  it('should add className to class after timeout', async () => {
    const { getByTestId } = renderWithProvider(Sample());
    const host = getByTestId('host');
    const className = 'anotherClass';

    await componentsReady();
    host.classList.add(className);

    expect(host.classList).toContain('someClass');
    expect(host.classList).toContain(className);
  });
  it('should remove className from class', () => {
    const { getByTestId } = renderWithProvider(Sample(true));
    const host = getByTestId('host');
    const className = 'thirdClass';

    expect(host.classList).toContain(className);

    host.classList.remove(className);

    expect(host.classList).not.toContain(className);
  });
});
