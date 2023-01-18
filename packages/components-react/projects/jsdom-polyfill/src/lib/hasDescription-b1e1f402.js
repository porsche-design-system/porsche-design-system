'use strict';

const hasNamedSlot = require('./hasNamedSlot-c9552a6a.js');
require('./validateProps-3b506a0d.js');

const hasDescription = (element, description) => {
  return !!description || hasNamedSlot.hasNamedSlot(element, 'description');
};

exports.hasDescription = hasDescription;
