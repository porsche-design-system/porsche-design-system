<template>
  <div v-if="isActive">
    <div
      style="background: rgb(255, 155, 0);
          border-radius: 0px;
          height: 4px;
          width: 1920px;"
    />
    <div id="ie11Banner">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" focusable="false">
        <path d="M11.49 13h1.01l.5-6h-2l.49 6zM11 15h2v2h-2z"></path>
        <path d="M12 3a9 9 0 109 9 9 9 0 00-9-9zm0 17a8 8 0 118-8 8 8 0 01-8 8z"></path>
      </svg>
      <p>
        Please note that from 1st of October 2020 you won’t be able to access this site with your current browser.
        <br />
        Use the latest version of <a href="https://www.google.com/chrome/" target="_blank">Chrome</a>,
        <a href="https://www.microsoft.com/edge" target="_blank">Microsoft Edge</a>, or
        <a href="https://www.mozilla.org/firefox/new/" target="_blank">Mozilla Firefox</a> instead - and get back on
        track.
      </p>
      <p-link variant="tertiary" icon="external" href="microsoft-edge:window.location.href"> Open Page in Microsoft Edge</p-link>
      <!--<button onclick="console.log(window.location.href)">
        <svg xmlns="http://www.w3.org/2000/svg" focusable="false" style="margin: 0; width:24px; height: 24px">
          <path d="M15 4v1h3.08L10 13.2l.8.8L19 5.92V9h1V4h-5z"></path>
          <path d="M19 19H5V5h7V4H4v16h16v-8h-1v7z"></path>
        </svg>
        <span>
          Open Page in Microsoft Edge
        </span>
      </button>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Banner extends Vue {
  private detectIe11 = (): boolean => {
    return !!window.MSInputMethodContext && !!document.documentMode;
  };

  private location = window.location.href;

  public isActive = this.detectIe11();
}
</script>

<style scoped lang="css">
#ie11Banner {
  background: #fff5e5;
  border-radius: 0px;
  height: 88px;
  width: 1992px;
}

#ie11Banner a {
  color: #000;
  text-decoration: underline;
}
#ie11Banner a:hover {
  color: red;
}
#ie11Banner p {
  height: 48px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-family: PorscheNext-Regular, 'Arial Narrow', Arial, sans-serif;
  font-weight: normal;
  line-height: 24px;
  display: inline-block;
  margin: 16px 0 24px 0;
  width: 748px;
}

#ie11Banner svg {
  margin: 16px 19px 0 193px;
  vertical-align: top;
}

#ie11Banner p-link {
  margin: 19px 226px 21px 512px;
}
/*#ie11Banner button {
  width: 238px;
  height: 48px;
  border: 1px solid rgb(50, 54, 57);
  border-radius: 0px;
  margin: 19px 226px 21px 512px;
  vertical-align: top;
  background-color: Transparent;
}*/
#ie11Banner span {
  width: 260px;
  height: 24px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-family: PorscheNext-Regular, 'Arial Narrow', Arial, sans-serif;
  font-weight: normal;
  line-height: 24px;
}
</style>
