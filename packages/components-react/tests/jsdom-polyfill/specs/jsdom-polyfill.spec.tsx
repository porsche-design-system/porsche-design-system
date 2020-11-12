import React, { useCallback, useState } from 'react';
import { componentsReady, PButton, PTabsBar, PPagination } from '@porsche-design-system/components-react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const SampleComponent = (): JSX.Element => {
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

const TabsBarComponent = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  console.log('hi');

  return (
    <>
      <PTabsBar
        activeTabIndex={activeTab}
        onTabChange={(e) => {
          console.log('click', e.detail.activeTabIndex);
          setActiveTab(e.detail.activeTabIndex);
        }}
      >
        <button data-testid="button1">Button1</button>
        <button data-testid="button2" onClick={() => console.log('asd')}>
          Button2
        </button>
        <button data-testid="button3" onClick={() => console.log('xyz')}>
          Button3
        </button>
      </PTabsBar>
      <div data-testid="debug">{`active Tab ${activeTab + 1}`}</div>
    </>
  );
};

const AnotherComponent = (): JSX.Element => {
  const [text, setText] = useState(-1);
  const [activePage, setActivePage] = useState(1);
  return (
    <>
      <PPagination
        data-testid="host"
        totalItemsCount={500}
        itemsPerPage={25}
        activePage={activePage}
        onPageChange={(e: any) => {
          console.log('pageChange', e.detail.page);
          setActivePage(e.detail.page);
          setText(e.detail.page);
        }}
      />
      {/*<PTabsBar data-testid="host" onTabChange={(e) => console.log('##########################', e.detail.activeTabIndex)}>*/}
      {/*  <button type="button">First tab</button>*/}
      {/*  <button type="button">Second tab</button>*/}
      {/*  <button type="button">Third tab</button>*/}
      {/*</PTabsBar>*/}
      <p data-testid="text" onClick={() => setActivePage(2)}>
        active tab index: {text}
      </p>
      <p data-testid="text2" onClick={() => setActivePage(3)}>
        asd
      </p>
    </>
  );
};

describe('jsdom-polyfill', () => {
  it('should render web component with shadowRoot', async () => {
    const { container, getByTestId } = render(<SampleComponent />);

    await componentsReady();
    expect(container).toMatchSnapshot();

    userEvent.click(screen.getByText('BUTTON'));
    await waitFor(() => {
      expect(screen.getByText('true')).toBeDefined();
    });

    const btn = getByTestId('btn');
    const icon = btn.shadowRoot.querySelector('p-icon');
    expect(icon).not.toBeNull();
  });

  fit('should have working events in PTabsBar', async () => {
    const { getByText, getByTestId } = render(<TabsBarComponent />);
    await componentsReady();

    const debug = getByTestId('debug');

    const button1 = getByTestId('button1');
    const button2 = getByTestId('button2');
    const button3 = getByTestId('button3');

    expect(debug.innerHTML).toBe('active Tab 1');

    console.log('############# click 2');
    // userEvent.click(screen.getByText('Button2'));
    userEvent.click(button2);
    // await waitFor(() => {
    //   screen.getByText('active Tab 2');
    // });
    expect(debug.innerHTML).toBe('active Tab 2');

    console.log('#############');
    // await new Promise((resolve) => setTimeout(resolve, 10));

    expect(true).toBe(true);
    console.log('############# click 3');
    userEvent.click(button3);
    // button3.click();
    expect(debug.innerHTML).toBe('active Tab 3');

    // userEvent.click(screen.getByText('Button1'));
    userEvent.click(button1);
    expect(debug.innerHTML).toBe('active Tab 1');
  });

  it('should render web component with shadowRoot', async () => {
    const { getByTestId } = render(<AnotherComponent />);
    await componentsReady();

    const host = getByTestId('host');
    const text = getByTestId('text');
    const text2 = getByTestId('text2');
    // expect(text.innerHTML).toBe('active tab index: 1');
    userEvent.click(text);
    expect(text.innerHTML).toBe('active tab index: 2');

    // await new Promise((resolve) => setTimeout(resolve, 50));
    userEvent.click(text2);
    // await new Promise((resolve) => setTimeout(resolve, 50));
    expect(text.innerHTML).toBe('active tab index: 3');
    // expect(text.innerHTML).toBe('active tab index: -1');
    //
    // await componentsReady();
    //
    // // expect(text.innerHTML).toBe('active tab index: 1');
    //
    // userEvent.click(screen.getByText('Third tab'));
    //
    // expect(text.innerHTML).toBe('active tab index: 2');
  });
});
