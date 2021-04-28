import { useCallback, useState } from 'react';
import { PPagination, PTabsBar } from '@porsche-design-system/components-react';

export const EventsPage = (): JSX.Element => {
  const [pageChangeEventCounter, setPageChangeEventCounter] = useState(0);
  const [tabChangeEventCounter, setTabChangeEventCounter] = useState(0);

  console.log(pageChangeEventCounter, tabChangeEventCounter);

  const onPageChange = useCallback(() => setPageChangeEventCounter((prev) => prev + 1), []);
  const onTabChange = useCallback(() => setTabChangeEventCounter((prev) => prev + 1), []);

  return (
    <>
      <div className="playground light">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} onPageChange={onPageChange} />
        <p>{pageChangeEventCounter}</p>
      </div>
      <div className="playground light">
        <PTabsBar activeTabIndex={0} onTabChange={onTabChange}>
          <button>Tab 1</button>
          <button>Tab 2</button>
          <button>Tab 3</button>
          <button>Tab 4</button>
          <button>Tab 5</button>
          <button>Tab 6</button>
          <button>Tab 7</button>
        </PTabsBar>
        <p>{tabChangeEventCounter}</p>
      </div>
    </>
  );
};
