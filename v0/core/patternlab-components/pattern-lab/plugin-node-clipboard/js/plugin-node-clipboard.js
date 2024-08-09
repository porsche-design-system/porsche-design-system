/* global Clipboard, document, Dispatcher */
var PluginClipboard = {

  /**
   * Dynamically add our copy to clipboard target to each panel
   */
  injectTargets: function (event) {
    var panels = document.querySelectorAll('ul.sg-tabs-list > li > a');

    for (var i = 0; i < panels.length; i++) {
      var clipTarget = document.createElement("span");
      clipTarget.innerHTML = '📋';
      clipTarget.className = 'sg-panel-cliptarget';
      clipTarget.setAttribute('title', 'Copy to clipboard');
      var panelID = panels[i].parentNode.id.replace('-tab', '-panel');
      var panel = document.getElementById(panelID);
      panel.appendChild(clipTarget);
    }
  },


  /**
   * The function defined as the onready callback within the plugin configuration.
   */
  init: function () {
    //define our clipboard styles  to be automatically injected
    var css = '.sg-panel-cliptarget{ position: absolute; right: 1rem; font-size: 1rem; padding: 5px;}';
    css +=    '.sg-panel-cliptarget:hover{background: #ddd; cursor: pointer;}';
    var head = document.head || document.getElementsByTagName('head')[0],
      newStyle = document.createElement('style');

    newStyle.type = 'text/css';
    if (newStyle.styleSheet) {
      newStyle.styleSheet.cssText = css;
    } else {
      newStyle.appendChild(document.createTextNode(css));
    }
    head.appendChild(newStyle);

    //hook into the checkPanels event
    Dispatcher.addListener('checkPanels', PluginClipboard.injectTargets);

    //initialize clipboard.js with our injected targets
    var clipboard = new Clipboard('.sg-panel-cliptarget', {
      target: function (trigger) {
        return trigger.parentNode.getElementsByTagName("pre")[0];
      }
    });
  }
};
