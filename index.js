function isObject(obj) {
  return obj === Object(obj);
}

function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

function isUndefined(value) {
  return value === undefined;
}

module.exports = function get(obj, path, defaultValue) {
  if (!isObject(obj) || !isString(path)) {
    return defaultValue;
  }

  return path.split('.').reduce((result, property) => {
    if (isObject(result)) {
      return result[property];
    }

    return isUndefined(result) ? defaultValue : result;
  }, obj);
}
