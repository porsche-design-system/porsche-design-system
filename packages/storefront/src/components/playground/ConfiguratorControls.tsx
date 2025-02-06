'use client';

import { ConfigureCssVariables } from '@/components/playground/ConfigureCssVariables';
import { ConfigureProps } from '@/components/playground/ConfigureProps';
import { ConfigureSlots } from '@/components/playground/ConfigureSlots';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import type { SlotStories, Story, StoryState } from '@/models/story';
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
} from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import type React from 'react';
import { useEffect, useState } from 'react';
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
export type HTMLElementOrComponentProps<T extends HTMLTagOrComponent> = T extends keyof JSX.IntrinsicElements
  ? Partial<JSX.IntrinsicElements[T]>
  : T extends ConfiguratorTagNames
    ? SafePropTypeMapping[T]
    : never;

export type ElementConfig<T extends HTMLTagOrComponent> = {
  tag: T;
  properties?: HTMLElementOrComponentProps<T>;
  children?: (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
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

type ConfiguratorControlsProps<T extends HTMLTagOrComponent> = {
  tagName: T;
  defaultStoryState: StoryState<HTMLTagOrComponent>;
  storyState: StoryState<T>;
  setStoryState: React.Dispatch<React.SetStateAction<StoryState<HTMLTagOrComponent>>>;
  slotStories?: SlotStories<T>;
};

export const ConfiguratorControls = <T extends ConfiguratorTagNames>({
  tagName,
  defaultStoryState,
  storyState,
  setStoryState,
  slotStories,
}: ConfiguratorControlsProps<T>) => {
  const meta = componentMeta[tagName];
  const [domReady, setDomReady] = useState(false);
  const [accordionState, setAccordionState] = useState<Record<number, boolean>>({});

  const handleAccordionUpdate = (index: number, e: CustomEvent<AccordionUpdateEventDetail>) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [index]: e.detail.open,
    }));
  };

  const shouldUpdate = (
    selectedValue: string | undefined,
    propName: keyof ElementConfig<typeof tagName>['properties']
  ) => {
    if (propName === 'theme') return true;
    const isEqualToCurrentValue = selectedValue === storyState.properties?.[propName];
    const isEmptyStringAndNotApplied = selectedValue === '' && storyState.properties?.[propName] === undefined;
    const isNotAppliedAndDefaultValue =
      storyState.properties?.[propName] === undefined && meta.propsMeta?.[propName]?.defaultValue === selectedValue;
    return !(isEqualToCurrentValue || isEmptyStringAndNotApplied || isNotAppliedAndDefaultValue);
  };

  const handleUpdateProps = (
    propName: keyof ElementConfig<typeof tagName>['properties'],
    selectedValue: string | undefined
  ) => {
    if (!shouldUpdate(selectedValue, propName)) return;

    setStoryState((prev) => {
      const isDefault = isDefaultValue(meta.propsMeta?.[propName], selectedValue);
      const updatedProperties = { ...prev.properties };

      if (selectedValue === undefined || isDefault) {
        delete updatedProperties[propName];
      } else {
        // @ts-ignore TODO: Fix typing
        updatedProperties[propName] = selectedValue;
      }

      return { ...prev, properties: updatedProperties as PropTypeMapping[typeof tagName] };
    });
  };

  const handleUpdateSlots = (slotName: string, selectedSlotStory: Story<T> | undefined) => {
    setStoryState((prev) => {
      const updatedSlots = { ...prev.slots };
      // @ts-ignore TODO: Fix typing
      updatedSlots[slotName] = selectedSlotStory;
      return { ...prev, slots: updatedSlots };
    });
  };

  const handleUpdateCssVariable = (name: string, value: string | undefined) => {
    setStoryState((prev) => {
      const updatedProps = {
        ...prev.properties,
        style: prev.properties?.style ? { ...prev.properties.style } : {},
      };

      if (value !== undefined) {
        (updatedProps.style as Record<string, string>)[name] = value;
      } else {
        delete (updatedProps.style as Record<string, string>)[name];
        if (Object.keys(updatedProps.style).length === 0) {
          // @ts-ignore TODO: Fix typing
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

  useEffect(() => {
    requestAnimationFrame(() => setDomReady(true));
  }, []);

  if (!meta.propsMeta) return null;

  const controls = [
    <ConfigureProps
      tagName={tagName}
      componentProps={meta.propsMeta}
      configuredProps={storyState?.properties}
      defaultProps={defaultStoryState?.properties}
      onUpdateProps={handleUpdateProps}
      onResetAllProps={() => setStoryState(defaultStoryState ?? {})}
    />,
    <ConfigureSlots
      tagName={tagName}
      componentSlots={meta.slotsMeta}
      configuredSlots={storyState}
      slotStories={slotStories ?? {}}
      onUpdateSlots={handleUpdateSlots}
    />,
    <ConfigureCssVariables
      tagName={tagName}
      componentCssVariables={meta.cssVariablesMeta}
      configuredCssVariables={storyState?.properties}
      defaultCssVariables={defaultStoryState?.properties ?? {}}
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
    </>
  );
};
