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
  const [accordionUpdateEventCounter, setAccordionUpdateEventCounter] = useState(0);
  const [paginationUpdateEventCounter, setPaginationUpdateEventCounter] = useState(0);
  const [tabsBarUpdateEventCounter, setTabsBarUpdateEventCounter] = useState(0);
  const [tabsUpdateEventCounter, setTabsUpdateEventCounter] = useState(0);
  const [textFieldSearchValue, setTextFieldSearchValue] = useState('');
  const [switchUpdateEventCounter, setSwitchUpdateEventCounter] = useState(0);
  const [modalDismissEventCounter, setModalDismissEventCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableUpdateEventCounter, setTableUpdateEventCounter] = useState(0);
  const [carouselUpdateEventCounter, setCarouselUpdateEventCounter] = useState(0);

  // TODO: inline-notification, segmented-control and stepper-horizontal are missing

  // unused event parameters are used to verify that types can be imported from package root
  const onAccordionUpdate = useCallback(
    (e: CustomEvent<AccordionChangeEvent>) => setAccordionUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onPaginationUpdate = useCallback(
    (e: CustomEvent<PaginationChangeEvent>) => setPaginationUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onTabsBarUpdate = useCallback(
    (e: CustomEvent<TabsBarChangeEvent>) => setTabsBarUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onTabsUpdate = useCallback(
    (e: CustomEvent<TabsChangeEvent>) => setTabsUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onTextFieldSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTextFieldSearchValue(e.target.value),
    []
  );
  const onSwitchUpdate = useCallback(
    (e: CustomEvent<SwitchChangeEvent>) => setSwitchUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onModalClose = useCallback(() => {
    setModalDismissEventCounter((prev) => prev + 1);
    setIsModalOpen(false);
  }, []);
  const onTableUpdate = useCallback(
    (e: CustomEvent<TableChangeEvent>) => setTableUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onCarouselUpdate = useCallback(
    (e: CustomEvent<CarouselChangeEvent>) => setCarouselUpdateEventCounter((prev) => prev + 1),
    []
  );

  return (
    <>
      <div className="playground light">
        <PAccordion heading="Some heading" onUpdate={onAccordionUpdate} />
        <p>{accordionUpdateEventCounter}</p>
      </div>

      <div className="playground light">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} onUpdate={onPaginationUpdate} />
        <p>{paginationUpdateEventCounter}</p>
      </div>

      <div className="playground light">
        <PTabsBar activeTabIndex={0} onUpdate={onTabsBarUpdate}>
          <button>Tab 1</button>
          <button>Tab 2</button>
          <button>Tab 3</button>
        </PTabsBar>
        <p>{tabsBarUpdateEventCounter}</p>
      </div>

      <div className="playground light">
        <PTabs activeTabIndex={0} onUpdate={onTabsUpdate}>
          <PTabsItem label="Tab 1">Content 1</PTabsItem>
          <PTabsItem label="Tab 2">Content 2</PTabsItem>
          <PTabsItem label="Tab 3">Content 3</PTabsItem>
        </PTabs>
        <p>{tabsUpdateEventCounter}</p>
      </div>

      <div className="playground light">
        <PTextFieldWrapper>
          <input type="search" value={textFieldSearchValue} onChange={onTextFieldSearchChange} />
        </PTextFieldWrapper>
        <p>Value: {textFieldSearchValue}</p>
      </div>

      <div className="playground light">
        <PSwitch onUpdate={onSwitchUpdate}>Switch</PSwitch>
        <p>{switchUpdateEventCounter}</p>
      </div>

      <div className="playground light">
        <PModal open={isModalOpen} onDismiss={onModalClose}>
          Modal
        </PModal>
        <p>{modalDismissEventCounter}</p>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      </div>

      <div className="playground light">
        <PTable onUpdate={onTableUpdate}>
          <PTableHead>
            <PTableHeadRow>
              <PTableHeadCell sort={{ id: 'col1', active: true, direction: 'asc' }}>Col 1</PTableHeadCell>
            </PTableHeadRow>
          </PTableHead>
        </PTable>
        <p>{tableUpdateEventCounter}</p>
      </div>

      <div className="playground light">
        <PCarousel onUpdate={onCarouselUpdate}>
          <div children="Slide 1" />
          <div children="Slide 2" />
          <div children="Slide 3" />
        </PCarousel>
        <p>{carouselUpdateEventCounter}</p>
      </div>
    </>
  );
};
