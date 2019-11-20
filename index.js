const isObject = require('lodash/isObject');
const isString = require('lodash/isString');
const isUndefined = require('lodash/isUndefined');

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
