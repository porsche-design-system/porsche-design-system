'use strict';

require('./validateProps-3b506a0d.js');

const injectGlobalStyle = () => {
  if (typeof document === 'undefined') {
    return;
  }
  const styleUrl = 'http://localhost:3001/styles/font-face.min.css';
  const { head } = document;
  if (!head.querySelector(`link[href="${styleUrl}"]`)) {
    const link = document.createElement('link');
    link.href = styleUrl;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    head.appendChild(link);
  }
};

const appGlobalScript = () => {
  injectGlobalStyle();
};

const globalScripts = appGlobalScript;

exports.globalScripts = globalScripts;
