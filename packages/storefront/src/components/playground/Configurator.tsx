'use client';

import { ConfigureProps } from '@/components/playground/ConfigureProps';
import { Playground } from '@/components/playground/Playground';
import { componentsStory } from '@/components/playground/componentStory';
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
  PFlyout,
  PFlyoutMultilevel,
  PGrid,
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
  POptgroup,
  PPagination,
  PPinCode,
  PPopover,
  PRadioButtonWrapper,
  PScroller,
  PSegmentedControl,
  PSelect,
  PSelectWrapper,
  PSheet,
  PSpinner,
  PStepperHorizontal,
  PSwitch,
  PTable,
  PTabs,
  PTabsBar,
  PTag,
  PTagDismissible,
  PText,
  PTextFieldWrapper,
  PTextList,
  PTextarea,
  PTextareaWrapper,
  PToast,
  PWordmark,
} from '@porsche-design-system/components-react/ssr';
import type { TagNameWithChunk } from '@porsche-design-system/shared';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type ElementConfig = {
  tag: TagNameWithChunk; // The component tag e.g. 'p-button'
  attributes?: Record<string, string | boolean>; // The component attributes/props written in camelCase e.g. { hideLabel: 'true' }
  children?: (string | ElementConfig)[]; // Nested children either as string for text or ElementConfig for nested components
};

const componentMap: Record<TagNameWithChunk, React.ElementType> = {
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
  'p-flyout': PFlyout,
  'p-flyout-multilevel': PFlyoutMultilevel,
  'p-grid': PGrid,
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
  'p-optgroup': POptgroup,
  'p-pagination': PPagination,
  'p-pin-code': PPinCode,
  'p-popover': PPopover,
  'p-radio-button-wrapper': PRadioButtonWrapper,
  'p-scroller': PScroller,
  'p-segmented-control': PSegmentedControl,
  'p-select': PSelect,
  'p-select-wrapper': PSelectWrapper,
  'p-sheet': PSheet,
  'p-spinner': PSpinner,
  'p-stepper-horizontal': PStepperHorizontal,
  'p-switch': PSwitch,
  'p-table': PTable,
  'p-tabs': PTabs,
  'p-tabs-bar': PTabsBar,
  'p-tag': PTag,
  'p-tag-dismissible': PTagDismissible,
  'p-text': PText,
  'p-text-field-wrapper': PTextFieldWrapper,
  'p-text-list': PTextList,
  'p-textarea': PTextarea,
  'p-textarea-wrapper': PTextareaWrapper,
  'p-toast': PToast,
  'p-wordmark': PWordmark,
};

type GeneratedOutput = {
  jsx: React.ReactNode;
  markup: string;
};

const generateOutput = (
  descriptor: ElementConfig,
  indentLevel = 0 // Track indentation level for formatting
): GeneratedOutput => {
  const { tag, attributes = {}, children = [] } = descriptor;

  const attributesString = Object.entries(attributes)
    .map(([key, value]) => (typeof value === 'string' ? `${key}="${value}"` : `${key}='${JSON.stringify(value)}'`))
    .join(' ');

  const processedChildren = children.map((child) =>
    typeof child === 'string'
      ? { jsx: child, markup: `${'  '.repeat(indentLevel + 1)}${child}` }
      : generateOutput(child, indentLevel + 1)
  );

  const jsxChildren = processedChildren.map((child) => child.jsx);
  const markupChildren = processedChildren.map((child) => child.markup).join('\n');

  const ReactComponent = tag.startsWith('p-') ? componentMap[tag] : tag;
  const jsx = React.createElement(ReactComponent, { key: JSON.stringify(attributes), ...attributes }, ...jsxChildren);

  const indent = '  '.repeat(indentLevel);

  const markup =
    children.length > 0
      ? `${indent}<${tag}${attributesString ? ` ${attributesString}` : ''}>\n${markupChildren}\n${indent}</${tag}>`
      : `${indent}<${tag}${attributesString ? ` ${attributesString}` : ''} />`;

  return { jsx, markup };
};

type ConfiguratorProps = {
  tagName: TagNameWithChunk;
};

export const Configurator = ({ tagName }: ConfiguratorProps) => {
  const [example, setExample] = useState<ElementConfig>(componentsStory[tagName]);
  const [domReady, setDomReady] = useState(false);

  const meta = componentMeta[tagName];

  const { jsx, markup } = generateOutput(example);

  const handleUpdateProps = (propName: string, selectedValue: string) => {
    setExample((prev) => {
      const { attributes = {} } = prev;

      const updatedAttributes = {
        ...attributes,
        [propName]: selectedValue,
      };

      if (isDefaultValue(meta.propsMeta?.[propName]?.defaultValue, selectedValue) || selectedValue === '') {
        delete updatedAttributes[propName];
      }

      return { ...prev, attributes: updatedAttributes };
    });
  };

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (!meta.propsMeta) return null;

  return (
    <>
      {domReady
        ? createPortal(
            <ConfigureProps
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
