# Form Patterns - Code

## Login Form

<router-link :to="`/patterns/forms/example-login`" v-slot="{ href, navigate}">
  <p-link-pure :href="href" icon="external" @click="navigate" target="_blank" class="spacing-mt-24">Example Login Form</p-link-pure>
</router-link>
