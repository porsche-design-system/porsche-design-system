<template></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {
  private created(): void {
    this.$router.replace('/');
  }
}
</script>
