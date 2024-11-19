<template>
  <p-inline-notification
    :theme="$store.getters.storefrontTheme"
    :heading="heading"
    :state="state"
    dismiss-button="false"
  >
    <slot />
  </p-inline-notification>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({})
export default class Notification extends Vue {
  @Prop({ default: '' }) public heading!: string;
  @Prop({ default: 'info' }) public state!: 'warning' | 'error' | 'success' | 'info';
}
</script>
