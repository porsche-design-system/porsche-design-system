# Browser compatibility

<Playground>
  <template v-slot="slotProps">
    <p-button-regular :variant="slotProps.theme">Hello World</p-button-regular>
  </template>
</Playground>

With Porsche UI Kit we secure the visual and functional compatibility of all contents for a defined set of browsers and versions. The supported set is defined and updated based on a quarterly usage analysis. To consider local differences in our largest markets, any deviation of analytics data from China, the USA and Germany is determined.

All browser versions that have less than 1% share of the total sessions do not need to be supported anymore. 
The current usage analysis can be found in the [Browser Usage Dashboard](https://datastudio.google.com/open/1kMBbEg9F79q_QOg2zFtz52I_S85Fy47b)

* Last 2 versions (of all browsers)
* ">1%" (of all browsers) 
* Internet Explorer 11	 
* Chrome 48, 55 (Android Webview 7 und 8) _only China_
* Chrome 55 _only China_

<script>
  import Playground from '@/components/Playground.vue';

  export default {
    components: {
      Playground
    }
  }
</script>
