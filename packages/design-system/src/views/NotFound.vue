<template>
  <Markdown>
    <div class="vmark">
      <h1>404</h1>
      <p>This page does not exist.</p>
    </div>
  </Markdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Markdown from '@/components/Markdown.vue';

@Component({
  components: {
    Markdown
  }
})
export default class NotFound extends Vue {}
</script>
