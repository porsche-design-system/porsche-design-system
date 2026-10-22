<script setup lang="ts">
import { PButton, PHeading, PLink, PTile } from '@porsche-design-system/components-vue';
import { ref, useTemplateRef } from 'vue';

const video = useTemplateRef<HTMLVideoElement>('video');
// a video is paused until it plays, since its autoplay can be prevented, e.g. by the tile if the user prefers reduced
// motion
const isPaused = ref(true);

const onClick = (): void => {
  if (video.value?.paused) {
    video.value.play();
  } else {
    video.value?.pause();
  }
};
</script>

<template>
  <PTile class="scheme-dark" :gradient="'bottom'" :hoverEffect="'zoom'">
    <video
      ref="video"
      slot="background"
      src="http://localhost:3002/mood-porsche-gts.mp4"
      poster="http://localhost:3002/mood-porsche-gts.webp"
      autoplay
      loop
      muted
      playsinline
      aria-hidden="true"
      @play="isPaused = false"
      @pause="isPaused = true"
    ></video>
    <PHeading slot="bottom" :tag="'h3'" :size="'md'" :weight="'semibold'">GTS models</PHeading>
    <PButton
      slot="bottom"
      class="ms-auto relative z-2"
      :type="'button'"
      :variant="'secondary'"
      :icon="isPaused ? 'play' : 'pause'"
      :hideLabel="true"
      :compact="true"
      @click="onClick"
    >
      {{ isPaused ? 'Play video' : 'Pause video' }}
    </PButton>
    <PLink slot="bottom" :variant="'secondary'" :icon="'arrow-right'" :hideLabel="true" :compact="true" :cover="true">
      <a href="#">GTS models</a>
    </PLink>
  </PTile>
</template>
