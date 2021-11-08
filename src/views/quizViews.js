'use strict'

// Imports
import { createMenuElements, createQuizElements, createAnswerCorrect, createQuizOver, createQuizComplete, getCheckedButton } from './createQuizViews'
import { gatherInfo, isFirstCallMade, answerIsAlternatives, resetAltExists, getURL, setNextURL } from '../apps/quiz/updateContent'
import { sendAnswerToServer } from '../apps/quiz/sendContent'
import { saveHighscore } from '../apps/quiz/storage'
import { getTimeTaken } from '../apps/quiz/timer'

/**
 * Sets title of HTML doc, calls to create HTML elements.
 *
 * @returns {HTMLDivElement} Menu
 */
function getMenu () {
  return createMenuElements()
}

/**
 * Sets title of HTML doc, gets info for quiz question, calls to create HTML elements.
 *
 * @param {boolean} firstCall True if it is the first time it is pass through else false
 *
 * @returns {boolean} Returns true
 */
async function getQuiz (firstCall) {
  try {
    const data = await gatherInfo(firstCall)
    createQuizElements(data)
    return isFirstCallMade()
  } catch (error) {
    console.log(error)
  }
}

/**
 * Checks if answer is correct or false.
 *
 * @param {string} nickname To be stored
 *
 * @returns {boolean} True or false
 */
async function checkAnswer (nickname) {
  try {
    const answer = getAnswerFromUser()
    const success = await sendAnswerToServer(getURL(), answer)

    if (success[0] === 'GameOver') {
      return getQuizOver(success[1])
    }

    if (success[0] === 'Complete') {
      const time = getTimeTaken()
      const save = [nickname, time]
      saveHighscore(save)
      return getQuizComplete(success[1])
    }

    setNextURL(success.nextURL)
    return getCongratz(success.message)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Sets title of HTML doc, calls to create HTML elements.
 *
 * @param {string} message Message from server to be shown
 *
 * @returns {boolean} False
 */
function getCongratz (message) {
  return createAnswerCorrect(message)
}

/**
 * Sets title of HTML doc, calls to create HTML elements.
 *
 * @param {string} message Message from server to be shown
 *
 * @returns {boolean} True
 */
function getQuizOver (message) {
  return createQuizOver(message)
}

/**
 * Sets title of HTML doc, calls to create HTML elements.
 *
 * @param {string} message Message from server to be shown
 *
 * @returns {boolean} True
 */
function getQuizComplete (message) {
  return createQuizComplete(message)
}

/**
 * Checks if input for answer is in form of text or radio buttons.
 *
 * @returns {string} Returns users answer
 */
function getAnswerFromUser () {
  const userAnswer = answerIsAlternatives()
    ? getCheckedButton()
    : document.getElementById('answer').value
  resetAltExists()

  return userAnswer
}

export {
  getMenu,
  getQuiz,
  checkAnswer
}
