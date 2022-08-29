import { defaultViewports, cbVRT } from '../../vrt/helpers/cb-vrt-helper';

defaultViewports.forEach(async (viewport) => {
  await cbVRT('accordion', viewport);
});
