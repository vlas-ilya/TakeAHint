export function getParam(name, defaultValue = "") {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || defaultValue;
}

export function setParam(name, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.replaceState(undefined, undefined, url.search);
}
