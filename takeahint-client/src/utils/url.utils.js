const pattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i',
);

export function validUrl(str) {
  return !!pattern.test(str);
}

export function getParam(name, defaultValue = '', urlString = window.location.href) {
  const url = new URL(urlString);
  return url.searchParams.get(name) || defaultValue;
}

export function setParam(name, value, urlString = window.location.href) {
  const url = new URL(urlString);
  url.searchParams.set(name, value);
  window.history.replaceState(undefined, undefined, url.search);
}
