'use strict';

const getClosestHTMLElement = require('./getClosestHTMLElement-883782e1.js');
require('./validateProps-3b506a0d.js');

const improveButtonHandlingForCustomElement = (element, getType, getDisabled) => {
  element.addEventListener('click', (event) => handleButtonEvent(event, element, getType, getDisabled));
};
const handleButtonEvent = (event, element, getType, getDisabled) => {
  // Why? That's why: https://www.hjorthhansen.dev/shadow-dom-and-forms/
  const form = getClosestHTMLElement.getClosestHTMLElement(element, 'form');
  if (form && !getDisabled()) {
    /**
     * we've to wait if someone calls preventDefault on the event
     * then we shouldn't submit the form
     */
    window.setTimeout(() => {
      if (!event.defaultPrevented) {
        const fakeButton = document.createElement('button');
        fakeButton.type = getType();
        fakeButton.style.display = 'none';
        form.appendChild(fakeButton);
        fakeButton.addEventListener('click', (fakeButtonEvent) => {
          fakeButtonEvent.stopPropagation();
        });
        fakeButton.click();
        fakeButton.remove();
      }
    }, 1);
  }
};

exports.handleButtonEvent = handleButtonEvent;
exports.improveButtonHandlingForCustomElement = improveButtonHandlingForCustomElement;
