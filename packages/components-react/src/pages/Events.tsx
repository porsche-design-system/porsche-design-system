import { ChangeEvent, useCallback, useState } from 'react';
import type {
  AccordionChangeEvent,
  CarouselChangeEvent,
  PageChangeEvent,
  SortingChangeEvent,
  SwitchChangeEvent,
  TabChangeEvent,
} from '@porsche-design-system/components-react';
import {
  PAccordion,
  PCarousel,
  PModal,
  PPagination,
  PSwitch,
  PTable,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTabs,
  PTabsBar,
  PTabsItem,
  PTextFieldWrapper,
} from '@porsche-design-system/components-react';

export const EventsPage = (): JSX.Element => {
  const [accordionChangeEventCounter, setAccordionChangeEventCounter] = useState(0);
  const [pageChangeEventCounter, setPageChangeEventCounter] = useState(0);
  const [tabsBarChangeEventCounter, setTabsBarChangeEventCounter] = useState(0);
  const [tabsChangeEventCounter, setTabsChangeEventCounter] = useState(0);
  const [textFieldSearchValue, setTextFieldSearchValue] = useState('');
  const [switchChangeEventCounter, setSwitchChangeEventCounter] = useState(0);
  const [modalCloseEventCounter, setModalCloseEventCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableSortingChangeEventCounter, setTableSortingChangeEventCounter] = useState(0);
  const [carouselChangeEventCounter, setCarouselSortingChangeEventCounter] = useState(0);

  // unused event parameters are used to verify that types can be imported from package root
  const onAccordionChange = useCallback(
    (e: CustomEvent<AccordionChangeEvent>) => setAccordionChangeEventCounter((prev) => prev + 1),
    []
  );
  const onPageChange = useCallback(
    (e: CustomEvent<PageChangeEvent>) => setPageChangeEventCounter((prev) => prev + 1),
    []
  );
  const onTabsBarChange = useCallback(
    (e: CustomEvent<TabChangeEvent>) => setTabsBarChangeEventCounter((prev) => prev + 1),
    []
  );
  const onTabsChange = useCallback(
    (e: CustomEvent<TabChangeEvent>) => setTabsChangeEventCounter((prev) => prev + 1),
    []
  );
  const onTextFieldSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTextFieldSearchValue(e.target.value),
    []
  );
  const onSwitchChange = useCallback(
    (e: CustomEvent<SwitchChangeEvent>) => setSwitchChangeEventCounter((prev) => prev + 1),
    []
  );
  const onModalClose = useCallback(() => {
    setModalCloseEventCounter((prev) => prev + 1);
    setIsModalOpen(false);
  }, []);
  const onTableSortingChange = useCallback(
    (e: CustomEvent<SortingChangeEvent>) => setTableSortingChangeEventCounter((prev) => prev + 1),
    []
  );
  const onCarouselChange = useCallback(
    (e: CustomEvent<CarouselChangeEvent>) => setCarouselSortingChangeEventCounter((prev) => prev + 1),
    []
  );

  return (
    <>
      <div className="playground light">
        <PAccordion heading="Some heading" onAccordionChange={onAccordionChange} />
        <p>{accordionChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} onPageChange={onPageChange} />
        <p>{pageChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PTabsBar activeTabIndex={0} onTabChange={onTabsBarChange}>
          <button>Tab 1</button>
          <button>Tab 2</button>
          <button>Tab 3</button>
        </PTabsBar>
        <p>{tabsBarChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PTabs activeTabIndex={0} onTabChange={onTabsChange}>
          <PTabsItem label="Tab 1">Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Content 3</PTabsItem>
        </PTabs>
        <p>{tabsChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PTextFieldWrapper>
          <input type="search" value={textFieldSearchValue} onChange={onTextFieldSearchChange} />
        </PTextFieldWrapper>
        <p>Value: {textFieldSearchValue}</p>
      </div>

      <div className="playground light">
        <PSwitch onSwitchChange={onSwitchChange}>Switch</PSwitch>
        <p>{switchChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PModal open={isModalOpen} onClose={onModalClose}>
          Modal
        </PModal>
        <p>
          {modalCloseEventCounter} <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        </p>
      </div>

      <div className="playground light">
        <PTable onSortingChange={onTableSortingChange}>
          <PTableHead>
            <PTableHeadRow>
              <PTableHeadCell sort={{ id: 'col1', active: true, direction: 'asc' }}>Col 1</PTableHeadCell>
            </PTableHeadRow>
          </PTableHead>
        </PTable>
        <p>{tableSortingChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PCarousel onCarouselChange={onCarouselChange}>
          <div children="Slide 1" />
          <div children="Slide 2" />
          <div children="Slide 3" />
        </PCarousel>
        <p>{carouselChangeEventCounter}</p>
      </div>
    </>
  );
};
