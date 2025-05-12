<script setup lang="ts">
import { ref } from 'vue';

const isMovingActive = ref(false);
const isEnterExitActive = ref(false);
const isShowHideActive = ref(false);
const isExpandActive = ref(false);
</script>

<template>
  <div class="flex flex-wrap justify-center gap-fluid-md p-fluid-md">
    <h3 class="pds-heading-md text-primary-light text-center w-full">Moving</h3>
    <div
      class="[transition:transform_var(--pds-duration-short)_var(--ease-base)] w-[200px] h-[100px] leading-[100px] text-center text-primary-light bg-background-surface-light rounded-lg cursor-pointer"
      :class="[isMovingActive ? 'transform-[translateX(200px)]' : 'transform-[translateX(-200px)]']"
      @click="isMovingActive = !isMovingActive"
    >
      play
    </div>

    <h3 class="pds-heading-md text-primary-light text-center w-full">Enter / Exit</h3>
    <div
      class="w-[200px] h-[100px] leading-[100px] text-center text-primary-light bg-background-surface-light rounded-lg cursor-pointer"
      :class="[isEnterExitActive ?
        'opacity-[0] transform-[translateY(40%)] [transition:opacity_var(--pds-duration-short)_var(--ease-out),transform_var(--pds-duration-short)_var(--ease-out)]' :
        'opacity-[1] transform-[translateY(0px)] [transition:opacity_var(--pds-duration-moderate)_var(--ease-in),transform_var(--pds-duration-moderate)_var(--ease-in)]'
      ]"
      @click="isEnterExitActive = !isEnterExitActive"
    >
      play
    </div>

    <h3 class="pds-heading-md text-primary-light text-center w-full">Show / Hide</h3>
    <div
      class="[transition:opacity_var(--pds-duration-long)_var(--ease-base)] w-[200px] h-[100px] leading-[100px] text-center text-primary-light bg-background-surface-light rounded-lg cursor-pointer"
      :class="[isShowHideActive ?
        'opacity-[0]' :
        'opacity-[1]'
      ]"
      @click="isShowHideActive = !isShowHideActive"
    >
      play
    </div>

    <h3 class="pds-heading-md text-primary-light text-center w-full">Expand</h3>
    <div
      class="w-[200px] h-[100px] leading-[100px] text-center text-primary-light bg-background-surface-light rounded-lg cursor-pointer"
      :class="[isExpandActive ?
        'h-[200px] [transition:height_var(--pds-duration-moderate)_var(--ease-base)]' :
        'h-auto [transition:height_var(--pds-duration-short)_var(--ease-in)]'
      ]"
      @click="isExpandActive = !isExpandActive"
    >
      play
    </div>
  </div>
</template>