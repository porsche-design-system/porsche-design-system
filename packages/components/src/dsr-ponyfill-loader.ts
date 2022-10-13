const div = document.createElement('div');
div.innerHTML = '<template shadowroot="open"></template>';

if (!div.shadowRoot) {
  const script = document.createElement('script');
  script.src = 'dsr-ponyfill.min.js';
  document.body.appendChild(script);
}
