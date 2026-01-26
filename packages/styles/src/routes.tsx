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
import { EmotionGrid } from './app/emotion/EmotionGrid.tsx';
import { EmotionMediaQuery } from './app/emotion/EmotionMediaQuery.tsx';
import { EmotionMotion } from './app/emotion/EmotionMotion.tsx';
import { EmotionShadow } from './app/emotion/EmotionShadow.tsx';
import { EmotionSkeleton } from './app/emotion/EmotionSkeleton.tsx';
import { EmotionSpacing } from './app/emotion/EmotionSpacing.tsx';
import { EmotionTypography } from './app/emotion/EmotionTypography.tsx';
// SCSS
import { ScssBlur } from './app/scss/ScssBlur.tsx';
import { ScssBorder } from './app/scss/ScssBorder.tsx';
import { ScssColor } from './app/scss/ScssColor.tsx';
import { ScssGradient } from './app/scss/ScssGradient.tsx';
import { ScssGrid } from './app/scss/ScssGrid.tsx';
import { ScssMediaQuery } from './app/scss/ScssMediaQuery.tsx';
import { ScssMotion } from './app/scss/ScssMotion.tsx';
import { ScssShadow } from './app/scss/ScssShadow.tsx';
import { ScssSkeleton } from './app/scss/ScssSkeleton.tsx';
import { ScssSpacing } from './app/scss/ScssSpacing.tsx';
import { ScssTypography } from './app/scss/ScssTypography.tsx';
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
import { VanillaExtractGrid } from './app/vanilla-extract/VanillaExtractGrid.tsx';
import { VanillaExtractMediaQuery } from './app/vanilla-extract/VanillaExtractMediaQuery.tsx';
import { VanillaExtractMotion } from './app/vanilla-extract/VanillaExtractMotion.tsx';
import { VanillaExtractShadow } from './app/vanilla-extract/VanillaExtractShadow.tsx';
import { VanillaExtractSkeleton } from './app/vanilla-extract/VanillaExtractSkeleton.tsx';
import { VanillaExtractSpacing } from './app/vanilla-extract/VanillaExtractSpacing.tsx';
import { VanillaExtractTypography } from './app/vanilla-extract/VanillaExtractTypography.tsx';
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
  { path: '/scss/grid', label: 'SCSS - Grid', element: <ScssGrid /> },
  { path: '/scss/media-query', label: 'SCSS - Media Query', element: <ScssMediaQuery /> },
  { path: '/scss/motion', label: 'SCSS - Motion', element: <ScssMotion /> },
  { path: '/scss/shadow', label: 'SCSS - Shadow', element: <ScssShadow /> },
  { path: '/scss/skeleton', label: 'SCSS - Skeleton', element: <ScssSkeleton /> },
  { path: '/scss/spacing', label: 'SCSS - Spacing', element: <ScssSpacing /> },
  { path: '/scss/typography', label: 'SCSS - Typography', element: <ScssTypography /> },
  // Emotion
  { path: '/emotion/blur', label: 'Emotion - Blur', element: <EmotionBlur /> },
  { path: '/emotion/border', label: 'Emotion - Border', element: <EmotionBorder /> },
  { path: '/emotion/color', label: 'Emotion - Color', element: <EmotionColor /> },
  { path: '/emotion/gradient', label: 'Emotion - Gradient', element: <EmotionGradient /> },
  { path: '/emotion/grid', label: 'Emotion - Grid', element: <EmotionGrid /> },
  { path: '/emotion/media-query', label: 'Emotion - Media Query', element: <EmotionMediaQuery /> },
  { path: '/emotion/motion', label: 'Emotion - Motion', element: <EmotionMotion /> },
  { path: '/emotion/shadow', label: 'Emotion - Shadow', element: <EmotionShadow /> },
  { path: '/emotion/skeleton', label: 'Emotion - Skeleton', element: <EmotionSkeleton /> },
  { path: '/emotion/spacing', label: 'Emotion - Spacing', element: <EmotionSpacing /> },
  { path: '/emotion/typography', label: 'Emotion - Typography', element: <EmotionTypography /> },
  // Vanilla Extract
  { path: '/vanilla-extract/blur', label: 'Vanilla Extract - Blur', element: <VanillaExtractBlur /> },
  { path: '/vanilla-extract/border', label: 'Vanilla Extract - Border', element: <VanillaExtractBorder /> },
  { path: '/vanilla-extract/color', label: 'Vanilla Extract - Color', element: <VanillaExtractColor /> },
  { path: '/vanilla-extract/gradient', label: 'Vanilla Extract - Gradient', element: <VanillaExtractGradient /> },
  { path: '/vanilla-extract/grid', label: 'Vanilla Extract - Grid', element: <VanillaExtractGrid /> },
  {
    path: '/vanilla-extract/media-query',
    label: 'Vanilla Extract - Media Query',
    element: <VanillaExtractMediaQuery />,
  },
  {
    path: '/vanilla-extract/motion',
    label: 'Vanilla Extract - Motion',
    element: <VanillaExtractMotion />,
  },
  { path: '/vanilla-extract/shadow', label: 'Vanilla Extract - Shadow', element: <VanillaExtractShadow /> },
  { path: '/vanilla-extract/skeleton', label: 'Vanilla Extract - Skeleton', element: <VanillaExtractSkeleton /> },
  { path: '/vanilla-extract/spacing', label: 'Vanilla Extract - Spacing', element: <VanillaExtractSpacing /> },
  { path: '/vanilla-extract/typography', label: 'Vanilla Extract - Typography', element: <VanillaExtractTypography /> },
];
