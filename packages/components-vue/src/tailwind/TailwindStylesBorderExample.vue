<template>
  <div class="flex flex-wrap justify-center gap-fluid-md p-fluid-md">
    <h3 class="prose-heading-md text-center w-full m-0">Border Radius</h3>
    <div class="rounded-sm prose-text-sm text-primary-dark bg-base-dark p-fluid-md">Small</div>
    <div class="rounded-md prose-text-sm text-primary-dark bg-base-dark p-fluid-md">Medium</div>
    <div class="rounded-lg prose-text-sm text-primary-dark bg-base-dark p-fluid-md">Large</div>
  </div>
  <div class="flex flex-wrap justify-center gap-fluid-md p-fluid-md">
    <h3 class="prose-heading-md text-center w-full m-0">Border Width</h3>
    <div class="border-b w-full before:content-['Base'] before:prose-text-xs" />
    <div class="border-b-thin w-full before:content-['Thin'] before:prose-text-xs" />
  </div>
</template>