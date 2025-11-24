export const getCurrentPdsVersion = () =>
  typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || null : null;

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
