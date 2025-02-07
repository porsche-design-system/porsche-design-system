import type {
  ConfiguratorTagNames,
  ElementConfig,
  EventConfig,
  HTMLTagOrComponent,
} from '@/components/playground/ConfiguratorControls';
import type { StoryState } from '@/models/story';
import {
  PAccordion,
  PBanner,
  PButton,
  PButtonGroup,
  PButtonPure,
  PButtonTile,
  PCanvas,
  PCarousel,
  PCheckbox,
  PCheckboxWrapper,
  PContentWrapper,
  PCrest,
  PDisplay,
  PDivider,
  PFieldset,
  PFieldsetWrapper,
  PFlex,
  PFlexItem,
  PFlyout,
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
  PGrid,
  PGridItem,
  PHeading,
  PHeadline,
  PIcon,
  PInlineNotification,
  PLink,
  PLinkPure,
  PLinkSocial,
  PLinkTile,
  PLinkTileModelSignature,
  PLinkTileProduct,
  PMarque,
  PModal,
  PModelSignature,
  PMultiSelect,
  PMultiSelectOption,
  POptgroup,
  PPagination,
  PPinCode,
  PPopover,
  PRadioButtonWrapper,
  PScroller,
  PSegmentedControl,
  PSegmentedControlItem,
  PSelect,
  PSelectOption,
  PSelectWrapper,
  PSheet,
  PSpinner,
  PStepperHorizontal,
  PStepperHorizontalItem,
  PSwitch,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
  PTabs,
  PTabsBar,
  PTabsItem,
  PTag,
  PTagDismissible,
  PText,
  PTextFieldWrapper,
  PTextList,
  PTextListItem,
  PTextarea,
  PTextareaWrapper,
  PToast,
  PWordmark,
} from '@porsche-design-system/components-react/ssr';
import { pascalCase } from 'change-case';
import React, { type ReactNode } from 'react';

const componentMap: Record<ConfiguratorTagNames, React.ElementType> = {
  'p-accordion': PAccordion,
  'p-banner': PBanner,
  'p-button': PButton,
  'p-button-group': PButtonGroup,
  'p-button-pure': PButtonPure,
  'p-button-tile': PButtonTile,
  'p-canvas': PCanvas,
  'p-carousel': PCarousel,
  'p-checkbox': PCheckbox,
  'p-checkbox-wrapper': PCheckboxWrapper,
  'p-content-wrapper': PContentWrapper,
  'p-crest': PCrest,
  'p-display': PDisplay,
  'p-divider': PDivider,
  'p-fieldset': PFieldset,
  'p-fieldset-wrapper': PFieldsetWrapper,
  'p-flex': PFlex,
  'p-flex-item': PFlexItem,
  'p-flyout': PFlyout,
  'p-flyout-multilevel': PFlyoutMultilevel,
  'p-flyout-multilevel-item': PFlyoutMultilevelItem,
  'p-grid': PGrid,
  'p-grid-item': PGridItem,
  'p-heading': PHeading,
  'p-headline': PHeadline,
  'p-icon': PIcon,
  'p-inline-notification': PInlineNotification,
  'p-link': PLink,
  'p-link-pure': PLinkPure,
  'p-link-social': PLinkSocial,
  'p-link-tile': PLinkTile,
  'p-link-tile-model-signature': PLinkTileModelSignature,
  'p-link-tile-product': PLinkTileProduct,
  'p-marque': PMarque,
  'p-modal': PModal,
  'p-model-signature': PModelSignature,
  'p-multi-select': PMultiSelect,
  'p-multi-select-option': PMultiSelectOption,
  'p-optgroup': POptgroup,
  'p-pagination': PPagination,
  'p-pin-code': PPinCode,
  'p-popover': PPopover,
  'p-radio-button-wrapper': PRadioButtonWrapper,
  'p-scroller': PScroller,
  'p-segmented-control': PSegmentedControl,
  'p-segmented-control-item': PSegmentedControlItem,
  'p-select': PSelect,
  'p-select-option': PSelectOption,
  'p-select-wrapper': PSelectWrapper,
  'p-sheet': PSheet,
  'p-spinner': PSpinner,
  'p-stepper-horizontal': PStepperHorizontal,
  'p-stepper-horizontal-item': PStepperHorizontalItem,
  'p-switch': PSwitch,
  'p-table': PTable,
  'p-table-body': PTableBody,
  'p-table-cell': PTableCell,
  'p-table-head-cell': PTableHeadCell,
  'p-table-row': PTableRow,
  'p-table-head-row': PTableHeadRow,
  'p-table-head': PTableHead,
  'p-tabs': PTabs,
  'p-tabs-item': PTabsItem,
  'p-tabs-bar': PTabsBar,
  'p-tag': PTag,
  'p-tag-dismissible': PTagDismissible,
  'p-text': PText,
  'p-text-field-wrapper': PTextFieldWrapper,
  'p-text-list': PTextList,
  'p-text-list-item': PTextListItem,
  'p-textarea': PTextarea,
  'p-textarea-wrapper': PTextareaWrapper,
  'p-toast': PToast,
  'p-wordmark': PWordmark,
};

// TODO: Better to lazily import components? Suspense and loading needed
const getPDSReactComponentLazy = (tag: string) => {
  return React.lazy(() =>
    import('@porsche-design-system/components-react/ssr').then((module) => {
      const component = module[pascalCase(tag)];
      if (!component) {
        throw new Error(`Component ${pascalCase(tag)} not found.`);
      }
      return { default: component as React.ComponentType<any> };
    })
  );
};

export const createElements = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  updateState: React.Dispatch<React.SetStateAction<StoryState<HTMLTagOrComponent>>>
): ReactNode => {
  return configs.map((config, index) => createElement(config, index, updateState));
};

export const createElement = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  key: number,
  updateState: React.Dispatch<React.SetStateAction<StoryState<HTMLTagOrComponent>>>
): ReactNode => {
  if (!config) return null;
  if (typeof config === 'string') return config;

  const { tag, properties = {}, events = {}, children = [] } = config;
  const isPDSComponent = tag.startsWith('p-');

  const ReactComponent = isPDSComponent ? componentMap[tag as ConfiguratorTagNames] : tag;

  const eventEntries = Object.entries(events);

  const handleEvent = ({ prop, eventValueKey, negateValue, value }: EventConfig) => {
    return (event: any) => {
      const eventValue = eventValueKey ? event.detail[eventValueKey] : value;
      const newValue = negateValue ? !eventValue : eventValue;
      updateState((prev) => ({
        ...prev,
        properties: {
          ...prev.properties,
          [prop]: newValue,
        },
      }));
    };
  };

  const propsWithEvents =
    eventEntries.length > 0
      ? {
          ...properties,
          ...eventEntries.reduce((acc, [eventName, eventInfo]) => {
            acc[eventName] = handleEvent(eventInfo);
            return acc;
          }, {} as any),
        }
      : properties;

  return React.createElement(
    ReactComponent,
    { key, ...propsWithEvents },
    ...(children || []).map((child, index) => createElement(child, index, updateState))
  );
};
