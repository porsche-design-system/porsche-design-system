<script setup lang="ts">
import { GradientToBottom, GradientToLeft, GradientToRight, GradientToTop, Wrapper } from './gradient.css';
</script>

<template>
  <div :class="Wrapper">
    <div :class="GradientToTop">Gradient To Top</div>
    <div :class="GradientToBottom">Gradient To Bottom</div>
    <div :class="GradientToLeft">Gradient To Left</div>
    <div :class="GradientToRight">Gradient To Right</div>
  </div>
</template>


