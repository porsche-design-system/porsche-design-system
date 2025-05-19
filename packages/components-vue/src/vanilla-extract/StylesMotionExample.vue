<script setup lang="ts">
import { ref } from 'vue';
import { Heading, MotionEnterExit, MotionExpand, MotionMoving, MotionShowHide, TileBase, Wrapper } from './motion.css';

const isMovingActive = ref(false);
const isEnterExitActive = ref(false);
const isShowHideActive = ref(false);
const isExpandActive = ref(false);
</script>

<template>
  <div :class="Wrapper">
    <h3 :class="Heading">Moving</h3>
    <div
      :class="[TileBase, MotionMoving[isMovingActive ? 'active' : 'inactive']]"
      @click="isMovingActive = !isMovingActive"
    >
      play
    </div>

    <h3 :class="Heading">Enter / Exit</h3>
    <div
      :class="[TileBase, MotionEnterExit[isEnterExitActive ? 'active' : 'inactive']]"
      @click="isEnterExitActive = !isEnterExitActive"
    >
      play
    </div>

    <h3 :class="Heading">Show / Hide</h3>
    <div
      :class="[TileBase, MotionShowHide[isShowHideActive ? 'active' : 'inactive']]"
      @click="isShowHideActive = !isShowHideActive"
    >
      play
    </div>

    <h3 :class="Heading">Expand</h3>
    <div
      :class="[TileBase, MotionExpand[isExpandActive ? 'active' : 'inactive']]"
      @click="isExpandActive = !isExpandActive"
    >
      play
    </div>
  </div>
</template>
