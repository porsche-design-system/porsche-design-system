import type { TagName } from '@porsche-design-system/shared';
import { convertToAngular, convertToReact } from '@/utils/index';
import { convertToVue } from '@/utils/convertToVue';

type Slots = {
  [x: string]: string | undefined;
};

type Props = {
  [x: string]: any;
};

type Framework = 'angular' | 'react' | 'vue' | 'vanilla-js';
type FrameworkMarkup = {
  [key in Framework]?: string;
};

export const getComponentSlotContent = (component: TagName) => {
  // TODO: Fix typing
  const slotContent: { [key in TagName]: { [x: string]: string | { [x: string]: string } } } = {
    'p-flyout': {
      header: '<p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>',
      content: {
        default: '<p-text>Some Content</p-text>',
        scrollable: `<p-text>Some Content Begin</p-text>
  <div style="width: 10px; height: 120vh; background: deeppink;"></div>
  <p-text>Some Content End</p-text>`,
        'sticky-content': `<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px; align-items: flex-start">
    <div
      style="
        position: sticky;
        top: calc(var(--p-flyout-sticky-top, 0) + 16px);
        padding: 16px;
        background: rgba(255, 0, 0, 0.1);
      "
    >
      Some sticky element within content relying on --p-flyout-sticky-top
    </div>
    <div>
      <p-text theme="dark">Some Content Begin</p-text>
      <div style="width: 10px; height: 120vh; background: deeppink;"></div>
      <p-text theme="dark">Some Content End</p-text>
    </div>
  </div>`,
      },
      footer: `<p-button-group slot="footer">
    <p-button type="button">Proceed</p-button>
    <p-button type="button" variant="secondary">Cancel</p-button>
  </p-button-group>`,
      'sub-footer': '<p-text slot="sub-footer">Some additional Sub-Footer</p-text>',
    },
  };
  return slotContent[component];
};

export const getFlyoutExamples = (component: TagName, props: Props, slots: Slots): FrameworkMarkup => {
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

export const getComponentMarkup = <T extends TagName>(component: T, props: Props, slots: Slots) => {
  return `<${component}${getHTMLAttributes(props)}>
  ${Object.values(slots).filter(Boolean).join('\n  ')}
</${component}>`;
};

// TODO: Copied from playwright-helper
/**
 * Get HTML attributes string from an object of properties.
 * @param props - The object containing the properties.
 * @returns The HTML attributes string.
 */
const getHTMLAttributes = <T extends object>(props: T): string => {
  const attributes = Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([prop, value]) => {
      const attributeName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const attributeValue = typeof value === 'object' ? JSON.stringify(value).replace(/"/g, "'") : value;
      return `${attributeName}="${attributeValue}"`;
    })
    .join(' ');
  return attributes ? ' ' + attributes : '';
};
