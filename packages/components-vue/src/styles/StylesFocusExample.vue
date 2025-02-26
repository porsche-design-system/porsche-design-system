<script setup lang="ts">
import { Heading, NativeAnchor, NativeButton, Paragraph, Wrapper, WrapperDark, WrapperLight } from './focus.css';
</script>

<template>
  <div :class="[Wrapper, WrapperLight]">
    <h3 :class="Heading">Focus Light (only visible by keyboard navigation)</h3>
    <button :class="NativeButton">Some Button</button>
    <a :class="NativeAnchor" href="#">Some Anchor</a>
    <p :class="Paragraph">
      Lorem Ipsum <a :class="NativeAnchor" href="#">is simply dummy text of the printing</a> and typesetting
      industry.
    </p>
  </div>
  <div :class="[Wrapper, WrapperDark]">
    <h3 :class="Heading">Focus Dark (only visible by keyboard navigation)</h3>
    <button :class="NativeButton">Some Button</button>
    <a :class="NativeAnchor" href="#">Some Anchor</a>
    <p :class="Paragraph">
      Lorem Ipsum <a :class="NativeAnchor" href="#">is simply dummy text of the printing</a> and typesetting
      industry.
    </p>
  </div>
</template>


