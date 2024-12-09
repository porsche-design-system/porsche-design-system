<template>
  <p-table :theme="$store.getters.storefrontTheme" caption="Browser support">
    <p-table-head>
      <p-table-head-row>
        <p-table-head-cell>Chrome</p-table-head-cell>
        <p-table-head-cell>Edge</p-table-head-cell>
        <p-table-head-cell>Safari</p-table-head-cell>
        <p-table-head-cell>Firefox</p-table-head-cell>
        <p-table-head-cell>Chrome for Android</p-table-head-cell>
        <p-table-head-cell>Safari for iOS</p-table-head-cell>
      </p-table-head-row>
    </p-table-head>
    <p-table-body>
      <p-table-row>
        <p-table-cell v-if="typeof chrome === 'string'">
          >= {{ chrome }}
          <p-icon :theme="$store.getters.storefrontTheme" name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell v-else>
          >= {{ chrome.version }}
          <p-icon :theme="$store.getters.storefrontTheme" name="warning" color="notification-warning"></p-icon>
          <p-popover :theme="$store.getters.storefrontTheme" :description="chrome.message"></p-popover>
        </p-table-cell>

        <p-table-cell v-if="typeof edge === 'string'">
          >= {{ edge }}
          <p-icon :theme="$store.getters.storefrontTheme" name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell v-else>
          >= {{ edge.version }}
          <p-icon :theme="$store.getters.storefrontTheme" name="warning" color="notification-warning"></p-icon>
          <p-popover :theme="$store.getters.storefrontTheme" :description="edge.message"></p-popover>
        </p-table-cell>

        <p-table-cell v-if="typeof safari === 'string'">
          >= {{ safari }}
          <p-icon :theme="$store.getters.storefrontTheme" name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell v-else>
          >= {{ safari.version }}
          <p-icon :theme="$store.getters.storefrontTheme" name="warning" color="notification-warning"></p-icon>
          <p-popover :theme="$store.getters.storefrontTheme" :description="safari.message"></p-popover>
        </p-table-cell>

        <p-table-cell v-if="typeof firefox === 'string'">
          >= {{ firefox }}
          <p-icon :theme="$store.getters.storefrontTheme" name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell v-else>
          >= {{ firefox.version }}
          <p-icon :theme="$store.getters.storefrontTheme" name="warning" color="notification-warning"></p-icon>
          <p-popover :theme="$store.getters.storefrontTheme" :description="firefox.message"></p-popover>
        </p-table-cell>

        <p-table-cell v-if="typeof chromeForAndroid === 'string'">
          >= {{ chromeForAndroid }}
          <p-icon :theme="$store.getters.storefrontTheme" name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell v-else>
          >= {{ chromeForAndroid.version }}
          <p-icon :theme="$store.getters.storefrontTheme" name="warning" color="notification-warning"></p-icon>
          <p-popover :theme="$store.getters.storefrontTheme" :description="chromeForAndroid.message"></p-popover>
        </p-table-cell>

        <p-table-cell v-if="typeof safariForiOS === 'string'">
          >= {{ safariForiOS }}
          <p-icon :theme="$store.getters.storefrontTheme" name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell v-else>
          >= {{ safariForiOS.version }}
          <p-icon :theme="$store.getters.storefrontTheme" name="warning" color="notification-warning"></p-icon>
          <p-popover :theme="$store.getters.storefrontTheme" :description="safariForiOS.message"></p-popover>
        </p-table-cell>
      </p-table-row>
    </p-table-body>
  </p-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

type Status = { version: string; support: 'full' | 'partial'; message: 'string' };

@Component
export default class BrowserSupport extends Vue {
  @Prop({ default: '' }) public chrome!: string | Status;
  @Prop({ default: '' }) public edge!: string | Status;
  @Prop({ default: '' }) public safari!: string | Status;
  @Prop({ default: '' }) public firefox!: string | Status;
  @Prop({ default: '' }) public chromeForAndroid!: string | Status;
  @Prop({ default: '' }) public safariForiOS!: string | Status;
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  p-table {
    margin-top: $pds-spacing-fluid-medium;
  }
</style>