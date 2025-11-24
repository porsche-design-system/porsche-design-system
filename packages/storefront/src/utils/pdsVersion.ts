export const getCurrentPdsVersion = () => {
  if (typeof window === 'undefined') return null;

  const segment = window.location.pathname.split('/')[1] || null;

  const semverRegex = /^v?\d+(?:\.\d+){0,2}$/;

  return segment && semverRegex.test(segment) ? segment.replace('v', '') : null;
};

function parse(version: string): number[] {
  return version.replace(/^v/, '').split('.').map(Number);
}

export function isGte(v: string, min: string): boolean {
  const [a1, b1, c1] = parse(v);
  const [a2, b2, c2] = parse(min);

  if (a1 !== a2) return a1 > a2;
  if (b1 !== b2) return b1 > b2;
  return (c1 ?? 0) >= (c2 ?? 0);
}
