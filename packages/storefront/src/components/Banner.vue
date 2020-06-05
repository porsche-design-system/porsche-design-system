<template>
  <div id="ie11Banner">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" focusable="false">
      <path d="M11.49 13h1.01l.5-6h-2l.49 6zM11 15h2v2h-2z"></path>
      <path d="M12 3a9 9 0 109 9 9 9 0 00-9-9zm0 17a8 8 0 118-8 8 8 0 01-8 8z"></path>
    </svg>
    <p>
      Please note that the Porsche Design System no longer supports Internet Explorer 11. Support will expires latest by
      1st of Oktober 2020. We recommend upgrading to the latest
      <a href="https://www.google.com/intl/en/chrome/" target="_blank">Chrome</a>,
      <a href="microsoft-edge:aktuelle url">Microsoft Edge Chromium</a>,
      <a href="https://www.mozilla.org/firefox/new/" target="_blank">Mozilla Firefox</a> or
      <a href="https://www.apple.com/safari/" target="_blank">Safari</a>.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Banner extends Vue {}
</script>

<style scoped lang="css">
#ie11Banner {
  background: #fff5e5;
  height: 88px;
  width: 1920px;
  border-radius: 0px;
}

#ie11Banner a {
  color: #000;
  text-decoration: none;
}
#ie11Banner a:hover {
  color: red;
}
#ie11Banner p {
  width: 748px;
  height: 48px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-family: PorscheNext-Regular, 'Arial Narrow', Arial, sans-serif;
  font-weight: normal;
  line-height: 24px;
  display: inline-block;
  margin: 20px 0 20px 0;
}

#ie11Banner svg {
  margin: 23px 19px 0 193px;
  vertical-align: top;
}
</style>
