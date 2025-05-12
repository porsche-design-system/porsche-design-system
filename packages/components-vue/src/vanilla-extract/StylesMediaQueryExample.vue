<script setup lang="ts">
import {
  BreakpointBase,
  BreakpointL,
  BreakpointM,
  BreakpointS,
  BreakpointXL,
  BreakpointXS,
  BreakpointXXL,
  Heading,
  MediaQueryMax,
  MediaQueryMin,
  MediaQueryMinMax,
  Wrapper,
} from './media-query.css';
</script>

<template>
  <div :class="Wrapper">
    <h3 :class="Heading">Media Query (change viewport to see effect)</h3>
    <p :class="MediaQueryMin">Media Query Min:</p>
    <p :class="MediaQueryMax">Media Query Max:</p>
    <p :class="MediaQueryMinMax">Media Query Min Max:</p>
  </div>
  <div :class="Wrapper">
    <h3 :class="Heading">Breakpoint</h3>
    <p :class="BreakpointBase">Breakpoint Base:</p>
    <p :class="BreakpointXS">Breakpoint XS:</p>
    <p :class="BreakpointS">Breakpoint S:</p>
    <p :class="BreakpointM">Breakpoint M:</p>
    <p :class="BreakpointL">Breakpoint L:</p>
    <p :class="BreakpointXL">Breakpoint XL:</p>
    <p :class="BreakpointXXL">Breakpoint XXL:</p>
  </div>
</template>


