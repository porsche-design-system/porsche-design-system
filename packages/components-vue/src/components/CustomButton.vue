<script setup lang="ts">
  import type {
    BreakpointCustomizable,
    ButtonAriaAttributes,
    ButtonType,
    ButtonVariant,
    IconName,
    SelectedAriaAttributes,
    ThemeExtendedElectric,
  } from '../../../components-react/projects/react-wrapper/src/lib/types';
  import { inject, onMounted, onUpdated, ref } from 'vue';

  interface Props {
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
  }

  const prefix = inject('prefix');
  const TagName = prefix + '-' + 'p-button';
  const props = defineProps<Props>();
  const compRef = ref<HTMLElement & Props>();

  onMounted(() => {
    compRef.value!.loading = props.loading;
    compRef.value!.icon = props.icon;
    compRef.value!.variant = props.variant;
  });

  onUpdated(() => {
    compRef.value!.loading = props.loading;
    compRef.value!.icon = props.icon;
    compRef.value!.variant = props.variant;
  });
</script>

<template>
  <TagName ref="compRef" />
</template>
