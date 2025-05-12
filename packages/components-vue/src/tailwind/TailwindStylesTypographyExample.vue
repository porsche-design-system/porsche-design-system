<script setup lang="ts">
const content = 'The quick brown fox jumps over the lazy dog';
</script>

<template>
  <div class="flex flex-col items-start gap-fluid-md p-fluid-md">
    <h3 class="pds-heading-md">Display</h3>
    <h1 class="pds-display-lg">{{content}}</h1>
    <h2 class="pds-display-md">{{content}}</h2>
    <h2 class="pds-display-sm">{{content}}</h2>
  </div>
  <div class="flex flex-col items-start gap-fluid-md p-fluid-md">
    <h3 class="pds-heading-md">Heading</h3>
    <h2 class="pds-heading-2xl">{{content}}</h2>
    <h3 class="pds-heading-xl">{{content}}</h3>
    <h4 class="pds-heading-lg">{{content}}</h4>
    <h5 class="pds-heading-md">{{content}}</h5>
    <h6 class="pds-heading-sm">{{content}}</h6>
  </div>
  <div class="flex flex-col items-start gap-fluid-md p-fluid-md">
    <h3 class="pds-heading-md">Text</h3>
    <p class="pds-text-xl">{{content}}</p>
    <p class="pds-text-lg">{{content}}</p>
    <p class="pds-text-md">{{content}}</p>
    <p class="pds-text-sm">{{content}}</p>
    <p class="pds-text-xs">{{content}}</p>
    <p class="pds-text-2xs">{{content}}</p>
  </div>
</template>

export const DisplayMediumStyle = style({
...typographyBaseStyle,
...displayMediumStyle,
});

export const DisplaySmallStyle = style({
...typographyBaseStyle,
...displaySmallStyle,
});

// Heading
export const HeadingXXLargeStyle = style({
...typographyBaseStyle,
...headingXXLargeStyle,
});

export const HeadingXLargeStyle = style({
...typographyBaseStyle,
...headingXLargeStyle,
});

export const HeadingLargeStyle = style({
...typographyBaseStyle,
...headingLargeStyle,
});

export const HeadingMediumStyle = style({
...typographyBaseStyle,
...headingMediumStyle,
});

export const HeadingSmallStyle = style({
...typographyBaseStyle,
...headingSmallStyle,
});

// Text
export const TextXLargeStyle = style({
...typographyBaseStyle,
...textXLargeStyle,
});

export const TextLargeStyle = style({
...typographyBaseStyle,
...textLargeStyle,
});

export const TextMediumStyle = style({
...typographyBaseStyle,
...textMediumStyle,
});

export const TextSmallStyle = style({
...typographyBaseStyle,
...textSmallStyle,
});

export const TextXSmallStyle = style({
...typographyBaseStyle,
...textXSmallStyle,
});

export const TextXXSmallStyle = style({
...typographyBaseStyle,
...textXXSmallStyle,
});
