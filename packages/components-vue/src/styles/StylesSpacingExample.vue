<script setup lang="ts">
import { style } from '@vanilla-extract/css';
import {
  Heading,
  SpacingFluidLarge,
  SpacingFluidMedium,
  SpacingFluidSmall,
  SpacingFluidXLarge,
  SpacingFluidXSmall,
  SpacingFluidXXLarge,
  SpacingStaticLarge,
  SpacingStaticMedium,
  SpacingStaticSmall,
  SpacingStaticXLarge,
  SpacingStaticXSmall,
  SpacingStaticXXLarge,
  Wrapper,
} from './spacing.css';
</script>

<template>
  <div :class="Wrapper">
    <h3 :class="Heading">Spacing Fluid (XS - XXL)</h3>
    <div :class="SpacingFluidXSmall"></div>
    <div :class="SpacingFluidSmall"></div>
    <div :class="SpacingFluidMedium"></div>
    <div :class="SpacingFluidLarge"></div>
    <div :class="SpacingFluidXLarge"></div>
    <div :class="SpacingFluidXXLarge"></div>
  </div>
  <div :class="Wrapper">
    <h3 :class="Heading">Spacing Static (XS - XXL)</h3>
    <div :class="SpacingStaticXSmall"></div>
    <div :class="SpacingStaticSmall"></div>
    <div :class="SpacingStaticMedium"></div>
    <div :class="SpacingStaticLarge"></div>
    <div :class="SpacingStaticXLarge"></div>
    <div :class="SpacingStaticXXLarge"></div>
  </div>
</template>


