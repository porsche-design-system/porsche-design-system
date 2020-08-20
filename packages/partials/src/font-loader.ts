/* Auto Generated Below */
export const getLoader = (options?: { all?: boolean; thin?: boolean; semibold?: boolean; bold?: boolean }): string => {
  let loaderStyles = '';
  if (options) {
    if (options.thin || options.all) {
      loaderStyles = '.loader::before{content:"";font-weight:100}';
    }
    if (options.semibold || options.all) {
      loaderStyles += '.loader::after{content:"";font-weight:600}';
    }
    if (options.bold || options.all) {
      loaderStyles += '.loader::first-line{content:"";font-weight:700}';
    }
  }

  const output = '<div class=loader id=pdsLoader><style>.loader{position:fixed;top:0;bottom:0;left:0;right:0;background:#fff;z-index:10000;font-family:"Porsche Next","Arial Narrow",Arial,sans-serif}.spinner{position:absolute;width:72px;top:50%;left:50%;margin:-36px 0 0 -36px;fill:none;transform:translate3d(0,0,0);stroke-width:1px;stroke:#323639}.fg{stroke-linecap:round;transform-origin:center center;stroke-dashoffset:0;stroke-dasharray:40,200;animation:rotate 2s linear infinite,dash 2s ease-in-out infinite}.bg{opacity:.4}@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:3,1000}50%{stroke-dasharray:42,1000}100%{stroke-dasharray:30,1000;stroke-dashoffset:-52}}</style><div class=spinner><svg viewBox="0 0 32 32"><circle class=fg cx=16 cy=16 r=9 /><circle class=bg cx=16 cy=16 r=9 /></svg></div></div>'.replace(/(<\/style>)/, `${loaderStyles}$1`);
  return output;
}