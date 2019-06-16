<template>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class NotFound extends Vue {

    private async created(): Promise<void> {
      this.$router.replace('/');
    }
  }
</script>
