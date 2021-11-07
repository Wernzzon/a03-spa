'use strict'

// Imports
import { createMenuElements, createQuizElements, createAnswerCorrect, createQuizOver, createQuizComplete, getCheckedButton } from './createViews'
import { gatherInfo, isFirstCallMade, answerIsAlternatives, resetAltExists, getURL, setNextURL } from './updateContent'
import { sendAnswerToServer } from './sendContent'
import { saveHighscore } from './storage'
import { getTimeTaken } from './timer'

/**
 * Sets title of HTML doc, calls to create HTML elements.
 */
function getMenu () {
  setTitle('Quiz - Menu')
  createMenuElements()
}

/**
 * Sets title of HTML doc, gets info for quiz question, calls to create HTML elements.
 *
 * @param {boolean} firstCall True if it is the first time it is pass through else false
 *
 * @returns {boolean} Returns true
 */
async function getQuiz (firstCall) {
  setTitle('Quiz - Questions')
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
  setTitle('Quiz - Congratz')
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
  setTitle('Quiz - Game Over')
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
  setTitle('Quiz - Complete')
  return createQuizComplete(message)
}

/**
 * Sets title of HTML doc.
 *
 * @param {string} title String to be set as title
 */
function setTitle (title) {
  document.title = title
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
