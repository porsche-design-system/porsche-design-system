// packages/styles/src/routes.tsx
import type { ReactNode } from 'react';
import App from './App.tsx';
// SCSS
import { ScssBlur } from './scss/ScssBlur.tsx';
// Tailwind CSS
import { TailwindcssBlur } from './tailwindcss/TailwindcssBlur.tsx';
import { TailwindcssBorder } from './tailwindcss/TailwindcssBorder.tsx';
import { TailwindcssColor } from './tailwindcss/TailwindcssColor.tsx';
import { TailwindcssGradient } from './tailwindcss/TailwindcssGradient.tsx';
import { TailwindcssGrid } from './tailwindcss/TailwindcssGrid.tsx';
import { TailwindcssMediaQuery } from './tailwindcss/TailwindcssMediaQuery.tsx';
import { TailwindcssMotion } from './tailwindcss/TailwindcssMotion.tsx';
import { TailwindcssShadow } from './tailwindcss/TailwindcssShadow.tsx';
import { TailwindcssSkeleton } from './tailwindcss/TailwindcssSkeleton.tsx';
import { TailwindcssSpacing } from './tailwindcss/TailwindcssSpacing.tsx';
import { TailwindcssTypography } from './tailwindcss/TailwindcssTypography.tsx';
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
import { EmotionBlur } from './emotion/EmotionBlur.tsx';
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
import { VanillaExtractBlur } from './vanilla-extract/VanillaExtractBlur.tsx';
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

export const routes: RouteConfig[] = [
  { path: '/', label: 'Home', element: <App /> },
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
  // Emotion
  { path: '/emotion/blur', label: 'Emotion - Blur', element: <EmotionBlur /> },
  // Vanilla Extract
  { path: '/vanilla-extract/blur', label: 'Vanilla Extract - Blur', element: <VanillaExtractBlur /> },
];
