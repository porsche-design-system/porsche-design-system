<script setup lang="ts">
import { PButton, PFlyout, PHeading, PText } from '@porsche-design-system/components-vue';
import { GridLayout } from '../components';
import { Wrapper } from './flyout-grid.css';
</script>

<template>
  <!--  Wrapper and nested GridLayout is needed to calculate the whole height of rendered frid example to support full height screenshot of flyout with grid-->
  <div :class="Wrapper">
    <GridLayout :visualizeGrid="false" />
  </div>
  <PFlyout :open="true">
    <div slot="header">
      <PHeading tag="h5" size="large">
        Sticky Heading
      </PHeading>
      <PText size="small">Sticky header text</PText>
    </div>
    <GridLayout :visualizeGrid="false" />
    <div slot="footer">
      <PButton type="button">Footer Button</PButton>
    </div>
    <div slot="sub-footer">Some Sub Footer Content</div>
  </PFlyout>
</template>


