import { chromium } from 'playwright';
import { crawlWebsites } from './crawl-websites';
import { crawlerConfig } from '../constants';

const startBrowser = async (): Promise<void> => {
  const customerWebsites: string[] = [
    'https://porsche.com/swiss/de',
    'https://porsche.com/international/models/taycan/taycan-models/taycan',
    'https://porsche.com/germany/aboutporsche/e-performance',
    'https://react.preview-nav.porsche.com/?NAVI_3=true',
    'https://react.preview-nav.porsche.com/?locale=de-DE',
    'https://footer.pchomenav.aws.porsche.cloud/react/index.html?locale=de',
    'https://porsche.com/germany/aboutporsche/jobs',
    'https://porsche.com/germany/aboutporsche/porschemuseum',
    'https://porsche.com/germany/models',
    'https://porsche.com/germany/modelstart/all',
    'https://porsche.com/germany/compare/?model=982120&modelToCompare=982320&modelGearType=480&modelToCompareGearType=480',
    'https://porsche.com/germany/compare/?modelRange=718',
    'https://configurator.porsche.com/de-DE/model/992110',
    'https://porsche.com/stories',
    'https://dealer.porsche.com/ch/zug/de-CH',
    'https://dealer.porsche.com/ch/zug/de-CH/neuwagen/modelle',
    'https://signup.porsche.com/gb/en_GB/register',
    'https://finder.porsche.com/de/de-DE',
    'https://finder.porsche.com/de/de-DE/search',
    'https://finder.porsche.com/de/de-DE/details/porsche-panamera-turbo-s-neu-KW747X',
    'https://marketplace.porsche.com/de/de_DE/cart?offerCalculation=%7B%22listingId%22%3A%22KW747X%22%2C%22marketplaceKey%22%3A%22de%22%2C%22locale%22%3A%22de-DE%22%2C%22offerType%22%3A%22STOCK%22%2C%22contractType%22%3A%22CASH%22%2C%22vehiclePrice%22%3A%7B%22value%22%3A0.0%2C%22code%22%3A%22EUR%22%2C%22formatted%22%3A%220%C2%A0%E2%82%AC%22%7D%2C%22originUrl%22%3A%22https%3A%2F%2Ffinder.porsche.com%2Fde%2Fde-DE%2Fdetails%2Fporsche-panamera-turbo-s-neu-KW747X%22%2C%22customerType%22%3A%22PRIVATE%22%7D',
    'https://carsales.porsche.com/us/en-US/checkout/62ff8608dc43c13b51e0d993',
    'https://shop.porsche.com/de/de-DE',
    'https://shop.porsche.com/de/de-DE/p/schluesselband-martini-racing-P-WAP5500030LMRH/WAP5500030LMRH',
    'https://shop.porsche.com/de/de-DE/checkout?po-id=84460f8a-c9bf-434d-9dc5-398a55940995',
    'https://connect-store.porsche.com/de/de?model=911_2022',
    'https://connect-store.porsche.com/de/de/p/bundle_connect_v1?model=911_2022',
    'https://connect-store.porsche.com/offer/de/de-DE/macan_2024/products',
    'https://connect-store.porsche.com/offer/de/de-DE/macan_2024/products/bundle_connect_v4',
  ];

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--single-process',
      '--disable-web-security',
      // since some websites have different components depending on the window size & viewport,
      // we have to set the window size and viewport here in addition to shared config
      `--window-size=${crawlerConfig.viewport.width},${crawlerConfig.viewport.height}`,
    ],
  });
  console.log('Crawling websites..');

  await crawlWebsites(browser, customerWebsites);

  console.log('Success - please check reports');

  await browser.close();
};

startBrowser().catch((err) => {
  throw err;
});
