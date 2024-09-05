# Ag Grid

<TableOfContents></TableOfContents>

### Stackblitz

<Playground :frameworkMarkup="AGGridExamples" :config="{ ...config, withoutDemo: true }"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import {getButtonCodeSamples} from "@porsche-design-system/shared"; 
import type { Theme } from '@/models'; 
import {getAgGridCodeSamples} from "shared/src"; 

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline', embedStackblitz: true };

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  AGGridExamples = getAgGridCodeSamples();
}
</script>
