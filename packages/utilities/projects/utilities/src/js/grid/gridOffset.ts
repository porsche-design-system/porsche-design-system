import {
  _getOffsetHorizontalS,
  _getOffsetHorizontalXXL,
  _gridPadding,
  _gridSafeZoneBase,
  _gridSafeZoneS,
  _gridSafeZoneXXL,
} from './gridShared';

export const gridNarrowOffsetBase = _gridSafeZoneBase;
export const gridNarrowOffsetS = _getOffsetHorizontalS('narrow');
export const gridNarrowOffsetXXL = _getOffsetHorizontalXXL('narrow');
export const gridNarrowOffset = {
  base: gridNarrowOffsetBase,
  s: gridNarrowOffsetS,
  xxl: gridNarrowOffsetXXL,
};

export const gridBasicOffsetBase = _gridSafeZoneBase;
export const gridBasicOffsetS = _getOffsetHorizontalS('basic');
export const gridBasicOffsetXXL = _getOffsetHorizontalXXL('basic');
export const gridBasicOffset = {
  base: gridBasicOffsetBase,
  s: gridBasicOffsetS,
  xxl: gridBasicOffsetXXL,
};

export const gridExtendedOffsetBase = _gridSafeZoneBase;
export const gridExtendedOffsetS = _getOffsetHorizontalS('extended');
export const gridExtendedOffsetXXL = _getOffsetHorizontalXXL('extended');
export const gridExtendedOffset = {
  base: gridExtendedOffsetBase,
  s: gridExtendedOffsetS,
  xxl: gridExtendedOffsetXXL,
};

export const gridWideOffsetBase = _gridSafeZoneBase;
export const gridWideOffsetS = _gridSafeZoneS;
export const gridWideOffsetXXL = `calc(${_gridPadding} + ${_gridSafeZoneXXL})`;
export const gridWideOffset = {
  base: gridWideOffsetBase,
  s: gridWideOffsetS,
  xxl: gridWideOffsetXXL,
};

export const gridFullOffset = _gridPadding;
