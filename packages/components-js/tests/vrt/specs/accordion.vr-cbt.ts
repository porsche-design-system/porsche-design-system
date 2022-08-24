import { defaultViewports, vrtCBT } from '../../vrt/helpers/vr-cbt-helper';

defaultViewports.forEach(async (viewport) => {
  await vrtCBT(viewport, 'accordion');
});
