# Introduction

## Partials

Partials are utility functions that return static code or markup that is very dynamic (e.g. contains hashed file names).
We primarily offer them to improve the loading and bootstrapping experience by preloading external assets like component
chunks, fonts and icons but also initializing the Porsche Design System as early as possible. In addition, "fallbacks"
are provided to inform the user about e.g. the usage of an unsupported browser or disabled browser cookies.

Partials have to be called during build time, **not** run time.

### Required partials

<ul v-html="requiredPartialNames"></ul>

### Recommended partials

<ul v-html="recommendedPartialNames"></ul>

An in-depth optimization guide can be found at
[Vanilla Js Optimization](must-know/initialization/vanilla-js#optimization).

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { paramCase } from 'change-case';
import * as partials from '@porsche-design-system/components-js/partials';

const partialNames = Object.keys(partials).sort();
const getPartialLink = (partial: string): string => `<li><a href="partials/${paramCase(partial.replace('get', ''))}">${partial}()</a></li>`;

@Component
export default class Code extends Vue {
  requiredPartials = ['getInitialStyles'];

  public requiredPartialNames = partialNames.filter(partial => this.requiredPartials.includes(partial)).map(getPartialLink).join('');
  public recommendedPartialNames = partialNames.filter(partial => !this.requiredPartials.includes(partial)).map(getPartialLink).join('');
}
</script>
