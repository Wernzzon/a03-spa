'use strict'

// Imports
import { createMenuElements, createQuizElements, createGeneric, getCheckedButton } from './createQuizViews'
import { gatherInfo, isFirstCallMade, answerIsAlternatives, resetAltExists, getURL, setNextURL } from '../apps/quiz/updateContent'
import { sendAnswerToServer } from '../apps/quiz/sendContent'
import { saveHighscore } from '../apps/quiz/storage'
import { getTimeTaken } from '../apps/quiz/timer'
import { switchView } from './windowView'

let idOfWindow

/**
 * Sets title of HTML doc, calls to create HTML elements.
 *
 * @param {string} id Id of the current window
 * @param {Array} alert If first is true, append alert
 * @returns {HTMLDivElement} Menu
 */
function getMenu (id, alert) {
  if (idOfWindow === null) idOfWindow = id

  return createMenuElements(alert)
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
    switchView(idOfWindow, createQuizElements(data), document.getElementById('quizContainer'))
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
      switchView(idOfWindow,
        createGeneric('GAME OVER', success[1], 'Reload page for menu', false, true),
        document.getElementById('quizQuestion'))
      return true
    }

    if (success[0] === 'Complete') {
      const time = getTimeTaken()
      saveHighscore([nickname, time])
      switchView(idOfWindow,
        createGeneric('QUIZ COMPLETE!', success[1], 'Reload page for menu', false, true),
        document.getElementById('quizQuestion'))
      return true
    }

    setNextURL(success.nextURL)
    switchView(idOfWindow,
      createGeneric('Correct!', success.message, 'Next Question', true, false),
      document.getElementById('quizQuestion'))
    return false
  } catch (error) {
    console.log(error)
  }
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
