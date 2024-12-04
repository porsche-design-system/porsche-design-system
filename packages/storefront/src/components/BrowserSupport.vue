<template>
  <p-table caption="Browser support">
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
        <p-table-cell>
          >= {{ chrome }} <p-icon name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell>
          >= {{ edge }} <p-icon name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell>
          >= {{ safari }} <p-icon name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell>
          >= {{ firefox }} <p-icon name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell>
          >= {{ chromeForAndroid }} <p-icon name="success" color="notification-success"></p-icon>
        </p-table-cell>
        <p-table-cell>
          >= {{ safariForiOS }} <p-icon name="success" color="notification-success"></p-icon>
        </p-table-cell>
      </p-table-row>
    </p-table-body>
  </p-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class BrowserSupport extends Vue {
  @Prop({ default: '' }) public chrome!: string;
  @Prop({ default: '' }) public edge!: string;
  @Prop({ default: '' }) public safari!: string;
  @Prop({ default: '' }) public firefox!: string;
  @Prop({ default: '' }) public chromeForAndroid!: string;
  @Prop({ default: '' }) public safariForiOS!: string;
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  p-table {
    margin-top: $pds-spacing-fluid-medium;
  }
</style>