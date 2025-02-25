<script setup lang="ts">
import {
  DisplayLargeStyle,
  DisplayMediumStyle,
  DisplaySmallStyle,
  Heading,
  HeadingLargeStyle,
  HeadingMediumStyle,
  HeadingSmallStyle,
  HeadingXLargeStyle,
  HeadingXXLargeStyle,
  TextLargeStyle,
  TextMediumStyle,
  TextSmallStyle,
  TextXLargeStyle,
  TextXSmallStyle,
  TextXXSmallStyle,
  Wrapper,
} from './typography.css';
const content = 'The quick brown fox jumps over the lazy dog';
</script>

<template>
  <div :class="Wrapper">
    <h3 :class="Heading">Display</h3>
    <h1 :class="DisplayLargeStyle">{{content}}</h1>
    <h2 :class="DisplayMediumStyle">{{content}}</h2>
    <h2 :class="DisplaySmallStyle">{{content}}</h2>
  </div>
  <div :class="Wrapper">
    <h3 :class="Heading">Heading</h3>
    <h2 :class="HeadingXXLargeStyle">{{content}}</h2>
    <h3 :class="HeadingXLargeStyle">{{content}}</h3>
    <h4 :class="HeadingLargeStyle">{{content}}</h4>
    <h5 :class="HeadingMediumStyle">{{content}}</h5>
    <h6 :class="HeadingSmallStyle">{{content}}</h6>
  </div>
  <div :class="Wrapper">
    <h3 :class="Heading">Text</h3>
    <p :class="TextXLargeStyle">{{content}}</p>
    <p :class="TextLargeStyle">{{content}}</p>
    <p :class="TextMediumStyle">{{content}}</p>
    <p :class="TextSmallStyle">{{content}}</p>
    <p :class="TextXSmallStyle">{{content}}</p>
    <p :class="TextXXSmallStyle">{{content}}</p>
  </div>
</template>


