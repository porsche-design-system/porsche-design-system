import { getIconLinks } from '../../../src';
import { ICON_NAMES, type IconName } from '@porsche-design-system/icons';
import { paramCase } from 'change-case';
import { renderToString } from 'react-dom/server';

const hash = '[a-z0-9]{32}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche\\.com\\/porsche-design-system\\/icons';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche\\.cn\\/porsche-design-system\\/icons';

jest.mock('../../../src/shared');

describe('validation', () => {
  it('should throw error on invalid icons parameter', () => {
    expect(() => getIconLinks({ icons: (['some-invalid-icon'] as any[]) })).toThrowErrorMatchingInlineSnapshot(`
"[Porsche Design System] The following supplied icon names are invalid:
  some-invalid-icon

Please use only valid icon names:
  360, accessibility, active-cabin-ventilation, add, adjust, arrow-double-down, arrow-double-left, arrow-double-right, arrow-double-up, arrow-down, arrow-first, arrow-head-down, arrow-head-left, arrow-head-right, arrow-head-up, arrow-last, arrow-left, arrow-right, arrow-up, augmented-reality, battery-empty, battery-full, bell, bookmark, bookmark-filled, broadcast, calculator, calendar, camera, car, car-battery, card, charging-active, charging-state, charging-station, chart, chat, check, city, climate, climate-control, clock, close, closed-caption, co2-emission, compare, configurate, copy, country-road, cubic-capacity, delete, disable, document, download, duration, edit, email, error-filled, exclamation, external, filter, fingerprint, flash, fuel-station, garage, gift, globe, grid, heart, heart-filled, highway, home, horn, image, increase, information, information-filled, key, leaf, leather, light, list, locate, lock, lock-open, logo-apple-podcast, logo-baidu, logo-delicious, logo-digg, logo-facebook, logo-foursquare, logo-gmail, logo-google, logo-hatena, logo-instagram, logo-kaixin, logo-kakaotalk, logo-linkedin, logo-naver, logo-pinterest, logo-qq, logo-qq-share, logo-reddit, logo-skyrock, logo-sohu, logo-spotify, logo-tecent, logo-telegram, logo-tiktok, logo-tumblr, logo-twitter, logo-viber, logo-vk, logo-wechat, logo-weibo, logo-whatsapp, logo-x, logo-xing, logo-yahoo, logo-youku, logo-youtube, logout, map, menu-dots-horizontal, menu-dots-vertical, menu-lines, minus, mobile, moon, oil-can, parking-brake, parking-light, pause, phone, pin, pin-filled, play, plug, plus, preheating, printer, purchase, push-pin, push-pin-off, qr, question, racing-flag, refresh, replay, reset, roof-closed, roof-open, route, rss, save, screen, search, send, share, shopping-bag, shopping-bag-filled, shopping-cart, shopping-cart-filled, sidelights, snowflake, sort, stack, star, star-filled, steering-wheel, stopwatch, subtract, success, success-filled, sun, switch, tablet, tachometer, tire, truck, upload, user, user-filled, user-group, user-manual, video, view, view-off, volume-off, volume-up, warning, warning-filled, weight, wifi, work, wrench, wrenches, zoom-in, zoom-out"
`);
  });
});

describe('format: html', () => {
  it('should return default link', () => {
    const result = getIconLinks();
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/arrow-right\\.min\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return default link for china cdn', () => {
    const result = getIconLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCn}/arrow-right\\.min\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getIconLinks({ icons: ['truck', 'volume-up', 'mobile'] });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/truck\\.min\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/volume-up\\.min\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/mobile\\.min\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin>$`
    );

    expect(result).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconName) => {
    it(`should match regex for ['${iconName}']`, () => {
      const result = getIconLinks({ icons: [iconName] });
      const regex = new RegExp(
        `^<link rel=prefetch href=${baseHrefCom}/${paramCase(
          iconName
        )}.min.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
      );
      expect(result).toMatch(regex);
    });
  });
});

describe('format: jsx', () => {
  it('should return default link', () => {
    const result = getIconLinks({ format: 'jsx' });
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/arrow-right\\.min\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  it('should return default link for china cdn', () => {
    const result = getIconLinks({ format: 'jsx', cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCn}/arrow-right\\.min\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getIconLinks({ format: 'jsx', icons: ['truck', 'volume-up', 'mobile'] });
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/truck\\.min\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/><link rel="prefetch" href="${baseHrefCom}/volume-up\\.min\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/><link rel="prefetch" href="${baseHrefCom}/mobile\\.min\\.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin=""/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconName) => {
    it(`should match regex for ['${iconName}']`, () => {
      const result = getIconLinks({ format: 'jsx', icons: [iconName] });
      const regex = new RegExp(
        `^<link rel="prefetch" href="${baseHrefCom}/${paramCase(
          iconName
        )}\\.min\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/>$`
      );
      expect(renderToString(result)).toMatch(regex);
    });
  });
});
