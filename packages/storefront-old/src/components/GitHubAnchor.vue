<template>
  <p-link-pure
    :theme="$store.getters.storefrontTheme"
    :icon-source="require('@/assets/github.svg')"
    href="https://github.com/porsche-design-system/porsche-design-system"
    target="_blank"
    hide-label="true"
  >
    Navigate to GitHub repository of Porsche Design System
  </p-link-pure>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class GitHubAnchor extends Vue {}
</script>
