import React, { useCallback, useState } from 'react';
import {
  componentsReady,
  PButton,
  PTabsBar,
  PPagination,
  PTabs,
  PTabsItem,
} from '@porsche-design-system/components-react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const SampleComponent = (): JSX.Element => {
  const [state, setState] = useState<boolean>(false);

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

const TabsComponent = (): JSX.Element => {
  const [text, setText] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  console.log('TabsComponent');

  return (
    <>
      <PTabs
        activeTabIndex={activeTab}
        onTabChange={(e) => {
          console.log('click', e.detail.activeTabIndex);
          setText(e.detail.activeTabIndex);
        }}
      >
        <PTabsItem label="Button1">Content 1</PTabsItem>
        <PTabsItem label="Button2">Content 2</PTabsItem>
        <PTabsItem label="Button3">Content 3</PTabsItem>
      </PTabs>
      <button data-testid="button1" onClick={() => setActiveTab(0)}>
        Button1
      </button>
      <button data-testid="button2" onClick={() => setActiveTab(1)}>
        Button2
      </button>
      <button data-testid="button3" onClick={() => setActiveTab(2)}>
        Button3
      </button>
      <div data-testid="debug">{`active Tab ${text + 1}`}</div>
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

    const host = getByTestId('host');
    const link = host.shadowRoot.querySelector('a');
    const text = getByTestId('text');

    expect(container).toMatchSnapshot();
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('#some-url');
    expect(text.innerHTML).toBe('some text');

    userEvent.click(screen.getByText('BUTTON'));
    await waitFor(() => {
      expect(screen.getByText('true')).toBeDefined();
    });

    const btn = getByTestId('btn');
    const icon = btn.shadowRoot.querySelector('p-icon');
    expect(icon).not.toBeNull();
  });

  it('should have working events in PTabsBar', async () => {
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

  it('should have working events in TabsComponent', async () => {
    const { getByText, getByTestId } = render(<TabsComponent />);
    await componentsReady();

    const debug = getByTestId('debug');

    const button1 = getByTestId('button1');
    const button2 = getByTestId('button2');
    const button3 = getByTestId('button3');

    expect(debug.innerHTML).toBe('active Tab 1');

    console.log('############# click 2');
    // userEvent.click(screen.getByText('Button2'));
    userEvent.click(button2);
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // await waitFor(() => {
    //   screen.getByText('active Tab 2');
    // });
    expect(debug.innerHTML).toBe('active Tab 2');

    console.log('############# click 3');
    userEvent.click(button3);
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // button3.click();
    expect(debug.innerHTML).toBe('active Tab 3');

    // userEvent.click(screen.getByText('Button1'));
    userEvent.click(button1);
    // await new Promise((resolve) => setTimeout(resolve, 500));
    expect(debug.innerHTML).toBe('active Tab 1');
  });

  it('should have working events in PPagination', async () => {
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
