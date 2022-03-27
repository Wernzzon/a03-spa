'use strict'

/**
 * Gets stored values with the given key.
 *
 * @param {string} key Key in localStorage
 * @returns {string} Values for given key || null
 */
function getLocalValues (key) {
  return window.localStorage.getItem(key)
}

/**
 * Removes stored values with the given key.
 *
 * @param {string} key Key in localStorage
 */
function removeLocalValues (key) {
  window.localStorage.removeItem(key)
}

/**
 * Saves highscore array to local storage.
 *
 * @param {string} key Key in localStorage
 * @param {string[]} values Values to save
 */
function saveToLocal (key, values) {
  window.localStorage.setItem(key, values)
}

/**
 * Compares all values of given keys, to get the 5 lowest numbers with their respective key.
 *
 * @returns {boolean | string[]} Top 5 lowest values with their respective key
 */
function getTopFiveTimes () {
  let [compare, formatted] = getFormattedValues('highscores', true)
  if (!compare) return formatted

  formatted = compareForLowestScore(formatted)
  return formatted.slice(0, 5)
}

/**
 * Get formatted array of values from given key in localStorage.
 *
 * @param {string} key Key in localStorage
 * @param {boolean} compare True or false
 * @returns {Array} [boolean, string[]] or string[]
 */
function getFormattedValues (key, compare) {
  const archive = getLocalValues(key)
  if (!archive) return [false, false]

  return compare ? format(archive) : format(archive)[1]
}

/**
 * Sorts an array based on the second value in the arrays of given array.
 *
 * @param {string[]} values Array to sort
 *
 * @returns {string[]} Sorted array
 */
function compareForLowestScore (values) {
  return values.sort((a, b) => a[1] - b[1])
}

/**
 * Formats strings into arrays in current array.
 *
 * @param {string} values Array to format
 *
 * @returns {Array} [boolean, string[]]
 */
function format (values) {
  if (!values.includes(' ')) {
    return [false, values.split(',')]
  }

  values = values.split(' ')
  for (let i = 0; i < values.length; i++) {
    values[i] = values[i].split(',')
  }
  values.shift()

  return [true, values]
}

/**
 * Saves values at given key in localStorage.
 *
 * @param {string} key Key in localStorage
 * @param {string[]} toSave Array of values to save
 *
 * @returns {boolean} Returns true if value exists in local storage, else false
 */
function saveValues (key, toSave) {
  let save = getLocalValues(key)
  save = save + ' ' + toSave.toString()
  saveToLocal(key, save)
  return valueExists(toSave[0])
}

/**
 * Checks if a value exists at a given key in local storage.
 *
 * @param {string} key Key in localStorage
 * @param {string} value Value to compare
 *
 * @returns {boolean} Returns true if the value exists in local storage, else false
 */
function valueExists (key, value) {
  const values = getLocalValues(key)
  if (!values) return false
  return values.includes(value)
}

export {
  saveValues,
  getTopFiveTimes,
  valueExists,
  getFormattedValues,
  getLocalValues,
  removeLocalValues
}
