import { PIcon } from '@porsche-design-system/components-react';

export const IconPage = (): JSX.Element => {
  const style = `
    .playground.overview p-icon {
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
        <PIcon aria-label="Icon" />
      </div>

      <div className="playground light" title="should render in different sizes">
        <PIcon size="small" aria-label="Icon" />
        <PIcon size="medium" aria-label="Icon" />
        <PIcon size="large" aria-label="Icon" />
        <PIcon size="inherit" aria-label="Icon" style={{ width: 60, height: 60 }} />
      </div>

      <div className="playground light" title="should render with predefined colors on light theme">
        <PIcon theme="light" color="brand" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="light" color="default" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="light" color="neutral-contrast-high" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="light" color="neutral-contrast-medium" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="light" color="neutral-contrast-low" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="light" color="notification-success" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="light" color="notification-warning" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="light" color="notification-error" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="light" color="notification-neutral" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="light" color="inherit" aria-label="Icon" style={{ color: 'deeppink' }} />
      </div>

      <div className="playground dark" title="should render with predefined colors on dark theme">
        <PIcon theme="dark" color="brand" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="dark" color="default" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="dark" color="neutral-contrast-high" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="dark" color="neutral-contrast-medium" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="dark" color="neutral-contrast-low" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="dark" color="notification-success" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="dark" color="notification-warning" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="dark" color="notification-error" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="dark" color="notification-neutral" aria-label="Icon" style={{ color: 'deeppink' }} />
        <PIcon theme="dark" color="inherit" aria-label="Icon" style={{ color: 'deeppink' }} />
      </div>

      <div className="playground light" title="should render with custom icon">
        <PIcon source="./assets/icon-custom-kaixin.svg" aria-label="Icon for social media platform Kaixin" />
      </div>

      <div
        className="playground light overview"
        title="should render all available icons and apply coloring programmatically"
      >
        <PIcon name="360" size="inherit" color="inherit" aria-label="360 icon" />
        <PIcon name="arrow-double-down" size="inherit" color="inherit" aria-label="Arrow double down icon" />
        <PIcon name="arrow-double-left" size="inherit" color="inherit" aria-label="Arrow double left icon" />
        <PIcon name="arrow-double-right" size="inherit" color="inherit" aria-label="Arrow double right icon" />
        <PIcon name="arrow-double-up" size="inherit" color="inherit" aria-label="Arrow double up icon" />
        <PIcon name="arrow-down" size="inherit" color="inherit" aria-label="Arrow down icon" />
        <PIcon name="arrow-first" size="inherit" color="inherit" aria-label="Arrow first icon" />
        <PIcon name="arrow-head-down" size="inherit" color="inherit" aria-label="Arrow head down icon" />
        <PIcon name="arrow-head-left" size="inherit" color="inherit" aria-label="Arrow head left icon" />
        <PIcon name="arrow-head-right" size="inherit" color="inherit" aria-label="Arrow head right icon" />
        <PIcon name="arrow-head-up" size="inherit" color="inherit" aria-label="Arrow head up icon" />
        <PIcon name="arrow-last" size="inherit" color="inherit" aria-label="Arrow last icon" />
        <PIcon name="arrow-left" size="inherit" color="inherit" aria-label="Arrow left icon" />
        <PIcon name="arrow-right" size="inherit" color="inherit" aria-label="Arrow right icon" />
        <PIcon name="arrow-up" size="inherit" color="inherit" aria-label="Arrow up icon" />
        <PIcon name="chat" size="inherit" color="inherit" aria-label="Chat icon" />
        <PIcon name="email" size="inherit" color="inherit" aria-label="Email icon" />
        <PIcon name="exclamation" size="inherit" color="inherit" aria-label="Exclamation icon" />
        <PIcon name="information" size="inherit" color="inherit" aria-label="Information icon" />
        <PIcon name="phone" size="inherit" color="inherit" aria-label="Phone icon" />
        <PIcon name="question" size="inherit" color="inherit" aria-label="Question icon" />
        <PIcon name="warning" size="inherit" color="inherit" aria-label="Warning icon" />
        <PIcon name="add" size="inherit" color="inherit" aria-label="Add icon" />
        <PIcon name="adjust" size="inherit" color="inherit" aria-label="Adjust icon" />
        <PIcon name="chart" size="inherit" color="inherit" aria-label="Chart icon" />
        <PIcon name="check" size="inherit" color="inherit" aria-label="Check icon" />
        <PIcon name="close" size="inherit" color="inherit" aria-label="Close icon" />
        <PIcon name="compare" size="inherit" color="inherit" aria-label="Compare icon" />
        <PIcon name="configurate" size="inherit" color="inherit" aria-label="Configurate icon" />
        <PIcon name="delete" size="inherit" color="inherit" aria-label="Delete icon" />
        <PIcon name="disable" size="inherit" color="inherit" aria-label="Disable icon" />
        <PIcon name="download" size="inherit" color="inherit" aria-label="Download icon" />
        <PIcon name="edit" size="inherit" color="inherit" aria-label="Edit icon" />
        <PIcon name="external" size="inherit" color="inherit" aria-label="External icon" />
        <PIcon name="filter" size="inherit" color="inherit" aria-label="Filter icon" />
        <PIcon name="grid" size="inherit" color="inherit" aria-label="Grid icon" />
        <PIcon name="increase" size="inherit" color="inherit" aria-label="Increase icon" />
        <PIcon name="list" size="inherit" color="inherit" aria-label="List icon" />
        <PIcon name="logout" size="inherit" color="inherit" aria-label="Logout icon" />
        <PIcon name="menu-dots-horizontal" size="inherit" color="inherit" aria-label="Menu dots horizontal icon" />
        <PIcon name="menu-lines" size="inherit" color="inherit" aria-label="Menu lines icon" />
        <PIcon name="minus" size="inherit" color="inherit" aria-label="Minus icon" />
        <PIcon name="plus" size="inherit" color="inherit" aria-label="Plus icon" />
        <PIcon name="refresh" size="inherit" color="inherit" aria-label="Refresh icon" />
        <PIcon name="reset" size="inherit" color="inherit" aria-label="Reset icon" />
        <PIcon name="save" size="inherit" color="inherit" aria-label="Save icon" />
        <PIcon name="search" size="inherit" color="inherit" aria-label="Search icon" />
        <PIcon name="sort" size="inherit" color="inherit" aria-label="Sort icon" />
        <PIcon name="stack" size="inherit" color="inherit" aria-label="Stack icon" />
        <PIcon name="subtract" size="inherit" color="inherit" aria-label="Substract icon" />
        <PIcon name="switch" size="inherit" color="inherit" aria-label="Switch icon" />
        <PIcon name="upload" size="inherit" color="inherit" aria-label="Upload icon" />
        <PIcon name="view-off" size="inherit" color="inherit" aria-label="View off icon" />
        <PIcon name="view" size="inherit" color="inherit" aria-label="View icon" />
        <PIcon name="zoom-in" size="inherit" color="inherit" aria-label="Zoom in icon" />
        <PIcon name="zoom-out" size="inherit" color="inherit" aria-label="Zoom out icon" />
        <PIcon name="battery-empty" size="inherit" color="inherit" aria-label="Battery empty icon" />
        <PIcon name="charging-station" size="inherit" color="inherit" aria-label="Charging station icon" />
        <PIcon name="flash" size="inherit" color="inherit" aria-label="Flash icon" />
        <PIcon name="plug" size="inherit" color="inherit" aria-label="Plug icon" />
        <PIcon name="augmented-reality" size="inherit" color="inherit" aria-label="Augmented reality icon" />
        <PIcon name="broadcast" size="inherit" color="inherit" aria-label="Broadcast icon" />
        <PIcon name="camera" size="inherit" color="inherit" aria-label="Camera icon" />
        <PIcon name="closed-caption" size="inherit" color="inherit" aria-label="Closed caption icon" />
        <PIcon name="document" size="inherit" color="inherit" aria-label="Document icon" />
        <PIcon name="image" size="inherit" color="inherit" aria-label="Image icon" />
        <PIcon name="mobile" size="inherit" color="inherit" aria-label="Mobile icon" />
        <PIcon name="pause" size="inherit" color="inherit" aria-label="Pause icon" />
        <PIcon name="play" size="inherit" color="inherit" aria-label="Play icon" />
        <PIcon name="printer" size="inherit" color="inherit" aria-label="Printer icon" />
        <PIcon name="replay" size="inherit" color="inherit" aria-label="Replay icon" />
        <PIcon name="screen" size="inherit" color="inherit" aria-label="Screen icon" />
        <PIcon name="tablet" size="inherit" color="inherit" aria-label="Tablet icon" />
        <PIcon name="video" size="inherit" color="inherit" aria-label="Video icon" />
        <PIcon name="volume-off" size="inherit" color="inherit" aria-label="Volume off icon" />
        <PIcon name="volume-up" size="inherit" color="inherit" aria-label="Volume up icon" />
        <PIcon name="wifi" size="inherit" color="inherit" aria-label="Wifi icon" />
        <PIcon name="city" size="inherit" color="inherit" aria-label="City icon" />
        <PIcon name="country-road" size="inherit" color="inherit" aria-label="Country road icon" />
        <PIcon name="globe" size="inherit" color="inherit" aria-label="Globe icon" />
        <PIcon name="highway" size="inherit" color="inherit" aria-label="Highway icon" />
        <PIcon name="home" size="inherit" color="inherit" aria-label="Home icon" />
        <PIcon name="locate" size="inherit" color="inherit" aria-label="Locate icon" />
        <PIcon name="pin" size="inherit" color="inherit" aria-label="Pin icon" />
        <PIcon name="route" size="inherit" color="inherit" aria-label="Route icon" />
        <PIcon name="gift" size="inherit" color="inherit" aria-label="Gift icon" />
        <PIcon name="leaf" size="inherit" color="inherit" aria-label="Leaf icon" />
        <PIcon name="leather" size="inherit" color="inherit" aria-label="Leather icon" />
        <PIcon name="light" size="inherit" color="inherit" aria-label="Light icon" />
        <PIcon name="lock-open" size="inherit" color="inherit" aria-label="Lock open icon" />
        <PIcon name="lock" size="inherit" color="inherit" aria-label="Lock icon" />
        <PIcon name="moon" size="inherit" color="inherit" aria-label="Moon icon" />
        <PIcon name="racing-flag" size="inherit" color="inherit" aria-label="Racing flag icon" />
        <PIcon name="snowflake" size="inherit" color="inherit" aria-label="Snowflake icon" />
        <PIcon name="star" size="inherit" color="inherit" aria-label="Star icon" />
        <PIcon name="sun" size="inherit" color="inherit" aria-label="Sun icon" />
        <PIcon name="weight" size="inherit" color="inherit" aria-label="Weight icon" />
        <PIcon name="work" size="inherit" color="inherit" aria-label="Work icon" />
        <PIcon name="wrench" size="inherit" color="inherit" aria-label="Wrench icon" />
        <PIcon name="calendar" size="inherit" color="inherit" aria-label="Calendar icon" />
        <PIcon name="clock" size="inherit" color="inherit" aria-label="Clock icon" />
        <PIcon name="duration" size="inherit" color="inherit" aria-label="Duration icon" />
        <PIcon name="stopwatch" size="inherit" color="inherit" aria-label="Stopwatch icon" />
        <PIcon name="calculator" size="inherit" color="inherit" aria-label="Calculator icon" />
        <PIcon name="card" size="inherit" color="inherit" aria-label="Card icon" />
        <PIcon name="purchase" size="inherit" color="inherit" aria-label="Purcahse icon" />
        <PIcon name="shopping-cart" size="inherit" color="inherit" aria-label="Shopping cart icon" />
        <PIcon name="logo-baidu" size="inherit" color="inherit" aria-label="Logo Baidu icon" />
        <PIcon name="logo-delicious" size="inherit" color="inherit" aria-label="Logo Delicious icon" />
        <PIcon name="logo-digg" size="inherit" color="inherit" aria-label="Logo Digg icon" />
        <PIcon name="logo-facebook" size="inherit" color="inherit" aria-label="Logo Facebook icon" />
        <PIcon name="logo-foursquare" size="inherit" color="inherit" aria-label="Logo Foursquare icon" />
        <PIcon name="logo-gmail" size="inherit" color="inherit" aria-label="Logo Gmail icon" />
        <PIcon name="logo-google" size="inherit" color="inherit" aria-label="Logo Google icon" />
        <PIcon name="logo-hatena" size="inherit" color="inherit" aria-label="Logo hatena icon" />
        <PIcon name="logo-instagram" size="inherit" color="inherit" aria-label="Logo Instagram icon" />
        <PIcon name="logo-kaixin" size="inherit" color="inherit" aria-label="Logo Kaixin icon" />
        <PIcon name="logo-linkedin" size="inherit" color="inherit" aria-label="Logo Linkedin icon" />
        <PIcon name="logo-pinterest" size="inherit" color="inherit" aria-label="Logo Pinterest icon" />
        <PIcon name="logo-qq-share" size="inherit" color="inherit" aria-label="Logo QQ Share icon" />
        <PIcon name="logo-qq" size="inherit" color="inherit" aria-label="Logo QQ icon" />
        <PIcon name="logo-skyrock" size="inherit" color="inherit" aria-label="Logo Skyrock icon" />
        <PIcon name="logo-sohu" size="inherit" color="inherit" aria-label="Logo Sohu icon" />
        <PIcon name="logo-tecent" size="inherit" color="inherit" aria-label="Logo Tecent icon" />
        <PIcon name="logo-telegram" size="inherit" color="inherit" aria-label="Logo Telegram icon" />
        <PIcon name="logo-tumblr" size="inherit" color="inherit" aria-label="Logo Tumblr icon" />
        <PIcon name="logo-twitter" size="inherit" color="inherit" aria-label="Logo Twitter icon" />
        <PIcon name="logo-viber" size="inherit" color="inherit" aria-label="Logo Viber icon" />
        <PIcon name="logo-vk" size="inherit" color="inherit" aria-label="Logo VK icon" />
        <PIcon name="logo-wechat" size="inherit" color="inherit" aria-label="Logo Wechat icon" />
        <PIcon name="logo-weibo" size="inherit" color="inherit" aria-label="Logo Weibo icon" />
        <PIcon name="logo-whatsapp" size="inherit" color="inherit" aria-label="Logo Whatsapp icon" />
        <PIcon name="logo-xing" size="inherit" color="inherit" aria-label="Logo Xing icon" />
        <PIcon name="logo-yahoo" size="inherit" color="inherit" aria-label="Logo Yahoo icon" />
        <PIcon name="logo-youku" size="inherit" color="inherit" aria-label="Logo Youku icon" />
        <PIcon name="logo-youtube" size="inherit" color="inherit" aria-label="Logo YouTube icon" />
        <PIcon name="rss" size="inherit" color="inherit" aria-label="RSS icon" />
        <PIcon name="share" size="inherit" color="inherit" aria-label="Share icon" />
        <PIcon name="user-group" size="inherit" color="inherit" aria-label="User group icon" />
        <PIcon name="user" size="inherit" color="inherit" aria-label="user icon" />
        <PIcon name="car" size="inherit" color="inherit" aria-label="car icon" />
        <PIcon name="co2-emission" size="inherit" color="inherit" aria-label="CO2 emission icon" />
        <PIcon name="cubic-capacity" size="inherit" color="inherit" aria-label="Cubic Capacity icon" />
        <PIcon name="fuel-station" size="inherit" color="inherit" aria-label="Fuel station icon" />
        <PIcon name="oil-can" size="inherit" color="inherit" aria-label="Oil can icon" />
        <PIcon name="steering-wheel" size="inherit" color="inherit" aria-label="Steering wheel icon" />
        <PIcon name="tachometer" size="inherit" color="inherit" aria-label="Tachometer icon" />
        <PIcon name="truck" size="inherit" color="inherit" aria-label="Truck icon" />
        <PIcon
          name="active-cabin-ventilation"
          size="inherit"
          color="inherit"
          aria-label="active-cabin-ventilation icon"
        />
        <PIcon name="battery-full" size="inherit" color="inherit" aria-label="battery-full icon" />
        <PIcon name="bell" size="inherit" color="inherit" aria-label="bell icon" />
        <PIcon name="bookmark" size="inherit" color="inherit" aria-label="bookmark icon" />
        <PIcon name="car-battery" size="inherit" color="inherit" aria-label="car-battery icon" />
        <PIcon name="charging-active" size="inherit" color="inherit" aria-label="charging-active icon" />
        <PIcon name="charging-state" size="inherit" color="inherit" aria-label="charging-state icon" />
        <PIcon name="climate" size="inherit" color="inherit" aria-label="climate icon" />
        <PIcon name="climate-control" size="inherit" color="inherit" aria-label="climate-control icon" />
        <PIcon name="garage" size="inherit" color="inherit" aria-label="garage icon" />
        <PIcon name="horn" size="inherit" color="inherit" aria-label="horn icon" />
        <PIcon name="key" size="inherit" color="inherit" aria-label="key icon" />
        <PIcon name="map" size="inherit" color="inherit" aria-label="map icon" />
        <PIcon name="parking-brake" size="inherit" color="inherit" aria-label="parking-brake icon" />
        <PIcon name="parking-light" size="inherit" color="inherit" aria-label="parking-light icon" />
        <PIcon name="preheating" size="inherit" color="inherit" aria-label="preheating icon" />
        <PIcon name="send" size="inherit" color="inherit" aria-label="send icon" />
        <PIcon name="shopping-bag" size="inherit" color="inherit" aria-label="shopping-bag icon" />
        <PIcon name="sidelights" size="inherit" color="inherit" aria-label="sidelights icon" />
        <PIcon name="user-manual" size="inherit" color="inherit" aria-label="user-manual icon" />
        <PIcon name="wrenches" size="inherit" color="inherit" aria-label="wrenches icon" />
      </div>
    </>
  );
};
