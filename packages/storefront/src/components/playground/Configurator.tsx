'use client';

import { ConfigureProps } from '@/components/playground/ConfigureProps';
import { Playground } from '@/components/playground/Playground';
import { componentsStory } from '@/components/playground/componentStory';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import { componentMeta } from '@porsche-design-system/component-meta';
import {
  PAccordion,
  type PAccordionProps,
  PBanner,
  type PBannerProps,
  PButton,
  PButtonGroup,
  type PButtonGroupProps,
  type PButtonProps,
  PButtonPure,
  type PButtonPureProps,
  PButtonTile,
  type PButtonTileProps,
  PCanvas,
  type PCanvasProps,
  PCarousel,
  type PCarouselProps,
  PCheckbox,
  type PCheckboxProps,
  PCheckboxWrapper,
  type PCheckboxWrapperProps,
  PContentWrapper,
  type PContentWrapperProps,
  PCrest,
  type PCrestProps,
  PDisplay,
  type PDisplayProps,
  PDivider,
  type PDividerProps,
  PFieldset,
  type PFieldsetProps,
  PFieldsetWrapper,
  type PFieldsetWrapperProps,
  PFlex,
  PFlexItem,
  type PFlexItemProps,
  type PFlexProps,
  PFlyout,
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
  type PFlyoutMultilevelItemProps,
  type PFlyoutMultilevelProps,
  type PFlyoutProps,
  PGrid,
  PGridItem,
  type PGridItemProps,
  type PGridProps,
  PHeading,
  type PHeadingProps,
  PHeadline,
  type PHeadlineProps,
  PIcon,
  type PIconProps,
  PInlineNotification,
  type PInlineNotificationProps,
  PLink,
  type PLinkProps,
  PLinkPure,
  type PLinkPureProps,
  PLinkSocial,
  type PLinkSocialProps,
  PLinkTile,
  PLinkTileModelSignature,
  type PLinkTileModelSignatureProps,
  PLinkTileProduct,
  type PLinkTileProductProps,
  type PLinkTileProps,
  PMarque,
  type PMarqueProps,
  PModal,
  type PModalProps,
  PModelSignature,
  type PModelSignatureProps,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectOptionProps,
  type PMultiSelectProps,
  POptgroup,
  type POptgroupProps,
  PPagination,
  type PPaginationProps,
  PPinCode,
  type PPinCodeProps,
  PPopover,
  type PPopoverProps,
  PRadioButtonWrapper,
  type PRadioButtonWrapperProps,
  PScroller,
  type PScrollerProps,
  PSegmentedControl,
  PSegmentedControlItem,
  type PSegmentedControlItemProps,
  type PSegmentedControlProps,
  PSelect,
  PSelectOption,
  type PSelectOptionProps,
  type PSelectProps,
  PSelectWrapper,
  type PSelectWrapperProps,
  PSheet,
  type PSheetProps,
  PSpinner,
  type PSpinnerProps,
  PStepperHorizontal,
  PStepperHorizontalItem,
  type PStepperHorizontalItemProps,
  type PStepperHorizontalProps,
  PSwitch,
  type PSwitchProps,
  PTable,
  PTableBody,
  type PTableBodyProps,
  PTableCell,
  type PTableCellProps,
  PTableHead,
  PTableHeadCell,
  type PTableHeadCellProps,
  type PTableHeadProps,
  PTableHeadRow,
  type PTableHeadRowProps,
  type PTableProps,
  PTableRow,
  type PTableRowProps,
  PTabs,
  PTabsBar,
  type PTabsBarProps,
  PTabsItem,
  type PTabsItemProps,
  type PTabsProps,
  PTag,
  PTagDismissible,
  type PTagDismissibleProps,
  type PTagProps,
  PText,
  PTextFieldWrapper,
  type PTextFieldWrapperProps,
  PTextList,
  PTextListItem,
  type PTextListItemProps,
  type PTextListProps,
  type PTextProps,
  PTextarea,
  type PTextareaProps,
  PTextareaWrapper,
  type PTextareaWrapperProps,
  PToast,
  type PToastProps,
  PWordmark,
  type PWordmarkProps,
} from '@porsche-design-system/components-react/ssr';
import type { TagName, TagNameWithChunk } from '@porsche-design-system/shared';
import { kebabCase } from 'change-case';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type ConfiguratorTagNames = keyof SafePropTypeMapping;

type HTMLTagOrComponent = keyof JSX.IntrinsicElements | ConfiguratorTagNames;

export type ElementConfig<T extends HTMLTagOrComponent = HTMLTagOrComponent> = T extends keyof JSX.IntrinsicElements
  ? {
      tag: T;
      properties?: Partial<JSX.IntrinsicElements[T]>;
      children?: (string | ElementConfig)[];
    }
  : T extends ConfiguratorTagNames // Ensure T is in ConfiguratorTagNames for custom components
    ? PDSComponentConfig<T>
    : never;

export type PDSComponentConfig<T extends ConfiguratorTagNames = ConfiguratorTagNames> = {
  tag: T;
  properties?: SafePropTypeMapping[T];
  children?: (string | ElementConfig)[];
};

type SafePropTypeMapping = {
  [K in Exclude<TagName, 'p-toast-item' | 'p-select-wrapper-dropdown'>]: K extends keyof PropTypeMapping
    ? PropTypeMapping[K]
    : never;
};

type PropTypeMapping = {
  'p-accordion': PAccordionProps;
  'p-banner': PBannerProps;
  'p-button': PButtonProps;
  'p-button-group': PButtonGroupProps;
  'p-button-pure': PButtonPureProps;
  'p-button-tile': PButtonTileProps;
  'p-canvas': PCanvasProps;
  'p-carousel': PCarouselProps;
  'p-checkbox': PCheckboxProps;
  'p-checkbox-wrapper': PCheckboxWrapperProps;
  'p-content-wrapper': PContentWrapperProps;
  'p-crest': PCrestProps;
  'p-display': PDisplayProps;
  'p-divider': PDividerProps;
  'p-fieldset': PFieldsetProps;
  'p-fieldset-wrapper': PFieldsetWrapperProps;
  'p-flex': PFlexProps;
  'p-flex-item': PFlexItemProps;
  'p-flyout': PFlyoutProps;
  'p-flyout-multilevel': PFlyoutMultilevelProps;
  'p-flyout-multilevel-item': PFlyoutMultilevelItemProps;
  'p-grid': PGridProps;
  'p-grid-item': PGridItemProps;
  'p-heading': PHeadingProps;
  'p-headline': PHeadlineProps;
  'p-icon': PIconProps;
  'p-inline-notification': PInlineNotificationProps;
  'p-link': PLinkProps;
  'p-link-pure': PLinkPureProps;
  'p-link-social': PLinkSocialProps;
  'p-link-tile': PLinkTileProps;
  'p-link-tile-model-signature': PLinkTileModelSignatureProps;
  'p-link-tile-product': PLinkTileProductProps;
  'p-marque': PMarqueProps;
  'p-modal': PModalProps;
  'p-model-signature': PModelSignatureProps;
  'p-multi-select': PMultiSelectProps;
  'p-multi-select-option': PMultiSelectOptionProps;
  'p-optgroup': POptgroupProps;
  'p-pagination': PPaginationProps;
  'p-pin-code': PPinCodeProps;
  'p-popover': PPopoverProps;
  'p-radio-button-wrapper': PRadioButtonWrapperProps;
  'p-scroller': PScrollerProps;
  'p-segmented-control': PSegmentedControlProps;
  'p-segmented-control-item': PSegmentedControlItemProps;
  'p-select': PSelectProps;
  'p-select-option': PSelectOptionProps;
  'p-select-wrapper': PSelectWrapperProps;
  'p-sheet': PSheetProps;
  'p-spinner': PSpinnerProps;
  'p-stepper-horizontal': PStepperHorizontalProps;
  'p-stepper-horizontal-item': PStepperHorizontalItemProps;
  'p-switch': PSwitchProps;
  'p-table': PTableProps;
  'p-table-body': PTableBodyProps;
  'p-table-cell': PTableCellProps;
  'p-table-head-cell': PTableHeadCellProps;
  'p-table-row': PTableRowProps;
  'p-table-head-row': PTableHeadRowProps;
  'p-table-head': PTableHeadProps;
  'p-tabs': PTabsProps;
  'p-tabs-item': PTabsItemProps;
  'p-tabs-bar': PTabsBarProps;
  'p-tag': PTagProps;
  'p-tag-dismissible': PTagDismissibleProps;
  'p-text': PTextProps;
  'p-text-field-wrapper': PTextFieldWrapperProps;
  'p-text-list': PTextListProps;
  'p-text-list-item': PTextListItemProps;
  'p-textarea': PTextareaProps;
  'p-textarea-wrapper': PTextareaWrapperProps;
  'p-toast': PToastProps;
  'p-wordmark': PWordmarkProps;
};

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

type GeneratedOutput = {
  jsx: React.ReactNode;
  markup: string;
};

const generateCode = (configs: ElementConfig[]): GeneratedOutput => {
  const outputs = configs.map((config, index) => generateOutput(config, 0, index));
  return {
    jsx: outputs.map((output) => output.jsx),
    markup: outputs.map((output) => output.markup).join('\n\n'),
  };
};

const generateOutput = (descriptor: ElementConfig, indentLevel = 0, index?: number): GeneratedOutput => {
  const { tag, properties = {}, children = [] } = descriptor;

  const attributesArray = Object.entries(properties).map(([key, value]) =>
    typeof value === 'string'
      ? `${key === 'className' ? 'class' : kebabCase(key)}="${value}"`
      : `${kebabCase(key)}='${JSON.stringify(value)}'`
  );
  const attributesString = attributesArray.length > 0 ? ` ${attributesArray.join(' ')}` : '';

  // Process children
  const processedChildren = children.map((child, childIndex) =>
    typeof child === 'string'
      ? { jsx: child, markup: `${'  '.repeat(indentLevel + 1)}${child}` }
      : generateOutput(child, indentLevel + 1, childIndex)
  );

  const jsxChildren = processedChildren.map((child) => child.jsx);
  const markupChildren = processedChildren.map((child) => child.markup).join('\n');

  const ReactComponent = tag.startsWith('p-') ? componentMap[tag as TagNameWithChunk] : tag;

  const uniqueKey = index !== undefined ? `${tag}-${index}` : JSON.stringify(properties);

  return {
    jsx: React.createElement(ReactComponent, { key: uniqueKey, ...properties }, ...jsxChildren),
    markup:
      children.length > 0
        ? `${'  '.repeat(indentLevel)}<${tag}${attributesString}>\n${markupChildren}\n${'  '.repeat(indentLevel)}</${tag}>`
        : `${'  '.repeat(indentLevel)}<${tag}${attributesString} />`,
  };
};

type ConfiguratorProps = {
  tagName: ConfiguratorTagNames;
};

export const Configurator = ({ tagName }: ConfiguratorProps) => {
  const componentConfig = componentsStory[tagName].find((config) => config.tag === tagName) as PDSComponentConfig;
  const configIndex = componentsStory[tagName].indexOf(componentConfig as ElementConfig);
  const [example, setExample] = useState<PDSComponentConfig>(componentConfig);
  const [{ jsx, markup }, setGenerated] = useState<GeneratedOutput>({ jsx: null, markup: '' });
  const [domReady, setDomReady] = useState(false);

  const meta = componentMeta[tagName];

  const shouldUpdate = (selectedValue: string | undefined, propName: keyof PDSComponentConfig['properties']) => {
    const isEqualToCurrentValue = selectedValue === example.properties?.[propName];
    const isEmptyStringAndNotApplied = selectedValue === '' && example.properties?.[propName] === undefined;
    const isNotAppliedAndDefaultValue =
      example.properties?.[propName] === undefined && meta.propsMeta?.[propName]?.defaultValue === selectedValue;
    return !(isEqualToCurrentValue || isEmptyStringAndNotApplied || isNotAppliedAndDefaultValue);
  };

  const handleUpdateProps = (propName: keyof PDSComponentConfig['properties'], selectedValue: string | undefined) => {
    if (!shouldUpdate(selectedValue, propName)) return;

    setExample((prev) => {
      const isDefault = isDefaultValue(meta.propsMeta?.[propName]?.defaultValue, selectedValue);
      const updatedAttributes = { ...prev.properties };

      // Delete the prop if value is undefined or if it's a default value based on input type and onBlur
      // When the inputType is a text-field we can only delete the property onBlur since it would mess with the user input otherwise
      if (selectedValue === undefined || isDefault) {
        delete updatedAttributes[propName];
      } else {
        // @ts-ignore
        updatedAttributes[propName] = selectedValue;
      }

      return { ...prev, properties: updatedAttributes as PropTypeMapping[typeof tagName] };
    });
  };

  const handleResetAllProps = () => {
    setExample(componentConfig);
  };

  useEffect(() => {
    // Replace the editable part in the global config for rendering
    const updatedConfig = [
      ...componentsStory[tagName].slice(0, configIndex),
      example,
      ...componentsStory[tagName].slice(configIndex + 1),
    ] as ElementConfig[];

    setGenerated(generateCode(updatedConfig));
  }, [example, configIndex, tagName]);

  useEffect(() => {
    requestAnimationFrame(() => setDomReady(true));
  }, []);

  if (!meta.propsMeta) return null;

  return (
    <>
      {domReady
        ? createPortal(
            <ConfigureProps
              tagName={tagName}
              componentProps={meta.propsMeta}
              configuredProps={example.properties}
              defaultProps={componentConfig.properties}
              onUpdateProps={handleUpdateProps}
              onResetAllProps={handleResetAllProps}
            />,
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            document.querySelector('[slot="sidebar-end"]')!
          )
        : null}

      <Playground frameworkMarkup={{ 'vanilla-js': markup, angular: '', react: '', vue: '' }}>{jsx}</Playground>
    </>
  );
};
