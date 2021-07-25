/**
 * A method to transform keys to camel case so that one common standard is followed across a project.
 * This method will be handy for cases wherein hypen is returned by API and if not transformed then typescript type
 * checking cannot be incorporated.
 * Apart from hyphen; underscore is converted too for uniformity.
 *
 *
 * @since 1.0.2
 * @category Array, Object
 * @param {Array, Object} response The array or object to inspect.
 * @returns {Array, Object} Returns the array or object with camel cased keys
 * @example
 *
 * camelCaseResponse({key-one: 1})
 * // => {keyOne: 1}
 *
 * camelCaseResponse([{key_one: 1}])
 * // => [{keyOne: 1}]
 */
function camelCaseResponse(response) {
  let updatedResponse = Array.isArray(response) ? [] : {};
  for (let key in response) {
    if (response.hasOwnProperty(key)) {
      const currentValue = response[key];
      let updatedKey = key;
      if (updatedKey.indexOf('-') !== -1) {
        updatedKey = updatedKey.replace(/-([a-z])/g, (matchedString) =>
          matchedString[1].toUpperCase()
        );
      } else if (updatedKey.indexOf('_') !== -1) {
        updatedKey = updatedKey.replace(/_([a-z])/g, (matchedString) =>
          matchedString[1].toUpperCase()
        );
      }

      updatedResponse[updatedKey] =
        typeof currentValue === 'object'
          ? camelCaseResponse(currentValue)
          : currentValue;
    }
  }
  return updatedResponse;
}

module.exports = camelCaseResponse;
