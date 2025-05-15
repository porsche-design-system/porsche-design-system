<script setup lang="ts">
import { Heading, NativeAnchor, Paragraph, Wrapper, WrapperDark, WrapperLight } from './hover.css';
</script>

<template>
  <div :class="[Wrapper, WrapperLight]">
    <h3 :class="Heading">Hover Light</h3>
    <a :class="NativeAnchor" href="#">Some Anchor</a>
    <p :class="Paragraph">
      Lorem Ipsum <a :class="NativeAnchor" href="#">is simply dummy text of the printing</a> and typesetting
      industry.
    </p>
  </div>
  <div :class="[Wrapper, WrapperDark]">
    <h2 :class="Heading">Hover Dark</h2>
    <a :class="NativeAnchor" href="#">Some Anchor</a>
    <p :class="Paragraph">
      Lorem Ipsum <a :class="NativeAnchor" href="#">is simply dummy text of the printing</a> and typesetting
      industry.
    </p>
  </div>
</template>


