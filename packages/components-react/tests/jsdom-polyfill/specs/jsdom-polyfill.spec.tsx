import React, { useCallback, useState } from 'react';
import { componentsReady, PLink } from '@porsche-design-system/components-react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const SomeComponent = (): JSX.Element => {
  const [text, setText] = useState('some text');

  const handleOnClick = useCallback(() => {
    setText('another text after click on link');
  }, []);

  return (
    <>
      <PLink href="#some-url" data-testid="host" onClick={handleOnClick}>
        LINK
      </PLink>
      <p data-testid="text">{text}</p>
    </>
  );
};
describe('jsdom-polyfill', () => {
  it('should render web component with shadowRoot', async () => {
    const { container, getByTestId } = render(<SomeComponent />);

    await componentsReady();

    const host = getByTestId('host');
    const link = host.shadowRoot.querySelector('a');
    const text = getByTestId('text');

    expect(container).toMatchSnapshot();
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('#some-url');
    expect(text.innerHTML).toBe('some text');

    userEvent.click(screen.getByText('LINK'));

    expect(text.innerHTML).toBe('another text after click on link');
  });
});
