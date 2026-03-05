/**
 * Generates a CSS linear-gradient mask string for smooth edge fading
 * using smoothstep easing.
 *
 * @param fadeEdges - Which edges to fade.
 * @param edgeLength - Size of the fully transparent area at the edge (px).
 * @param fadeLength - Size of the transition area (px).
 * @param steps - Number of gradient stops (more = smoother, 8–12 is plenty).
 * @returns CSS linear-gradient string.
 */
export const getSmoothMask = (
  fadeEdges: 'left' | 'right' | 'both' | 'none',
  edgeLength = 24,
  fadeLength = 96,
  steps = 20
): string => {
  if (fadeEdges === 'none') {
    return 'linear-gradient(black,black)';
  }

  const fullLength = edgeLength + fadeLength;
  const leftStops: string[] = [];
  const rightStops: string[] = [];

  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const alpha = t * t * t * (t * (t * 6 - 15) + 10);

    leftStops.push(`rgb(0 0 0/${alpha.toFixed(3)}) ${(edgeLength + fadeLength * t).toFixed(0)}px`);
    rightStops.push(`rgb(0 0 0/${(1 - alpha).toFixed(3)}) calc(100% - ${(fullLength - fadeLength * t).toFixed(0)}px)`);
  }

  const left = `transparent 0px,transparent ${edgeLength}px,${leftStops.join(',')},black ${fullLength}px`;
  const right = `black calc(100% - ${fullLength}px),${rightStops.join(',')},transparent calc(100% - ${edgeLength}px),transparent 100%`;

  const gradients: Record<typeof fadeEdges, string> = {
    left: `linear-gradient(to right,${left},black 100%)`,
    right: `linear-gradient(to right,black 0%,${right})`,
    both: `linear-gradient(to right,${left},${right})`,
  };

  return gradients[fadeEdges];
};
