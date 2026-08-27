'use client';

import type { Story } from '@/models/story';

const style = `.custom-ai-orb {
  --p-button-bg: var(--p-color-canvas);
  --p-button-fg: var(--p-color-primary);
  position: relative;
  z-index: 0;
}

.custom-ai-orb:not(:disabled, :state(loading)):hover {
  --p-button-bg: var(--p-color-frosted-strong);
  --p-button-fg: var(--p-color-primary);
}

.custom-ai-orb::before,
.custom-ai-orb::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(45deg, #00a8ff, #0151e1, #2ae3ff, #bff0ff, #0151e1, #00a8ff);
  background-size: 400%;
  animation: custom-ai-orb-gradient 20s linear infinite;
}

.custom-ai-orb::after {
  filter: blur(10px);
  animation:
    custom-ai-orb-gradient 20s linear infinite,
    custom-ai-orb-float 8s ease-in-out infinite;
}

@keyframes custom-ai-orb-gradient {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 300% 0;
  }
  100% {
    background-position: 0 0;
  }
}

@keyframes custom-ai-orb-float {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.02) rotate(0.5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* Respect the user's motion preference */
@media (prefers-reduced-motion: reduce) {
  .custom-ai-orb::before,
  .custom-ai-orb::after {
    animation: none;
  }
}

/* Decorative gradient is not conveyed in forced-colors mode */
@media (forced-colors: active) {
  .custom-ai-orb::before,
  .custom-ai-orb::after {
    display: none;
  }
}`;

export const buttonStoryAiGradientGlow: Story<'p-button'> = {
  generator: () => [
    {
      tag: 'style',
      children: [style],
    },
    {
      tag: 'div',
      properties: {
        className: 'flex flex-wrap gap-static-lg items-start',
      },
      children: [
        {
          tag: 'p-button',
          properties: {
            className: 'custom-ai-orb',
            icon: 'ai-chat',
            hideLabel: true,
          },
          children: ['Ask AI assistant'],
        },
        {
          tag: 'p-button',
          properties: {
            className: 'custom-ai-orb',
            icon: 'ai-chat',
          },
          children: ['Ask AI assistant'],
        },
      ],
    },
  ],
};
