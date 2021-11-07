'use strict'

// Imports
import { getMenu, getQuiz, checkAnswer } from './views'
import { alert } from './createViews'
import { nicknameExists } from './storage'

window.addEventListener('load', loadMenu)

let firstCall = true
let checker
let nickname

/**
 * Load in functions to render the menu for the quiz.
 *
 * @param {Array} params If alert should be called or not
 */
function loadMenu (params) {
  try {
    getMenu()
    if (!params[0]) {
      alert(params[1])
    }
    document.getElementById('newGame').addEventListener('click', checkpoint)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Check nickname in storage, save nickname and load in the quiz,
 * gives error message if nickname exists.
 */
function checkpoint () {
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
