if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
  const script = document.createElement('script');
  script.src = 'dsr-ponyfill.min.js';
  document.body.appendChild(script);
}
