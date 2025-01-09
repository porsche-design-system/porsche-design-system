<template>
  <Markdown>
    <div class="vmark">
      <h1>404 - Page not found</h1>
      <p>
        The page you are looking for can not be found. It has either been replaced, deleted or does no longer exist. You
        can therefore return to the last page or use the navigation to continue.
      </p>
    </div>
  </Markdown>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Markdown from '@/components/Markdown.vue';

@Component({
  components: {
    Markdown,
  },
})
export default class NotFoundView extends Vue {}
</script>
