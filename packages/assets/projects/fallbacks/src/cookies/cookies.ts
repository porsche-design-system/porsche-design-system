import type { Lang, Locales } from '../types';

const ID = 'porsche-design-system-fallbacks-cookies';

const locales: Locales = {
  de: {
    title: 'Aktivieren Sie Browser Cookies, um diese Webseite zu nutzen',
    content:
      'Cookies sind in Ihrem Browser deaktiviert. Um auf diese Seite zuzugreifen, müssen Sie in den Browsereinstellungen Cookies aktivieren, das Fenster schließen und diese Webseite erneut öffnen.',
  },
  ru: {
    title: 'Активируйте файлы cookie, чтобы использовать этот сайт',
    content:
      'Файлы cookie отключены в вашем браузере. Для доступа к этому сайту необходимо активировать файлы cookie в настройках браузера, закрыть окно и снова открыть этот сайт.',
  },
  fr: {
    title: 'Activer les cookies pour utiliser ce site',
    content:
      "Les cookies sont désactivés dans votre navigateur. Pour accéder à ce site, il est nécessaire d'activer les cookies dans les paramètres du navigateur, de fermer la fenêtre et d'ouvrir à nouveau ce site.",
  },
  en: {
    title: 'Activate browser cookies to use this website',
    content:
      'Cookies are disabled in your browser. To access this website it is necessary to activate cookies in the browsers settings, close the window and open this site again.',
  },
  it: {
    title: 'Attiva i cookie per utilizzare questo sito',
    content:
      'I cookie sono disabilitati nel tuo browser. Per accedere a questo sito è necessario attivare i cookie nelle impostazioni del browser, chiudere la finestra e riaprire questo sito.',
  },
  pt: {
    title: 'Ative os cookies para usar este site',
    content:
      'Os cookies estão desativados no seu navegador. Para acessar este site é necessário ativar os cookies nas configurações do navegador, fechar a janela e abrir este site novamente.',
  },
  es: {
    title: 'Activar cookies para usar este sitio',
    content:
      'Las cookies están deshabilitadas en su navegador. Para acceder a este sitio es necesario activar las cookies en la configuración de los navegadores, cerrar la ventana y volver a abrir este sitio.',
  },
  ja: {
    title: 'このサイトを使用するにはCookieをアクティブ化してください',
    content:
      'ブラウザでCookieが無効になっています。このサイトにアクセスするには、ブラウザの設定でCookieを有効にし、ウィンドウを閉じてこのサイトを再度開く必要があります。',
  },
  ko: {
    title: '이 사이트를 사용하려면 쿠키를 활성화하십시오',
    content:
      '귀하의 브라우저에서 쿠키가 비활성화되어 있습니다. 이 사이트에 액세스하려면 브라우저 설정에서 쿠키를 활성화하고 창을 닫고 이 사이트를 다시 열어야 합니다.',
  },
  zh: {
    title: '请启用浏览器cookies',
    content: '本网站需要激活cookies以提供必要的功能。请您设置浏览器并再次重新打开本网站。',
  },
  nl: {
    title: 'Activeer cookies om deze site te gebruiken',
    content:
      'Cookies zijn uitgeschakeld in uw browser. Om toegang te krijgen tot deze site is het noodzakelijk om cookies te activeren in de browserinstellingen, het venster te sluiten en deze site opnieuw te openen.',
  },
  pl: {
    title: 'Aktywuj pliki cookie, aby korzystać z tej witryny',
    content:
      'Pliki cookie są wyłączone w Twojej przeglądarce. Aby uzyskać dostęp do tej witryny, należy aktywować pliki cookie w ustawieniach przeglądarki, zamknąć okno i ponownie otworzyć tę witrynę.',
  },
  cs: {
    title: 'Chcete-li používat tento web, aktivujte soubory cookie',
    content:
      'Soubory cookie jsou ve vašem prohlížeči zakázány. Pro přístup na tyto stránky je nutné aktivovat cookies v nastavení prohlížeče, zavřít okno a znovu otevřít tyto stránky.',
  },
  da: {
    title: 'Aktiver cookies for at bruge dette websted',
    content:
      'Cookies er deaktiveret i din browser. For at få adgang til denne side er det nødvendigt at aktivere cookies i browserens indstillinger, lukke vinduet og åbne denne side igen.',
  },
  et: {
    title: 'Selle saidi kasutamiseks aktiveerige küpsised',
    content:
      'Küpsised on teie brauseris keelatud. Sellele saidile pääsemiseks tuleb brauseri seadetes aktiveerida küpsised, sulgeda aken ja avada see sait uuesti.',
  },
  fi: {
    title: 'Aktivoi evästeet käyttääksesi tätä sivustoa',
    content:
      'Evästeet ovat poissa käytöstä selaimessasi. Tälle sivustolle pääsy edellyttää evästeiden aktivointia selaimen asetuksista, sulkea ikkuna ja avaa tämä sivusto uudelleen.',
  },
  lt: {
    title: 'Norėdami naudotis šia svetaine, suaktyvinkite slapukus',
    content:
      'Jūsų naršyklėje slapukai išjungti. Norint pasiekti šią svetainę, būtina naršyklės nustatymuose suaktyvinti slapukus, uždaryti langą ir vėl atidaryti šią svetainę.',
  },
  lv: {
    title: 'Lai izmantotu šo vietni, aktivizējiet sīkfailus',
    content:
      'Jūsu pārlūkprogrammā sīkfaili ir atspējoti. Lai piekļūtu šai vietnei, pārlūkprogrammas iestatījumos ir jāaktivizē sīkfaili, aizveriet logu un vēlreiz atveriet šo vietni.',
  },
  no: {
    title: 'Aktiver informasjonskapsler for å bruke denne siden',
    content:
      'Informasjonskapsler er deaktivert i nettleseren din. For å få tilgang til denne siden er det nødvendig å aktivere informasjonskapsler i nettleserens innstillinger, lukke vinduet og åpne denne siden igjen.',
  },
  sl: {
    title: 'Aktivirajte piškotke za uporabo te strani',
    content:
      'Piškotki so v vašem brskalniku onemogočeni. Za dostop do te strani morate v nastavitvah brskalnika aktivirati piškotke, zapreti okno in ponovno odpreti to spletno mesto.',
  },
  sv: {
    title: 'Aktivera cookies för att använda denna webbplats',
    content:
      'Cookies är inaktiverade i din webbläsare. För att komma åt denna sida är det nödvändigt att aktivera cookies i webbläsarens inställningar, stäng fönstret och öppna denna sida igen.',
  },
  tr: {
    title: 'Bu siteyi kullanmak için çerezleri etkinleştirin',
    content:
      'Tarayıcınızda çerezler devre dışı. Bu siteye erişmek için tarayıcı ayarlarında çerezleri etkinleştirmek, pencereyi kapatmak ve bu siteyi tekrar açmak gerekir.',
  },
  uk: {
    title: 'Активуйте файли cookie, щоб використовувати цей сайт',
    content:
      'Файли cookie вимкнено у вашому браузері. Для доступу до цього сайту необхідно активувати файли cookie в налаштуваннях браузера, закрити вікно та знову відкрити цей сайт.',
  },
};
/* Auto Generated Start */

const lang = document.getElementsByTagName('html')[0].getAttribute('lang')?.slice(0, 2) as Lang;
const locale = lang in locales ? lang : 'en';

const { title, content } = locales[locale];
// biome-ignore format: auto generated
const htmlMarkup = `<h2>${title}</h2><p>${content}</p>`;

// biome-ignore format: auto generated
const css = `#ID{position:fixed;display:flex;justify-content:center;margin:0;padding:1rem 7vw;top:0;bottom:0;left:0;right:0;box-sizing:border-box;z-index:999999;background:#fff}#ID>div{position:relative;width:100%;max-width:96rem;margin:0;padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:1rem;font-family:'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif;font-weight:400;line-height:calc(6px + 2.125ex);color:#000}#ID>div svg{width:5rem;height:5rem;margin:0 0 .5rem;padding:0;fill:#ff9b00}#ID>div h2{margin:0 0 1rem;font-size:1.5rem;line-height:calc(6px + 2.125ex)}#ID>div>p{margin:.5rem 0 0;max-width:59.25rem;width:100%}#ID .show--at-768,#ID .show--at-768-ilb{display:none}@media only screen and (min-width:768px){#ID .show--at-768{display:block}#ID .show--at-768-ilb{display:inline-block}#ID>div>svg{width:8.5rem;height:8.5rem;margin:0 0 1rem}#ID>div>h2{font-size:3rem;line-height:calc(6px + 2.125ex)}#ID>div>div{margin:2rem 0 0}}`.replace(/#ID/g, `#${ID}`);
// biome-ignore format: auto generated
const html = `<div><style>${css}</style><svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24" width=100% height=100% focusable=false aria-hidden=true><path d="M12 3L3 21h18zm0 2.24L19.38 20H4.62z"/><path d="M12.5 15l.5-5h-2l.49 5h1.01zM11 16h2v2h-2z"/></svg>${htmlMarkup}</div>`;

const bodyMarkup = document.createElement('div');
bodyMarkup.id = ID;
bodyMarkup.innerHTML = html;
document.body.appendChild(bodyMarkup);

document.body.style.overflow = 'hidden';

/* Auto Generated End */
