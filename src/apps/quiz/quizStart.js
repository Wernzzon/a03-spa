'use strict'

// Imports
import { getMenu, getQuiz, checkAnswer } from '../../views/quizViews'
import { nicknameExists } from './storage'
import { switchView } from '../../views/windowView'

let firstCall = true
let checker
let nickname
let idOfWindow

/**
 * Load in functions to render the menu for the quiz.
 *
 * @param {string} id Id of current window
 * @param {Array} params If alert should be called or not
 *
 * @returns {HTMLDivElement} Menu
 */
function loadMenu (id, params) {
  if (idOfWindow === null) {
    idOfWindow = id
    return getMenu()
  }

  switchView(idOfWindow, getMenu(params), document.getElementById(idOfWindow).childNodes()[1])
}

/**
 * Sets listener on newGame button.
 */
function setNewGameListener () {
  document.getElementById('newGame').addEventListener('click', checkpoint)
}

/**
 * Sets listener on sendAnswer button.
 */
function setSendAnswerListener () {
  document.getElementById('sendAnswer').addEventListener('click', loadAnswer)
}

/**
 * Check nickname in storage, save nickname and load in the quiz,
 * gives error message if nickname exists.
 */
function checkpoint () {
  console.log('check')
  const res = saveNickname()
  if (!res[0]) {
    loadMenu(res)
    return
  }

  nickname = res[1]
  loadQuiz()
}

/**
 * Save the user given nickname to be used for storage, and call loadQuiz.
 *
 * @returns {Array} Returns false if nickname is empty or exists in local storage
 */
function saveNickname () {
  const res = []
  const chosenNickname = document.getElementById('nickname').value
  if (chosenNickname === '') {
    res[0] = false
    res[1] = 'Nickname cannot be empty'
    return res
  }

  if (chosenNickname) {
    if (nicknameExists(chosenNickname)) {
      res[0] = false
      res[1] = 'Nickname already exists'
      return res
    }
  }

  res[0] = true
  res[1] = chosenNickname
  return res
}

/**
 * Load in functions to render the question from the server.
 */
async function loadQuiz () {
  try {
    checker = await getQuiz(firstCall)
    if (checker === true) {
      firstCall = false
    }
    document.getElementById('sendAnswer').addEventListener('click', loadAnswer)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Load in functions to check if the user given answer is correct or not.
 */
async function loadAnswer () {
  try {
    // eslint-disable-next-line no-unused-expressions
    await checkAnswer(nickname) ? '' : document.getElementById('nextQuestion').addEventListener('click', loadQuiz)
  } catch (error) {
    console.log(error)
  }
}

export {
  loadMenu,
  loadQuiz,
  loadAnswer,
  setNewGameListener,
  setSendAnswerListener
}
