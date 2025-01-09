<template>
  <router-link to="/" v-slot="{ href, navigate }">
    <p-wordmark :theme="$store.getters.storefrontTheme" :href="href" @click="navigate"></p-wordmark>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Wordmark extends Vue {}
</script>
