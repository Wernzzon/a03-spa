'use strict'

// Imports
import { createMenuElements, createQuizElements, createGeneric, getCheckedButton } from './createQuizViews'
import { gatherInfo } from '../apps/quiz/updateContent'
import { sendAnswerToServer } from '../apps/quiz/sendContent'
import { saveValues } from '../helpers/storage'
import { getTimeTaken } from '../apps/quiz/timer'

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
 * @param {HTMLSpanElement} timer Timer for a question
 * @param {object} info info
 * @returns {HTMLDivElement} Returns quiz elements
 */
async function getQuiz (timer, info) {
  try {
    const [data, newInfo] = await gatherInfo(info)
    return [newInfo, createQuizElements(data, info.questionNum, timer)]
  } catch (err) {
    console.error(err)
  }
}

/**
 * Checks if answer is correct or false.
 *
 * @param {string} id Id of window
 * @param {object} info Info
 * @returns {boolean} True or false
 */
async function checkAnswer (id, info) {
  try {
    const answer = getAnswerFromUser(id, info)
    const success = await sendAnswerToServer(info.nextURL, answer)

    if (success[0] === 'GameOver') {
      return [true, createGeneric('GAME OVER', success[1], 'Click for menu', true)]
    }

    if (success[0] === 'Complete') {
      const time = getTimeTaken()
      saveValues('highscores', [info.nickname, time])
      return [true, createGeneric('QUIZ COMPLETE!', success[1], 'Click for menu', true)]
    }

    return [false,
      createGeneric('Correct!', success.message, 'Next Question', false),
      { first: info.firstCall, next: success.nextURL, alt: false }
    ]
  } catch (err) {
    console.error(err)
  }
}

/**
 * Checks if input for answer is in form of text or radio buttons.
 *
 * @param {string} id Id of window
 * @param {object} info Info
 * @returns {string} Returns users answer
 */
function getAnswerFromUser (id, info) {
  const userAnswer = info.altExists
    ? getCheckedButton()
    : document.getElementById(id).lastChild.lastChild.firstChild.value

  return userAnswer
}

export {
  getMenu,
  getQuiz,
  checkAnswer
}
