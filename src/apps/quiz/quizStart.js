'use strict'

// Imports
import { getMenu, getQuiz, checkAnswer } from '../../views/quizViews'
import { nicknameExists } from './storage'
import { Window } from '../../views/window'

/**
 * Quiz
 */
export class Quiz {
  parentWindow
  firstCall = true
  checker
  nickname
  window = {
    id: '',
    args: ''
  }

  /**
   * Constructor.
   */
  constructor () {
    this.parentWindow = new Window()
  }

  /**
   * Load in functions to render the menu for the quiz.
   *
   * @param {string} id Id of current window
   *
   * @returns {HTMLDivElement} Menu
   */
  loadMenu (id) {
    if (window.id === '') {
      window.id = id
      window.args = [true]
      return getMenu(window.args)
    }

    this.parentWindow.switchView(getMenu(window.args), document.getElementById(window.id).firstChild.nextSibling)
  }

  /**
   * Sets listener on newGame button.
   */
  setNewGameListener () {
    document.getElementById('newGame').addEventListener('click', this.checkpoint)
  }

  /**
   * Sets listener on sendAnswer button.
   */
  setSendAnswerListener () {
    document.getElementById('sendAnswer').addEventListener('click', this.loadAnswer)
  }

  /**
   * Check nickname in storage, save nickname and load in the quiz,
   * gives error message if nickname exists.
   */
  checkpoint () {
    console.log('check')
    const res = this.saveNickname()
    if (!res[0]) {
      window.args = res
      this.loadMenu()
      return
    }

    this.nickname = res[1]
    this.loadQuiz()
  }

  /**
   * Save the user given nickname to be used for storage, and call loadQuiz.
   *
   * @returns {Array} Returns false if nickname is empty or exists in local storage
   */
  saveNickname () {
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
  async loadQuiz () {
    try {
      this.checker = await getQuiz(window.id, this.firstCall)
      if (this.checker === true) {
        this.firstCall = false
      }
      document.getElementById('sendAnswer').addEventListener('click', this.loadAnswer)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Load in functions to check if the user given answer is correct or not.
   */
  async loadAnswer () {
    try {
      // eslint-disable-next-line no-unused-expressions
      await checkAnswer(window.id, this.nickname) ? '' : document.getElementById('next').addEventListener('click', this.loadQuiz)
    } catch (error) {
      console.log(error)
    }
  }
}

// let firstCall = true
// let checker
// let nickname
// const window = {
//   id: '',
//   args: ''
// }

// /**
//  * Load in functions to render the menu for the quiz.
//  *
//  * @param {string} id Id of current window
//  *
//  * @returns {HTMLDivElement} Menu
//  */
// function loadMenu (id) {
//   if (window.id === '') {
//     window.id = id
//     window.args = [true]
//     return getMenu(window.args)
//   }

//   Window.switchView(window.id, getMenu(window.args), document.getElementById(window.id).firstChild.nextSibling)
// }

// /**
//  * Sets listener on newGame button.
//  */
// function setNewGameListener () {
//   document.getElementById('newGame').addEventListener('click', checkpoint)
// }

// /**
//  * Sets listener on sendAnswer button.
//  */
// function setSendAnswerListener () {
//   document.getElementById('sendAnswer').addEventListener('click', loadAnswer)
// }

// /**
//  * Check nickname in storage, save nickname and load in the quiz,
//  * gives error message if nickname exists.
//  */
// function checkpoint () {
//   console.log('check')
//   const res = saveNickname()
//   if (!res[0]) {
//     window.args = res
//     loadMenu()
//     return
//   }

//   nickname = res[1]
//   loadQuiz()
// }

// /**
//  * Save the user given nickname to be used for storage, and call loadQuiz.
//  *
//  * @returns {Array} Returns false if nickname is empty or exists in local storage
//  */
// function saveNickname () {
//   const res = []
//   const chosenNickname = document.getElementById('nickname').value
//   if (chosenNickname === '') {
//     res[0] = false
//     res[1] = 'Nickname cannot be empty'
//     return res
//   }

//   if (chosenNickname) {
//     if (nicknameExists(chosenNickname)) {
//       res[0] = false
//       res[1] = 'Nickname already exists'
//       return res
//     }
//   }

//   res[0] = true
//   res[1] = chosenNickname
//   return res
// }

// /**
//  * Load in functions to render the question from the server.
//  */
// async function loadQuiz () {
//   try {
//     checker = await getQuiz(window.id, firstCall)
//     if (checker === true) {
//       firstCall = false
//     }
//     document.getElementById('sendAnswer').addEventListener('click', loadAnswer)
//   } catch (error) {
//     console.error(error)
//   }
// }

// /**
//  * Load in functions to check if the user given answer is correct or not.
//  */
// async function loadAnswer () {
//   try {
//     // eslint-disable-next-line no-unused-expressions
//     await checkAnswer(window.id, nickname) ? '' : document.getElementById('next').addEventListener('click', loadQuiz)
//   } catch (error) {
//     console.log(error)
//   }
// }

// export {
//   loadMenu,
//   loadQuiz,
//   loadAnswer,
//   setNewGameListener,
//   setSendAnswerListener
// }
