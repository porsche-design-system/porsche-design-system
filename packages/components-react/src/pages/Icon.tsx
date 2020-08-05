import { PIcon as Icon } from '@porsche-design-system/components-react';
import React from 'react';

export const IconPage = (): JSX.Element => {
  const style = `
    .overview p-icon {
      color: deeppink;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='100%25' height='100%25' focusable='false'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%2300d5b9%7D%3C/style%3E%3C/defs%3E%3Cpath id='_safezone' d='M23 1v22H1V1h22m.1-.1H.9v22.2h22.2V.9z' class='cls-1' data-name='❌ safezone'/%3E%3Cpath id='basic_shape_square' d='M18 6v12H6V6h12m.1-.1H5.9v12.2h12.2V5.9z' class='cls-1' data-name='basic shape – square'/%3E%3Cpath id='basic_shape_complex' d='M21 3v18H3V3h18m.1-.1H2.9v18.2h18.2V2.9z' class='cls-1' data-name='basic shape – complex'/%3E%3Cpath id='basic_shape_wide' d='M20 7v10H4V7h16m.1-.1H3.9v10.2h16.2V6.9z' class='cls-1' data-name='basic shape – wide'/%3E%3Cpath id='basic_shape_high' d='M17 4v16H7V4h10m.1-.1H6.9v16.2h10.2V3.9z' class='cls-1' data-name='basic shape – high'/%3E%3Cpath id='basic_shape_wide_narrow' d='M22 8v8H2V8h20m.1-.1H1.9v8.2h20.2V7.9z' class='cls-1' data-name='basic shape – wide &amp; narrow'/%3E%3Cpath id='basic_shape_high_narrow' d='M17 2v20H7V2h10m.1-.1H6.9v20.2h10.2V1.9z' class='cls-1' data-name='basic shape – high &amp; narrow'/%3E%3C/svg%3E");
      background-size: cover;
      width: 48px;
      height: 48px;
    }
  `;
  return (
    <>
      <style children={style} />

      <div className="playground light" title="should render with default settings">
        <Icon aria-label="Icon" />
      </div>

      <div className="playground light" title="should render in different sizes">
        <Icon size="small" aria-label="Icon" />
        <Icon size="medium" aria-label="Icon" />
        <Icon size="large" aria-label="Icon" />
        <Icon size="inherit" aria-label="Icon" style={{ width: 60, height: 60 }} />
      </div>

      <div className="playground light" title="should render with predefined colors on light theme">
        <Icon theme="light" color="brand" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="light" color="default" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="light" color="neutral-contrast-high" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="light" color="neutral-contrast-medium" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="light" color="neutral-contrast-low" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="light" color="notification-success" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="light" color="notification-warning" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="light" color="notification-error" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="light" color="notification-neutral" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="light" color="inherit" aria-label="Icon" style={{ color: 'deeppink' }} />
      </div>

      <div className="playground dark" title="should render with predefined colors on dark theme">
        <Icon theme="dark" color="brand" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="dark" color="default" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="dark" color="neutral-contrast-high" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="dark" color="neutral-contrast-medium" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="dark" color="neutral-contrast-low" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="dark" color="notification-success" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="dark" color="notification-warning" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="dark" color="notification-error" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="dark" color="notification-neutral" aria-label="Icon" style={{ color: 'deeppink' }} />
        <Icon theme="dark" color="inherit" aria-label="Icon" style={{ color: 'deeppink' }} />
      </div>

      <div className="playground light" title="should render with custom icon">
        <Icon source="./assets/icon-custom-kaixin.svg" aria-label="Icon for social media platform Kaixin" />
      </div>

      <div
        className="playground light overview"
        title="should render all available icons and apply coloring programmatically"
      >
        <Icon name="360" size="inherit" color="inherit" aria-label="360 icon" />
        <Icon name="arrow-double-down" size="inherit" color="inherit" aria-label="Arrow double down icon" />
        <Icon name="arrow-double-left" size="inherit" color="inherit" aria-label="Arrow double left icon" />
        <Icon name="arrow-double-right" size="inherit" color="inherit" aria-label="Arrow double right icon" />
        <Icon name="arrow-double-up" size="inherit" color="inherit" aria-label="Arrow double up icon" />
        <Icon name="arrow-down" size="inherit" color="inherit" aria-label="Arrow down icon" />
        <Icon name="arrow-first" size="inherit" color="inherit" aria-label="Arrow first icon" />
        <Icon name="arrow-head-down" size="inherit" color="inherit" aria-label="Arrow head down icon" />
        <Icon name="arrow-head-left" size="inherit" color="inherit" aria-label="Arrow head left icon" />
        <Icon name="arrow-head-right" size="inherit" color="inherit" aria-label="Arrow head right icon" />
        <Icon name="arrow-head-up" size="inherit" color="inherit" aria-label="Arrow head up icon" />
        <Icon name="arrow-last" size="inherit" color="inherit" aria-label="Arrow last icon" />
        <Icon name="arrow-left" size="inherit" color="inherit" aria-label="Arrow left icon" />
        <Icon name="arrow-right" size="inherit" color="inherit" aria-label="Arrow right icon" />
        <Icon name="arrow-up" size="inherit" color="inherit" aria-label="Arrow up icon" />
        <Icon name="chat" size="inherit" color="inherit" aria-label="Chat icon" />
        <Icon name="email" size="inherit" color="inherit" aria-label="Email icon" />
        <Icon name="exclamation" size="inherit" color="inherit" aria-label="Exclamation icon" />
        <Icon name="information" size="inherit" color="inherit" aria-label="Information icon" />
        <Icon name="phone" size="inherit" color="inherit" aria-label="Phone icon" />
        <Icon name="question" size="inherit" color="inherit" aria-label="Question icon" />
        <Icon name="warning" size="inherit" color="inherit" aria-label="Warning icon" />
        <Icon name="add" size="inherit" color="inherit" aria-label="Add icon" />
        <Icon name="adjust" size="inherit" color="inherit" aria-label="Adjust icon" />
        <Icon name="chart" size="inherit" color="inherit" aria-label="Chart icon" />
        <Icon name="check" size="inherit" color="inherit" aria-label="Check icon" />
        <Icon name="close" size="inherit" color="inherit" aria-label="Close icon" />
        <Icon name="compare" size="inherit" color="inherit" aria-label="Compare icon" />
        <Icon name="configurate" size="inherit" color="inherit" aria-label="Configurate icon" />
        <Icon name="delete" size="inherit" color="inherit" aria-label="Delete icon" />
        <Icon name="disable" size="inherit" color="inherit" aria-label="Disable icon" />
        <Icon name="download" size="inherit" color="inherit" aria-label="Download icon" />
        <Icon name="edit" size="inherit" color="inherit" aria-label="Edit icon" />
        <Icon name="external" size="inherit" color="inherit" aria-label="External icon" />
        <Icon name="filter" size="inherit" color="inherit" aria-label="Filter icon" />
        <Icon name="grid" size="inherit" color="inherit" aria-label="Grid icon" />
        <Icon name="increase" size="inherit" color="inherit" aria-label="Increase icon" />
        <Icon name="list" size="inherit" color="inherit" aria-label="List icon" />
        <Icon name="logout" size="inherit" color="inherit" aria-label="Logout icon" />
        <Icon name="menu-dots-horizontal" size="inherit" color="inherit" aria-label="Menu dots horizontal icon" />
        <Icon name="menu-lines" size="inherit" color="inherit" aria-label="Menu lines icon" />
        <Icon name="minus" size="inherit" color="inherit" aria-label="Minus icon" />
        <Icon name="plus" size="inherit" color="inherit" aria-label="Plus icon" />
        <Icon name="refresh" size="inherit" color="inherit" aria-label="Refresh icon" />
        <Icon name="reset" size="inherit" color="inherit" aria-label="Reset icon" />
        <Icon name="save" size="inherit" color="inherit" aria-label="Save icon" />
        <Icon name="search" size="inherit" color="inherit" aria-label="Search icon" />
        <Icon name="sort" size="inherit" color="inherit" aria-label="Sort icon" />
        <Icon name="stack" size="inherit" color="inherit" aria-label="Stack icon" />
        <Icon name="subtract" size="inherit" color="inherit" aria-label="Substract icon" />
        <Icon name="switch" size="inherit" color="inherit" aria-label="Switch icon" />
        <Icon name="upload" size="inherit" color="inherit" aria-label="Upload icon" />
        <Icon name="view-off" size="inherit" color="inherit" aria-label="View off icon" />
        <Icon name="view" size="inherit" color="inherit" aria-label="View icon" />
        <Icon name="zoom-in" size="inherit" color="inherit" aria-label="Zoom in icon" />
        <Icon name="zoom-out" size="inherit" color="inherit" aria-label="Zoom out icon" />
        <Icon name="battery-empty" size="inherit" color="inherit" aria-label="Battery empty icon" />
        <Icon name="charging-station" size="inherit" color="inherit" aria-label="Charging station icon" />
        <Icon name="flash" size="inherit" color="inherit" aria-label="Flash icon" />
        <Icon name="plug" size="inherit" color="inherit" aria-label="Plug icon" />
        <Icon name="augmented-reality" size="inherit" color="inherit" aria-label="Augmented reality icon" />
        <Icon name="broadcast" size="inherit" color="inherit" aria-label="Broadcast icon" />
        <Icon name="camera" size="inherit" color="inherit" aria-label="Camera icon" />
        <Icon name="closed-caption" size="inherit" color="inherit" aria-label="Closed caption icon" />
        <Icon name="document" size="inherit" color="inherit" aria-label="Document icon" />
        <Icon name="image" size="inherit" color="inherit" aria-label="Image icon" />
        <Icon name="mobile" size="inherit" color="inherit" aria-label="Mobile icon" />
        <Icon name="pause" size="inherit" color="inherit" aria-label="Pause icon" />
        <Icon name="play" size="inherit" color="inherit" aria-label="Play icon" />
        <Icon name="printer" size="inherit" color="inherit" aria-label="Printer icon" />
        <Icon name="replay" size="inherit" color="inherit" aria-label="Replay icon" />
        <Icon name="screen" size="inherit" color="inherit" aria-label="Screen icon" />
        <Icon name="tablet" size="inherit" color="inherit" aria-label="Tablet icon" />
        <Icon name="video" size="inherit" color="inherit" aria-label="Video icon" />
        <Icon name="volume-off" size="inherit" color="inherit" aria-label="Volume off icon" />
        <Icon name="volume-up" size="inherit" color="inherit" aria-label="Volume up icon" />
        <Icon name="wifi" size="inherit" color="inherit" aria-label="Wifi icon" />
        <Icon name="city" size="inherit" color="inherit" aria-label="City icon" />
        <Icon name="country-road" size="inherit" color="inherit" aria-label="Country road icon" />
        <Icon name="globe" size="inherit" color="inherit" aria-label="Globe icon" />
        <Icon name="highway" size="inherit" color="inherit" aria-label="Highway icon" />
        <Icon name="home" size="inherit" color="inherit" aria-label="Home icon" />
        <Icon name="locate" size="inherit" color="inherit" aria-label="Locate icon" />
        <Icon name="pin" size="inherit" color="inherit" aria-label="Pin icon" />
        <Icon name="route" size="inherit" color="inherit" aria-label="Route icon" />
        <Icon name="gift" size="inherit" color="inherit" aria-label="Gift icon" />
        <Icon name="leaf" size="inherit" color="inherit" aria-label="Leaf icon" />
        <Icon name="leather" size="inherit" color="inherit" aria-label="Leather icon" />
        <Icon name="light" size="inherit" color="inherit" aria-label="Light icon" />
        <Icon name="lock-open" size="inherit" color="inherit" aria-label="Lock open icon" />
        <Icon name="lock" size="inherit" color="inherit" aria-label="Lock icon" />
        <Icon name="moon" size="inherit" color="inherit" aria-label="Moon icon" />
        <Icon name="racing-flag" size="inherit" color="inherit" aria-label="Racing flag icon" />
        <Icon name="snowflake" size="inherit" color="inherit" aria-label="Snowflake icon" />
        <Icon name="star" size="inherit" color="inherit" aria-label="Star icon" />
        <Icon name="sun" size="inherit" color="inherit" aria-label="Sun icon" />
        <Icon name="weight" size="inherit" color="inherit" aria-label="Weight icon" />
        <Icon name="work" size="inherit" color="inherit" aria-label="Work icon" />
        <Icon name="wrench" size="inherit" color="inherit" aria-label="Wrench icon" />
        <Icon name="calendar" size="inherit" color="inherit" aria-label="Calendar icon" />
        <Icon name="clock" size="inherit" color="inherit" aria-label="Clock icon" />
        <Icon name="duration" size="inherit" color="inherit" aria-label="Duration icon" />
        <Icon name="stopwatch" size="inherit" color="inherit" aria-label="Stopwatch icon" />
        <Icon name="calculator" size="inherit" color="inherit" aria-label="Calculator icon" />
        <Icon name="card" size="inherit" color="inherit" aria-label="Card icon" />
        <Icon name="purchase" size="inherit" color="inherit" aria-label="Purcahse icon" />
        <Icon name="shopping-cart" size="inherit" color="inherit" aria-label="Shopping cart icon" />
        <Icon name="logo-baidu" size="inherit" color="inherit" aria-label="Logo Baidu icon" />
        <Icon name="logo-delicious" size="inherit" color="inherit" aria-label="Logo Delicious icon" />
        <Icon name="logo-digg" size="inherit" color="inherit" aria-label="Logo Digg icon" />
        <Icon name="logo-facebook" size="inherit" color="inherit" aria-label="Logo Facebook icon" />
        <Icon name="logo-foursquare" size="inherit" color="inherit" aria-label="Logo Foursquare icon" />
        <Icon name="logo-gmail" size="inherit" color="inherit" aria-label="Logo Gmail icon" />
        <Icon name="logo-google" size="inherit" color="inherit" aria-label="Logo Google icon" />
        <Icon name="logo-hatena" size="inherit" color="inherit" aria-label="Logo hatena icon" />
        <Icon name="logo-instagram" size="inherit" color="inherit" aria-label="Logo Instagram icon" />
        <Icon name="logo-kaixin" size="inherit" color="inherit" aria-label="Logo Kaixin icon" />
        <Icon name="logo-linkedin" size="inherit" color="inherit" aria-label="Logo Linkedin icon" />
        <Icon name="logo-pinterest" size="inherit" color="inherit" aria-label="Logo Pinterest icon" />
        <Icon name="logo-qq-share" size="inherit" color="inherit" aria-label="Logo QQ Share icon" />
        <Icon name="logo-qq" size="inherit" color="inherit" aria-label="Logo QQ icon" />
        <Icon name="logo-skyrock" size="inherit" color="inherit" aria-label="Logo Skyrock icon" />
        <Icon name="logo-sohu" size="inherit" color="inherit" aria-label="Logo Sohu icon" />
        <Icon name="logo-tecent" size="inherit" color="inherit" aria-label="Logo Tecent icon" />
        <Icon name="logo-telegram" size="inherit" color="inherit" aria-label="Logo Telegram icon" />
        <Icon name="logo-tumblr" size="inherit" color="inherit" aria-label="Logo Tumblr icon" />
        <Icon name="logo-twitter" size="inherit" color="inherit" aria-label="Logo Twitter icon" />
        <Icon name="logo-viber" size="inherit" color="inherit" aria-label="Logo Viber icon" />
        <Icon name="logo-vk" size="inherit" color="inherit" aria-label="Logo VK icon" />
        <Icon name="logo-wechat" size="inherit" color="inherit" aria-label="Logo Wechat icon" />
        <Icon name="logo-weibo" size="inherit" color="inherit" aria-label="Logo Weibo icon" />
        <Icon name="logo-whatsapp" size="inherit" color="inherit" aria-label="Logo Whatsapp icon" />
        <Icon name="logo-xing" size="inherit" color="inherit" aria-label="Logo Xing icon" />
        <Icon name="logo-yahoo" size="inherit" color="inherit" aria-label="Logo Yahoo icon" />
        <Icon name="logo-youku" size="inherit" color="inherit" aria-label="Logo Youku icon" />
        <Icon name="logo-youtube" size="inherit" color="inherit" aria-label="Logo YouTube icon" />
        <Icon name="rss" size="inherit" color="inherit" aria-label="RSS icon" />
        <Icon name="share" size="inherit" color="inherit" aria-label="Share icon" />
        <Icon name="user-group" size="inherit" color="inherit" aria-label="User group icon" />
        <Icon name="user" size="inherit" color="inherit" aria-label="user icon" />
        <Icon name="car" size="inherit" color="inherit" aria-label="car icon" />
        <Icon name="co2-emission" size="inherit" color="inherit" aria-label="CO2 emission icon" />
        <Icon name="cubic-capacity" size="inherit" color="inherit" aria-label="Cubic Capacity icon" />
        <Icon name="fuel-station" size="inherit" color="inherit" aria-label="Fuel station icon" />
        <Icon name="oil-can" size="inherit" color="inherit" aria-label="Oil can icon" />
        <Icon name="steering-wheel" size="inherit" color="inherit" aria-label="Steering wheel icon" />
        <Icon name="tachometer" size="inherit" color="inherit" aria-label="Tachometer icon" />
        <Icon name="truck" size="inherit" color="inherit" aria-label="Truck icon" />
        <Icon
          name="active-cabin-ventilation"
          size="inherit"
          color="inherit"
          aria-label="active-cabin-ventilation icon"
        />
        <Icon name="battery-full" size="inherit" color="inherit" aria-label="battery-full icon" />
        <Icon name="bell" size="inherit" color="inherit" aria-label="bell icon" />
        <Icon name="bookmark" size="inherit" color="inherit" aria-label="bookmark icon" />
        <Icon name="car-battery" size="inherit" color="inherit" aria-label="car-battery icon" />
        <Icon name="charging-active" size="inherit" color="inherit" aria-label="charging-active icon" />
        <Icon name="charging-state" size="inherit" color="inherit" aria-label="charging-state icon" />
        <Icon name="climate" size="inherit" color="inherit" aria-label="climate icon" />
        <Icon name="climate-control" size="inherit" color="inherit" aria-label="climate-control icon" />
        <Icon name="garage" size="inherit" color="inherit" aria-label="garage icon" />
        <Icon name="horn" size="inherit" color="inherit" aria-label="horn icon" />
        <Icon name="key" size="inherit" color="inherit" aria-label="key icon" />
        <Icon name="map" size="inherit" color="inherit" aria-label="map icon" />
        <Icon name="parking-brake" size="inherit" color="inherit" aria-label="parking-brake icon" />
        <Icon name="parking-light" size="inherit" color="inherit" aria-label="parking-light icon" />
        <Icon name="preheating" size="inherit" color="inherit" aria-label="preheating icon" />
        <Icon name="send" size="inherit" color="inherit" aria-label="send icon" />
        <Icon name="shopping-bag" size="inherit" color="inherit" aria-label="shopping-bag icon" />
        <Icon name="sidelights" size="inherit" color="inherit" aria-label="sidelights icon" />
        <Icon name="user-manual" size="inherit" color="inherit" aria-label="user-manual icon" />
        <Icon name="wrenches" size="inherit" color="inherit" aria-label="wrenches icon" />
      </div>
    </>
  );
};
