# Introduction

## Partials

Partials are utility functions that return static code or markup that is very dynamic (e.g. contains hashed file names).  
We primarily offer them to improve the loading and bootstrapping experience by preloading external assets like component chunks, fonts and icons but also initializing the Porsche Design System as early as possible.

They should be called during build time, **not** run time. 

### Available partials

<ul v-html="partialNames"></ul>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { paramCase } from 'change-case';
import * as partials from '@porsche-design-system/components-js/partials';

@Component
export default class Code extends Vue {
  public partialNames = Object.keys(partials)
    .sort()
    .map(partial => `<li><a href="partials/${paramCase(partial.replace('get', ''))}">${partial}()</a></li>`)
    .join('');
}
</script>
