export function setStorage(key, value) {
  if (typeof value!=='string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
}

export function getStorage(key) {
  let value = window.localStorage.getItem(key);
  if (value) {
    try {
      value = JSON.parse(value);
    } catch (e) {
      value = value;
    }
  }
  return value;
}

export function removeStorage(key) {
  window.localStorage.removeItem(key);
}

export function clearStorage() {
  window.localStorage.clear();
}
