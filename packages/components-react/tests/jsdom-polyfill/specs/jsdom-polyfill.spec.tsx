import React, { useCallback, useState } from 'react';
import { componentsReady, PButton, PHeadline } from '@porsche-design-system/components-react';
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

const SingleComponent = (): JSX.Element => <PHeadline>Some headline</PHeadline>;

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

  it('renders a headline from Porsche Design System', () => {
    const { getByText } = render(<SingleComponent />);
    const headLineElement = getByText('Some headline');
    expect(headLineElement).toBeInTheDocument();
  });
});
