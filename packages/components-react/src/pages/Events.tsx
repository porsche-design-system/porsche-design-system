import {
  PAccordion,
  type PAccordionUpdateEvent,
  PBanner,
  PCarousel,
  type PCarouselUpdateEvent,
  PHeading,
  PInputDate,
  type PInputDateBlurEvent,
  type PInputDateChangeEvent,
  type PInputDateInputEvent,
  PInputEmail,
  type PInputEmailBlurEvent,
  type PInputEmailChangeEvent,
  type PInputEmailInputEvent,
  PInputMonth,
  type PInputMonthBlurEvent,
  type PInputMonthChangeEvent,
  type PInputMonthInputEvent,
  PInputNumber,
  type PInputNumberBlurEvent,
  type PInputNumberChangeEvent,
  type PInputNumberInputEvent,
  PInputPassword,
  type PInputPasswordBlurEvent,
  type PInputPasswordChangeEvent,
  type PInputPasswordInputEvent,
  PInputSearch,
  type PInputSearchBlurEvent,
  type PInputSearchChangeEvent,
  type PInputSearchInputEvent,
  PInputTel,
  type PInputTelBlurEvent,
  type PInputTelChangeEvent,
  type PInputTelInputEvent,
  PInputText,
  type PInputTextBlurEvent,
  type PInputTextChangeEvent,
  type PInputTextInputEvent,
  PInputTime,
  type PInputTimeBlurEvent,
  type PInputTimeChangeEvent,
  type PInputTimeInputEvent,
  PInputUrl,
  type PInputUrlBlurEvent,
  type PInputUrlChangeEvent,
  type PInputUrlInputEvent,
  PInputWeek,
  type PInputWeekBlurEvent,
  type PInputWeekChangeEvent,
  type PInputWeekInputEvent,
  PModal,
  PPagination,
  type PPaginationUpdateEvent,
  PSwitch,
  type PSwitchUpdateEvent,
  PTable,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  type PTableUpdateEvent,
  PTabs,
  PTabsBar,
  type PTabsBarUpdateEvent,
  PTabsItem,
  type PTabsUpdateEvent,
  PTextarea,
  type PTextareaBlurEvent,
  type PTextareaChangeEvent,
  type PTextareaInputEvent,
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
    (_: PAccordionUpdateEvent) => setAccordionUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onPaginationUpdate = useCallback(
    (_: PPaginationUpdateEvent) => setPaginationUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onTabsBarUpdate = useCallback((_: PTabsBarUpdateEvent) => setTabsBarUpdateEventCounter((prev) => prev + 1), []);
  const onTabsUpdate = useCallback((_: PTabsUpdateEvent) => setTabsUpdateEventCounter((prev) => prev + 1), []);
  const onSwitchUpdate = useCallback((_: PSwitchUpdateEvent) => setSwitchUpdateEventCounter((prev) => prev + 1), []);
  const onBannerClose = useCallback(() => {
    setBannerDismissEventCounter((prev) => prev + 1);
    setIsBannerOpen(false);
  }, []);
  const onModalClose = useCallback(() => {
    setModalDismissEventCounter((prev) => prev + 1);
    setIsModalOpen(false);
  }, []);
  const onTableUpdate = useCallback((_: PTableUpdateEvent) => setTableUpdateEventCounter((prev) => prev + 1), []);
  const onCarouselUpdate = useCallback(
    (_: PCarouselUpdateEvent) => setCarouselUpdateEventCounter((prev) => prev + 1),
    []
  );

  // PInputDate
  const onInputDateInput = useCallback(
    (e: PInputDateInputEvent) => setInputDateValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputDateBlur = useCallback((_: PInputDateBlurEvent) => setInputDateBlurCounter((prev) => prev + 1), []);
  const onInputDateChange = useCallback(
    (_: PInputDateChangeEvent) => setInputDateChangeCounter((prev) => prev + 1),
    []
  );

  // PInputMonth
  const onInputMonthInput = useCallback(
    (e: PInputMonthInputEvent) => setInputMonthValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputMonthBlur = useCallback((_: PInputMonthBlurEvent) => setInputMonthBlurCounter((prev) => prev + 1), []);
  const onInputMonthChange = useCallback(
    (_: PInputMonthChangeEvent) => setInputMonthChangeCounter((prev) => prev + 1),
    []
  );

  // PInputWeek
  const onInputWeekInput = useCallback(
    (e: PInputWeekInputEvent) => setInputWeekValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputWeekBlur = useCallback((_: PInputWeekBlurEvent) => setInputWeekBlurCounter((prev) => prev + 1), []);
  const onInputWeekChange = useCallback(
    (_: PInputWeekChangeEvent) => setInputWeekChangeCounter((prev) => prev + 1),
    []
  );

  // PInputEmail
  const onInputEmailInput = useCallback(
    (e: PInputEmailInputEvent) => setInputEmailValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputEmailBlur = useCallback((_: PInputEmailBlurEvent) => setInputEmailBlurCounter((prev) => prev + 1), []);
  const onInputEmailChange = useCallback(
    (_: PInputEmailChangeEvent) => setInputEmailChangeCounter((prev) => prev + 1),
    []
  );

  // PInputNumber
  const onInputNumberInput = useCallback(
    (e: PInputNumberInputEvent) => setInputNumberValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputNumberBlur = useCallback(
    (_: PInputNumberBlurEvent) => setInputNumberBlurCounter((prev) => prev + 1),
    []
  );
  const onInputNumberChange = useCallback(
    (_: PInputNumberChangeEvent) => setInputNumberChangeCounter((prev) => prev + 1),
    []
  );

  // PInputPassword
  const onInputPasswordInput = useCallback(
    (e: PInputPasswordInputEvent) => setInputPasswordValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputPasswordBlur = useCallback(
    (_: PInputPasswordBlurEvent) => setInputPasswordBlurCounter((prev) => prev + 1),
    []
  );
  const onInputPasswordChange = useCallback(
    (_: PInputPasswordChangeEvent) => setInputPasswordChangeCounter((prev) => prev + 1),
    []
  );

  // PInputSearch
  const onInputSearchInput = useCallback(
    (e: PInputSearchInputEvent) => setInputSearchValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputSearchBlur = useCallback(
    (_: PInputSearchBlurEvent) => setInputSearchBlurCounter((prev) => prev + 1),
    []
  );
  const onInputSearchChange = useCallback(
    (_: PInputSearchChangeEvent) => setInputSearchChangeCounter((prev) => prev + 1),
    []
  );

  // PInputTel
  const onInputTelInput = useCallback(
    (e: PInputTelInputEvent) => setInputTelValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputTelBlur = useCallback((_: PInputTelBlurEvent) => setInputTelBlurCounter((prev) => prev + 1), []);
  const onInputTelChange = useCallback((_: PInputTelChangeEvent) => setInputTelChangeCounter((prev) => prev + 1), []);

  // PInputText
  const onInputTextInput = useCallback(
    (e: PInputTextInputEvent) => setInputTextValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputTextBlur = useCallback((_: PInputTextBlurEvent) => setInputTextBlurCounter((prev) => prev + 1), []);
  const onInputTextChange = useCallback(
    (_: PInputTextChangeEvent) => setInputTextChangeCounter((prev) => prev + 1),
    []
  );

  // PInputTime
  const onInputTimeInput = useCallback(
    (e: PInputTimeInputEvent) => setInputTimeValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputTimeBlur = useCallback((_: PInputTimeBlurEvent) => setInputTimeBlurCounter((prev) => prev + 1), []);
  const onInputTimeChange = useCallback(
    (_: PInputTimeChangeEvent) => setInputTimeChangeCounter((prev) => prev + 1),
    []
  );

  // PInputUrl
  const onInputUrlInput = useCallback(
    (e: PInputUrlInputEvent) => setInputUrlValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputUrlBlur = useCallback((_: PInputUrlBlurEvent) => setInputUrlBlurCounter((prev) => prev + 1), []);
  const onInputUrlChange = useCallback((_: PInputUrlChangeEvent) => setInputUrlChangeCounter((prev) => prev + 1), []);

  // PTextarea
  const onTextareaInput = useCallback(
    (e: PTextareaInputEvent) => setTextareaValue((e.detail.target as HTMLTextAreaElement).value),
    []
  );
  const onTextareaBlur = useCallback((_: PTextareaBlurEvent) => setTextareaBlurCounter((prev) => prev + 1), []);
  const onTextareaChange = useCallback((_: PTextareaChangeEvent) => setTextareaChangeCounter((prev) => prev + 1), []);

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
