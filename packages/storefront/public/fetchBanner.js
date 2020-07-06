
async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

(async function(){
  const div = document.createElement('div');
  const contentDiv = document.getElementsByTagName('body');
  contentDiv[0].appendChild(div);
  div.innerHTML = await fetchHtmlAsText("notificationBanner.html");

  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = 'notificationBanner.css';
  head.appendChild(link);

})();
