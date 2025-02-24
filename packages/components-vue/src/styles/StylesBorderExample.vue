<script setup lang="ts">
import {
  BorderRadiusLarge,
  BorderRadiusMedium,
  BorderRadiusSmall,
  BorderWidthBase,
  BorderWidthThin,
  Heading,
  Wrapper,
} from './border.css';
</script>

<template>
  <div :class="Wrapper">
    <h3 :class="Heading">Border Radius</h3>
    <div :class="BorderRadiusSmall">Small</div>
    <div :class="BorderRadiusMedium">Medium</div>
    <div :class="BorderRadiusLarge">Large</div>
  </div>
  <div :class="Wrapper">
    <h3 :class="Heading">Border Width</h3>
    <div :class="BorderWidthBase" />
    <div :class="BorderWidthThin" />
  </div>
</template>


