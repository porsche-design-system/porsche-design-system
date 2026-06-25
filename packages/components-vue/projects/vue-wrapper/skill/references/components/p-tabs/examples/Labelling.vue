<script setup lang="ts">
  import { PTabs, PTabsItem, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PTabs :aria="{'aria-label': 'Some label for the tablist', 'aria-description': 'Some description for the tablist'}">
    <PTabsItem label="Tab One">
      <PText>
        Tab Content One
      </PText>
    </PTabsItem>
    <PTabsItem label="Tab Two">
      <PText>
        Tab Content Two
      </PText>
    </PTabsItem>
    <PTabsItem label="Tab Three">
      <PText>
        Tab Content Three
      </PText>
    </PTabsItem>
  </PTabs>
</template>
