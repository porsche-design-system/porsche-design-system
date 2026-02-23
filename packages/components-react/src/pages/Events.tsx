import {
  AccordionUpdateEventDetail,
  CarouselUpdateEventDetail,
  InputDateBlurEventDetail,
  InputDateChangeEventDetail,
  InputDateInputEventDetail,
  InputEmailBlurEventDetail,
  InputEmailChangeEventDetail,
  InputEmailInputEventDetail,
  InputMonthBlurEventDetail,
  InputMonthChangeEventDetail,
  InputMonthInputEventDetail,
  InputNumberBlurEventDetail,
  InputNumberChangeEventDetail,
  InputNumberInputEventDetail,
  InputPasswordBlurEventDetail,
  InputPasswordChangeEventDetail,
  InputPasswordInputEventDetail,
  InputSearchBlurEventDetail,
  InputSearchChangeEventDetail,
  InputSearchInputEventDetail,
  InputTelBlurEventDetail,
  InputTelChangeEventDetail,
  InputTelInputEventDetail,
  InputTextBlurEventDetail,
  InputTextChangeEventDetail,
  InputTextInputEventDetail,
  InputTimeBlurEventDetail,
  InputTimeChangeEventDetail,
  InputTimeInputEventDetail,
  InputUrlBlurEventDetail,
  InputUrlChangeEventDetail,
  InputUrlInputEventDetail,
  InputWeekBlurEventDetail,
  InputWeekChangeEventDetail,
  InputWeekInputEventDetail,
  PAccordion,
  PaginationUpdateEventDetail,
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
  SwitchUpdateEventDetail,
  TableUpdateEventDetail,
  TabsBarUpdateEventDetail,
  TextareaBlurEventDetail,
  TextareaChangeEventDetail,
  TextareaInputEventDetail,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const EventsPage = (): JSX.Element => {
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
    (_: CustomEvent<AccordionUpdateEventDetail>) => setAccordionUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onPaginationUpdate = useCallback(
    (_: CustomEvent<PaginationUpdateEventDetail>) => setPaginationUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onTabsBarUpdate = useCallback(
    (_: CustomEvent<TabsBarUpdateEventDetail>) => setTabsBarUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onTabsUpdate = useCallback(
    (_: CustomEvent<TabsBarUpdateEventDetail>) => setTabsUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onSwitchUpdate = useCallback(
    (_: CustomEvent<SwitchUpdateEventDetail>) => setSwitchUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onBannerClose = useCallback(() => {
    setBannerDismissEventCounter((prev) => prev + 1);
    setIsBannerOpen(false);
  }, []);
  const onModalClose = useCallback(() => {
    setModalDismissEventCounter((prev) => prev + 1);
    setIsModalOpen(false);
  }, []);
  const onTableUpdate = useCallback(
    (_: CustomEvent<TableUpdateEventDetail>) => setTableUpdateEventCounter((prev) => prev + 1),
    []
  );
  const onCarouselUpdate = useCallback(
    (_: CustomEvent<CarouselUpdateEventDetail>) => setCarouselUpdateEventCounter((prev) => prev + 1),
    []
  );

  // PInputDate
  const onInputDateInput = useCallback(
    (e: CustomEvent<InputDateInputEventDetail>) => setInputDateValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputDateBlur = useCallback(
    (_: CustomEvent<InputDateBlurEventDetail>) => setInputDateBlurCounter((prev) => prev + 1),
    []
  );
  const onInputDateChange = useCallback(
    (_: CustomEvent<InputDateChangeEventDetail>) => setInputDateChangeCounter((prev) => prev + 1),
    []
  );

  // PInputMonth
  const onInputMonthInput = useCallback(
    (e: CustomEvent<InputMonthInputEventDetail>) => setInputMonthValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputMonthBlur = useCallback(
    (_: CustomEvent<InputMonthBlurEventDetail>) => setInputMonthBlurCounter((prev) => prev + 1),
    []
  );
  const onInputMonthChange = useCallback(
    (_: CustomEvent<InputMonthChangeEventDetail>) => setInputMonthChangeCounter((prev) => prev + 1),
    []
  );

  // PInputWeek
  const onInputWeekInput = useCallback(
    (e: CustomEvent<InputWeekInputEventDetail>) => setInputWeekValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputWeekBlur = useCallback(
    (_: CustomEvent<InputWeekBlurEventDetail>) => setInputWeekBlurCounter((prev) => prev + 1),
    []
  );
  const onInputWeekChange = useCallback(
    (_: CustomEvent<InputWeekChangeEventDetail>) => setInputWeekChangeCounter((prev) => prev + 1),
    []
  );

  // PInputEmail
  const onInputEmailInput = useCallback(
    (e: CustomEvent<InputEmailInputEventDetail>) => setInputEmailValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputEmailBlur = useCallback(
    (_: CustomEvent<InputEmailBlurEventDetail>) => setInputEmailBlurCounter((prev) => prev + 1),
    []
  );
  const onInputEmailChange = useCallback(
    (_: CustomEvent<InputEmailChangeEventDetail>) => setInputEmailChangeCounter((prev) => prev + 1),
    []
  );

  // PInputNumber
  const onInputNumberInput = useCallback(
    (e: CustomEvent<InputNumberInputEventDetail>) => setInputNumberValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputNumberBlur = useCallback(
    (_: CustomEvent<InputNumberBlurEventDetail>) => setInputNumberBlurCounter((prev) => prev + 1),
    []
  );
  const onInputNumberChange = useCallback(
    (_: CustomEvent<InputNumberChangeEventDetail>) => setInputNumberChangeCounter((prev) => prev + 1),
    []
  );

  // PInputPassword
  const onInputPasswordInput = useCallback(
    (e: CustomEvent<InputPasswordInputEventDetail>) =>
      setInputPasswordValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputPasswordBlur = useCallback(
    (_: CustomEvent<InputPasswordBlurEventDetail>) => setInputPasswordBlurCounter((prev) => prev + 1),
    []
  );
  const onInputPasswordChange = useCallback(
    (_: CustomEvent<InputPasswordChangeEventDetail>) => setInputPasswordChangeCounter((prev) => prev + 1),
    []
  );

  // PInputSearch
  const onInputSearchInput = useCallback(
    (e: CustomEvent<InputSearchInputEventDetail>) => setInputSearchValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputSearchBlur = useCallback(
    (_: CustomEvent<InputSearchBlurEventDetail>) => setInputSearchBlurCounter((prev) => prev + 1),
    []
  );
  const onInputSearchChange = useCallback(
    (_: CustomEvent<InputSearchChangeEventDetail>) => setInputSearchChangeCounter((prev) => prev + 1),
    []
  );

  // PInputTel
  const onInputTelInput = useCallback(
    (e: CustomEvent<InputTelInputEventDetail>) => setInputTelValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputTelBlur = useCallback(
    (_: CustomEvent<InputTelBlurEventDetail>) => setInputTelBlurCounter((prev) => prev + 1),
    []
  );
  const onInputTelChange = useCallback(
    (_: CustomEvent<InputTelChangeEventDetail>) => setInputTelChangeCounter((prev) => prev + 1),
    []
  );

  // PInputText
  const onInputTextInput = useCallback(
    (e: CustomEvent<InputTextInputEventDetail>) => setInputTextValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputTextBlur = useCallback(
    (_: CustomEvent<InputTextBlurEventDetail>) => setInputTextBlurCounter((prev) => prev + 1),
    []
  );
  const onInputTextChange = useCallback(
    (_: CustomEvent<InputTextChangeEventDetail>) => setInputTextChangeCounter((prev) => prev + 1),
    []
  );

  // PInputTime
  const onInputTimeInput = useCallback(
    (e: CustomEvent<InputTimeInputEventDetail>) => setInputTimeValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputTimeBlur = useCallback(
    (_: CustomEvent<InputTimeBlurEventDetail>) => setInputTimeBlurCounter((prev) => prev + 1),
    []
  );
  const onInputTimeChange = useCallback(
    (_: CustomEvent<InputTimeChangeEventDetail>) => setInputTimeChangeCounter((prev) => prev + 1),
    []
  );

  // PInputUrl
  const onInputUrlInput = useCallback(
    (e: CustomEvent<InputUrlInputEventDetail>) => setInputUrlValue((e.detail.target as HTMLInputElement).value),
    []
  );
  const onInputUrlBlur = useCallback(
    (_: CustomEvent<InputUrlBlurEventDetail>) => setInputUrlBlurCounter((prev) => prev + 1),
    []
  );
  const onInputUrlChange = useCallback(
    (_: CustomEvent<InputUrlChangeEventDetail>) => setInputUrlChangeCounter((prev) => prev + 1),
    []
  );

  // PTextarea
  const onTextareaInput = useCallback(
    (e: CustomEvent<TextareaInputEventDetail>) => setTextareaValue((e.detail.target as HTMLTextAreaElement).value),
    []
  );
  const onTextareaBlur = useCallback(
    (_: CustomEvent<TextareaBlurEventDetail>) => setTextareaBlurCounter((prev) => prev + 1),
    []
  );
  const onTextareaChange = useCallback(
    (_: CustomEvent<TextareaChangeEventDetail>) => setTextareaChangeCounter((prev) => prev + 1),
    []
  );

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
          onInput={(e) => onInputDateInput(e as CustomEvent<InputDateInputEventDetail>)}
          onBlur={(e) => onInputDateBlur(e as CustomEvent<InputDateBlurEventDetail>)}
          onChange={(e) => onInputDateChange(e as CustomEvent<InputDateChangeEventDetail>)}
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
          onInput={(e) => onInputMonthInput(e as CustomEvent<InputMonthInputEventDetail>)}
          onBlur={(e) => onInputMonthBlur(e as CustomEvent<InputMonthBlurEventDetail>)}
          onChange={(e) => onInputMonthChange(e as CustomEvent<InputMonthChangeEventDetail>)}
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
          onInput={(e) => onInputWeekInput(e as CustomEvent<InputWeekInputEventDetail>)}
          onBlur={(e) => onInputWeekBlur(e as CustomEvent<InputWeekBlurEventDetail>)}
          onChange={(e) => onInputWeekChange(e as CustomEvent<InputWeekChangeEventDetail>)}
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
          onInput={(e) => onInputEmailInput(e as CustomEvent<InputEmailInputEventDetail>)}
          onBlur={(e) => onInputEmailBlur(e as CustomEvent<InputEmailBlurEventDetail>)}
          onChange={(e) => onInputEmailChange(e as CustomEvent<InputEmailChangeEventDetail>)}
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
          onInput={(e) => onInputNumberInput(e as CustomEvent<InputNumberInputEventDetail>)}
          onBlur={(e) => onInputNumberBlur(e as CustomEvent<InputNumberBlurEventDetail>)}
          onChange={(e) => onInputNumberChange(e as CustomEvent<InputNumberChangeEventDetail>)}
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
          onInput={(e) => onInputPasswordInput(e as CustomEvent<InputPasswordInputEventDetail>)}
          onBlur={(e) => onInputPasswordBlur(e as CustomEvent<InputPasswordBlurEventDetail>)}
          onChange={(e) => onInputPasswordChange(e as CustomEvent<InputPasswordChangeEventDetail>)}
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
          onInput={(e) => onInputSearchInput(e as CustomEvent<InputSearchInputEventDetail>)}
          onBlur={(e) => onInputSearchBlur(e as CustomEvent<InputSearchBlurEventDetail>)}
          onChange={(e) => onInputSearchChange(e as CustomEvent<InputSearchChangeEventDetail>)}
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
          onInput={(e) => onInputTelInput(e as CustomEvent<InputTelInputEventDetail>)}
          onBlur={(e) => onInputTelBlur(e as CustomEvent<InputTelBlurEventDetail>)}
          onChange={(e) => onInputTelChange(e as CustomEvent<InputTelChangeEventDetail>)}
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
          onInput={(e) => onInputTextInput(e as CustomEvent<InputTextInputEventDetail>)}
          onBlur={(e) => onInputTextBlur(e as CustomEvent<InputTextBlurEventDetail>)}
          onChange={(e) => onInputTextChange(e as CustomEvent<InputTextChangeEventDetail>)}
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
          onInput={(e) => onInputTimeInput(e as CustomEvent<InputTimeInputEventDetail>)}
          onBlur={(e) => onInputTimeBlur(e as CustomEvent<InputTimeBlurEventDetail>)}
          onChange={(e) => onInputTimeChange(e as CustomEvent<InputTimeChangeEventDetail>)}
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
          onInput={(e) => onInputUrlInput(e as CustomEvent<InputUrlInputEventDetail>)}
          onBlur={(e) => onInputUrlBlur(e as CustomEvent<InputUrlBlurEventDetail>)}
          onChange={(e) => onInputUrlChange(e as CustomEvent<InputUrlChangeEventDetail>)}
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
          onInput={(e) => onTextareaInput(e as CustomEvent<TextareaInputEventDetail>)}
          onBlur={(e) => onTextareaBlur(e as CustomEvent<TextareaBlurEventDetail>)}
          onChange={(e) => onTextareaChange(e as CustomEvent<TextareaChangeEventDetail>)}
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
