export function addScript(src: string): void {
  const script = document.createElement('script');
  script.src = src;
  script.setAttribute('crossorigin', ''); // needs to match link preload

  document.body.appendChild(script);
}
