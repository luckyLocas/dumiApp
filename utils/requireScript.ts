const _importedScript: { [src: string]: true } = {};

/**
 * 动态加载css
 */
export function requireCss(src: string): Promise<void> {
  const headElement =
    document && (document.head || document.getElementsByTagName('head')[0]);
  return new Promise((resolve, reject) => {
    if (!document || src in _importedScript) {
      resolve();
      return;
    }
    const script = document.createElement('link');
    script.type = 'text/css';
    script.rel = 'stylesheet';
    script.href = src;
    script.onerror = () => {
      headElement.removeChild(script);
      reject(new URIError(`The css ${src} is no accessible.`));
    };
    script.onload = () => {
      _importedScript[src] = true;
      resolve();
    };
    headElement.appendChild(script);
  });
}

/**
 * 动态加载script
 */
export function requireScript(src: string, id = '_react_amap'): Promise<void> {
  const headElement =
    document && (document.head || document.getElementsByTagName('head')[0]);
  return new Promise((resolve, reject) => {
    if (!document || src in _importedScript) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = id;
    script.async = true;
    script.defer = true;
    script.src = src;
    script.onerror = () => {
      headElement.removeChild(script);
      reject(new URIError(`The Script ${src} is no accessible.`));
    };
    script.onload = () => {
      _importedScript[src] = true;
      resolve();
    };
    headElement.appendChild(script);
  });
}
