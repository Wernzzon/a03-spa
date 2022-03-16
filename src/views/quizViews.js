'use strict'

// Imports
import { createMenuElements, createQuizElements, createGeneric, getCheckedButton } from './createQuizViews'
import { gatherInfo, answerIsAlternatives, resetAltExists, getURL, setNextURL, resetInfo } from '../apps/quiz/updateContent'
import { sendAnswerToServer } from '../apps/quiz/sendContent'
import { saveHighscore } from '../apps/quiz/storage'
import { getTimeTaken, startCount } from '../apps/quiz/timer'

/**
 * Sets title of HTML doc, calls to create HTML elements.
 *
 * @param {Array} params If first is false, append alert
 * @returns {HTMLDivElement} Menu
 */
function getMenu (params) {
  return createMenuElements(params)
}

/**
 * Gets info for quiz question, calls to create HTML elements.
 *
 * @param {number} questionNum Number of the question
 * @returns {HTMLDivElement} Returns quiz elements
 */
async function getQuiz (questionNum) {
  try {
    const data = await gatherInfo() // await needed?
    return createQuizElements(data, questionNum)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Checks if answer is correct or false.
 *
 * @param {string} id Id of window
 * @param {string} nickname To be stored
 * @returns {boolean} True or false
 */
async function checkAnswer (id, nickname) {
  try {
    const answer = getAnswerFromUser(id)
    const success = await sendAnswerToServer(getURL(), answer)

    if (success[0] === 'GameOver') {
      return [true, createGeneric('GAME OVER', success[1], 'Click for menu', true)]
    }

    if (success[0] === 'Complete') {
      const time = getTimeTaken()
      saveHighscore([nickname, time])
      return [true, createGeneric('QUIZ COMPLETE!', success[1], 'Click for menu', true)]
    }

    setNextURL(success.nextURL)
    return [false, createGeneric('Correct!', success.message, 'Next Question', false)]
  } catch (error) {
    console.log(error)
  }
}

/**
 * Checks if input for answer is in form of text or radio buttons.
 *
 * @param {string} id Id of window
 * @returns {string} Returns users answer
 */
function getAnswerFromUser (id) {
  const userAnswer = answerIsAlternatives()
    ? getCheckedButton()
    : document.getElementById(id).lastChild.lastChild.firstChild.value
  resetAltExists()

  return userAnswer
}

export {
  getMenu,
  getQuiz,
  checkAnswer,
  startCount,
  resetInfo
}
