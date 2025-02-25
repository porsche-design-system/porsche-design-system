<script setup lang="ts">
import { DropShadowHigh, DropShadowLow, DropShadowMedium, Heading, Wrapper } from './drop-shadow.css';
</script>

<template>
  <div :class="Wrapper">
    <h3 :class="Heading">Drop Shadow</h3>
    <div :class="DropShadowLow">Low</div>
    <div :class="DropShadowMedium">Medium</div>
    <div :class="DropShadowHigh">High</div>
  </div>
</template>


