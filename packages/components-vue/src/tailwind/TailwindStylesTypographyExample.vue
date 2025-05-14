<script setup lang="ts">
const content = 'The quick brown fox jumps over the lazy dog';
</script>

<template>
  <div class="flex flex-col items-start gap-fluid-md p-fluid-md">
    <h3 class="prose-heading-md m-0">Display</h3>
    <h1 class="prose-display-lg m-0">{{content}}</h1>
    <h2 class="prose-display-md m-0">{{content}}</h2>
    <h2 class="prose-display-sm m-0">{{content}}</h2>
  </div>
  <div class="flex flex-col items-start gap-fluid-md p-fluid-md">
    <h3 class="prose-heading-md m-0">Heading</h3>
    <h2 class="prose-heading-2xl m-0">{{content}}</h2>
    <h3 class="prose-heading-xl m-0">{{content}}</h3>
    <h4 class="prose-heading-lg m-0">{{content}}</h4>
    <h5 class="prose-heading-md m-0">{{content}}</h5>
    <h6 class="prose-heading-sm m-0">{{content}}</h6>
  </div>
  <div class="flex flex-col items-start gap-fluid-md p-fluid-md">
    <h3 class="prose-heading-md m-0">Text</h3>
    <p class="prose-text-xl m-0">{{content}}</p>
    <p class="prose-text-lg m-0">{{content}}</p>
    <p class="prose-text-md m-0">{{content}}</p>
    <p class="prose-text-sm m-0">{{content}}</p>
    <p class="prose-text-xs m-0">{{content}}</p>
    <p class="prose-text-2xs m-0">{{content}}</p>
  </div>
</template>