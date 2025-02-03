'use client';

import { ConfigureCssVariables } from '@/components/playground/ConfigureCssVariables';
import { ConfigureProps } from '@/components/playground/ConfigureProps';
import { ConfigureSlots } from '@/components/playground/ConfigureSlots';
import { Playground } from '@/components/playground/Playground';
import {
  type SlotStories,
  type Story,
  type StoryState,
  componentSlotStories,
  componentsStory,
} from '@/components/playground/componentStory';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import { type GeneratedOutput, generateCode } from '@/utils/generator';
import { componentMeta } from '@porsche-design-system/component-meta';
import {
  type AccordionUpdateEventDetail,
  PAccordion,
  type PAccordionProps,
  type PBannerProps,
  type PButtonGroupProps,
  type PButtonProps,
  type PButtonPureProps,
  type PButtonTileProps,
  type PCanvasProps,
  type PCarouselProps,
  type PCheckboxProps,
  type PCheckboxWrapperProps,
  type PContentWrapperProps,
  type PCrestProps,
  type PDisplayProps,
  type PDividerProps,
  type PFieldsetProps,
  type PFieldsetWrapperProps,
  type PFlexItemProps,
  type PFlexProps,
  type PFlyoutMultilevelItemProps,
  type PFlyoutMultilevelProps,
  type PFlyoutProps,
  type PGridItemProps,
  type PGridProps,
  type PHeadingProps,
  type PHeadlineProps,
  type PIconProps,
  type PInlineNotificationProps,
  type PLinkProps,
  type PLinkPureProps,
  type PLinkSocialProps,
  type PLinkTileModelSignatureProps,
  type PLinkTileProductProps,
  type PLinkTileProps,
  type PMarqueProps,
  type PModalProps,
  type PModelSignatureProps,
  type PMultiSelectOptionProps,
  type PMultiSelectProps,
  type POptgroupProps,
  type PPaginationProps,
  type PPinCodeProps,
  type PPopoverProps,
  type PRadioButtonWrapperProps,
  type PScrollerProps,
  type PSegmentedControlItemProps,
  type PSegmentedControlProps,
  type PSelectOptionProps,
  type PSelectProps,
  type PSelectWrapperProps,
  type PSheetProps,
  type PSpinnerProps,
  type PStepperHorizontalItemProps,
  type PStepperHorizontalProps,
  type PSwitchProps,
  type PTableBodyProps,
  type PTableCellProps,
  type PTableHeadCellProps,
  type PTableHeadProps,
  type PTableHeadRowProps,
  type PTableProps,
  type PTableRowProps,
  type PTabsBarProps,
  type PTabsItemProps,
  type PTabsProps,
  type PTagDismissibleProps,
  type PTagProps,
  type PTextFieldWrapperProps,
  type PTextListItemProps,
  type PTextListProps,
  type PTextProps,
  type PTextareaProps,
  type PTextareaWrapperProps,
  type PToastProps,
  type PWordmarkProps,
  type SelectUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type SafePropTypeMapping = {
  [K in Exclude<TagName, 'p-toast-item' | 'p-select-wrapper-dropdown'>]: K extends keyof PropTypeMapping
    ? PropTypeMapping[K]
    : never;
};

export type ConfiguratorTagNames = keyof SafePropTypeMapping;

export type HTMLTagOrComponent = keyof JSX.IntrinsicElements | ConfiguratorTagNames;

/**
 * Represents the properties of T which can be either a PDS Component or an HTML Element
 */
export type HTMLElementOrComponentProps<T extends HTMLTagOrComponent = HTMLTagOrComponent> =
  T extends keyof JSX.IntrinsicElements
    ? Partial<JSX.IntrinsicElements[T]>
    : T extends ConfiguratorTagNames
      ? SafePropTypeMapping[T]
      : never;

export type ElementConfig<T extends HTMLTagOrComponent = HTMLTagOrComponent> = {
  tag: T;
  properties?: HTMLElementOrComponentProps<T>;
  children?: (string | ElementConfig | undefined)[];
};

export type PropTypeMapping = {
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

type ConfiguratorProps = {
  tagName: ConfiguratorTagNames;
};

export const Configurator = ({ tagName }: ConfiguratorProps) => {
  const meta = componentMeta[tagName];
  // @ts-ignore
  const slots: SlotStories<typeof tagName> = componentSlotStories[tagName];
  const [domReady, setDomReady] = useState(false);
  const [accordionState, setAccordionState] = useState<Record<number, boolean>>({});
  // TODO: Pass story as param into configurator
  // @ts-ignore
  const [storyState, setStoryState] = useState<StoryState<typeof tagName>>(componentsStory[tagName].state ?? {});
  const [{ jsx, markup }, setGenerated] = useState<GeneratedOutput>({ jsx: null, markup: '' });

  const handleAccordionUpdate = (index: number, e: CustomEvent<AccordionUpdateEventDetail>) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [index]: e.detail.open,
    }));
  };

  const shouldUpdate = (selectedValue: string | undefined, propName: keyof ElementConfig['properties']) => {
    if (propName === 'theme') return true;
    const isEqualToCurrentValue = selectedValue === storyState.properties?.[propName];
    const isEmptyStringAndNotApplied = selectedValue === '' && storyState.properties?.[propName] === undefined;
    const isNotAppliedAndDefaultValue =
      storyState.properties?.[propName] === undefined && meta.propsMeta?.[propName]?.defaultValue === selectedValue;
    return !(isEqualToCurrentValue || isEmptyStringAndNotApplied || isNotAppliedAndDefaultValue);
  };

  const handleUpdateProps = (propName: keyof ElementConfig['properties'], selectedValue: string | undefined) => {
    if (!shouldUpdate(selectedValue, propName)) return;

    // TODO: Fix typing
    // @ts-ignore
    setStoryState((prev) => {
      const isDefault = isDefaultValue(meta.propsMeta?.[propName], selectedValue);
      const updatedAttributes = { ...prev.properties };

      if (selectedValue === undefined || isDefault) {
        delete updatedAttributes[propName];
      } else {
        // TODO: Fix typing
        // @ts-ignore
        updatedAttributes[propName] = selectedValue;
      }

      return { ...prev, properties: updatedAttributes as PropTypeMapping[typeof tagName] };
    });
  };

  const handleUpdateSlots = (slotName: string, selectedSlotStory: Story | undefined) => {
    setStoryState((prev) => {
      const updatedSlots = { ...prev.slots };
      // TODO: Fix typing
      (updatedSlots as any)[slotName] = selectedSlotStory;
      return { ...prev, slots: updatedSlots };
    });
  };

  const handleUpdateCssVariable = (name: string, value: string | undefined) => {
    setStoryState((prev) => {
      const updatedProps: StoryState<typeof tagName>['properties'] = { ...prev.properties };

      // Ensure style is initialized
      updatedProps.style = { ...updatedProps.style };

      if (value !== undefined) {
        (updatedProps.style as any)[name] = value;
      } else {
        delete (updatedProps.style as any)[name];
        if (Object.keys(updatedProps.style).length === 0) {
          // biome-ignore lint/performance/noDelete: <explanation>
          delete updatedProps.style;
        }
      }

      return {
        ...prev,
        properties: updatedProps as PropTypeMapping[typeof tagName],
      };
    });
  };

  const handleResetAllProps = () => {
    // @ts-ignore
    setStoryState(componentsStory[tagName].state);
  };

  const handleDirectionUpdate = (e: CustomEvent<SelectUpdateEventDetail>) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(e);
  };

  useEffect(() => {
    const generatedConfig = componentsStory[tagName].generator(storyState as any); // TODO: Fix typing
    setGenerated(generateCode(generatedConfig));
  }, [storyState, tagName]);

  useEffect(() => {
    requestAnimationFrame(() => setDomReady(true));
  }, []);

  if (!meta.propsMeta) return null;

  const controls = [
    <ConfigureProps
      tagName={tagName}
      componentProps={meta.propsMeta}
      configuredProps={storyState.properties}
      defaultProps={componentsStory[tagName].state?.properties ?? {}}
      onUpdateProps={handleUpdateProps}
      onResetAllProps={handleResetAllProps}
    />,
    <ConfigureSlots
      tagName={tagName}
      componentSlots={meta.slotsMeta}
      configuredSlots={storyState}
      // @ts-ignore
      slotStories={slots}
      onUpdateSlots={handleUpdateSlots}
    />,
    <ConfigureCssVariables
      tagName={tagName}
      componentCssVariables={meta.cssVariablesMeta}
      configuredCssVariables={storyState.properties}
      defaultCssVariables={componentsStory[tagName].state?.properties ?? {}}
      onUpdateCssVariables={handleUpdateCssVariable}
      onResetAllCssVariables={() => {}}
    />,
  ];

  return (
    <>
      {domReady
        ? createPortal(
            // biome-ignore lint/complexity/noUselessFragments: <explanation>
            <>
              {controls.map((control, index) => (
                <PAccordion
                  key={index}
                  headingTag="h3"
                  open={accordionState[index] || false}
                  onUpdate={(e) => handleAccordionUpdate(index, e)}
                >
                  {control}
                </PAccordion>
              ))}
            </>,
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            document.querySelector('[slot="sidebar-end"]')!
          )
        : null}

      <Playground frameworkMarkup={{ 'vanilla-js': markup, angular: '', react: '', vue: '' }}>{jsx}</Playground>
    </>
  );
};
