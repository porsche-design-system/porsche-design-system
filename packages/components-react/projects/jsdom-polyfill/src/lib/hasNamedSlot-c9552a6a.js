'use strict';

const validateProps = require('./validateProps-3b506a0d.js');

const hasNamedSlot = (el, slotName) => !!validateProps.getHTMLElement(el, `[slot="${slotName}"]`);

exports.hasNamedSlot = hasNamedSlot;
