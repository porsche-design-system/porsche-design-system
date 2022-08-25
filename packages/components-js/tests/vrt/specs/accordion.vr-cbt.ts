import { defaultViewports, vrCbT } from '../../vrt/helpers/vr-cbt-helper';

defaultViewports.forEach(async (viewport) => {
  await vrCbT('accordion', viewport);
});
