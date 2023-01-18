'use strict';

const validateProps = require('./validateProps-3b506a0d.js');

const getSlotTextContent = (el, slotName) => { var _a; return (_a = validateProps.getHTMLElement(el, `[slot="${slotName}"]`)) === null || _a === void 0 ? void 0 : _a.textContent; };

exports.getSlotTextContent = getSlotTextContent;
