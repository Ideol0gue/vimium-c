/// <reference no-default-lib="true"/>
/// <reference path="../types/base/index.d.ts" />
declare var browser: never;
if (typeof browser !== "undefined" && browser && (browser as any).runtime) {
  window.chrome = browser;
}
window.chrome && chrome.runtime && chrome.runtime.getManifest && (function() {
  let loader = (document as any).currentScript as HTMLScriptElement;
  const head = loader.parentElement as HTMLElement
    , arr = chrome.runtime.getManifest().content_scripts[0].js;
  arr.pop();
  for (const src of arr) {
    const scriptElement = document.createElement("script");
    scriptElement.async = false;
    scriptElement.defer = true;
    scriptElement.src = (src[0] !== "/") ? ("/" + src) : src;
    head.replaceChild(scriptElement, loader);
    loader = scriptElement;
  }
  loader.remove();
  setTimeout(function() {
    (window as any).VDom && ((window as any).VDom.allowScripts = false);
  }, 400);
})();
