import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import * as domUtils from '../utils/dom';
import * as jssUtils from '../utils/jss';
import * as slottedStylesUtils from '../utils/slotted-styles';

/* Auto Generated Start */
import { Button } from './action/button/button';
import { ButtonPure } from './action/button-pure/button-pure';
import { Switch } from './action/switch/switch';
import { Marque } from './basic/marque/marque';
import { Accordion } from './content/accordion/accordion';
import { Modal } from './content/modal/modal';
import { TagStatus } from './content/tag-status/tag-status';
import { Banner } from './feedback/banner/banner';
import { InlineNotification } from './feedback/inline-notification/inline-notification';
import { Popover } from './feedback/popover/popover';
import { Spinner } from './feedback/spinner/spinner';
import { CheckboxWrapper } from './form/checkbox-wrapper/checkbox-wrapper';
import { FieldsetWrapper } from './form/fieldset-wrapper/fieldset-wrapper';
import { RadioButtonWrapper } from './form/radio-button-wrapper/radio-button-wrapper';
import { TextFieldWrapper } from './form/text-field-wrapper/text-field-wrapper';
import { TextareaWrapper } from './form/textarea-wrapper/textarea-wrapper';
import { Icon } from './icon/icon/icon';
import { ButtonGroup } from './layout/button-group/button-group';
import { ContentWrapper } from './layout/content-wrapper/content-wrapper';
import { Divider } from './layout/divider/divider';
import { Link } from './navigation/link/link';
import { LinkPure } from './navigation/link-pure/link-pure';
import { LinkSocial } from './navigation/link-social/link-social';
import { Pagination } from './navigation/pagination/pagination';
import { TabsBar } from './navigation/tabs-bar/tabs-bar';
import { Headline } from './basic/typography/headline/headline';
import { Text } from './basic/typography/text/text';
import { Table } from './content/table/table/table';
import { TableBody } from './content/table/table-body/table-body';
import { TableCell } from './content/table/table-cell/table-cell';
import { TableHead } from './content/table/table-head/table-head';
import { TableHeadCell } from './content/table/table-head-cell/table-head-cell';
import { TableHeadRow } from './content/table/table-head-row/table-head-row';
import { TableRow } from './content/table/table-row/table-row';
import { Tabs } from './content/tabs/tabs/tabs';
import { TabsItem } from './content/tabs/tabs-item/tabs-item';
import { TextList } from './content/text-list/text-list/text-list';
import { TextListItem } from './content/text-list/text-list-item/text-list-item';
import { Toast } from './feedback/toast/toast/toast';
import { ToastItem } from './feedback/toast/toast-item/toast-item';
import { SelectWrapper } from './form/select-wrapper/select-wrapper/select-wrapper';
import { SelectWrapperDropdown } from './form/select-wrapper/select-wrapper-dropdown/select-wrapper-dropdown';
import { Flex } from './layout/flex/flex/flex';
import { FlexItem } from './layout/flex/flex-item/flex-item';
import { Grid } from './layout/grid/grid/grid';
import { GridItem } from './layout/grid/grid-item/grid-item';

type ClassType = {
  host: HTMLElement;
  connectedCallback?: () => void;
  componentWillLoad?: () => void;
  componentWillRender?: () => void;
  render: () => void;
};

export const TAG_NAMES_CONSTRUCTOR_MAP: { [key in TagName]: new () => ClassType } = {
  'p-button': Button,
  'p-button-pure': ButtonPure,
  'p-switch': Switch,
  'p-marque': Marque,
  'p-accordion': Accordion,
  'p-modal': Modal,
  'p-tag-status': TagStatus,
  'p-banner': Banner,
  'p-inline-notification': InlineNotification,
  'p-popover': Popover,
  'p-spinner': Spinner,
  'p-checkbox-wrapper': CheckboxWrapper,
  'p-fieldset-wrapper': FieldsetWrapper,
  'p-radio-button-wrapper': RadioButtonWrapper,
  'p-text-field-wrapper': TextFieldWrapper,
  'p-textarea-wrapper': TextareaWrapper,
  'p-icon': Icon,
  'p-button-group': ButtonGroup,
  'p-content-wrapper': ContentWrapper,
  'p-divider': Divider,
  'p-link': Link,
  'p-link-pure': LinkPure,
  'p-link-social': LinkSocial,
  'p-pagination': Pagination,
  'p-tabs-bar': TabsBar,
  'p-headline': Headline,
  'p-text': Text,
  'p-table': Table,
  'p-table-body': TableBody,
  'p-table-cell': TableCell,
  'p-table-head': TableHead,
  'p-table-head-cell': TableHeadCell,
  'p-table-head-row': TableHeadRow,
  'p-table-row': TableRow,
  'p-tabs': Tabs,
  'p-tabs-item': TabsItem,
  'p-text-list': TextList,
  'p-text-list-item': TextListItem,
  'p-toast': Toast,
  'p-toast-item': ToastItem,
  'p-select-wrapper': SelectWrapper,
  'p-select-wrapper-dropdown': SelectWrapperDropdown,
  'p-flex': Flex,
  'p-flex-item': FlexItem,
  'p-grid': Grid,
  'p-grid-item': GridItem,
};
/* Auto Generated End */

const tagNamesWithRequiredChild = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredChild);
const tagNamesWithJss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).styling === 'jss');
const tagNamesWithSlottedCss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).hasSlottedCss);

it('should have same amount of elements in TAG_NAMES_CONSTRUCTOR_MAP as in TAG_NAMES', () => {
  expect(Object.keys(TAG_NAMES_CONSTRUCTOR_MAP).length).toBe(TAG_NAMES.length);
});

it.each<TagName>(tagNamesWithRequiredChild)(
  'should call getHTMLElementAndThrowIfUndefined() via componentWillLoad for %s',
  (tagName) => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();

    try {
      component.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  }
);

it.each<TagName>(tagNamesWithJss)('should call attachComponentCss() in correct lifecycle for %s', (tagName) => {
  const spy = jest.spyOn(jssUtils, 'attachComponentCss');
  let spyCalls = 0;

  const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();
  component.host = document.createElement(tagName);
  component.host.attachShadow({ mode: 'open' });

  if (component.connectedCallback) {
    try {
      component.connectedCallback();
    } catch (e) {}

    if (spy.mock.calls.length) {
      expect(spy).toBeCalledWith(component.host, expect.any(Function)); // 2 parameters within connectedCallback
      spyCalls++;
    }
  }

  if (component.componentWillRender) {
    spy.mockClear(); // might contain something from previous call already

    // some components like grid-item and text-list-item require a parent to apply styles
    const parent = document.createElement('div');
    parent.append(component.host);

    if (['p-checkbox-wrapper', 'p-radio-button-wrapper', 'p-text-field-wrapper'].includes(tagName)) {
      component['input'] = document.createElement('input');
    } else if ('p-textarea-wrapper' === tagName) {
      component['textarea'] = document.createElement('textarea');
    } else if ('p-select-wrapper' === tagName) {
      component['select'] = document.createElement('select');
    } else if (tagName === 'p-modal') {
      component['aria'] = { 'aria-label': 'Some Heading' };
    }

    try {
      component.componentWillRender();
    } catch (e) {}

    if (spy.mock.calls.length) {
      expect(spy.mock.calls[0].length).toBeGreaterThan(2); // more than 2 parameters within componentWillRender
      spyCalls++;
    }
  }

  expect(spyCalls).toBe(1); // via connectedCallback or componentWillRender
});

it.each<TagName>(tagNamesWithSlottedCss)('should call attachSlottedCss() in correct lifecycle for %s', (tagName) => {
  const spy = jest.spyOn(slottedStylesUtils, 'attachSlottedCss');

  const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();
  component.host = document.createElement(tagName);
  component.host.attachShadow({ mode: 'open' });

  try {
    component.connectedCallback();
  } catch (e) {}

  expect(spy).toBeCalledWith(component.host, expect.any(Function)); // 2 parameters within connectedCallback
});
