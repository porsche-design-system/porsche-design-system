'use client';

import { componentMeta } from '@porsche-design-system/component-meta';
import { type AccordionUpdateEventDetail, PAccordion } from '@porsche-design-system/components-react/ssr';
import type React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ConfigureColorScheme } from '@/components/playground/ConfigureColorScheme';
import { ConfigureCssVariables } from '@/components/playground/ConfigureCssVariables';
import { ConfigureProps } from '@/components/playground/ConfigureProps';
import { ConfigureSlots } from '@/components/playground/ConfigureSlots';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import type { SlotStories, Story, StoryState } from '@/models/story';
import type {
  ConfiguratorTagNames,
  ElementConfig,
  HTMLTagOrComponent,
  PropTypeMapping,
} from '@/utils/generator/generator';
import { isAllowedValue } from '@/utils/isAllowedValue';

type ConfiguratorControlsProps<T extends ConfiguratorTagNames> = {
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
  const [accordionState, setAccordionState] = useState<Record<number, boolean>>({
    0: true,
  });

  const handleAccordionUpdate = (index: number, e: CustomEvent<AccordionUpdateEventDetail>) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [index]: e.detail.open,
    }));
  };

  const shouldUpdate = (
    selectedValue: string | boolean | number | undefined,
    propName: keyof ElementConfig<typeof tagName>['properties']
  ) => {
    if (propName === 'theme') return true;
    if (isAllowedValue(meta.propsMeta?.[propName]?.allowedValues, 'number')) {
      if (selectedValue === undefined && !meta.propsMeta?.[propName]?.isRequired) {
        // If it's a controlled prop we don't want the prop to be removed since its necessary to have it in the state
        const isControlledProp = meta.controlledMeta?.some(({ props }) => props.includes(propName));
        return !isControlledProp;
      }
      return true;
    }
    const isEqualToCurrentValue = selectedValue === storyState.properties?.[propName];
    const isEmptyStringAndNotApplied = selectedValue === '' && storyState.properties?.[propName] === undefined;
    const isNotAppliedAndDefaultValue =
      storyState.properties?.[propName] === undefined && meta.propsMeta?.[propName]?.defaultValue === selectedValue;

    return !(isEqualToCurrentValue || isEmptyStringAndNotApplied || isNotAppliedAndDefaultValue);
  };

  const handleUpdateProps = (
    propName: keyof ElementConfig<typeof tagName>['properties'],
    selectedValue: string | boolean | number | undefined
  ) => {
    if (!shouldUpdate(selectedValue, propName)) return;

    setStoryState((prev) => {
      const isDefault =
        meta.propsMeta &&
        isDefaultValue(meta.propsMeta[propName], selectedValue) &&
        // If the prop is controlled we need to keep it in the state
        !meta.controlledMeta?.some(({ props }) => props.includes(propName));
      const updatedProperties = { ...prev.properties };

      if (selectedValue === undefined || isDefault) {
        delete updatedProperties[propName];
      } else {
        // @ts-expect-error TODO: Fix typing
        updatedProperties[propName] = selectedValue;
      }

      return { ...prev, properties: updatedProperties as PropTypeMapping[typeof tagName] };
    });
  };

  const handleUpdateSlots = (slotName: string, selectedSlotStory: Story<T> | undefined) => {
    setStoryState((prev) => {
      const updatedSlots = { ...prev.slots };
      // @ts-expect-error TODO: Fix typing
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
          // @ts-expect-error TODO: Fix typing
          delete updatedProps.style;
        }
      }

      return {
        ...prev,
        properties: updatedProps as PropTypeMapping[typeof tagName],
      };
    });
  };

  const handleUpdateColorScheme = (colorScheme: string) => {
    setStoryState((prev) => {
      const updatedProps = { ...prev.properties, style: { ...prev.properties?.style, colorScheme } };
      if (!colorScheme) {
        delete (updatedProps.style as Record<string, string>).colorScheme;
        if (Object.keys(updatedProps.style).length === 0) {
          // @ts-expect-error TODO: Fix typing
          delete updatedProps.style;
        }
      }
      return { ...prev, properties: updatedProps as PropTypeMapping[typeof tagName] };
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
    slotStories && (
      <ConfigureSlots
        tagName={tagName}
        componentSlots={meta.slotsMeta}
        configuredSlots={storyState}
        slotStories={slotStories ?? {}}
        onUpdateSlots={handleUpdateSlots}
      />
    ),
    Object.keys(meta.cssVariablesMeta ?? {}).filter((name) => !name.startsWith('--ref')).length > 0 && (
      <ConfigureCssVariables
        tagName={tagName}
        componentCssVariables={meta.cssVariablesMeta}
        configuredCssVariables={storyState?.properties}
        defaultCssVariables={defaultStoryState?.properties ?? {}}
        onUpdateCssVariables={handleUpdateCssVariable}
        onResetAllCssVariables={() => {
          // TODO: Implement
        }}
      />
    ),
    <ConfigureColorScheme
      style={storyState.properties?.style ?? {}}
      handleUpdateColorScheme={handleUpdateColorScheme}
    />,
  ];

  return (
    <>
      {domReady
        ? createPortal(
            controls.filter(Boolean).map((control, index) => (
              <PAccordion
                key={index}
                background="surface"
                open={accordionState[index] || false}
                onUpdate={(e) => handleAccordionUpdate(index, e)}
              >
                {control}
              </PAccordion>
            )),
            // biome-ignore lint/style/noNonNullAssertion: part of p-canvas
            document.querySelector('[slot="sidebar-end"]')!
          )
        : null}
    </>
  );
};
