<script setup lang="ts">
import {
  Heading,
  SkeletonDark,
  SkeletonLight,
  SkeletonTextLargeDark,
  SkeletonTextLargeLight,
  SkeletonTextMediumDark,
  SkeletonTextMediumLight,
  SkeletonTextSmallDark,
  SkeletonTextSmallLight,
  Wrapper,
  WrapperDark,
  WrapperLight,
  boxStyles,
  textStyles,
} from './skeleton.css';
</script>

<template>
  <div :class="[Wrapper, WrapperLight]">
    <h3 :class="Heading">Skeleton Light</h3>
    <div :class="[SkeletonLight, boxStyles]" />
  </div>
  <div :class="[Wrapper, WrapperLight]">
    <div :class="[SkeletonTextSmallLight]" />
    <div :class="[SkeletonLight, textStyles, SkeletonTextMediumLight]" />
    <div :class="[SkeletonLight, textStyles, SkeletonTextLargeLight]" />
  </div>
  <div :class="[Wrapper, WrapperDark]">
    <h3 :class="Heading">Skeleton Dark</h3>
    <div :class="[SkeletonDark, boxStyles]" />
  </div>
  <div :class="[Wrapper, WrapperDark]">
    <div :class="[SkeletonDark, textStyles, SkeletonTextSmallDark]" />
    <div :class="[SkeletonDark, textStyles, SkeletonTextMediumDark]" />
    <div :class="[SkeletonDark, textStyles, SkeletonTextLargeDark]" />
  </div>
</template>


