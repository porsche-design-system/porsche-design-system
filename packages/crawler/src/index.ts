import * as puppeteer from 'puppeteer';
import * as puppeteerConfig from '@porsche-design-system/shared/testing/jest-puppeteer.config';
import { crawlWebsites } from './crawl-websites';
import { crawlerConfig } from '../constants';
import type { CustomerWebsite } from './types';

const startBrowser = async (): Promise<void> => {
  const customerWebsites: CustomerWebsite[] = [
    {
      team: 'Brand and Model (BaM)',
      page: 'Check In (Home)',
      url: 'https://www.porsche.com/germany/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Global Navigation',
      url: 'https://react.preview-nav.porsche.com/?NAVI_3=true&one_ui=true',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Global  Footer',
      url: 'https://footer.pchomenav.aws.porsche.cloud/react/index.html?locale=de',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Werksabholung',
      url: 'https://www.porsche.com/germany/accessoriesandservices/factorycollection/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Drive',
      url: 'https://www.porsche.com/germany/motorsportandevents/porschedrive/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Golf',
      url: 'https://www.porsche.com/germany/motorsportandevents/golf/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Museum',
      url: 'https://www.porsche.com/germany/aboutporsche/porschemuseum/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Classic',
      url: 'https://www.porsche.com/germany/accessoriesandservices/classic/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Explore Vehicles Taycan',
      url: 'https://www.porsche.com/germany/models/taycan/taycan-models/taycan/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Explore Vehicles 718',
      url: 'https://www.porsche.com/germany/models/718/718-models/718-cayman/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Explore Vehicles 911',
      url: 'https://www.porsche.com/germany/models/911/911-models/carrera/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Explore Vehicles Panamera',
      url: 'https://www.porsche.com/germany/models/panamera/panamera-models/panamera/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Explore Vehicles Macan',
      url: 'https://www.porsche.com/germany/models/macan/macan-models/macan/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Explore Vehicles Cayenne',
      url: 'https://www.porsche.com/germany/models/cayenne/cayenne-models/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Explore Vehicles E-Performance',
      url: 'https://www.porsche.com/germany/aboutporsche/e-performance/',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Model Overview',
      url: 'https://configurator.porsche.com/de-DE/model-start/taycan',
    },
    {
      team: 'Brand and Model (BaM)',
      page: 'Compare',
      url: 'https://www.porsche.com/international/compare/',
    },
    {
      team: 'Configurator',
      page: 'Configure',
      url: 'https://configurator.porsche.com/de-DE/model/Y1AAA1',
    },
    {
      team: 'Configurator',
      page: 'Decide',
      url: 'https://configurator.porsche.com/de-DE/contact/dealers/1150190/porsche-code/PR4MDLQ1',
    },
    {
      team: 'Finder',
      page: 'Customer Home',
      url: 'https://finder.porsche.com/de/de-DE',
    },
    {
      team: 'Finder',
      page: 'Customer Search',
      url: 'https://finder.porsche.com/de/de-DE/search/taycan?model=taycan',
    },
    {
      team: 'Finder',
      page: 'Customer Product',
      url: 'https://finder.porsche.com/de/de-DE/details/porsche-taycan-4s-cross-turismo-gebraucht-XEQM7N?model=taycan',
    },
    {
      team: 'Finder',
      page: 'Customer Checkout',
      url: 'https://marketplace.porsche.com/de/de_DE/cart?offerCalculation=%7B%22listingId%22%3A%22XEQM7N%22%2C%22marketplaceKey%22%3A%22de%22%2C%22locale%22%3A%22de-DE%22%2C%22offerType%22%3A%22STOCK%22%2C%22contractType%22%3A%22CASH%22%2C%22vehiclePrice%22%3A%7B%22value%22%3A0.0%2C%22code%22%3A%22EUR%22%2C%22formatted%22%3A%220%C2%A0%E2%82%AC%22%7D%2C%22originUrl%22%3A%22https%3A%2F%2Ffinder.porsche.com%2Fde%2Fde-DE%2Fdetails%2Fporsche-taycan-4s-cross-turismo-gebraucht-XEQM7N%3Fmodel%3Dtaycan%22%2C%22customerType%22%3A%22PRIVATE%22%2C%22originSystem%22%3A%22FINDER%22%7D',
    },
    {
      team: 'Finder',
      page: 'Finance',
      url: 'https://finder.porsche.com/de/de-DE/finanzierung?int_ref=my_porsche&int_medium=banner&int_id=Taycan_GW_Finanzierung_Aktion',
    },
    {
      team: 'Dealer Websites (DWaaS)',
      page: 'Dealer Websites',
      url: 'https://dealer.porsche.com/dwaas-infohub/en/Modules',
    },
    {
      team: 'Porsche ID',
      page: 'Login',
      url: 'https://identity.porsche.com/login',
    },
    {
      team: 'Porsche ID',
      page: 'Signup',
      url: 'https://signup.porsche.com/de/de_DE/register',
    },
    {
      team: 'Porsche ID',
      page: 'Profile',
      url: 'https://preview-profile.porsche.com/myprofile/auth/callback?code=vH0qd0IFFWISStJ9vpO-FfsSMMl8xTohm9fgGxMSBu7BG&state=fmQyb2lneS4xV2RJRWVYaDBHN2NLaXRaU0dVcklicWVkb2JodG5xeDlGYQ%3D%3D',
    },
    {
      team: 'Physical Products',
      page: 'Shop Home',
      url: 'https://shop.porsche.com/de/de-DE',
    },
    {
      team: 'Physical Products',
      page: 'Shop Product',
      url: 'https://shop.porsche.com/de/de-DE/p/ebike-sport-P-WAP066EBT0PXXX/WAP066EBT0P00M',
    },
    {
      team: 'Physical Products',
      page: 'Shop Category',
      url: 'https://shop.porsche.com/de/de-DE/c/porsche-ebikes-sport-und-cross',
    },
    {
      team: 'Physical Products',
      page: 'Shop Content',
      url: 'https://shop.porsche.com/de/de-DE/soulgarage',
    },
    {
      team: 'Physical Products',
      page: 'Shop Checkout',
      url: 'https://shop.porsche.com/de/de-DE/cart',
    },
    {
      team: 'Connect Store',
      page: 'Home',
      url: 'https://connect-store.porsche.com/de/de?model=taycan_2022',
    },
    {
      team: 'Connect Store',
      page: 'Product',
      url: 'https://connect-store.porsche.com/de/de/p/bundle_connect_v1?model=taycan_2022',
    },
    {
      team: 'Cookie Consent',
      page: 'Consent',
      url: 'https://privacy.porsche-preview.com/de/de_DE/consent',
    },
    {
      team: 'NFT',
      page: 'NFT Platform',
      url: 'https://nft.porsche.com/',
    },
  ];

  /*const customerWebsites: string[] = [
    // My Porsche
    'https://my.porsche-preview.com/core/de/de_DE/home', // My Porsche Home
    'https://my.porsche-preview.com/core/de/de_DE/vehicles/BP0ZZZY1ZKSA36073', // My Porsche Vehicle Detail Page
    'https://my.porsche-preview.com/servicebooking/de/de_DE/overview/BP0ZZZY1ZKSA36073', // My Porsche Service Booking
    'https://my.porsche-preview.com/content/de/de/events/4Kmz9rdISii4kYjky4mnAT', // My Porsche Content (Detail Page)
    'https://inbox.porsche-preview.com/de/de_DE/messages/95f7bc04-e1de-4d79-9697-e8e61746e62d', // My Porsche Messaging (Inbox)
    'https://my.porsche-preview.com/content/de/de_DE/events', // My Porsche Content Home
    'https://my.porsche-preview.com/core/de/de_DE/production/423799', // My Porsche Track your dream
  ];*/

  const browser = await puppeteer.launch({
    ...puppeteerConfig,
    ...{
      // since some websites have different components depending on the window size & viewport,
      // we have to set the window size and viewport here in addition to shared config
      args: [`--window-size=${crawlerConfig.viewport.width},${crawlerConfig.viewport.height}`],
      defaultViewport: {
        width: crawlerConfig.viewport.width,
        height: crawlerConfig.viewport.height,
      },
    },
  });
  console.log('Crawling websites..');
  // crawling all websites
  await crawlWebsites(browser, customerWebsites);
  console.log('Success - please check reports');
  await browser.close();
};

startBrowser().catch((err) => {
  throw new Error(`An error occurred during crawling: ${err}`);
});
