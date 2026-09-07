import {
  type AccordionUpdateEvent,
  type CarouselUpdateEvent,
  type InputDateBlurEvent,
  type InputDateChangeEvent,
  type InputDateInputEvent,
  type InputEmailBlurEvent,
  type InputEmailChangeEvent,
  type InputEmailInputEvent,
  type InputMonthBlurEvent,
  type InputMonthChangeEvent,
  type InputMonthInputEvent,
  type InputNumberBlurEvent,
  type InputNumberChangeEvent,
  type InputNumberInputEvent,
  type InputPasswordBlurEvent,
  type InputPasswordChangeEvent,
  type InputPasswordInputEvent,
  type InputSearchBlurEvent,
  type InputSearchChangeEvent,
  type InputSearchInputEvent,
  type InputTelBlurEvent,
  type InputTelChangeEvent,
  type InputTelInputEvent,
  type InputTextBlurEvent,
  type InputTextChangeEvent,
  type InputTextInputEvent,
  type InputTimeBlurEvent,
  type InputTimeChangeEvent,
  type InputTimeInputEvent,
  type InputUrlBlurEvent,
  type InputUrlChangeEvent,
  type InputUrlInputEvent,
  type InputWeekBlurEvent,
  type InputWeekChangeEvent,
  type InputWeekInputEvent,
  PAccordion,
  type PaginationUpdateEvent,
  PBanner,
  PCarousel,
  PHeading,
  PInputDate,
  PInputEmail,
  PInputMonth,
  PInputNumber,
  PInputPassword,
  PInputSearch,
  PInputTel,
  PInputText,
  PInputTime,
  PInputUrl,
  PInputWeek,
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
  PTextarea,
  type SwitchUpdateEvent,
  type TableUpdateEvent,
  type TabsBarUpdateEvent,
  type TabsUpdateEvent,
  type TextareaBlurEvent,
  type TextareaChangeEvent,
  type TextareaInputEvent,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const EventsPage = () => {
  const [accordionUpdateEventCounter, setAccordionUpdateEventCounter] = useState(0);
  const [paginationUpdateEventCounter, setPaginationUpdateEventCounter] = useState(0);
  const [tabsBarUpdateEventCounter, setTabsBarUpdateEventCounter] = useState(0);
  const [tabsUpdateEventCounter, setTabsUpdateEventCounter] = useState(0);
  const [switchUpdateEventCounter, setSwitchUpdateEventCounter] = useState(0);
  const [bannerDismissEventCounter, setBannerDismissEventCounter] = useState(0);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [modalDismissEventCounter, setModalDismissEventCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableUpdateEventCounter, setTableUpdateEventCounter] = useState(0);
  const [carouselUpdateEventCounter, setCarouselUpdateEventCounter] = useState(0);

  // PInputDate
  const [inputDateValue, setInputDateValue] = useState('');
  const [inputDateBlurCounter, setInputDateBlurCounter] = useState(0);
  const [inputDateChangeCounter, setInputDateChangeCounter] = useState(0);

  // PInputMonth
  const [inputMonthValue, setInputMonthValue] = useState('');
  const [inputMonthBlurCounter, setInputMonthBlurCounter] = useState(0);
  const [inputMonthChangeCounter, setInputMonthChangeCounter] = useState(0);

  // PInputWeek
  const [inputWeekValue, setInputWeekValue] = useState('');
  const [inputWeekBlurCounter, setInputWeekBlurCounter] = useState(0);
  const [inputWeekChangeCounter, setInputWeekChangeCounter] = useState(0);

  // PInputEmail
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputEmailBlurCounter, setInputEmailBlurCounter] = useState(0);
  const [inputEmailChangeCounter, setInputEmailChangeCounter] = useState(0);

  // PInputNumber
  const [inputNumberValue, setInputNumberValue] = useState('');
  const [inputNumberBlurCounter, setInputNumberBlurCounter] = useState(0);
  const [inputNumberChangeCounter, setInputNumberChangeCounter] = useState(0);

  // PInputPassword
  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const [inputPasswordBlurCounter, setInputPasswordBlurCounter] = useState(0);
  const [inputPasswordChangeCounter, setInputPasswordChangeCounter] = useState(0);

  // PInputSearch
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [inputSearchBlurCounter, setInputSearchBlurCounter] = useState(0);
  const [inputSearchChangeCounter, setInputSearchChangeCounter] = useState(0);

  // PInputTel
  const [inputTelValue, setInputTelValue] = useState('');
  const [inputTelBlurCounter, setInputTelBlurCounter] = useState(0);
  const [inputTelChangeCounter, setInputTelChangeCounter] = useState(0);

  // PInputText
  const [inputTextValue, setInputTextValue] = useState('');
  const [inputTextBlurCounter, setInputTextBlurCounter] = useState(0);
  const [inputTextChangeCounter, setInputTextChangeCounter] = useState(0);

  // PInputTime
  const [inputTimeValue, setInputTimeValue] = useState('');
  const [inputTimeBlurCounter, setInputTimeBlurCounter] = useState(0);
  const [inputTimeChangeCounter, setInputTimeChangeCounter] = useState(0);

  // PInputUrl
  const [inputUrlValue, setInputUrlValue] = useState('');
  const [inputUrlBlurCounter, setInputUrlBlurCounter] = useState(0);
  const [inputUrlChangeCounter, setInputUrlChangeCounter] = useState(0);

  // PTextarea
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaBlurCounter, setTextareaBlurCounter] = useState(0);
  const [textareaChangeCounter, setTextareaChangeCounter] = useState(0);

  // TODO: inline-notification, segmented-control and stepper-horizontal are missing

  // unused event parameters are used to verify that types can be imported from package root
  const onAccordionUpdate = useCallback(
    (_: AccordionUpdateEvent) => setAccordionUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onPaginationUpdate = useCallback(
    (_: PaginationUpdateEvent) => setPaginationUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onTabsBarUpdate = useCallback((_: TabsBarUpdateEvent) => setTabsBarUpdateEventCounter((prev) => prev + 1), []);
  const onTabsUpdate = useCallback((_: TabsUpdateEvent) => setTabsUpdateEventCounter((prev) => prev + 1), []);
  const onSwitchUpdate = useCallback((_: SwitchUpdateEvent) => setSwitchUpdateEventCounter((prev) => prev + 1), []);
  const onBannerClose = useCallback(() => {
    setBannerDismissEventCounter((prev) => prev + 1);
    setIsBannerOpen(false);
  }, []);
  const onModalClose = useCallback(() => {
    setModalDismissEventCounter((prev) => prev + 1);
    setIsModalOpen(false);
  }, []);
  const onTableUpdate = useCallback((_: TableUpdateEvent) => setTableUpdateEventCounter((prev) => prev + 1), []);
  const onCarouselUpdate = useCallback(
    (_: CarouselUpdateEvent) => setCarouselUpdateEventCounter((prev) => prev + 1),
    []
  );

  // PInputDate
  const onInputDateInput = useCallback(
    (e: InputDateInputEvent) => setInputDateValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputDateBlur = useCallback((_: InputDateBlurEvent) => setInputDateBlurCounter((prev) => prev + 1), []);
  const onInputDateChange = useCallback((_: InputDateChangeEvent) => setInputDateChangeCounter((prev) => prev + 1), []);

  // PInputMonth
  const onInputMonthInput = useCallback(
    (e: InputMonthInputEvent) => setInputMonthValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputMonthBlur = useCallback((_: InputMonthBlurEvent) => setInputMonthBlurCounter((prev) => prev + 1), []);
  const onInputMonthChange = useCallback(
    (_: InputMonthChangeEvent) => setInputMonthChangeCounter((prev) => prev + 1),
    []
  );

  // PInputWeek
  const onInputWeekInput = useCallback(
    (e: InputWeekInputEvent) => setInputWeekValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputWeekBlur = useCallback((_: InputWeekBlurEvent) => setInputWeekBlurCounter((prev) => prev + 1), []);
  const onInputWeekChange = useCallback((_: InputWeekChangeEvent) => setInputWeekChangeCounter((prev) => prev + 1), []);

  // PInputEmail
  const onInputEmailInput = useCallback(
    (e: InputEmailInputEvent) => setInputEmailValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputEmailBlur = useCallback((_: InputEmailBlurEvent) => setInputEmailBlurCounter((prev) => prev + 1), []);
  const onInputEmailChange = useCallback(
    (_: InputEmailChangeEvent) => setInputEmailChangeCounter((prev) => prev + 1),
    []
  );

  // PInputNumber
  const onInputNumberInput = useCallback(
    (e: InputNumberInputEvent) => setInputNumberValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputNumberBlur = useCallback((_: InputNumberBlurEvent) => setInputNumberBlurCounter((prev) => prev + 1), []);
  const onInputNumberChange = useCallback(
    (_: InputNumberChangeEvent) => setInputNumberChangeCounter((prev) => prev + 1),
    []
  );

  // PInputPassword
  const onInputPasswordInput = useCallback(
    (e: InputPasswordInputEvent) => setInputPasswordValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputPasswordBlur = useCallback(
    (_: InputPasswordBlurEvent) => setInputPasswordBlurCounter((prev) => prev + 1),
    []
  );
  const onInputPasswordChange = useCallback(
    (_: InputPasswordChangeEvent) => setInputPasswordChangeCounter((prev) => prev + 1),
    []
  );

  // PInputSearch
  const onInputSearchInput = useCallback(
    (e: InputSearchInputEvent) => setInputSearchValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputSearchBlur = useCallback((_: InputSearchBlurEvent) => setInputSearchBlurCounter((prev) => prev + 1), []);
  const onInputSearchChange = useCallback(
    (_: InputSearchChangeEvent) => setInputSearchChangeCounter((prev) => prev + 1),
    []
  );

  // PInputTel
  const onInputTelInput = useCallback(
    (e: InputTelInputEvent) => setInputTelValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputTelBlur = useCallback((_: InputTelBlurEvent) => setInputTelBlurCounter((prev) => prev + 1), []);
  const onInputTelChange = useCallback((_: InputTelChangeEvent) => setInputTelChangeCounter((prev) => prev + 1), []);

  // PInputText
  const onInputTextInput = useCallback(
    (e: InputTextInputEvent) => setInputTextValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputTextBlur = useCallback((_: InputTextBlurEvent) => setInputTextBlurCounter((prev) => prev + 1), []);
  const onInputTextChange = useCallback((_: InputTextChangeEvent) => setInputTextChangeCounter((prev) => prev + 1), []);

  // PInputTime
  const onInputTimeInput = useCallback(
    (e: InputTimeInputEvent) => setInputTimeValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputTimeBlur = useCallback((_: InputTimeBlurEvent) => setInputTimeBlurCounter((prev) => prev + 1), []);
  const onInputTimeChange = useCallback((_: InputTimeChangeEvent) => setInputTimeChangeCounter((prev) => prev + 1), []);

  // PInputUrl
  const onInputUrlInput = useCallback(
    (e: InputUrlInputEvent) => setInputUrlValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputUrlBlur = useCallback((_: InputUrlBlurEvent) => setInputUrlBlurCounter((prev) => prev + 1), []);
  const onInputUrlChange = useCallback((_: InputUrlChangeEvent) => setInputUrlChangeCounter((prev) => prev + 1), []);

  // PTextarea
  const onTextareaInput = useCallback(
    (e: TextareaInputEvent) => setTextareaValue((e.detail.target as HTMLTextAreaElement).value),
    []
  );
  const onTextareaBlur = useCallback((_: TextareaBlurEvent) => setTextareaBlurCounter((prev) => prev + 1), []);
  const onTextareaChange = useCallback((_: TextareaChangeEvent) => setTextareaChangeCounter((prev) => prev + 1), []);

  return (
    <>
      <div className="playground light">
        <PAccordion onUpdate={onAccordionUpdate}>
          <PHeading slot="summary" tag="h3" size="small">
            Some summary
          </PHeading>
        </PAccordion>
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
        <PSwitch onUpdate={onSwitchUpdate}>Switch</PSwitch>
        <p>{switchUpdateEventCounter}</p>
      </div>

      <div className="playground light">
        <PBanner open={isBannerOpen} onDismiss={onBannerClose} heading="Banner"></PBanner>
        <p>{bannerDismissEventCounter}</p>
        <button onClick={() => setIsBannerOpen(true)}>Open Banner</button>
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
        <PCarousel onUpdate={onCarouselUpdate} pagination={true} trimSpace={true} rewind={true}>
          <div children="Slide 1" />
          <div children="Slide 2" />
          <div children="Slide 3" />
        </PCarousel>
        <p>{carouselUpdateEventCounter}</p>
      </div>

      <div className="playground light">
        <PInputDate
          value={inputDateValue}
          onInput={onInputDateInput}
          onBlur={onInputDateBlur}
          onChange={onInputDateChange}
          name="date"
          label="Date Input"
        />
        <p>Value: {inputDateValue}</p>
        <p>Blur: {inputDateBlurCounter}</p>
        <p>Change: {inputDateChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputMonth
          value={inputMonthValue}
          onInput={onInputMonthInput}
          onBlur={onInputMonthBlur}
          onChange={onInputMonthChange}
          name="month"
          label="Month Input"
        />
        <p>Value: {inputMonthValue}</p>
        <p>Blur: {inputMonthBlurCounter}</p>
        <p>Change: {inputMonthChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputWeek
          value={inputWeekValue}
          onInput={onInputWeekInput}
          onBlur={onInputWeekBlur}
          onChange={onInputWeekChange}
          name="week"
          label="Week Input"
        />
        <p>Value: {inputWeekValue}</p>
        <p>Blur: {inputWeekBlurCounter}</p>
        <p>Change: {inputWeekChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputEmail
          value={inputEmailValue}
          onInput={onInputEmailInput}
          onBlur={onInputEmailBlur}
          onChange={onInputEmailChange}
          name="email"
          label="Email Input"
        />
        <p>Value: {inputEmailValue}</p>
        <p>Blur: {inputEmailBlurCounter}</p>
        <p>Change: {inputEmailChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputNumber
          value={inputNumberValue}
          onInput={onInputNumberInput}
          onBlur={onInputNumberBlur}
          onChange={onInputNumberChange}
          name="number"
          label="Number Input"
          controls
        />
        <p>Value: {inputNumberValue}</p>
        <p>Blur: {inputNumberBlurCounter}</p>
        <p>Change: {inputNumberChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputPassword
          value={inputPasswordValue}
          onInput={onInputPasswordInput}
          onBlur={onInputPasswordBlur}
          onChange={onInputPasswordChange}
          name="password"
          label="Password Input"
          toggle
        />
        <p>Value: {inputPasswordValue}</p>
        <p>Blur: {inputPasswordBlurCounter}</p>
        <p>Change: {inputPasswordChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputSearch
          value={inputSearchValue}
          onInput={onInputSearchInput}
          onBlur={onInputSearchBlur}
          onChange={onInputSearchChange}
          name="search"
          label="Search Input"
          indicator
        />
        <p>Value: {inputSearchValue}</p>
        <p>Blur: {inputSearchBlurCounter}</p>
        <p>Change: {inputSearchChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputTel
          value={inputTelValue}
          onInput={onInputTelInput}
          onBlur={onInputTelBlur}
          onChange={onInputTelChange}
          name="tel"
          label="Tel Input"
        />
        <p>Value: {inputTelValue}</p>
        <p>Blur: {inputTelBlurCounter}</p>
        <p>Change: {inputTelChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputText
          value={inputTextValue}
          onInput={onInputTextInput}
          onBlur={onInputTextBlur}
          onChange={onInputTextChange}
          name="text"
          label="Text Input"
          placeholder="Some placeholder"
        />
        <p>Value: {inputTextValue}</p>
        <p>Blur: {inputTextBlurCounter}</p>
        <p>Change: {inputTextChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputTime
          value={inputTimeValue}
          onInput={onInputTimeInput}
          onBlur={onInputTimeBlur}
          onChange={onInputTimeChange}
          name="time"
          label="Time Input"
        />
        <p>Value: {inputTimeValue}</p>
        <p>Blur: {inputTimeBlurCounter}</p>
        <p>Change: {inputTimeChangeCounter}</p>
      </div>

      <div className="playground light">
        <PInputUrl
          value={inputUrlValue}
          onInput={onInputUrlInput}
          onBlur={onInputUrlBlur}
          onChange={onInputUrlChange}
          name="url"
          label="URL Input"
          indicator
        />
        <p>Value: {inputUrlValue}</p>
        <p>Blur: {inputUrlBlurCounter}</p>
        <p>Change: {inputUrlChangeCounter}</p>
      </div>

      <div className="playground light">
        <PTextarea
          value={textareaValue}
          onInput={onTextareaInput}
          onBlur={onTextareaBlur}
          onChange={onTextareaChange}
          name="textarea"
          label="Textarea"
        />
        <p>Value: {textareaValue}</p>
        <p>Blur: {textareaBlurCounter}</p>
        <p>Change: {textareaChangeCounter}</p>
      </div>
    </>
  );
};
