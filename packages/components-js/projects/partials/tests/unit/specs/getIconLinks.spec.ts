import { ICON_NAMES, type IconName } from '@porsche-design-system/icons';
import { kebabCase } from 'change-case';
import { renderToString } from 'react-dom/server';
import { getIconLinks } from '../../../src';
import { vi, describe, it, expect } from 'vitest';

const hash = '[a-z0-9]{7}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche\\.com\\/porsche-design-system\\/icons';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche\\.cn\\/porsche-design-system\\/icons';

vi.mock('../../../src/shared');

describe('validation', () => {
  it('should throw error on invalid icons parameter', () => {
    expect(() => getIconLinks({ icons: ['some-invalid-icon'] as any[] })).toThrowErrorMatchingInlineSnapshot(`
      [Error: [Porsche Design System] The following supplied icon names are invalid:
        some-invalid-icon

      Please use only valid icon names:
        360, 4-wheel-drive, accessibility, active-cabin-ventilation, add, adjust, aggregation, ai-3d-object, ai-code, ai-edit, ai-image, ai-scale, ai-sound, ai-spark, ai-spark-filled, ai-text, ai-video, arrow-compact-down, arrow-compact-left, arrow-compact-right, arrow-compact-up, arrow-double-down, arrow-double-left, arrow-double-right, arrow-double-up, arrow-down, arrow-first, arrow-head-down, arrow-head-left, arrow-head-right, arrow-head-up, arrow-last, arrow-left, arrow-right, arrow-up, arrows, attachment, augmented-reality, battery-empty, battery-empty-co2, battery-empty-fuel, battery-full, battery-half, battery-one-quarter, battery-three-quarters, bell, bookmark, bookmark-filled, brain, broadcast, cabriolet, calculator, calendar, camera, car, car-battery, card, charging-active, charging-network, charging-state, charging-station, chart, chat, check, city, climate, climate-control, clock, close, closed-caption, cloud, co2-class, co2-emission, color-picker, compare, compass, configurate, copy, country-road, coupe, cubic-capacity, cut, delete, disable, dislike, dislike-filled, document, door, download, drag, duration, ear, edit, email, error, error-filled, exclamation, exclamation-filled, external, fast-backward, fast-forward, file-csv, file-excel, filter, fingerprint, flag, flash, fuel-station, garage, genuine-parts, geo-localization, gift, globe, grid, grip, group, hand, heart, heart-filled, highway, highway-filled, history, home, horn, image, increase, information, information-filled, key, laptop, leaf, leather, light, like, like-filled, limousine, linked, list, locate, lock, lock-open, logo-apple-carplay, logo-apple-music, logo-apple-podcast, logo-baidu, logo-delicious, logo-digg, logo-facebook, logo-foursquare, logo-gmail, logo-google, logo-hatena, logo-instagram, logo-kaixin, logo-kakaotalk, logo-kununu, logo-linkedin, logo-naver, logo-pinterest, logo-qq, logo-qq-share, logo-reddit, logo-skyrock, logo-snapchat, logo-sohu, logo-spotify, logo-tecent, logo-telegram, logo-tiktok, logo-tumblr, logo-twitter, logo-viber, logo-vk, logo-wechat, logo-weibo, logo-whatsapp, logo-x, logo-xing, logo-yahoo, logo-youku, logo-youtube, logout, map, menu-dots-horizontal, menu-dots-vertical, menu-lines, microphone, minus, mobile, moon, new-chat, news, north-arrow, oil-can, online-search, parking-brake, parking-light, paste, pause, phone, pin, pin-filled, pivot, play, plug, plus, preheating, price-tag, printer, purchase, push-pin, push-pin-off, qr, qr-off, question, question-filled, racing-flag, radar, radio, refresh, replay, reset, return, road, roof-closed, roof-open, route, rss, save, screen, search, seat, send, service-technician, share, shopping-bag, shopping-bag-filled, shopping-cart, shopping-cart-filled, sidebar, sidelights, skip-backward, skip-forward, snowflake, sort, stack, star, star-filled, steering-wheel, stop, stopwatch, subtract, success, success-filled, sun, suv, switch, tablet, tachometer, theme, tire, trigger-finger, truck, turismo, unlinked, upload, user, user-filled, user-group, user-manual, video, view, view-off, volume-off, volume-up, warning, warning-filled, weather, weight, wifi, work, wrench, wrenches, zoom-in, zoom-out]
    `);
  });
});

describe('format: html', () => {
  it('should return default link', () => {
    const result = getIconLinks();
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/arrow-right\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return default link for china cdn', () => {
    const result = getIconLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCn}/arrow-right\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getIconLinks({ icons: ['truck', 'volume-up', 'mobile'] });
    const regex = new RegExp(
      `^<link rel=prefetch href=${baseHrefCom}/truck\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/volume-up\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin><link rel=prefetch href=${baseHrefCom}/mobile\\.${hash}\\.svg as=image type=image/svg\\+xml crossorigin>$`
    );

    expect(result).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconName) => {
    it(`should match regex for ['${iconName}']`, () => {
      const result = getIconLinks({ icons: [iconName] });
      const regex = new RegExp(
        `^<link rel=prefetch href=${baseHrefCom}/${kebabCase(
          iconName
        )}.${hash}.svg as=image type=image/svg\\+xml crossorigin>$`
      );
      expect(result).toMatch(regex);
    });
  });
});

describe('format: jsx', () => {
  it('should return default link', () => {
    const result = getIconLinks({ format: 'jsx' });
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/arrow-right\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  it('should return default link for china cdn', () => {
    const result = getIconLinks({ format: 'jsx', cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCn}/arrow-right\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getIconLinks({ format: 'jsx', icons: ['truck', 'volume-up', 'mobile'] });
    const regex = new RegExp(
      `^<link rel="prefetch" href="${baseHrefCom}/truck\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/><link rel="prefetch" href="${baseHrefCom}/volume-up\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/><link rel="prefetch" href="${baseHrefCom}/mobile\\.${hash}.svg" as="image" type="image/svg\\+xml" crossorigin=""/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  ICON_NAMES.forEach((iconName: IconName) => {
    it(`should match regex for ['${iconName}']`, () => {
      const result = getIconLinks({ format: 'jsx', icons: [iconName] });
      const regex = new RegExp(
        `^<link rel="prefetch" href="${baseHrefCom}/${kebabCase(
          iconName
        )}\\.${hash}\\.svg" as="image" type="image/svg\\+xml" crossorigin=""/>$`
      );
      expect(renderToString(result)).toMatch(regex);
    });
  });
});
