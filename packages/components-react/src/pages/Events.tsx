import { ChangeEvent, useCallback, useState } from 'react';
import type {
  AccordionChangeEvent,
  CarouselChangeEvent,
  PaginationChangeEvent,
  TableChangeEvent,
  SwitchChangeEvent,
  TabsBarChangeEvent,
  TabsChangeEvent,
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
  const [paginationChangeEventCounter, setPaginationChangeEventCounter] = useState(0);
  const [tabsBarChangeEventCounter, setTabsBarChangeEventCounter] = useState(0);
  const [tabsChangeEventCounter, setTabsChangeEventCounter] = useState(0);
  const [textFieldSearchValue, setTextFieldSearchValue] = useState('');
  const [switchChangeEventCounter, setSwitchChangeEventCounter] = useState(0);
  const [modalDismissEventCounter, setModalDismissEventCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableChangeEventCounter, setTableChangeEventCounter] = useState(0);
  const [carouselChangeEventCounter, setCarouselChangeEventCounter] = useState(0);

  // TODO: inline-notification, segmented-control and stepper-horizontal are missing

  // unused event parameters are used to verify that types can be imported from package root
  const onAccordionChange = useCallback(
    (e: CustomEvent<AccordionChangeEvent>) => setAccordionChangeEventCounter((prev) => prev + 1),
    []
  );
  const onPaginationChange = useCallback(
    (e: CustomEvent<PaginationChangeEvent>) => setPaginationChangeEventCounter((prev) => prev + 1),
    []
  );
  const onTabsBarChange = useCallback(
    (e: CustomEvent<TabsBarChangeEvent>) => setTabsBarChangeEventCounter((prev) => prev + 1),
    []
  );
  const onTabsChange = useCallback(
    (e: CustomEvent<TabsChangeEvent>) => setTabsChangeEventCounter((prev) => prev + 1),
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
    setModalDismissEventCounter((prev) => prev + 1);
    setIsModalOpen(false);
  }, []);
  const onTableChange = useCallback(
    (e: CustomEvent<TableChangeEvent>) => setTableChangeEventCounter((prev) => prev + 1),
    []
  );
  const onCarouselChange = useCallback(
    (e: CustomEvent<CarouselChangeEvent>) => setCarouselChangeEventCounter((prev) => prev + 1),
    []
  );

  return (
    <>
      <div className="playground light">
        <PAccordion heading="Some heading" onChange={onAccordionChange} />
        <p>{accordionChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} onChange={onPaginationChange} />
        <p>{paginationChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PTabsBar activeTabIndex={0} onChange={onTabsBarChange}>
          <button>Tab 1</button>
          <button>Tab 2</button>
          <button>Tab 3</button>
        </PTabsBar>
        <p>{tabsBarChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PTabs activeTabIndex={0} onChange={onTabsChange}>
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
        <PModal open={isModalOpen} onDismiss={onModalClose}>
          Modal
        </PModal>
        <p>{modalDismissEventCounter}</p>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      </div>

      <div className="playground light">
        <PTable onChange={onTableChange}>
          <PTableHead>
            <PTableHeadRow>
              <PTableHeadCell sort={{ id: 'col1', active: true, direction: 'asc' }}>Col 1</PTableHeadCell>
            </PTableHeadRow>
          </PTableHead>
        </PTable>
        <p>{tableChangeEventCounter}</p>
      </div>

      <div className="playground light">
        <PCarousel onChange={onCarouselChange}>
          <div children="Slide 1" />
          <div children="Slide 2" />
          <div children="Slide 3" />
        </PCarousel>
        <p>{carouselChangeEventCounter}</p>
      </div>
    </>
  );
};
