import React, { useCallback, useState } from 'react';
import { componentsReady, PButton } from '@porsche-design-system/components-react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const StyleReplace = (): JSX.Element => {
  const [state, setState] = useState<boolean>(false);

  const handleOnClick = useCallback(() => {
    setTimeout(() => {
      setState(true);
    }, 100);
  }, []);

  return (
    <>
      <PButton data-testid="btn" onClick={handleOnClick}>
        BUTTON
      </PButton>
      {String(state)}
    </>
  );
};

jest.setTimeout(30000);

describe('jsdom-polyfill', () => {
  it('should render web component with shadowRoot', async () => {
    const { container, getByTestId } = render(<StyleReplace />);

    await componentsReady();
    expect(container).toMatchSnapshot();

    userEvent.click(screen.getByText('BUTTON'));
    await waitFor(() => {
      screen.getByText('true');
    });

    const btn = getByTestId('btn');
    const icon = btn.shadowRoot.querySelector('p-icon');
    expect(icon).not.toBeNull();
  });
});
