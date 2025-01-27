'use client';

import { ConfigureProps } from '@/components/playground/ConfigureProps';
import { Playground } from '@/components/playground/Playground';
import { type ComponentsStoryTagNames, componentsStory } from '@/components/playground/componentStory';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import { componentMeta } from '@porsche-design-system/component-meta';
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
import type { TagName, TagNameWithChunk } from '@porsche-design-system/shared';
import { kebabCase } from 'change-case';
import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

export type ElementConfig = {
  tag: TagName | keyof HTMLElementTagNameMap; // The component tag e.g. 'p-button'
  // TODO: Rename property
  attributes?: Record<string, string | boolean | object>; // The component attributes/props written in camelCase e.g. { hideLabel: 'true' }
  children?: (string | ElementConfig)[]; // Nested children either as string for text or ElementConfig for nested components
};

const componentMap: Record<Exclude<TagName, 'p-select-wrapper-dropdown' | 'p-toast-item'>, React.ElementType> = {
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
  return useMemo(() => {
    const outputs = configs.map((config, index) => generateOutput(config, 0, index));
    return {
      jsx: outputs.map((output) => output.jsx),
      markup: outputs.map((output) => output.markup).join('\n\n'),
    };
  }, [configs]);
};

const generateOutput = (descriptor: ElementConfig, indentLevel = 0, index?: number): GeneratedOutput => {
  const { tag, attributes = {}, children = [] } = descriptor;

  const attributesArray = Object.entries(attributes).map(([key, value]) =>
    typeof value === 'string'
      ? `${key === 'className' ? 'class' : kebabCase(key)}="${value}"`
      : `${key}='${JSON.stringify(value)}'`
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

  const uniqueKey = index !== undefined ? `${tag}-${index}` : JSON.stringify(attributes);

  return {
    jsx: React.createElement(ReactComponent, { key: uniqueKey, ...attributes }, ...jsxChildren),
    markup:
      children.length > 0
        ? `${'  '.repeat(indentLevel)}<${tag}${attributesString}>\n${markupChildren}\n${'  '.repeat(indentLevel)}</${tag}>`
        : `${'  '.repeat(indentLevel)}<${tag}${attributesString} />`,
  };
};

type ConfiguratorProps = {
  tagName: ComponentsStoryTagNames;
};

export const Configurator = ({ tagName }: ConfiguratorProps) => {
  const configIndex = componentsStory[tagName].indexOf(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    componentsStory[tagName].find((config) => config.tag === tagName)!
  );
  const [example, setExample] = useState<ElementConfig>(componentsStory[tagName][configIndex]);
  const [domReady, setDomReady] = useState(false);

  const meta = componentMeta[tagName];

  // Replace the editable part in the global config for rendering
  const updatedConfig = [
    ...componentsStory[tagName].slice(0, configIndex),
    example,
    ...componentsStory[tagName].slice(configIndex + 1),
  ];

  // TODO: Call this in useEffect when example changes?
  const { jsx, markup } = generateCode(updatedConfig);

  const handleUpdateProps = (propName: string, selectedValue: string) => {
    setExample((prev) => {
      const updatedAttributes = {
        ...prev.attributes,
        [propName]: selectedValue,
      };

      if (isDefaultValue(meta.propsMeta?.[propName]?.defaultValue, selectedValue) || selectedValue === '') {
        delete updatedAttributes[propName];
      }

      return { ...prev, attributes: updatedAttributes };
    });
  };

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
              configuredProps={example.attributes}
              onUpdateProps={handleUpdateProps}
            />,
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            document.querySelector('[slot="sidebar-end"]')!
          )
        : null}

      <Playground frameworkMarkup={{ 'vanilla-js': markup }}>{jsx}</Playground>
    </>
  );
};
