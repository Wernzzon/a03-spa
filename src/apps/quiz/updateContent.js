'use strict'

// Imports
import { getFirstQuestion, getQuestion } from './quiz'

const info = {
  firstCall: true,
  altExists: false,
  nextURL: ''
}

/**
 * Get first question if firstCall is true, else get next question in quiz.
 *
 * @returns {Array} Data from server
 */
async function gatherInfo () {
  try {
    const response = info.firstCall ? await getFirstQuestion() : await getQuestion(info.nextURL)
    if (info.firstCall) info.firstCall = false

    const data = await response.json()
    info.nextURL = data.nextURL
    if (data.alternatives) info.altExists = true

    return data
  } catch (error) {
    console.log(error)
  }
}

/**
 * Send back true if answer input is in form of radio buttons, else false.
 *
 * @returns {boolean} True or false
 */
function answerIsAlternatives () {
  return info.altExists
}

/**
 * Resets altExists to false if it has been true.
 */
function resetAltExists () {
  info.altExists = false
}

/**
 * Return the next URL to make a call to.
 *
 * @returns {string} Next URL to make a call to
 */
function getURL () {
  return info.nextURL
}

/**
 * Sets the next URL to make a call to.
 *
 * @param {string} url Next URL to make a call to
 */
function setNextURL (url) {
  info.nextURL = url
}

export {
  gatherInfo,
  answerIsAlternatives,
  resetAltExists,
  getURL,
  setNextURL
}
