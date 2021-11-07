'use strict'

/**
 * Gets stored highscore list.
 *
 * @returns {Array} Sorted highscore list
 */
function getHighscoreList () {
  return window.localStorage.getItem('highscore') ? window.localStorage.getItem('highscore') : []
}

/**
 * Saves highscore array to local storage.
 *
 * @param {Array} params Array to save
 */
function saveToLocal (params) {
  window.localStorage.setItem('highscore', params)
}

/**
 * Compares all values of given keys, to get the 5 lowest numbers with their respective key.
 *
 * @returns {boolean | string[]} Top 5 lowest values with their respective key
 */
function getTopFiveTimes () {
  let archive
  if (!window.localStorage.getItem('highscore')) {
    archive = false
  } else {
    archive = window.localStorage.getItem('highscore')

    archive = format(archive)
    archive = compareForLowestScore(archive)
    if (archive.length > 5) {
      archive = archive.slice(0, 5)
    }
  }
  return archive
}

/**
 * Sorts an array based on the second value in the arrays of given array.
 *
 * @param {Array} params Array to sort
 *
 * @returns {Array} Sorted array
 */
function compareForLowestScore (params) {
  params.sort((a, b) => a[1] - b[1])
  return params
}

/**
 * Formats strings into arrays in current array.
 *
 * @param {Array} list List to format
 *
 * @returns {Array} Formatted array
 */
function format (list) {
  list = list.split(' ')
  for (let i = 0; i < list.length; i++) {
    list[i] = list[i].split(',')
  }
  list.shift()

  return list
}

/**
 * Saves nickname and time in local and session storage.
 *
 * @param {Array} newScore [nickname, time]
 *
 * @returns {boolean} Returns true if nickname exists in local storage, else false
 */
function saveHighscore (newScore) {
  let save = getHighscoreList()
  save = save + ' ' + newScore.toString()
  saveToLocal(save)
  return nicknameExists(newScore[0])
}

/**
 * Checks if nickname exists in local storage.
 *
 * @param {string} nickname Value to compare
 *
 * @returns {boolean} Returns true if nickname exists in local storage, else false
 */
function nicknameExists (nickname) {
  const storedNicknames = window.localStorage.getItem('highscore') // null if first time
  if (storedNicknames === null) return false
  return storedNicknames.includes(nickname)
}

export {
  saveHighscore,
  getTopFiveTimes,
  nicknameExists
}
