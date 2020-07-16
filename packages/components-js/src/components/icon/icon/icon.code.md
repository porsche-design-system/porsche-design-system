# Icon

The Porsche Design System is using a **SVG icon system** to visually present an icon object. Each icon is hosted on the Porsche Design System CDN to be served and cached as fast as possible.

## Name

For more information and a complete overview of all available Porsche icons, head over to Porsche Icons ([Porsche Icons](https://icons.porsche.com)).  
To reference an icon just use the `name` property with a predefined icon id.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-icon :theme="theme" name="360" aria-label="360 icon"></p-icon>
    <p-icon :theme="theme" name="arrow-double-down" aria-label="Arrow double down icon"></p-icon>
    <p-icon :theme="theme" name="arrow-double-left" aria-label="Arrow double left icon"></p-icon>
    <p-icon :theme="theme" name="arrow-double-right" aria-label="Arrow double right icon"></p-icon>
    <p-icon :theme="theme" name="arrow-double-up" aria-label="Arrow double up icon"></p-icon>
    <p-icon :theme="theme" name="arrow-down" aria-label="Arrow down icon"></p-icon>
    <p-icon :theme="theme" name="arrow-first" aria-label="Arrow first icon"></p-icon>
    <p-icon :theme="theme" name="arrow-head-down" aria-label="Arrow head down icon"></p-icon>
    <p-icon :theme="theme" name="arrow-head-left" aria-label="Arrow head left icon"></p-icon>
    <p-icon :theme="theme" name="arrow-head-right" aria-label="Arrow head right icon"></p-icon>
    <p-icon :theme="theme" name="arrow-head-up" aria-label="Arrow head up icon"></p-icon>
    <p-icon :theme="theme" name="arrow-last" aria-label="Arrow last icon"></p-icon>
    <p-icon :theme="theme" name="arrow-left" aria-label="Arrow left icon"></p-icon>
    <p-icon :theme="theme" name="arrow-right" aria-label="Arrow right icon"></p-icon>
    <p-icon :theme="theme" name="arrow-up" aria-label="Arrow up icon"></p-icon>
    <p-icon :theme="theme" name="chat" aria-label="Chat icon"></p-icon>
    <p-icon :theme="theme" name="email" aria-label="Email icon"></p-icon>
    <p-icon :theme="theme" name="exclamation" aria-label="Exclamation icon"></p-icon>
    <p-icon :theme="theme" name="information" aria-label="Information icon"></p-icon>
    <p-icon :theme="theme" name="phone" aria-label="Phone icon"></p-icon>
    <p-icon :theme="theme" name="question" aria-label="Question icon"></p-icon>
    <p-icon :theme="theme" name="warning" aria-label="Warning icon"></p-icon>
    <p-icon :theme="theme" name="add" aria-label="Add icon"></p-icon>
    <p-icon :theme="theme" name="adjust" aria-label="Adjust icon"></p-icon>
    <p-icon :theme="theme" name="chart" aria-label="Chart icon"></p-icon>
    <p-icon :theme="theme" name="check" aria-label="Check icon"></p-icon>
    <p-icon :theme="theme" name="close" aria-label="Close icon"></p-icon>
    <p-icon :theme="theme" name="compare" aria-label="Compare icon"></p-icon>
    <p-icon :theme="theme" name="configurate" aria-label="Configurate icon"></p-icon>
    <p-icon :theme="theme" name="delete" aria-label="Delete icon"></p-icon>
    <p-icon :theme="theme" name="disable" aria-label="Disable icon"></p-icon>
    <p-icon :theme="theme" name="download" aria-label="Download icon"></p-icon>
    <p-icon :theme="theme" name="edit" aria-label="Edit icon"></p-icon>
    <p-icon :theme="theme" name="external" aria-label="External icon"></p-icon>
    <p-icon :theme="theme" name="filter" aria-label="Filter icon"></p-icon>
    <p-icon :theme="theme" name="grid" aria-label="Grid icon"></p-icon>
    <p-icon :theme="theme" name="increase" aria-label="Increase icon"></p-icon>
    <p-icon :theme="theme" name="list" aria-label="List icon"></p-icon>
    <p-icon :theme="theme" name="logout" aria-label="Logout icon"></p-icon>
    <p-icon :theme="theme" name="menu-dots-horizontal" aria-label="Menu dots horizontal icon"></p-icon>
    <p-icon :theme="theme" name="menu-lines" aria-label="Menu lines icon"></p-icon>
    <p-icon :theme="theme" name="minus" aria-label="Minus icon"></p-icon>
    <p-icon :theme="theme" name="plus" aria-label="Plus icon"></p-icon>
    <p-icon :theme="theme" name="refresh" aria-label="Refresh icon"></p-icon>
    <p-icon :theme="theme" name="reset" aria-label="Reset icon"></p-icon>
    <p-icon :theme="theme" name="save" aria-label="Save icon"></p-icon>
    <p-icon :theme="theme" name="search" aria-label="Search icon"></p-icon>
    <p-icon :theme="theme" name="sort" aria-label="Sort icon"></p-icon>
    <p-icon :theme="theme" name="stack" aria-label="Stack icon"></p-icon>
    <p-icon :theme="theme" name="subtract" aria-label="Substract icon"></p-icon>
    <p-icon :theme="theme" name="switch" aria-label="Switch icon"></p-icon>
    <p-icon :theme="theme" name="upload" aria-label="Upload icon"></p-icon>
    <p-icon :theme="theme" name="view-off" aria-label="View off icon"></p-icon>
    <p-icon :theme="theme" name="view" aria-label="View icon"></p-icon>
    <p-icon :theme="theme" name="zoom-in" aria-label="Zoom in icon"></p-icon>
    <p-icon :theme="theme" name="zoom-out" aria-label="Zoom out icon"></p-icon>
    <p-icon :theme="theme" name="battery-empty" aria-label="Battery empty icon"></p-icon>
    <p-icon :theme="theme" name="charging-station" aria-label="Charging station icon"></p-icon>
    <p-icon :theme="theme" name="flash" aria-label="Flash icon"></p-icon>
    <p-icon :theme="theme" name="plug" aria-label="Plug icon"></p-icon>
    <p-icon :theme="theme" name="augmented-reality" aria-label="Augmented reality icon"></p-icon>
    <p-icon :theme="theme" name="broadcast" aria-label="Broadcast icon"></p-icon>
    <p-icon :theme="theme" name="camera" aria-label="Camera icon"></p-icon>
    <p-icon :theme="theme" name="closed-caption" aria-label="Closed caption icon"></p-icon>
    <p-icon :theme="theme" name="document" aria-label="Document icon"></p-icon>
    <p-icon :theme="theme" name="image" aria-label="Image icon"></p-icon>
    <p-icon :theme="theme" name="mobile" aria-label="Mobile icon"></p-icon>
    <p-icon :theme="theme" name="pause" aria-label="Pause icon"></p-icon>
    <p-icon :theme="theme" name="play" aria-label="Play icon"></p-icon>
    <p-icon :theme="theme" name="printer" aria-label="Printer icon"></p-icon>
    <p-icon :theme="theme" name="replay" aria-label="Replay icon"></p-icon>
    <p-icon :theme="theme" name="screen" aria-label="Screen icon"></p-icon>
    <p-icon :theme="theme" name="tablet" aria-label="Tablet icon"></p-icon>
    <p-icon :theme="theme" name="video" aria-label="Video icon"></p-icon>
    <p-icon :theme="theme" name="volume-off" aria-label="Volume off icon"></p-icon>
    <p-icon :theme="theme" name="volume-up" aria-label="Volume up icon"></p-icon>
    <p-icon :theme="theme" name="wifi" aria-label="Wifi icon"></p-icon>
    <p-icon :theme="theme" name="city" aria-label="City icon"></p-icon>
    <p-icon :theme="theme" name="country-road" aria-label="Country road icon"></p-icon>
    <p-icon :theme="theme" name="globe" aria-label="Globe icon"></p-icon>
    <p-icon :theme="theme" name="highway" aria-label="Highway icon"></p-icon>
    <p-icon :theme="theme" name="home" aria-label="Home icon"></p-icon>
    <p-icon :theme="theme" name="locate" aria-label="Locate icon"></p-icon>
    <p-icon :theme="theme" name="pin" aria-label="Pin icon"></p-icon>
    <p-icon :theme="theme" name="route" aria-label="Route icon"></p-icon>
    <p-icon :theme="theme" name="gift" aria-label="Gift icon"></p-icon>
    <p-icon :theme="theme" name="leaf" aria-label="Leaf icon"></p-icon>
    <p-icon :theme="theme" name="leather" aria-label="Leather icon"></p-icon>
    <p-icon :theme="theme" name="light" aria-label="Light icon"></p-icon>
    <p-icon :theme="theme" name="lock-open" aria-label="Lock open icon"></p-icon>
    <p-icon :theme="theme" name="lock" aria-label="Lock icon"></p-icon>
    <p-icon :theme="theme" name="moon" aria-label="Moon icon"></p-icon>
    <p-icon :theme="theme" name="racing-flag" aria-label="Racing flag icon"></p-icon>
    <p-icon :theme="theme" name="snowflake" aria-label="Snowflake icon"></p-icon>
    <p-icon :theme="theme" name="star" aria-label="Star icon"></p-icon>
    <p-icon :theme="theme" name="sun" aria-label="Sun icon"></p-icon>
    <p-icon :theme="theme" name="weight" aria-label="Weight icon"></p-icon>
    <p-icon :theme="theme" name="work" aria-label="Work icon"></p-icon>
    <p-icon :theme="theme" name="wrench" aria-label="Wrench icon"></p-icon>
    <p-icon :theme="theme" name="calendar" aria-label="Calendar icon"></p-icon>
    <p-icon :theme="theme" name="clock" aria-label="Clock icon"></p-icon>
    <p-icon :theme="theme" name="duration" aria-label="Duration icon"></p-icon>
    <p-icon :theme="theme" name="stopwatch" aria-label="Stopwatch icon"></p-icon>
    <p-icon :theme="theme" name="calculator" aria-label="Calculator icon"></p-icon>
    <p-icon :theme="theme" name="card" aria-label="Card icon"></p-icon>
    <p-icon :theme="theme" name="purchase" aria-label="Purcahse icon"></p-icon>
    <p-icon :theme="theme" name="shopping-cart" aria-label="Shopping cart icon"></p-icon>
    <p-icon :theme="theme" name="logo-baidu" aria-label="Logo Baidu icon"></p-icon>
    <p-icon :theme="theme" name="logo-delicious" aria-label="Logo Delicious icon"></p-icon>
    <p-icon :theme="theme" name="logo-digg" aria-label="Logo Digg icon"></p-icon>
    <p-icon :theme="theme" name="logo-facebook" aria-label="Logo Facebook icon"></p-icon>
    <p-icon :theme="theme" name="logo-foursquare" aria-label="Logo Foursquare icon"></p-icon>
    <p-icon :theme="theme" name="logo-gmail" aria-label="Logo Gmail icon"></p-icon>
    <p-icon :theme="theme" name="logo-google" aria-label="Logo Google icon"></p-icon>
    <p-icon :theme="theme" name="logo-hatena" aria-label="Logo hatena icon"></p-icon>
    <p-icon :theme="theme" name="logo-instagram" aria-label="Logo Instagram icon"></p-icon>
    <p-icon :theme="theme" name="logo-kaixin" aria-label="Logo Kaixin icon"></p-icon>
    <p-icon :theme="theme" name="logo-linkedin" aria-label="Logo Linkedin icon"></p-icon>
    <p-icon :theme="theme" name="logo-pinterest" aria-label="Logo Pinterest icon"></p-icon>
    <p-icon :theme="theme" name="logo-qq-share" aria-label="Logo QQ Share icon"></p-icon>
    <p-icon :theme="theme" name="logo-qq" aria-label="Logo QQ icon"></p-icon>
    <p-icon :theme="theme" name="logo-skyrock" aria-label="Logo Skyrock icon"></p-icon>
    <p-icon :theme="theme" name="logo-sohu" aria-label="Logo Sohu icon"></p-icon>
    <p-icon :theme="theme" name="logo-tecent" aria-label="Logo Tecent icon"></p-icon>
    <p-icon :theme="theme" name="logo-telegram" aria-label="Logo Telegram icon"></p-icon>
    <p-icon :theme="theme" name="logo-tumblr" aria-label="Logo Tumblr icon"></p-icon>
    <p-icon :theme="theme" name="logo-twitter" aria-label="Logo Twitter icon"></p-icon>
    <p-icon :theme="theme" name="logo-viber" aria-label="Logo Viber icon"></p-icon>
    <p-icon :theme="theme" name="logo-vk" aria-label="Logo VK icon"></p-icon>
    <p-icon :theme="theme" name="logo-wechat" aria-label="Logo Wechat icon"></p-icon>
    <p-icon :theme="theme" name="logo-weibo" aria-label="Logo Weibo icon"></p-icon>
    <p-icon :theme="theme" name="logo-whatsapp" aria-label="Logo Whatsapp icon"></p-icon>
    <p-icon :theme="theme" name="logo-xing" aria-label="Logo Xing icon"></p-icon>
    <p-icon :theme="theme" name="logo-yahoo" aria-label="Logo Yahoo icon"></p-icon>
    <p-icon :theme="theme" name="logo-youku" aria-label="Logo Youku icon"></p-icon>
    <p-icon :theme="theme" name="logo-youtube" aria-label="Logo YouTube icon"></p-icon>
    <p-icon :theme="theme" name="rss" aria-label="RSS icon"></p-icon>
    <p-icon :theme="theme" name="share" aria-label="Share icon"></p-icon>
    <p-icon :theme="theme" name="user-group" aria-label="User group icon"></p-icon>
    <p-icon :theme="theme" name="user" aria-label="user icon"></p-icon>
    <p-icon :theme="theme" name="car" aria-label="car icon"></p-icon>
    <p-icon :theme="theme" name="co2-emission" aria-label="CO2 emission icon"></p-icon>
    <p-icon :theme="theme" name="cubic-capacity" aria-label="Cubic Capacity icon"></p-icon>
    <p-icon :theme="theme" name="fuel-station" aria-label="Fuel station icon"></p-icon>
    <p-icon :theme="theme" name="oil-can" aria-label="Oil can icon"></p-icon>
    <p-icon :theme="theme" name="steering-wheel" aria-label="Steering wheel icon"></p-icon>
    <p-icon :theme="theme" name="tachometer" aria-label="Tachometer icon"></p-icon>
    <p-icon :theme="theme" name="truck" aria-label="Truck icon"></p-icon>
    <p-icon :theme="theme" name="active-cabin-ventilation" aria-label="Active cabin ventilation icon"></p-icon>
    <p-icon :theme="theme" name="battery-full" aria-label="Battery full icon"></p-icon>
    <p-icon :theme="theme" name="bell" aria-label="Bell icon"></p-icon>
    <p-icon :theme="theme" name="bookmark" aria-label="Bookmark icon"></p-icon>
    <p-icon :theme="theme" name="car-battery" aria-label="Car battery icon"></p-icon>
    <p-icon :theme="theme" name="charging-active" aria-label="Charging active icon"></p-icon>
    <p-icon :theme="theme" name="charging-state" aria-label="Charging state icon"></p-icon>
    <p-icon :theme="theme" name="climate" aria-label="climate icon"></p-icon>
    <p-icon :theme="theme" name="climate-control" aria-label="Climate control icon"></p-icon>
    <p-icon :theme="theme" name="garage" aria-label="Garage icon"></p-icon>
    <p-icon :theme="theme" name="horn" aria-label="Horn icon"></p-icon>
    <p-icon :theme="theme" name="key" aria-label="Key icon"></p-icon>
    <p-icon :theme="theme" name="map" aria-label="Map icon"></p-icon>
    <p-icon :theme="theme" name="parking-brake" aria-label="Parking brake icon"></p-icon>
    <p-icon :theme="theme" name="parking-light" aria-label="Parking light icon"></p-icon>
    <p-icon :theme="theme" name="preheating" aria-label="Preheating icon"></p-icon>
    <p-icon :theme="theme" name="send" aria-label="Send icon"></p-icon>
    <p-icon :theme="theme" name="shopping-bag" aria-label="Shopping bag icon"></p-icon>
    <p-icon :theme="theme" name="sidelights" aria-label="Sidelights icon"></p-icon>
    <p-icon :theme="theme" name="user-manual" aria-label="User manual icon"></p-icon>
    <p-icon :theme="theme" name="vehicle" aria-label="Vehicle icon"></p-icon>
    <p-icon :theme="theme" name="wrenches" aria-label="Wrenches icon"></p-icon>
  </template>
</Playground>
    
---

## Size

There are default sizes for the icon component which should cover most use cases. If a specific size is needed, the size can be set to `inherit` in order to specify the size from outside.

<Playground :themeable="true">
  <template #configurator>
    <select v-model="size">
      <option disabled>Select a size</option>
      <option>small</option>
      <option>medium</option>
      <option>large</option>
      <option>inherit</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-icon :theme="theme" :size="size" name="highway" aria-label="Highway icon" :style="isInheritSize" />
  </template>
</Playground>
    
---

## Color
Predefined colors associated with its theme are available. Furthermore, inherit mode can be used to define a custom color.

<Playground :themeable="true">
  <template #configurator>
    <select v-model="color">
      <option disabled>Select a color</option>
      <option value="brand">Brand</option>
      <option value="default">Default</option>
      <option value="neutral-contrast-high">Neutral Contrast High</option>
      <option value="neutral-contrast-medium">Neutral Contrast Medium</option>
      <option value="neutral-contrast-low">Neutral Contrast Low</option>
      <option value="notification-success">Notification Success</option>
      <option value="notification-warning">Notification Warning</option>
      <option value="notification-error">Notification Error</option>
      <option value="notification-neutral">Notification Neutral</option>
      <option value="inherit">Inherit</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-icon :theme="theme" name="highway" :color="color" :style="isInheritColor" aria-label="Highway icon" />
  </template>
</Playground>

---

## Custom icon
The whole Porsche icon set is hosted on the Porsche Design System CDN. If there is need to show a custom icon which doesn't exist yet, you can define a custom path (absolute or relative) to your SVG icon in the `source` property. Be sure that the custom icon serves the specific needs like size and viewbox which are described in the [design documentation](#/components/icon#design).

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-icon :theme="theme" :source="require(`./assets/icon-custom-kaixin.svg`)" aria-label="Icon for social media platform Kaixin" />
  </template>
</Playground>

---

## Lazy loaded icon
Icons can be lazy loaded, which means that they are being loaded (fetched) when they get visible in the viewport.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-icon :theme="theme" name="information" lazy="true" aria-label="Information icon" />
  </template>
</Playground>

---

## Accessibility
With the use of SVG icons, there are options to give more accessibility to users using screen readers. Here are some good practices:

* If icons stand alone, adding descriptive text with an `aria-label` attribute is a good practice:
```
<p-icon aria-label="descriptive text, e.g: close the layer" />
```

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundIcon extends Vue {
    public size = 'large';
    public color = 'brand';
    
    public get isInheritSize() {
      return this.size === 'inherit' ? 'width: 96px; height: 96px;' : undefined;
    }
    
    public get isInheritColor() {
      return this.color === 'inherit' ? 'color: deeppink' : undefined;
    }
  }
</script>