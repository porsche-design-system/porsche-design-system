<script setup lang="ts">
  import type {
    BreakpointCustomizable,
    ButtonAriaAttributes,
    ButtonType,
    ButtonVariant,
    IconName,
    SelectedAriaAttributes,
    ThemeExtendedElectric,
  } from '../../projects/vue-wrapper/src/lib/types';
  import { onMounted, onUpdated, ref } from 'vue';
  import { syncProperties, usePrefix } from '../../projects/vue-wrapper/src/utils';

  export type Props = {
    /**
     * Add ARIA attributes.
     */
    aria?: SelectedAriaAttributes<ButtonAriaAttributes>;
    /**
     * Disables the button. No events will be triggered while disabled state is active.
     */
    disabled?: boolean;
    /**
     * Show or hide label. For better accessibility it is recommended to show the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * The icon shown.
     */
    icon?: IconName;
    /**
     * A URL path to a custom icon.
     */
    iconSource?: string;
    /**
     * Disables the button and shows a loading indicator. No events will be triggered while loading state is active.
     */
    loading?: boolean;
    /**
     * To remove the element from tab order.
     * @deprecated since v2.8.0, use `tabindex="-1"` instead
     */
    tabbable?: boolean;
    /**
     * Adapts the button color depending on the theme.
     */
    theme?: ThemeExtendedElectric;
    /**
     * Specifies the type of the button.
     */
    type?: ButtonType;
    /**
     * The style variant of the button.
     */
    variant?: ButtonVariant;
  };

  const WebComponentTag = usePrefix('p-button');

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    hideLabel: false,
    icon: 'arrow-head-right',
    loading: false,
    tabbable: true,
    theme: 'light',
    type: 'submit',
    variant: 'secondary',
  });
  const pdsComponentRef = ref<Props>({});

  onMounted(() => {
    syncProperties(props, pdsComponentRef.value);
  });

  onUpdated(() => {
    syncProperties(props, pdsComponentRef.value);
  });
</script>

<template>
  <WebComponentTag ref="pdsComponentRef"><slot /></WebComponentTag>
</template>
