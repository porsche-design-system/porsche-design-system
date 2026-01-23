// packages/styles/src/routes.tsx
import type { ReactNode } from 'react';
// import { ScssBorder } from './scss/ScssBorder.tsx';
// import { ScssColor } from './scss/ScssColor.tsx';
// import { ScssGradient } from './scss/ScssGradient.tsx';
// import { ScssGrid } from './scss/ScssGrid.tsx';
// import { ScssMediaQuery } from './scss/ScssMediaQuery.tsx';
// import { ScssMotion } from './scss/ScssMotion.tsx';
// import { ScssShadow } from './scss/ScssShadow.tsx';
// import { ScssSkeleton } from './scss/ScssSkeleton.tsx';
// import { ScssSpacing } from './scss/ScssSpacing.tsx';
// import { ScssTypography } from './scss/ScssTypography.tsx';
// Emotion
import { EmotionBlur } from './app/emotion/EmotionBlur.tsx';
import { EmotionBorder } from './app/emotion/EmotionBorder.tsx';
import { EmotionColor } from './app/emotion/EmotionColor.tsx';
import { EmotionGradient } from './app/emotion/EmotionGradient.tsx';
import { EmotionSpacing } from './app/emotion/EmotionSpacing.tsx';
// SCSS
import { ScssBlur } from './app/scss/ScssBlur.tsx';
import { ScssBorder } from './app/scss/ScssBorder.tsx';
import { ScssColor } from './app/scss/ScssColor.tsx';
import { ScssGradient } from './app/scss/ScssGradient.tsx';
import { ScssSpacing } from './app/scss/ScssSpacing.tsx';
// Tailwind CSS
import { TailwindcssBlur } from './app/tailwindcss/TailwindcssBlur.tsx';
import { TailwindcssBorder } from './app/tailwindcss/TailwindcssBorder.tsx';
import { TailwindcssColor } from './app/tailwindcss/TailwindcssColor.tsx';
import { TailwindcssGradient } from './app/tailwindcss/TailwindcssGradient.tsx';
import { TailwindcssGrid } from './app/tailwindcss/TailwindcssGrid.tsx';
import { TailwindcssMediaQuery } from './app/tailwindcss/TailwindcssMediaQuery.tsx';
import { TailwindcssMotion } from './app/tailwindcss/TailwindcssMotion.tsx';
import { TailwindcssShadow } from './app/tailwindcss/TailwindcssShadow.tsx';
import { TailwindcssSkeleton } from './app/tailwindcss/TailwindcssSkeleton.tsx';
import { TailwindcssSpacing } from './app/tailwindcss/TailwindcssSpacing.tsx';
import { TailwindcssTypography } from './app/tailwindcss/TailwindcssTypography.tsx';
// import { EmotionBorder } from './emotion/EmotionBorder.tsx';
// import { EmotionColor } from './emotion/EmotionColor.tsx';
// import { EmotionGradient } from './emotion/EmotionGradient.tsx';
// import { EmotionGrid } from './emotion/EmotionGrid.tsx';
// import { EmotionMediaQuery } from './emotion/EmotionMediaQuery.tsx';
// import { EmotionMotion } from './emotion/EmotionMotion.tsx';
// import { EmotionShadow } from './emotion/EmotionShadow.tsx';
// import { EmotionSkeleton } from './emotion/EmotionSkeleton.tsx';
// import { EmotionSpacing } from './emotion/EmotionSpacing.tsx';
// import { EmotionTypography } from './emotion/EmotionTypography.tsx';
// Vanilla Extract
import { VanillaExtractBlur } from './app/vanilla-extract/VanillaExtractBlur.tsx';
import { VanillaExtractBorder } from './app/vanilla-extract/VanillaExtractBorder.tsx';
import { VanillaExtractColor } from './app/vanilla-extract/VanillaExtractColor.tsx';
import { VanillaExtractGradient } from './app/vanilla-extract/VanillaExtractGradient.tsx';
import { VanillaExtractSpacing } from './app/vanilla-extract/VanillaExtractSpacing.tsx';
// import { VanillaExtractBorder } from './vanilla-extract/VanillaExtractBorder.tsx';
// import { VanillaExtractColor } from './vanilla-extract/VanillaExtractColor.tsx';
// import { VanillaExtractGradient } from './vanilla-extract/VanillaExtractGradient.tsx';
// import { VanillaExtractGrid } from './vanilla-extract/VanillaExtractGrid.tsx';
// import { VanillaExtractMediaQuery } from './vanilla-extract/VanillaExtractMediaQuery.tsx';
// import { VanillaExtractMotion } from './vanilla-extract/VanillaExtractMotion.tsx';
// import { VanillaExtractShadow } from './vanilla-extract/VanillaExtractShadow.tsx';
// import { VanillaExtractSkeleton } from './vanilla-extract/VanillaExtractSkeleton.tsx';
// import { VanillaExtractSpacing } from './vanilla-extract/VanillaExtractSpacing.tsx';
// import { VanillaExtractTypography } from './vanilla-extract/VanillaExtractTypography.tsx';

export interface RouteConfig {
  path: string;
  label: string;
  element: ReactNode;
}

export const styleSolutions = ['tailwindcss', 'scss', 'emotion', 'vanilla-extract'] as const;
export const styles = [
  'blur',
  'border',
  'color',
  'gradient',
  'grid',
  'media-query',
  'motion',
  'shadow',
  'skeleton',
  'spacing',
  'typography',
] as const;

export const routes: RouteConfig[] = [
  // Tailwind CSS
  { path: '/tailwindcss/blur', label: 'Tailwind - Blur', element: <TailwindcssBlur /> },
  { path: '/tailwindcss/border', label: 'Tailwind - Border', element: <TailwindcssBorder /> },
  { path: '/tailwindcss/color', label: 'Tailwind - Color', element: <TailwindcssColor /> },
  { path: '/tailwindcss/gradient', label: 'Tailwind - Gradient', element: <TailwindcssGradient /> },
  { path: '/tailwindcss/grid', label: 'Tailwind - Grid', element: <TailwindcssGrid /> },
  { path: '/tailwindcss/media-query', label: 'Tailwind - Media Query', element: <TailwindcssMediaQuery /> },
  { path: '/tailwindcss/motion', label: 'Tailwind - Motion', element: <TailwindcssMotion /> },
  { path: '/tailwindcss/shadow', label: 'Tailwind - Shadow', element: <TailwindcssShadow /> },
  { path: '/tailwindcss/skeleton', label: 'Tailwind - Skeleton', element: <TailwindcssSkeleton /> },
  { path: '/tailwindcss/spacing', label: 'Tailwind - Spacing', element: <TailwindcssSpacing /> },
  { path: '/tailwindcss/typography', label: 'Tailwind - Typography', element: <TailwindcssTypography /> },
  // SCSS
  { path: '/scss/blur', label: 'SCSS - Blur', element: <ScssBlur /> },
  { path: '/scss/border', label: 'SCSS - Border', element: <ScssBorder /> },
  { path: '/scss/color', label: 'SCSS - Color', element: <ScssColor /> },
  { path: '/scss/gradient', label: 'SCSS - Gradient', element: <ScssGradient /> },
  { path: '/scss/spacing', label: 'SCSS - Spacing', element: <ScssSpacing /> },
  // Emotion
  { path: '/emotion/blur', label: 'Emotion - Blur', element: <EmotionBlur /> },
  { path: '/emotion/border', label: 'Emotion - Border', element: <EmotionBorder /> },
  { path: '/emotion/color', label: 'Emotion - Color', element: <EmotionColor /> },
  { path: '/emotion/gradient', label: 'Emotion - Gradient', element: <EmotionGradient /> },
  { path: '/emotion/spacing', label: 'Emotion - Spacing', element: <EmotionSpacing /> },
  // Vanilla Extract
  { path: '/vanilla-extract/blur', label: 'Vanilla Extract - Blur', element: <VanillaExtractBlur /> },
  { path: '/vanilla-extract/border', label: 'Vanilla Extract - Border', element: <VanillaExtractBorder /> },
  { path: '/vanilla-extract/color', label: 'Vanilla Extract - Color', element: <VanillaExtractColor /> },
  { path: '/vanilla-extract/gradient', label: 'Vanilla Extract - Gradient', element: <VanillaExtractGradient /> },
  { path: '/vanilla-extract/spacing', label: 'Vanilla Extract - Spacing', element: <VanillaExtractSpacing /> },
];
