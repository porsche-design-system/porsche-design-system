import { Component } from '@angular/core';

@Component({
  selector: 'page-icon',
  styles: [`
    .playground.overview p-icon {
      color: deeppink;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='100%25' height='100%25' focusable='false'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%2300d5b9%7D%3C/style%3E%3C/defs%3E%3Cpath id='_safezone' d='M23 1v22H1V1h22m.1-.1H.9v22.2h22.2V.9z' class='cls-1' data-name='❌ safezone'/%3E%3Cpath id='basic_shape_square' d='M18 6v12H6V6h12m.1-.1H5.9v12.2h12.2V5.9z' class='cls-1' data-name='basic shape – square'/%3E%3Cpath id='basic_shape_complex' d='M21 3v18H3V3h18m.1-.1H2.9v18.2h18.2V2.9z' class='cls-1' data-name='basic shape – complex'/%3E%3Cpath id='basic_shape_wide' d='M20 7v10H4V7h16m.1-.1H3.9v10.2h16.2V6.9z' class='cls-1' data-name='basic shape – wide'/%3E%3Cpath id='basic_shape_high' d='M17 4v16H7V4h10m.1-.1H6.9v16.2h10.2V3.9z' class='cls-1' data-name='basic shape – high'/%3E%3Cpath id='basic_shape_wide_narrow' d='M22 8v8H2V8h20m.1-.1H1.9v8.2h20.2V7.9z' class='cls-1' data-name='basic shape – wide &amp; narrow'/%3E%3Cpath id='basic_shape_high_narrow' d='M17 2v20H7V2h10m.1-.1H6.9v20.2h10.2V1.9z' class='cls-1' data-name='basic shape – high &amp; narrow'/%3E%3C/svg%3E");
      background-size: cover;
      width: 48px;
      height: 48px;
    }
  `],
  template: `
    <div class="playground light" title="should render with default settings">
      <p-icon aria-label="Icon"></p-icon>
    </div>

    <div class="playground light" title="should render in different sizes">
      <p-icon [size]="'small'" aria-label="Icon"></p-icon>
      <p-icon [size]="'medium'" aria-label="Icon"></p-icon>
      <p-icon [size]="'large'" aria-label="Icon"></p-icon>
      <p-icon [size]="'inherit'" aria-label="Icon" style="width: 60px; height: 60px;"></p-icon>
    </div>

    <div class="playground light" title="should render with predefined colors on light theme">
      <p-icon [theme]="'light'" [color]="'brand'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'light'" [color]="'default'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'light'" [color]="'neutral-contrast-high'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'light'" [color]="'neutral-contrast-medium'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'light'" [color]="'neutral-contrast-low'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'light'" [color]="'notification-success'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'light'" [color]="'notification-warning'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'light'" [color]="'notification-error'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'light'" [color]="'notification-neutral'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'light'" [color]="'inherit'" aria-label="Icon" style="color: deeppink;"></p-icon>
    </div>

    <div class="playground dark" title="should render with predefined colors on dark theme">
      <p-icon [theme]="'dark'" [color]="'brand'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'dark'" [color]="'default'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'dark'" [color]="'neutral-contrast-high'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'dark'" [color]="'neutral-contrast-medium'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'dark'" [color]="'neutral-contrast-low'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'dark'" [color]="'notification-success'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'dark'" [color]="'notification-warning'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'dark'" [color]="'notification-error'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'dark'" [color]="'notification-neutral'" aria-label="Icon" style="color: deeppink;"></p-icon>
      <p-icon [theme]="'dark'" [color]="'inherit'" aria-label="Icon" style="color: deeppink;"></p-icon>
    </div>

    <div class="playground light" title="should render with custom icon">
      <p-icon [source]="'assets/icon-custom-kaixin.svg'" aria-label="Icon for social media platform Kaixin"></p-icon>
    </div>

    <div class="playground light overview"
         title="should render all available icons and apply coloring programmatically">
      <p-icon [name]="'360'" [size]="'inherit'" [color]="'inherit'" aria-label="360 icon"></p-icon>
      <p-icon [name]="'arrow-double-down'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow double down icon"></p-icon>
      <p-icon [name]="'arrow-double-left'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow double left icon"></p-icon>
      <p-icon [name]="'arrow-double-right'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow double right icon"></p-icon>
      <p-icon [name]="'arrow-double-up'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow double up icon"></p-icon>
      <p-icon [name]="'arrow-down'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow down icon"></p-icon>
      <p-icon [name]="'arrow-first'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow first icon"></p-icon>
      <p-icon [name]="'arrow-head-down'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow head down icon"></p-icon>
      <p-icon [name]="'arrow-head-left'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow head left icon"></p-icon>
      <p-icon [name]="'arrow-head-right'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow head right icon"></p-icon>
      <p-icon [name]="'arrow-head-up'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow head up icon"></p-icon>
      <p-icon [name]="'arrow-last'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow last icon"></p-icon>
      <p-icon [name]="'arrow-left'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow left icon"></p-icon>
      <p-icon [name]="'arrow-right'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow right icon"></p-icon>
      <p-icon [name]="'arrow-up'" [size]="'inherit'" [color]="'inherit'" aria-label="Arrow up icon"></p-icon>
      <p-icon [name]="'chat'" [size]="'inherit'" [color]="'inherit'" aria-label="Chat icon"></p-icon>
      <p-icon [name]="'email'" [size]="'inherit'" [color]="'inherit'" aria-label="Email icon"></p-icon>
      <p-icon [name]="'exclamation'" [size]="'inherit'" [color]="'inherit'" aria-label="Exclamation icon"></p-icon>
      <p-icon [name]="'information'" [size]="'inherit'" [color]="'inherit'" aria-label="Information icon"></p-icon>
      <p-icon [name]="'phone'" [size]="'inherit'" [color]="'inherit'" aria-label="Phone icon"></p-icon>
      <p-icon [name]="'question'" [size]="'inherit'" [color]="'inherit'" aria-label="Question icon"></p-icon>
      <p-icon [name]="'warning'" [size]="'inherit'" [color]="'inherit'" aria-label="Warning icon"></p-icon>
      <p-icon [name]="'add'" [size]="'inherit'" [color]="'inherit'" aria-label="Add icon"></p-icon>
      <p-icon [name]="'adjust'" [size]="'inherit'" [color]="'inherit'" aria-label="Adjust icon"></p-icon>
      <p-icon [name]="'chart'" [size]="'inherit'" [color]="'inherit'" aria-label="Chart icon"></p-icon>
      <p-icon [name]="'check'" [size]="'inherit'" [color]="'inherit'" aria-label="Check icon"></p-icon>
      <p-icon [name]="'close'" [size]="'inherit'" [color]="'inherit'" aria-label="Close icon"></p-icon>
      <p-icon [name]="'compare'" [size]="'inherit'" [color]="'inherit'" aria-label="Compare icon"></p-icon>
      <p-icon [name]="'configurate'" [size]="'inherit'" [color]="'inherit'" aria-label="Configurate icon"></p-icon>
      <p-icon [name]="'delete'" [size]="'inherit'" [color]="'inherit'" aria-label="Delete icon"></p-icon>
      <p-icon [name]="'disable'" [size]="'inherit'" [color]="'inherit'" aria-label="Disable icon"></p-icon>
      <p-icon [name]="'download'" [size]="'inherit'" [color]="'inherit'" aria-label="Download icon"></p-icon>
      <p-icon [name]="'edit'" [size]="'inherit'" [color]="'inherit'" aria-label="Edit icon"></p-icon>
      <p-icon [name]="'external'" [size]="'inherit'" [color]="'inherit'" aria-label="External icon"></p-icon>
      <p-icon [name]="'filter'" [size]="'inherit'" [color]="'inherit'" aria-label="Filter icon"></p-icon>
      <p-icon [name]="'grid'" [size]="'inherit'" [color]="'inherit'" aria-label="Grid icon"></p-icon>
      <p-icon [name]="'increase'" [size]="'inherit'" [color]="'inherit'" aria-label="Increase icon"></p-icon>
      <p-icon [name]="'list'" [size]="'inherit'" [color]="'inherit'" aria-label="List icon"></p-icon>
      <p-icon [name]="'logout'" [size]="'inherit'" [color]="'inherit'" aria-label="Logout icon"></p-icon>
      <p-icon [name]="'menu-dots-horizontal'" [size]="'inherit'" [color]="'inherit'"
              aria-label="Menu dots horizontal icon"></p-icon>
      <p-icon [name]="'menu-lines'" [size]="'inherit'" [color]="'inherit'" aria-label="Menu lines icon"></p-icon>
      <p-icon [name]="'minus'" [size]="'inherit'" [color]="'inherit'" aria-label="Minus icon"></p-icon>
      <p-icon [name]="'plus'" [size]="'inherit'" [color]="'inherit'" aria-label="Plus icon"></p-icon>
      <p-icon [name]="'refresh'" [size]="'inherit'" [color]="'inherit'" aria-label="Refresh icon"></p-icon>
      <p-icon [name]="'reset'" [size]="'inherit'" [color]="'inherit'" aria-label="Reset icon"></p-icon>
      <p-icon [name]="'save'" [size]="'inherit'" [color]="'inherit'" aria-label="Save icon"></p-icon>
      <p-icon [name]="'search'" [size]="'inherit'" [color]="'inherit'" aria-label="Search icon"></p-icon>
      <p-icon [name]="'sort'" [size]="'inherit'" [color]="'inherit'" aria-label="Sort icon"></p-icon>
      <p-icon [name]="'stack'" [size]="'inherit'" [color]="'inherit'" aria-label="Stack icon"></p-icon>
      <p-icon [name]="'subtract'" [size]="'inherit'" [color]="'inherit'" aria-label="Substract icon"></p-icon>
      <p-icon [name]="'switch'" [size]="'inherit'" [color]="'inherit'" aria-label="Switch icon"></p-icon>
      <p-icon [name]="'upload'" [size]="'inherit'" [color]="'inherit'" aria-label="Upload icon"></p-icon>
      <p-icon [name]="'view-off'" [size]="'inherit'" [color]="'inherit'" aria-label="View off icon"></p-icon>
      <p-icon [name]="'view'" [size]="'inherit'" [color]="'inherit'" aria-label="View icon"></p-icon>
      <p-icon [name]="'zoom-in'" [size]="'inherit'" [color]="'inherit'" aria-label="Zoom in icon"></p-icon>
      <p-icon [name]="'zoom-out'" [size]="'inherit'" [color]="'inherit'" aria-label="Zoom out icon"></p-icon>
      <p-icon [name]="'battery-empty'" [size]="'inherit'" [color]="'inherit'" aria-label="Battery empty icon"></p-icon>
      <p-icon [name]="'charging-station'" [size]="'inherit'" [color]="'inherit'" aria-label="Charging station icon"></p-icon>
      <p-icon [name]="'flash'" [size]="'inherit'" [color]="'inherit'" aria-label="Flash icon"></p-icon>
      <p-icon [name]="'plug'" [size]="'inherit'" [color]="'inherit'" aria-label="Plug icon"></p-icon>
      <p-icon [name]="'augmented-reality'" [size]="'inherit'" [color]="'inherit'" aria-label="Augmented reality icon"></p-icon>
      <p-icon [name]="'broadcast'" [size]="'inherit'" [color]="'inherit'" aria-label="Broadcast icon"></p-icon>
      <p-icon [name]="'camera'" [size]="'inherit'" [color]="'inherit'" aria-label="Camera icon"></p-icon>
      <p-icon [name]="'closed-caption'" [size]="'inherit'" [color]="'inherit'" aria-label="Closed caption icon"></p-icon>
      <p-icon [name]="'document'" [size]="'inherit'" [color]="'inherit'" aria-label="Document icon"></p-icon>
      <p-icon [name]="'image'" [size]="'inherit'" [color]="'inherit'" aria-label="Image icon"></p-icon>
      <p-icon [name]="'mobile'" [size]="'inherit'" [color]="'inherit'" aria-label="Mobile icon"></p-icon>
      <p-icon [name]="'pause'" [size]="'inherit'" [color]="'inherit'" aria-label="Pause icon"></p-icon>
      <p-icon [name]="'play'" [size]="'inherit'" [color]="'inherit'" aria-label="Play icon"></p-icon>
      <p-icon [name]="'printer'" [size]="'inherit'" [color]="'inherit'" aria-label="Printer icon"></p-icon>
      <p-icon [name]="'replay'" [size]="'inherit'" [color]="'inherit'" aria-label="Replay icon"></p-icon>
      <p-icon [name]="'screen'" [size]="'inherit'" [color]="'inherit'" aria-label="Screen icon"></p-icon>
      <p-icon [name]="'tablet'" [size]="'inherit'" [color]="'inherit'" aria-label="Tablet icon"></p-icon>
      <p-icon [name]="'video'" [size]="'inherit'" [color]="'inherit'" aria-label="Video icon"></p-icon>
      <p-icon [name]="'volume-off'" [size]="'inherit'" [color]="'inherit'" aria-label="Volume off icon"></p-icon>
      <p-icon [name]="'volume-up'" [size]="'inherit'" [color]="'inherit'" aria-label="Volume up icon"></p-icon>
      <p-icon [name]="'wifi'" [size]="'inherit'" [color]="'inherit'" aria-label="Wifi icon"></p-icon>
      <p-icon [name]="'city'" [size]="'inherit'" [color]="'inherit'" aria-label="City icon"></p-icon>
      <p-icon [name]="'country-road'" [size]="'inherit'" [color]="'inherit'" aria-label="Country road icon"></p-icon>
      <p-icon [name]="'globe'" [size]="'inherit'" [color]="'inherit'" aria-label="Globe icon"></p-icon>
      <p-icon [name]="'highway'" [size]="'inherit'" [color]="'inherit'" aria-label="Highway icon"></p-icon>
      <p-icon [name]="'home'" [size]="'inherit'" [color]="'inherit'" aria-label="Home icon"></p-icon>
      <p-icon [name]="'locate'" [size]="'inherit'" [color]="'inherit'" aria-label="Locate icon"></p-icon>
      <p-icon [name]="'pin'" [size]="'inherit'" [color]="'inherit'" aria-label="Pin icon"></p-icon>
      <p-icon [name]="'route'" [size]="'inherit'" [color]="'inherit'" aria-label="Route icon"></p-icon>
      <p-icon [name]="'gift'" [size]="'inherit'" [color]="'inherit'" aria-label="Gift icon"></p-icon>
      <p-icon [name]="'leaf'" [size]="'inherit'" [color]="'inherit'" aria-label="Leaf icon"></p-icon>
      <p-icon [name]="'leather'" [size]="'inherit'" [color]="'inherit'" aria-label="Leather icon"></p-icon>
      <p-icon [name]="'light'" [size]="'inherit'" [color]="'inherit'" aria-label="Light icon"></p-icon>
      <p-icon [name]="'lock-open'" [size]="'inherit'" [color]="'inherit'" aria-label="Lock open icon"></p-icon>
      <p-icon [name]="'lock'" [size]="'inherit'" [color]="'inherit'" aria-label="Lock icon"></p-icon>
      <p-icon [name]="'moon'" [size]="'inherit'" [color]="'inherit'" aria-label="Moon icon"></p-icon>
      <p-icon [name]="'racing-flag'" [size]="'inherit'" [color]="'inherit'" aria-label="Racing flag icon"></p-icon>
      <p-icon [name]="'snowflake'" [size]="'inherit'" [color]="'inherit'" aria-label="Snowflake icon"></p-icon>
      <p-icon [name]="'star'" [size]="'inherit'" [color]="'inherit'" aria-label="Star icon"></p-icon>
      <p-icon [name]="'sun'" [size]="'inherit'" [color]="'inherit'" aria-label="Sun icon"></p-icon>
      <p-icon [name]="'weight'" [size]="'inherit'" [color]="'inherit'" aria-label="Weight icon"></p-icon>
      <p-icon [name]="'work'" [size]="'inherit'" [color]="'inherit'" aria-label="Work icon"></p-icon>
      <p-icon [name]="'wrench'" [size]="'inherit'" [color]="'inherit'" aria-label="Wrench icon"></p-icon>
      <p-icon [name]="'calendar'" [size]="'inherit'" [color]="'inherit'" aria-label="Calendar icon"></p-icon>
      <p-icon [name]="'clock'" [size]="'inherit'" [color]="'inherit'" aria-label="Clock icon"></p-icon>
      <p-icon [name]="'duration'" [size]="'inherit'" [color]="'inherit'" aria-label="Duration icon"></p-icon>
      <p-icon [name]="'stopwatch'" [size]="'inherit'" [color]="'inherit'" aria-label="Stopwatch icon"></p-icon>
      <p-icon [name]="'calculator'" [size]="'inherit'" [color]="'inherit'" aria-label="Calculator icon"></p-icon>
      <p-icon [name]="'card'" [size]="'inherit'" [color]="'inherit'" aria-label="Card icon"></p-icon>
      <p-icon [name]="'purchase'" [size]="'inherit'" [color]="'inherit'" aria-label="Purcahse icon"></p-icon>
      <p-icon [name]="'shopping-cart'" [size]="'inherit'" [color]="'inherit'" aria-label="Shopping cart icon"></p-icon>
      <p-icon [name]="'logo-baidu'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Baidu icon"></p-icon>
      <p-icon [name]="'logo-delicious'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Delicious icon"></p-icon>
      <p-icon [name]="'logo-digg'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Digg icon"></p-icon>
      <p-icon [name]="'logo-facebook'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Facebook icon"></p-icon>
      <p-icon [name]="'logo-foursquare'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Foursquare icon"></p-icon>
      <p-icon [name]="'logo-gmail'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Gmail icon"></p-icon>
      <p-icon [name]="'logo-google'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Google icon"></p-icon>
      <p-icon [name]="'logo-hatena'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo hatena icon"></p-icon>
      <p-icon [name]="'logo-instagram'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Instagram icon"></p-icon>
      <p-icon [name]="'logo-kaixin'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Kaixin icon"></p-icon>
      <p-icon [name]="'logo-linkedin'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Linkedin icon"></p-icon>
      <p-icon [name]="'logo-pinterest'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Pinterest icon"></p-icon>
      <p-icon [name]="'logo-qq-share'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo QQ Share icon"></p-icon>
      <p-icon [name]="'logo-qq'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo QQ icon"></p-icon>
      <p-icon [name]="'logo-skyrock'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Skyrock icon"></p-icon>
      <p-icon [name]="'logo-sohu'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Sohu icon"></p-icon>
      <p-icon [name]="'logo-tecent'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Tecent icon"></p-icon>
      <p-icon [name]="'logo-telegram'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Telegram icon"></p-icon>
      <p-icon [name]="'logo-tumblr'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Tumblr icon"></p-icon>
      <p-icon [name]="'logo-twitter'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Twitter icon"></p-icon>
      <p-icon [name]="'logo-viber'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Viber icon"></p-icon>
      <p-icon [name]="'logo-vk'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo VK icon"></p-icon>
      <p-icon [name]="'logo-wechat'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Wechat icon"></p-icon>
      <p-icon [name]="'logo-weibo'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Weibo icon"></p-icon>
      <p-icon [name]="'logo-whatsapp'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Whatsapp icon"></p-icon>
      <p-icon [name]="'logo-xing'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Xing icon"></p-icon>
      <p-icon [name]="'logo-yahoo'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Yahoo icon"></p-icon>
      <p-icon [name]="'logo-youku'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo Youku icon"></p-icon>
      <p-icon [name]="'logo-youtube'" [size]="'inherit'" [color]="'inherit'" aria-label="Logo YouTube icon"></p-icon>
      <p-icon [name]="'rss'" [size]="'inherit'" [color]="'inherit'" aria-label="RSS icon"></p-icon>
      <p-icon [name]="'share'" [size]="'inherit'" [color]="'inherit'" aria-label="Share icon"></p-icon>
      <p-icon [name]="'user-group'" [size]="'inherit'" [color]="'inherit'" aria-label="User group icon"></p-icon>
      <p-icon [name]="'user'" [size]="'inherit'" [color]="'inherit'" aria-label="user icon"></p-icon>
      <p-icon [name]="'car'" [size]="'inherit'" [color]="'inherit'" aria-label="car icon"></p-icon>
      <p-icon [name]="'co2-emission'" [size]="'inherit'" [color]="'inherit'" aria-label="CO2 emission icon"></p-icon>
      <p-icon [name]="'cubic-capacity'" [size]="'inherit'" [color]="'inherit'" aria-label="Cubic Capacity icon"></p-icon>
      <p-icon [name]="'fuel-station'" [size]="'inherit'" [color]="'inherit'" aria-label="Fuel station icon"></p-icon>
      <p-icon [name]="'oil-can'" [size]="'inherit'" [color]="'inherit'" aria-label="Oil can icon"></p-icon>
      <p-icon [name]="'steering-wheel'" [size]="'inherit'" [color]="'inherit'" aria-label="Steering wheel icon"></p-icon>
      <p-icon [name]="'tachometer'" [size]="'inherit'" [color]="'inherit'" aria-label="Tachometer icon"></p-icon>
      <p-icon [name]="'truck'" [size]="'inherit'" [color]="'inherit'" aria-label="Truck icon"></p-icon>
      <p-icon [name]="'active-cabin-ventilation'" [size]="'inherit'" [color]="'inherit'"
              aria-label="active-cabin-ventilation icon"></p-icon>
      <p-icon [name]="'battery-full'" [size]="'inherit'" [color]="'inherit'" aria-label="battery-full icon"></p-icon>
      <p-icon [name]="'bell'" [size]="'inherit'" [color]="'inherit'" aria-label="bell icon"></p-icon>
      <p-icon [name]="'bookmark'" [size]="'inherit'" [color]="'inherit'" aria-label="bookmark icon"></p-icon>
      <p-icon [name]="'car-battery'" [size]="'inherit'" [color]="'inherit'" aria-label="car-battery icon"></p-icon>
      <p-icon [name]="'charging-active'" [size]="'inherit'" [color]="'inherit'" aria-label="charging-active icon"></p-icon>
      <p-icon [name]="'charging-state'" [size]="'inherit'" [color]="'inherit'" aria-label="charging-state icon"></p-icon>
      <p-icon [name]="'climate'" [size]="'inherit'" [color]="'inherit'" aria-label="climate icon"></p-icon>
      <p-icon [name]="'climate-control'" [size]="'inherit'" [color]="'inherit'" aria-label="climate-control icon"></p-icon>
      <p-icon [name]="'garage'" [size]="'inherit'" [color]="'inherit'" aria-label="garage icon"></p-icon>
      <p-icon [name]="'horn'" [size]="'inherit'" [color]="'inherit'" aria-label="horn icon"></p-icon>
      <p-icon [name]="'key'" [size]="'inherit'" [color]="'inherit'" aria-label="key icon"></p-icon>
      <p-icon [name]="'map'" [size]="'inherit'" [color]="'inherit'" aria-label="map icon"></p-icon>
      <p-icon [name]="'parking-brake'" [size]="'inherit'" [color]="'inherit'" aria-label="parking-brake icon"></p-icon>
      <p-icon [name]="'parking-light'" [size]="'inherit'" [color]="'inherit'" aria-label="parking-light icon"></p-icon>
      <p-icon [name]="'preheating'" [size]="'inherit'" [color]="'inherit'" aria-label="preheating icon"></p-icon>
      <p-icon [name]="'send'" [size]="'inherit'" [color]="'inherit'" aria-label="send icon"></p-icon>
      <p-icon [name]="'shopping-bag'" [size]="'inherit'" [color]="'inherit'" aria-label="shopping-bag icon"></p-icon>
      <p-icon [name]="'sidelights'" [size]="'inherit'" [color]="'inherit'" aria-label="sidelights icon"></p-icon>
      <p-icon [name]="'user-manual'" [size]="'inherit'" [color]="'inherit'" aria-label="user-manual icon"></p-icon>
      <p-icon [name]="'wrenches'" [size]="'inherit'" [color]="'inherit'" aria-label="wrenches icon"></p-icon>
    </div>
  `
})
export class IconComponent {
}
