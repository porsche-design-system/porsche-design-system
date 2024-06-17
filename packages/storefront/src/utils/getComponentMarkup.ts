import type { TagName } from '@porsche-design-system/shared';
import { convertToAngular, convertToReact } from '@/utils/index';
import { convertToVue } from '@/utils/convertToVue';
import type { ComponentSlots } from '@/utils/componentSlots';
import type { ComponentProps } from '@/utils/componentProps';

type Framework = 'angular' | 'react' | 'vue' | 'vanilla-js';
type FrameworkMarkup = {
  [key in Framework]?: string;
};

export const getFlyoutExamples = (
  component: TagName,
  props: ComponentProps,
  slots: ComponentSlots
): FrameworkMarkup => {
  const markup = getComponentMarkup(component, props, slots);

  return {
    'vanilla-js': getFlyoutExampleMarkup(markup, 'vanilla-js'),
    react: getFlyoutExampleMarkup(convertToReact(markup), 'react'),
    angular: getFlyoutExampleMarkup(convertToAngular(markup), 'angular'),
    vue: getFlyoutExampleMarkup(convertToVue(markup), 'vue'),
  };
};

export const getFlyoutExampleMarkup = (markup: string, framework: Framework) => {
  const examples: FrameworkMarkup = {
    'vanilla-js': `
<p-button theme="dark" type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>

${markup}

<script>
  const flyout = document.querySelector('p-flyout');
  flyout.addEventListener('dismiss', () => {
    flyout.open = false;
  });
  document.querySelector('p-button').addEventListener('click', () => {
    flyout.open = true;
  });
</script>
  `,
    react: `import { useCallback, useState } from 'react';
import { PButton, PText, PFlyout, PHeading, PButtonGroup } from '@porsche-design-system/components-react';

export const FlyoutExamplePage = (): JSX.Element => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsFlyoutOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsFlyoutOpen(false);
  }, []);

  return (
    <>
        ${markup}
    </>
  );
};`,
    angular: `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-flyout-example',
  template: \`
    ${markup}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlyoutExampleComponent {
  isFlyoutOpen = false;

  onOpen() {
    this.isFlyoutOpen = true;
  }
  onDismiss() {
    this.isFlyoutOpen = false;
  }
}`,
    vue: `<script setup lang="ts">
  import { PFlyout, PButton, PHeading, PText, PButtonGroup } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isFlyoutOpen = ref(false);
  const onOpen = (): void => {
    isFlyoutOpen.value = true;
  };
  const onDismiss = (): void => {
    isFlyoutOpen.value = false;
  };
</script>

<template>
  <PButton theme="dark" type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Flyout</PButton>
  ${markup}
</template>`,
  };

  return examples[framework];
};

export const getComponentMarkup = <T extends TagName>(component: T, props: ComponentProps, slots: ComponentSlots) => {
  return `<${component}${getHTMLAttributes(props)}>
  ${slots
    .filter((s) => s.isShown)
    .map((slot) => slot.markup)
    .join('\n  ')}
</${component}>`;
};

/**
 * Get HTML attributes string from an object of properties.
 * @param props - The object containing the properties.
 * @returns The HTML attributes string.
 */
const getHTMLAttributes = (props: ComponentProps): string => {
  const attributes = Object.entries(props)
    .filter(([, prop]) => prop.selectedValue !== undefined)
    .map(([prop, { selectedValue }]) => {
      const attributeName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const attributeValue =
        typeof selectedValue === 'object' ? JSON.stringify(selectedValue).replace(/"/g, "'") : selectedValue;
      return `${attributeName}="${attributeValue}"`;
    })
    .join(' ');
  return attributes ? ' ' + attributes : '';
};
