'use strict'

// Imports
import { getFirstQuestion, getQuestion } from './quiz'

let firstCallMade = false
let altExists = false
let nextURL

/**
 * Get first question if firstCall is true, else get next question in quiz.
 *
 * @param {boolean} firstCall True if it is the first time it is pass through else false
 *
 * @returns {Array} Data from server
 */
async function gatherInfo (firstCall) {
  try {
    let response
    if (firstCall === true) {
      response = await getFirstQuestion()
      firstCallMade = true
    } else {
      response = await getQuestion(nextURL)
    }

    const data = await response.json()
    nextURL = data.nextURL
    if (data.alternatives !== undefined) {
      altExists = true
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

/**
 * Send back true if first call has been made.
 *
 * @returns {boolean} True or false
 */
function isFirstCallMade () {
  return firstCallMade
}

/**
 * Send back true if answer input is in form of radio buttons, else false.
 *
 * @returns {boolean} True or false
 */
function answerIsAlternatives () {
  return altExists
}

/**
 * Resets altExists to false if it has been true.
 */
function resetAltExists () {
  altExists = false
}

/**
 * Return the next URL to make a call to.
 *
 * @returns {string} Next URL to make a call to
 */
function getURL () {
  return nextURL
}

/**
 * Sets the next URL to make a call to.
 *
 * @param {string} url Next URL to make a call to
 */
function setNextURL (url) {
  nextURL = url
}

export {
  gatherInfo,
  isFirstCallMade,
  answerIsAlternatives,
  resetAltExists,
  getURL,
  setNextURL
}
